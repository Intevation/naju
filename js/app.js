/// <reference path="typings/index.d.ts" />

document.addEventListener("DOMContentLoaded", function() {
  var tooltipped = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(tooltipped, {});
  var fixedactionbtn = document.querySelectorAll(".fixed-action-btn");
  M.FloatingActionButton.init(fixedactionbtn, {
    direction: "top"
  });
  var taptarget = document.querySelectorAll(".tap-target");
  var instances = M.TapTarget.init(taptarget, {});
  instances[0].open();
});

var groupsIcon = L.divIcon({
  html: '<i class="material-icons yellow myDivIcon">group</i>',
  iconSize: [36, 36],
  className: ""
});

var groupsIconHighlight = L.divIcon({
  html:
    '<i class="material-icons yellow darken-1 pulse myDivIconHighlight">group</i>',
  iconSize: [54, 54],
  className: ""
});

var groups = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: groupsIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(String("<b>" + feature.properties["NAJU"] + "</b>"), {
      offset: [18, 0],
      direction: "right"
    });
    layer.on("mouseover", function(e) {
      e.target.setIcon(groupsIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(groupsIcon);
    });
  }
});

var datesIcon = L.divIcon({
  html: '<i class="material-icons orange myDivIcon">date_range</i>',
  iconSize: [36, 36],
  className: ""
});

var datesIconHighlight = L.divIcon({
  html:
    '<i class="material-icons orange darken-1 pulse myDivIconHighlight">date_range</i>',
  iconSize: [54, 54],
  className: ""
});

var dates = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: datesIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(
      String("<b>" + feature.properties["Veranstaltung"] + "</b>"),
      {
        offset: [18, 0],
        direction: "right"
      }
    );
    layer.on("mouseover", function(e) {
      e.target.setIcon(datesIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(datesIcon);
    });
  }
});

var adressenIcon = L.divIcon({
  html: '<i class="material-icons green myDivIcon">stars</i>',
  iconSize: [36, 36],
  className: ""
});

var adressenIconHighlight = L.divIcon({
  html:
    '<i class="material-icons green darken-1 pulse myDivIconHighlight">stars</i>',
  iconSize: [54, 54],
  className: ""
});

var adressen = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: adressenIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(String("<b>" + feature.properties["LV"] + "</b>"), {
      offset: [18, 0],
      direction: "right"
    });
    layer.on("mouseover", function(e) {
      e.target.setIcon(adressenIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(adressenIcon);
    });
  }
});

fetch("data/adressen.geojson") // Call the fetch function passing the url of the API as a parameter
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    adressen.addData(json);
  })
  .catch(function(error) {
    console.log(error.message);
    M.toast({ html: "Fehler beim Laden der Adressen!" });
  });

fetch("data/termine.geojson") // Call the fetch function passing the url of the API as a parameter
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    dates.addData(json);
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
    groups.addData(json);
  })
  .catch(function(error) {
    console.log(error.message);
    M.toast({ html: "Fehler beim Laden der Kindergruppen!" });
  });

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

function handleClosure(typ, color) {
  return function(e) {
    console.log(e);
    // var menu = document.querySelector(
    //   "body > div.fixed-action-btn.direction-top > ul > li:nth-child(3) > a"
    // );
    var menu = e.path[1];
    console.log(menu);
    switch (e.type) {
      case "mouseover":
        if (!menu.className.includes("clicked")) {
          if (!map.hasLayer(typ)) {
            typ.addTo(map);
            menu.classList.remove("grey");
            menu.classList.add(color);
          }
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
          menu.classList.remove("grey");
          menu.classList.add(color);
        }
        break;
    }
  };
}

// Add event listener to table
var lvs = document.getElementById("lvs");
lvs.addEventListener("click", handleClosure(adressen, "green"), false);
lvs.addEventListener("mouseover", handleClosure(adressen, "green"), false);
lvs.addEventListener("mouseout", handleClosure(adressen, "green"), false);

var termine = document.getElementById("termine");
termine.addEventListener("click", handleClosure(dates, "orange"), false);
termine.addEventListener("mouseover", handleClosure(dates, "orange"), false);
termine.addEventListener("mouseout", handleClosure(dates, "orange"), false);

var gruppen = document.getElementById("gruppen");
gruppen.addEventListener("click", handleClosure(groups, "yellow"), false);
gruppen.addEventListener("mouseover", handleClosure(groups, "yellow"), false);
gruppen.addEventListener("mouseout", handleClosure(groups, "yellow"), false);

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
