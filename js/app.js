/// <reference path="typings/index.d.ts" />

var taptarget = document.querySelectorAll(".tap-target");
var instances = M.TapTarget.init(taptarget, {});
instances[0].open();

var tooltipped = document.querySelectorAll(".tooltipped");
var tooltip = M.Tooltip.init(tooltipped, {});

var fixedactionbtn = document.querySelectorAll(".fixed-action-btn");
var floatActionButton = M.FloatingActionButton.init(fixedactionbtn, {
  direction: "top"
});

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

var map = L.map("map", {
  attributionControl: false,
  center: [51.20, 9.62],
  zoom: (L.Browser.mobile? 5 : 6),
  maxZoom: 18,
  minZoom: (L.Browser.mobile? 5 : 6),
  maxBounds: [[42, -46], [58, 67]],
  fadeAnimation: false,
  zoomControl: false
});

if (!L.Browser.mobile) {
  L.control
    .zoom({ zoomInTitle: "hineinzoomen", zoomOutTitle: "hinauszoomen" })
    .addTo(map);
}

L.control.attribution({prefix:false, position: "bottomleft"}).addTo(map);

L.Mask = L.Polygon.extend({
  options: {
    stroke: false,
    color: "#333",
    fillOpacity: 0.5,
    clickable: true,
    outerBounds: new L.LatLngBounds([-90, -360], [90, 360])
  },

  initialize: function(latLngs, options) {
    var outerBoundsLatLngs = [
      this.options.outerBounds.getSouthWest(),
      this.options.outerBounds.getNorthWest(),
      this.options.outerBounds.getNorthEast(),
      this.options.outerBounds.getSouthEast()
    ];
    L.Polygon.prototype.initialize.call(
      this,
      [outerBoundsLatLngs, latLngs],
      options
    );
  }
});

L.mask = function(latLngs, options) {
  return new L.Mask(latLngs, options);
};

L.mask(germany).addTo(map);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    minZoom: 5,
    maxZoom: 18,
    attribution:
      'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  }
).addTo(map);

function updateUrl() {
  var center = map.getCenter();
  var lat = center.lat.toFixed(4);
  var lon = center.lng.toFixed(4);
  var zoom = map.getZoom();
  var view = "map=" + zoom + "/" + lat + "/" + lon;
  document.location.hash = view;
}

map.on("move", updateUrl);
map.on("zoom", updateUrl);

function setViewFromUrl() {
  var hash = document.location.hash;
  if (hash.length !== 0) {
    var splitHash = hash.split("/");
    var zoom = splitHash[0].substring(5);
    var lat = splitHash[1];
    var lon = splitHash[2];
    map.setView([lat, lon], zoom);
  }
}

setViewFromUrl();

async function getTemplate(url) {
  try {
    let response = await fetch(url);
    let template = await response.text();
    return template;
  } catch (e) {
    console.log("Error!", e);
  }
}

let tmplProjektpartner = getTemplate("tmpl/projektpartner.html");
let tmplKonsultationskitas = getTemplate("tmpl/konsultationskitas.html");
// let tmplTODO = getTemplate("tmpl/TODO.html");

function renderPopUP(template, feature) {
  template.then(function(t) {
    Mustache.parse(t);
    var rendered = Mustache.render(t, feature.properties);
    document.all.modal1.innerHTML = rendered;
    var elems = document.querySelectorAll(".modal");
    //var instances = M.Modal.init(elems, options);
    var modals = M.Modal.init(elems, { opacity: 0.5 });
    modals[0].open();
  });
}

// Projektpartner

var projektpartnerIcon = L.icon({
  iconUrl: "icons/projektpartner.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37]
});

var projektpartnerIconHighlight = L.icon({
  iconUrl: "icons/projektpartner.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37]
});

var projektpartnerData = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: projektpartnerIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(
      String("<b>" + feature.properties["projektpartner"] + "</b>"), // TODO
      {
        offset: [32, 18],
        direction: "right"
      }
    );
    layer.on("mouseover", function(e) {
      e.target.setIcon(projektpartnerIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(projektpartnerIcon);
    });
    layer.on("click", function(e) {
      renderPopUP(tmplProjektpartner, e.sourceTarget.feature);
      map.setView(e.latlng, 13);
    });
  }
});

var markersProjektpartner = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 25,
  iconCreateFunction: function(cluster) {
    return L.divIcon({
      html:
        '<div class="divIconProjektpartner"></div><div class="myMarkerCluster">' +
        cluster.getChildCount() +
        "</div>",
      iconSize: [32, 37],
      className: ""
    });
  }
});

// Konsultationskitas

var konsultationskitasIcon = L.icon({
  iconUrl: "icons/konsultationskitas.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37]
});

var konsultationskitasIconHighlight = L.icon({
  iconUrl: "icons/konsultationskitas.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37]
});

var konsultationskitasData = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: konsultationskitasIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(
      String("<b>" + feature.properties["name"] + "</b>"), // TODO
      {
        offset: [32, 18],
        direction: "right"
      }
    );
    layer.on("mouseover", function(e) {
      e.target.setIcon(konsultationskitasIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(konsultationskitasIcon);
    });
    layer.on("click", function(e) {
      renderPopUP(tmplKonsultationskitas, e.sourceTarget.feature); // TODO
      map.setView(e.latlng, 13);
    });
  }
});

var markersKonsultationskitas = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 25,
  spiderLegPolylineOptions: { weight: 1.5, color: "#222", opacity: 0.5 },
  iconCreateFunction: function(cluster) {
    return L.divIcon({
      html:
        '<div class="divIconKonsultationskitas"></div><div class="myMarkerCluster">' +
        cluster.getChildCount() +
        "</div>",
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      className: ""
    });
  }
});

markersProjektpartner.on("spiderfied", event => {
  event.cluster.setOpacity(0);
});

markersProjektpartner.on("unspiderfied", event => {
  event.cluster.setOpacity(1);
});

markersKonsultationskitas.on("spiderfied", event => {
  event.cluster.setOpacity(0);
});

markersKonsultationskitas.on("unspiderfied", event => {
  event.cluster.setOpacity(1);
});

// Closure
function handleMenuEvent(typ, color) {
  // Anonymous function
  return function(e) {
    if (L.Browser.mobile) {
      floatActionButton[0].open();
    }
    // var menu = document.querySelector(
    //   "body > div.fixed-action-btn.direction-top > ul > li:nth-child(3) > a"
    // );

    // https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
    // var path = e.path || (e.composedPath && e.composedPath());
    // var menu=path[1];
    var menu = e.target; // for ie11 and edge compatibility

    switch (e.type) {
      //case "mouseover":
      //  if (!menu.className.includes("clicked")) {
      //    if (!map.hasLayer(typ)) {
      //      typ.addTo(map);
      //    }
      //  }
      //  break;
      //case "mouseout":
      //  if (!menu.className.includes("clicked")) {
      //    if (map.hasLayer(typ)) {
      //      map.removeLayer(typ);
      //    }
      //  }
      //  break;
      case "click":
        menu.classList.toggle("clicked");
        if (!menu.className.includes("clicked")) {
          map.removeLayer(typ);
        } else {
          typ.addTo(map);
        }
        if (L.Browser.mobile) {
          sleep(500).then(() => {
            floatActionButton[0].close();
            tooltip.forEach(function(element) {
              element.close();
            });
          });
        }

        break;
    }
  };
}

// Add event listener to table
var projektpartner = document.getElementById("projektpartner");
projektpartner.addEventListener( "click", handleMenuEvent(markersProjektpartner, "yellow"), false);
projektpartner.addEventListener( "mouseover", handleMenuEvent(markersProjektpartner, "yellow"), false);
projektpartner.addEventListener( "mouseout", handleMenuEvent(markersProjektpartner, "yellow"), false);

var konsultationskitas = document.getElementById("konsultationskitas");
konsultationskitas.addEventListener( "click", handleMenuEvent(markersKonsultationskitas, "blue"), false);
konsultationskitas.addEventListener( "mouseover", handleMenuEvent(markersKonsultationskitas, "blue"), false);
konsultationskitas.addEventListener( "mouseout", handleMenuEvent(markersKonsultationskitas, "blue"), false);

fetch("https://mapserver.nabu.de/fcgi-bin/najukoffer/projektpartner") // Call the fetch function passing the url of the API as a parameter
// fetch("http://localhost:9000/projektpartner")
// fetch("http://10.42.7.220:9000/projektpartner")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    projektpartnerData.addData(json);
    markersProjektpartner.addLayer(projektpartnerData);
    markersProjektpartner.addTo(map);
  })
  .catch(function(error) {
    console.log(error.message);
    M.toast({ html: "Fehler beim Laden der Projektpartner!" });
  });

fetch("https://mapserver.nabu.de/fcgi-bin/najukoffer/konsultationskitas") // Call the fetch function passing the url of the API as a parameter
// fetch("http://localhost:9000/konsultationskitas")
// fetch("http://10.42.7.220:9000/konsultationskitas")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    konsultationskitasData.addData(json);
    markersKonsultationskitas.addLayer(konsultationskitasData);
    markersKonsultationskitas.addTo(map);
  })
  .catch(function(error) {
    console.log(error.message);
    M.toast({ html: "Fehler beim Laden der Konsultationskitas!" });
  });
