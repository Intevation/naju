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

var groups = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({
        html: '<i class="material-icons yellow groups myDivIcon">group</i>',
        className: "myDivIcon"
      })
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(String("<b>" + feature.properties["NAJU"] + "</b>"), {
      offset: [30, 10],
      direction: "right"
    });
  }
});

var dates = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({
        html: '<i class="material-icons orange myDivIcon">date_range</i>',
        className: "myDivIcon"
      })
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(String("<b>" + feature.properties["Veranstaltung"] + "</b>"), {
      offset: [30, 10],
      direction: "right"
    });
  }
});

var adressen = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({
        html: '<i class="material-icons green myDivIcon">stars</i>',
        className: "myDivIcon"
      })
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(String("<b>" + feature.properties["LV"] + "</b>"), {
      offset: [30, 10],
      direction: "right"
    });
  }
});

adressen.on("click",function(){console.log("click")});

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
  maxBounds: [[ 42, -46], [ 58, 67]],
  fadeAnimation: false,
  zoomControl: false
});

L.control.zoom({zoomInTitle:"hineinzoomen",zoomOutTitle:"hinauszoomen"}).addTo(map)

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoiYmpvZXJuc2NoaWxiZXJnIiwiYSI6InRzOVZKeWsifQ.y20mr9o3MolFOUdTQekhUA"
  }
).addTo(map);

function handleLvs(e) {
  console.log(e);
  var menu = document.querySelector(
    "body > div.fixed-action-btn.direction-top > ul > li:nth-child(2) > a"
  );
  switch (e.type) {
    case "mouseover":
      if (!menu.className.includes("clicked")) {
        if (!map.hasLayer(adressen)) {
          adressen.addTo(map);
          menu.classList.remove("grey");
          menu.classList.add("green");
        }
      }
      break;
    case "mouseout":
      if (!menu.className.includes("clicked")) {
        if (map.hasLayer(adressen)) {
          map.removeLayer(adressen);
          menu.classList.remove("green");
          menu.classList.add("grey");
        }
      }
      break;
    case "click":
      menu.classList.toggle("clicked");
      if (!menu.className.includes("clicked")) {
        map.removeLayer(adressen);
        menu.classList.remove("green");
        menu.classList.add("grey");
      } else {
        adressen.addTo(map);
        menu.classList.remove("grey");
        menu.classList.add("green");
      }
      break;
  }
}

function handleDates(e) {
  console.log(e);
  var menu = document.querySelector(
    "body > div.fixed-action-btn.direction-top > ul > li:nth-child(4) > a"
  );
  console.log(menu)
  switch (e.type) {
    case "mouseover":
      if (!menu.className.includes("clicked")) {
        if (!map.hasLayer(dates)) {
          dates.addTo(map);
          menu.classList.remove("grey");
          menu.classList.add("orange");
        }
      }
      break;
    case "mouseout":
      if (!menu.className.includes("clicked")) {
        if (map.hasLayer(dates)) {
          map.removeLayer(dates);
          menu.classList.remove("orange");
          menu.classList.add("grey");
        }
      }
      break;
    case "click":
      menu.classList.toggle("clicked");
      if (!menu.className.includes("clicked")) {
        map.removeLayer(dates);
        menu.classList.remove("orange");
        menu.classList.add("grey");
      } else {
        dates.addTo(map);
        menu.classList.remove("grey");
        menu.classList.add("orange");
      }
      break;
  }
}

function handleGroups(e) {
  console.log(e);
  var menu = document.querySelector(
    "body > div.fixed-action-btn.direction-top > ul > li:nth-child(3) > a"
  );
  console.log(menu)
  switch (e.type) {
    case "mouseover":
      if (!menu.className.includes("clicked")) {
        if (!map.hasLayer(groups)) {
          groups.addTo(map);
          menu.classList.remove("grey");
          menu.classList.add("yellow");
        }
      }
      break;
    case "mouseout":
      if (!menu.className.includes("clicked")) {
        if (map.hasLayer(groups)) {
          map.removeLayer(groups);
          menu.classList.remove("yellow");
          menu.classList.add("grey");
        }
      }
      break;
    case "click":
      menu.classList.toggle("clicked");
      if (!menu.className.includes("clicked")) {
        map.removeLayer(groups);
        menu.classList.remove("yellow");
        menu.classList.add("grey");
      } else {
        groups.addTo(map);
        menu.classList.remove("grey");
        menu.classList.add("yellow");
      }
      break;
  }
}

// Add event listener to table
var lvs = document.getElementById("lvs");
lvs.addEventListener("click", handleLvs, false);
lvs.addEventListener("mouseover", handleLvs, false);
lvs.addEventListener("mouseout", handleLvs, false);

var termine = document.getElementById("termine");
termine.addEventListener("click", handleDates, false);
termine.addEventListener("mouseover", handleDates, false);
termine.addEventListener("mouseout", handleDates, false);

var gruppen = document.getElementById("gruppen");
gruppen.addEventListener("click", handleGroups, false);
gruppen.addEventListener("mouseover", handleGroups, false);
gruppen.addEventListener("mouseout", handleGroups, false);

function updateUrl(){
  var center=map.getCenter();
  var lat=center.lat.toFixed(4);
  var lon=center.lng.toFixed(4);
  var zoom=map.getZoom();
  var view = "map="+zoom+"/"+lat + "/"+lon;
  document.location.hash=view;
}

map.on("move",updateUrl);
map.on("zoom",updateUrl);


function setViewFromUrl(){
  var hash=document.location.hash;
  if (hash.length!==0){
    var splitHash=hash.split("/");
    var zoom=splitHash[0].substring(5);
    var lat=splitHash[1];
    var lon=splitHash[2];
    map.setView([lat,lon],zoom);
  }
}

setViewFromUrl();