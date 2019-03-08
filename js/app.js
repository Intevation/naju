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

var map = L.map("map", {
  attributionControl: false,
  center: [50.15, 10.66],
  zoom: 5,
  maxZoom: 18,
  minZoom: 5
});

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

// Add event listener to table
var lvs = document.getElementById("lvs");
lvs.addEventListener("click", handleLvs, false);
lvs.addEventListener("mouseover", handleLvs, false);
lvs.addEventListener("mouseout", handleLvs, false);
