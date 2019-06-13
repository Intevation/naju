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
  center: [50.15, 10.66],
  zoom: 5,
  maxZoom: 18,
  minZoom: 5,
  maxBounds: [[42, -46], [58, 67]],
  fadeAnimation: false,
  zoomControl: false
});

if (!L.Browser.mobile) {
  L.control
    .zoom({ zoomInTitle: "hineinzoomen", zoomOutTitle: "hinauszoomen" })
    .addTo(map);
}

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoiYmpvZXJuc2NoaWxiZXJnIiwiYSI6InRzOVZKeWsifQ.y20mr9o3MolFOUdTQekhUA",
    noWrap: true
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

let tmplTermine = getTemplate("tmpl/termine.html");
let tmplGruppen = getTemplate("tmpl/gruppen.html");
let tmplLandesverbaende = getTemplate("tmpl/landesverbaende.html");

function renderPopUP(template, feature) {
  template.then(function(t) {
    Mustache.parse(t);
    var rendered = Mustache.render(t, feature.properties);
    document.all.modal1.innerHTML = rendered;
    var elems = document.querySelectorAll(".modal");
    //var instances = M.Modal.init(elems, options);
    var modals = M.Modal.init(elems, { opacity: 0.5 });
    console.log(modals);
    modals[0].open();
  });
}

var kindergruppenIcon = L.divIcon({
  html: '<i class="material-icons yellow myDivIcon">group</i>',
  iconSize: [36, 36],
  className: ""
});

var kindergruppenIconHighlight = L.divIcon({
  html:
    '<i class="material-icons yellow darken-1 pulse myDivIconHighlight">group</i>',
  iconSize: [54, 54],
  className: ""
});

var kindergruppen = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: kindergruppenIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(String("<b>" + feature.properties["NAJU"] + "</b>"), {
      offset: [18, 0],
      direction: "right"
    });
    layer.on("mouseover", function(e) {
      e.target.setIcon(kindergruppenIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(kindergruppenIcon);
    });
    layer.on("click", function(e) {
      console.log(e.sourceTarget.feature);
      renderPopUP(tmplGruppen, e.sourceTarget.feature);
      map.flyTo(e.latlng, 13);
    });
  }
});

var markersKindergruppen = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 25,
  iconCreateFunction: function(cluster) {
    return L.divIcon({
      html: '<div class="myMarkerCluster">'+cluster.getChildCount()+'</div><i class="material-icons yellow myDivIcon">group</i>',
      iconSize: [36, 36],
      className: ""
    });
  }
});

var dateIcon = L.divIcon({
  html: '<i class="material-icons orange myDivIcon">date_range</i>',
  iconSize: [36, 36],
  className: ""
});

var dateIconHighlight = L.divIcon({
  html:
    '<i class="material-icons orange darken-1 pulse myDivIconHighlight">date_range</i>',
  iconSize: [54, 54],
  className: ""
});

var dates = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: dateIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(
      String("<b>" + feature.properties["thema"] + "</b>"),
      {
        offset: [18, 0],
        direction: "right"
      }
    );

    layer.on("mouseover", function(e) {
      //map.panTo(e.latlng);
      e.target.setIcon(dateIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(dateIcon);
    });
    layer.on("click", function(e) {
      renderPopUP(tmplTermine, e.sourceTarget.feature);
      map.flyTo(e.latlng, 13);
    });
  }
});

var markersDates = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 25,
  iconCreateFunction: function(cluster) {
    return L.divIcon({
      html: '<div class="myMarkerCluster">'+cluster.getChildCount()+'</div><i class="material-icons orange myDivIcon">date_range</i>',
      iconSize: [36, 36],
      className: ""
    });
  }
});

var officeIcon = L.divIcon({
  html: '<i class="material-icons green myDivIcon">stars</i>',
  iconSize: [36, 36],
  className: ""
});

var officeIconHighlight = L.divIcon({
  html:
    '<i class="material-icons green darken-1 pulse myDivIconHighlight">stars</i>',
  iconSize: [54, 54],
  className: ""
});

var offices = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: officeIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(String("<b>" + feature.properties["LV"] + "</b>"), {
      offset: [18, 0],
      direction: "right"
    });
    layer.on("mouseover", function(e) {
      e.target.setIcon(officeIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(officeIcon);
    });
    layer.on("click", function(e) {
      renderPopUP(tmplLandesverbaende, e.sourceTarget.feature);
    });
  }
});

// Closure
function handleMenuEvent(typ, color) {
  // Anonymous function
  return function(e) {
    if (L.Browser.mobile) {
      floatActionButton[0].open();
    }
    console.log(e);
    // var menu = document.querySelector(
    //   "body > div.fixed-action-btn.direction-top > ul > li:nth-child(3) > a"
    // );

    // https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
    // var path = e.path || (e.composedPath && e.composedPath());
    // var menu=path[1];
    var menu = e.target.parentNode; // for ie11 and edge compatibility
    // console.log(menu);

    switch (e.type) {
      case "mouseover":
        if (!menu.className.includes("clicked")) {
          if (!map.hasLayer(typ)) {
            typ.addTo(map);
            // map.fitBounds(typ.getBounds());
            map.flyToBounds(typ.getBounds());
            menu.classList.remove("grey");
            menu.classList.add(color);
          }
        }else{
            //map.fitBounds(typ.getBounds());
            map.flyToBounds(typ.getBounds());
        }
        break;
      case "mouseout":
        if (!menu.className.includes("clicked")) {
          if (map.hasLayer(typ)) {
            map.removeLayer(typ);
            menu.classList.remove(color);
            menu.classList.add("grey");
          }
        }
        break;
      case "click":
        menu.classList.toggle("clicked");
        if (!menu.className.includes("clicked")) {
          map.removeLayer(typ);
          menu.classList.remove(color);
          menu.classList.add("grey");
        } else {
          typ.addTo(map);
          //map.fitBounds(typ.getBounds());
          map.flyToBounds(typ.getBounds());
          menu.classList.remove("grey");
          menu.classList.add(color);
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
var lvs = document.getElementById("lvs");
lvs.addEventListener("click", handleMenuEvent(offices, "green"), false);
lvs.addEventListener("mouseover", handleMenuEvent(offices, "green"), false);
lvs.addEventListener("mouseout", handleMenuEvent(offices, "green"), false);

var termine = document.getElementById("termine");
termine.addEventListener("click", handleMenuEvent(markersDates, "orange"), false);
termine.addEventListener("mouseover", handleMenuEvent(markersDates, "orange"), false);
termine.addEventListener("mouseout", handleMenuEvent(markersDates, "orange"), false);

var gruppen = document.getElementById("gruppen");
gruppen.addEventListener(
  "click",
  handleMenuEvent(markersKindergruppen, "yellow"),
  false
);
gruppen.addEventListener(
  "mouseover",
  handleMenuEvent(markersKindergruppen, "yellow"),
  false
);
gruppen.addEventListener(
  "mouseout",
  handleMenuEvent(markersKindergruppen, "yellow"),
  false
);

fetch("data/adressen.geojson") // Call the fetch function passing the url of the API as a parameter
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    offices.addData(json);
  })
  .catch(function(error) {
    console.log(error.message);
    M.toast({ html: "Fehler beim Laden der Landesverbände!" });
  });

fetch("data/termine.geojson") // Call the fetch function passing the url of the API as a parameter
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    dates.addData(json);
    markersDates.addLayer(dates);
  })
  .catch(function(error) {
    console.log(error.message);
    M.toast({ html: "Fehler beim Laden der Termine!" });
  });

fetch("data/kindergruppen.geojson") // Call the fetch function passing the url of the API as a parameter
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    kindergruppen.addData(json);
    markersKindergruppen.addLayer(kindergruppen);
  })
  .catch(function(error) {
    console.log(error.message);
    M.toast({ html: "Fehler beim Laden der Kindergruppen!" });
  });
