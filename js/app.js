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

var tk25 = [
  { lat: 47.3992, lng: 12.8318 },
  { lat: 47.4991, lng: 12.8318 },
  { lat: 47.4991, lng: 12.6651 },
  { lat: 47.5991, lng: 12.6651 },
  { lat: 47.5991, lng: 12.4985 },
  { lat: 47.5991, lng: 12.3319 },
  { lat: 47.5991, lng: 12.1652 },
  { lat: 47.5991, lng: 11.9986 },
  { lat: 47.5991, lng: 11.8319 },
  { lat: 47.5991, lng: 11.6653 },
  { lat: 47.4991, lng: 11.6653 },
  { lat: 47.4991, lng: 11.4986 },
  { lat: 47.3992, lng: 11.4986 },
  { lat: 47.3991, lng: 11.332 },
  { lat: 47.3991, lng: 11.1653 },
  { lat: 47.3991, lng: 10.9987 },
  { lat: 47.3991, lng: 10.8321 },
  { lat: 47.4991, lng: 10.8321 },
  { lat: 47.4991, lng: 10.6654 },
  { lat: 47.4991, lng: 10.4988 },
  { lat: 47.3991, lng: 10.4988 },
  { lat: 47.2992, lng: 10.4988 },
  { lat: 47.2992, lng: 10.3321 },
  { lat: 47.1992, lng: 10.3321 },
  { lat: 47.1992, lng: 10.1655 },
  { lat: 47.2992, lng: 10.1655 },
  { lat: 47.2992, lng: 9.9988 },
  { lat: 47.3991, lng: 9.9988 },
  { lat: 47.4991, lng: 9.9988 },
  { lat: 47.4991, lng: 9.8322 },
  { lat: 47.4991, lng: 9.6655 },
  { lat: 47.4991, lng: 9.4989 },
  { lat: 47.5991, lng: 9.4989 },
  { lat: 47.5991, lng: 9.3323 },
  { lat: 47.5991, lng: 9.1656 },
  { lat: 47.5991, lng: 8.999 },
  { lat: 47.5991, lng: 8.8323 },
  { lat: 47.5991, lng: 8.6657 },
  { lat: 47.4991, lng: 8.6657 },
  { lat: 47.4991, lng: 8.499 },
  { lat: 47.4991, lng: 8.3324 },
  { lat: 47.4991, lng: 8.1658 },
  { lat: 47.4991, lng: 7.9991 },
  { lat: 47.4991, lng: 7.8325 },
  { lat: 47.4991, lng: 7.6658 },
  { lat: 47.4991, lng: 7.4992 },
  { lat: 47.5991, lng: 7.4992 },
  { lat: 47.6991, lng: 7.4992 },
  { lat: 47.7991, lng: 7.4992 },
  { lat: 47.8991, lng: 7.4992 },
  { lat: 47.9991, lng: 7.4992 },
  { lat: 48.0991, lng: 7.4992 },
  { lat: 48.199, lng: 7.4992 },
  { lat: 48.299, lng: 7.4992 },
  { lat: 48.299, lng: 7.6658 },
  { lat: 48.399, lng: 7.6658 },
  { lat: 48.499, lng: 7.6658 },
  { lat: 48.599, lng: 7.6658 },
  { lat: 48.699, lng: 7.6658 },
  { lat: 48.699, lng: 7.8325 },
  { lat: 48.799, lng: 7.8325 },
  { lat: 48.799, lng: 7.9991 },
  { lat: 48.899, lng: 7.9991 },
  { lat: 48.999, lng: 7.9991 },
  { lat: 48.999, lng: 7.8325 },
  { lat: 48.999, lng: 7.6658 },
  { lat: 48.999, lng: 7.4992 },
  { lat: 49.0989, lng: 7.4992 },
  { lat: 49.0989, lng: 7.3325 },
  { lat: 49.0989, lng: 7.1659 },
  { lat: 49.0989, lng: 6.9992 },
  { lat: 49.0989, lng: 6.8326 },
  { lat: 49.0989, lng: 6.666 },
  { lat: 49.1989, lng: 6.666 },
  { lat: 49.1989, lng: 6.4993 },
  { lat: 49.2989, lng: 6.4993 },
  { lat: 49.3989, lng: 6.4993 },
  { lat: 49.3989, lng: 6.3327 },
  { lat: 49.4989, lng: 6.3327 },
  { lat: 49.5989, lng: 6.3327 },
  { lat: 49.6989, lng: 6.3327 },
  { lat: 49.7989, lng: 6.3327 },
  { lat: 49.7989, lng: 6.166 },
  { lat: 49.8989, lng: 6.166 },
  { lat: 49.8989, lng: 5.9994 },
  { lat: 49.9988, lng: 5.9994 },
  { lat: 50.0988, lng: 5.9994 },
  { lat: 50.1988, lng: 5.9994 },
  { lat: 50.1988, lng: 6.166 },
  { lat: 50.2988, lng: 6.166 },
  { lat: 50.3988, lng: 6.166 },
  { lat: 50.3988, lng: 6.3327 },
  { lat: 50.4988, lng: 6.3327 },
  { lat: 50.4988, lng: 6.166 },
  { lat: 50.5988, lng: 6.166 },
  { lat: 50.6988, lng: 6.166 },
  { lat: 50.6988, lng: 5.9994 },
  { lat: 50.7988, lng: 5.9994 },
  { lat: 50.8987, lng: 5.9994 },
  { lat: 50.8987, lng: 5.8327 },
  { lat: 50.9987, lng: 5.8327 },
  { lat: 51.0987, lng: 5.8327 },
  { lat: 51.0987, lng: 5.9994 },
  { lat: 51.1987, lng: 5.9994 },
  { lat: 51.2987, lng: 5.9994 },
  { lat: 51.2987, lng: 6.166 },
  { lat: 51.3987, lng: 6.166 },
  { lat: 51.4987, lng: 6.166 },
  { lat: 51.4987, lng: 5.9994 },
  { lat: 51.5987, lng: 5.9994 },
  { lat: 51.6987, lng: 5.9994 },
  { lat: 51.6987, lng: 5.8327 },
  { lat: 51.7986, lng: 5.8327 },
  { lat: 51.8986, lng: 5.8327 },
  { lat: 51.8986, lng: 5.9994 },
  { lat: 51.8986, lng: 6.166 },
  { lat: 51.8986, lng: 6.3327 },
  { lat: 51.8986, lng: 6.4993 },
  { lat: 51.8986, lng: 6.6659 },
  { lat: 51.9986, lng: 6.6659 },
  { lat: 52.0986, lng: 6.6659 },
  { lat: 52.0986, lng: 6.8326 },
  { lat: 52.1986, lng: 6.8326 },
  { lat: 52.1986, lng: 6.9992 },
  { lat: 52.2986, lng: 6.9992 },
  { lat: 52.3986, lng: 6.9992 },
  { lat: 52.3986, lng: 6.8326 },
  { lat: 52.3986, lng: 6.6659 },
  { lat: 52.4986, lng: 6.6659 },
  { lat: 52.5986, lng: 6.6659 },
  { lat: 52.6985, lng: 6.6659 },
  { lat: 52.6985, lng: 6.8326 },
  { lat: 52.6985, lng: 6.9992 },
  { lat: 52.7985, lng: 6.9992 },
  { lat: 52.8985, lng: 6.9992 },
  { lat: 52.8985, lng: 7.1659 },
  { lat: 52.9985, lng: 7.1659 },
  { lat: 53.0985, lng: 7.1659 },
  { lat: 53.1985, lng: 7.1659 },
  { lat: 53.2985, lng: 7.1659 },
  { lat: 53.2985, lng: 6.9992 },
  { lat: 53.3985, lng: 6.9992 },
  { lat: 53.4985, lng: 6.9992 },
  { lat: 53.4985, lng: 6.8326 },
  { lat: 53.4985, lng: 6.6659 },
  { lat: 53.5984, lng: 6.6659 },
  { lat: 53.6984, lng: 6.6659 },
  { lat: 53.6984, lng: 6.8326 },
  { lat: 53.6984, lng: 6.9992 },
  { lat: 53.7984, lng: 6.9992 },
  { lat: 53.7984, lng: 7.1659 },
  { lat: 53.7984, lng: 7.3325 },
  { lat: 53.7984, lng: 7.4991 },
  { lat: 53.7984, lng: 7.6658 },
  { lat: 53.7984, lng: 7.8324 },
  { lat: 53.7984, lng: 7.9991 },
  { lat: 53.7984, lng: 8.1657 },
  { lat: 53.6984, lng: 8.1657 },
  { lat: 53.6984, lng: 8.3324 },
  { lat: 53.7984, lng: 8.3324 },
  { lat: 53.8984, lng: 8.3324 },
  { lat: 53.9984, lng: 8.3324 },
  { lat: 53.9984, lng: 8.499 },
  { lat: 53.9984, lng: 8.6656 },
  { lat: 54.0984, lng: 8.6656 },
  { lat: 54.1984, lng: 8.6656 },
  { lat: 54.1984, lng: 8.499 },
  { lat: 54.2984, lng: 8.499 },
  { lat: 54.3984, lng: 8.499 },
  { lat: 54.3984, lng: 8.3323 },
  { lat: 54.4983, lng: 8.3323 },
  { lat: 54.5983, lng: 8.3323 },
  { lat: 54.5983, lng: 8.1657 },
  { lat: 54.6983, lng: 8.1657 },
  { lat: 54.7983, lng: 8.1657 },
  { lat: 54.8983, lng: 8.1657 },
  { lat: 54.9983, lng: 8.1657 },
  { lat: 54.9983, lng: 8.3323 },
  { lat: 55.0983, lng: 8.3323 },
  { lat: 55.0983, lng: 8.499 },
  { lat: 54.9983, lng: 8.499 },
  { lat: 54.9983, lng: 8.6656 },
  { lat: 54.9983, lng: 8.8323 },
  { lat: 54.9983, lng: 8.9989 },
  { lat: 54.8983, lng: 8.9989 },
  { lat: 54.8983, lng: 9.1655 },
  { lat: 54.8983, lng: 9.3322 },
  { lat: 54.8983, lng: 9.4988 },
  { lat: 54.8983, lng: 9.6655 },
  { lat: 54.8983, lng: 9.8321 },
  { lat: 54.7983, lng: 9.8321 },
  { lat: 54.7983, lng: 9.9987 },
  { lat: 54.6983, lng: 9.9987 },
  { lat: 54.6983, lng: 10.1654 },
  { lat: 54.5983, lng: 10.1654 },
  { lat: 54.4984, lng: 10.1654 },
  { lat: 54.4984, lng: 10.332 },
  { lat: 54.4984, lng: 10.4987 },
  { lat: 54.3984, lng: 10.4987 },
  { lat: 54.3984, lng: 10.6653 },
  { lat: 54.3984, lng: 10.832 },
  { lat: 54.3984, lng: 10.9986 },
  { lat: 54.4984, lng: 10.9986 },
  { lat: 54.5984, lng: 10.9986 },
  { lat: 54.5984, lng: 11.1652 },
  { lat: 54.5984, lng: 11.3319 },
  { lat: 54.4984, lng: 11.3319 },
  { lat: 54.3984, lng: 11.3319 },
  { lat: 54.3984, lng: 11.1652 },
  { lat: 54.2984, lng: 11.1652 },
  { lat: 54.1984, lng: 11.1652 },
  { lat: 54.0984, lng: 11.1652 },
  { lat: 54.0984, lng: 11.3319 },
  { lat: 54.0984, lng: 11.4985 },
  { lat: 54.1984, lng: 11.4985 },
  { lat: 54.1984, lng: 11.6652 },
  { lat: 54.1984, lng: 11.8318 },
  { lat: 54.1984, lng: 11.9984 },
  { lat: 54.1984, lng: 12.1651 },
  { lat: 54.2984, lng: 12.1651 },
  { lat: 54.2984, lng: 12.3317 },
  { lat: 54.3984, lng: 12.3317 },
  { lat: 54.4984, lng: 12.3317 },
  { lat: 54.4984, lng: 12.4984 },
  { lat: 54.4984, lng: 12.665 },
  { lat: 54.4984, lng: 12.8316 },
  { lat: 54.4984, lng: 12.9983 },
  { lat: 54.5984, lng: 12.9983 },
  { lat: 54.5984, lng: 13.1649 },
  { lat: 54.6984, lng: 13.1649 },
  { lat: 54.6984, lng: 13.3316 },
  { lat: 54.6984, lng: 13.4982 },
  { lat: 54.5984, lng: 13.4982 },
  { lat: 54.5984, lng: 13.6648 },
  { lat: 54.4984, lng: 13.6648 },
  { lat: 54.3984, lng: 13.6648 },
  { lat: 54.3984, lng: 13.8315 },
  { lat: 54.2984, lng: 13.8315 },
  { lat: 54.2984, lng: 13.9981 },
  { lat: 54.1984, lng: 13.9981 },
  { lat: 54.0984, lng: 13.9981 },
  { lat: 54.0984, lng: 14.1648 },
  { lat: 53.9984, lng: 14.1648 },
  { lat: 53.9984, lng: 14.3314 },
  { lat: 53.8985, lng: 14.3314 },
  { lat: 53.7985, lng: 14.3314 },
  { lat: 53.6985, lng: 14.3314 },
  { lat: 53.5985, lng: 14.3314 },
  { lat: 53.4985, lng: 14.3314 },
  { lat: 53.4985, lng: 14.4981 },
  { lat: 53.3985, lng: 14.4981 },
  { lat: 53.2985, lng: 14.4981 },
  { lat: 53.1985, lng: 14.4981 },
  { lat: 53.0985, lng: 14.4981 },
  { lat: 52.9986, lng: 14.4981 },
  { lat: 52.9986, lng: 14.3314 },
  { lat: 52.8986, lng: 14.3314 },
  { lat: 52.7986, lng: 14.3315 },
  { lat: 52.7986, lng: 14.4981 },
  { lat: 52.6986, lng: 14.4981 },
  { lat: 52.6986, lng: 14.6647 },
  { lat: 52.5986, lng: 14.6647 },
  { lat: 52.4986, lng: 14.6647 },
  { lat: 52.3986, lng: 14.6647 },
  { lat: 52.2986, lng: 14.6647 },
  { lat: 52.2986, lng: 14.8314 },
  { lat: 52.1987, lng: 14.8314 },
  { lat: 52.0987, lng: 14.8314 },
  { lat: 51.9987, lng: 14.8314 },
  { lat: 51.8987, lng: 14.8314 },
  { lat: 51.8987, lng: 14.6648 },
  { lat: 51.7987, lng: 14.6648 },
  { lat: 51.7987, lng: 14.8314 },
  { lat: 51.6987, lng: 14.8314 },
  { lat: 51.5987, lng: 14.8314 },
  { lat: 51.4987, lng: 14.8314 },
  { lat: 51.4987, lng: 14.9981 },
  { lat: 51.3987, lng: 14.9981 },
  { lat: 51.3987, lng: 15.1647 },
  { lat: 51.2988, lng: 15.1647 },
  { lat: 51.1988, lng: 15.1647 },
  { lat: 51.0988, lng: 15.1647 },
  { lat: 51.0988, lng: 14.9981 },
  { lat: 50.9988, lng: 14.9981 },
  { lat: 50.8988, lng: 14.9981 },
  { lat: 50.8988, lng: 14.8314 },
  { lat: 50.7988, lng: 14.8314 },
  { lat: 50.7988, lng: 14.6648 },
  { lat: 50.7988, lng: 14.4981 },
  { lat: 50.7988, lng: 14.3315 },
  { lat: 50.7988, lng: 14.1649 },
  { lat: 50.7988, lng: 13.9982 },
  { lat: 50.6988, lng: 13.9982 },
  { lat: 50.6988, lng: 13.8316 },
  { lat: 50.6988, lng: 13.6649 },
  { lat: 50.5988, lng: 13.6649 },
  { lat: 50.5988, lng: 13.4983 },
  { lat: 50.5988, lng: 13.3317 },
  { lat: 50.4988, lng: 13.3317 },
  { lat: 50.4988, lng: 13.165 },
  { lat: 50.3988, lng: 13.165 },
  { lat: 50.3988, lng: 12.9984 },
  { lat: 50.3988, lng: 12.8317 },
  { lat: 50.3988, lng: 12.6651 },
  { lat: 50.2988, lng: 12.6651 },
  { lat: 50.2988, lng: 12.4984 },
  { lat: 50.1988, lng: 12.4984 },
  { lat: 50.1988, lng: 12.3318 },
  { lat: 50.0989, lng: 12.3318 },
  { lat: 50.0989, lng: 12.4984 },
  { lat: 49.9989, lng: 12.4985 },
  { lat: 49.9989, lng: 12.6651 },
  { lat: 49.8989, lng: 12.6651 },
  { lat: 49.7989, lng: 12.6651 },
  { lat: 49.7989, lng: 12.4985 },
  { lat: 49.6989, lng: 12.4985 },
  { lat: 49.6989, lng: 12.6651 },
  { lat: 49.5989, lng: 12.6651 },
  { lat: 49.4989, lng: 12.6651 },
  { lat: 49.4989, lng: 12.8317 },
  { lat: 49.3989, lng: 12.8317 },
  { lat: 49.3989, lng: 12.9984 },
  { lat: 49.299, lng: 12.9984 },
  { lat: 49.299, lng: 13.165 },
  { lat: 49.199, lng: 13.165 },
  { lat: 49.199, lng: 13.3317 },
  { lat: 49.099, lng: 13.3317 },
  { lat: 49.099, lng: 13.4983 },
  { lat: 48.999, lng: 13.4983 },
  { lat: 48.999, lng: 13.665 },
  { lat: 48.899, lng: 13.665 },
  { lat: 48.899, lng: 13.8316 },
  { lat: 48.799, lng: 13.8316 },
  { lat: 48.699, lng: 13.8316 },
  { lat: 48.599, lng: 13.8316 },
  { lat: 48.499, lng: 13.8316 },
  { lat: 48.499, lng: 13.665 },
  { lat: 48.499, lng: 13.4983 },
  { lat: 48.3991, lng: 13.4983 },
  { lat: 48.2991, lng: 13.4983 },
  { lat: 48.2991, lng: 13.3317 },
  { lat: 48.2991, lng: 13.1651 },
  { lat: 48.1991, lng: 13.1651 },
  { lat: 48.1991, lng: 12.9984 },
  { lat: 48.1991, lng: 12.8318 },
  { lat: 48.0991, lng: 12.8318 },
  { lat: 47.9991, lng: 12.8318 },
  { lat: 47.9991, lng: 12.9984 },
  { lat: 47.8991, lng: 12.9984 },
  { lat: 47.7991, lng: 12.9984 },
  { lat: 47.6991, lng: 12.9984 },
  { lat: 47.6991, lng: 13.1651 },
  { lat: 47.5991, lng: 13.1651 },
  { lat: 47.4992, lng: 13.1651 },
  { lat: 47.3992, lng: 13.1651 },
  { lat: 47.3992, lng: 12.9984 },
  { lat: 47.3992, lng: 12.8318 },
  { lat: 54.0984, lng: 7.8324 },
  { lat: 54.1984, lng: 7.8324 },
  { lat: 54.1984, lng: 7.9991 },
  { lat: 54.0984, lng: 7.9991 },
  { lat: 54.0984, lng: 7.8324 }
];
L.mask(tk25).addTo(map);

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
let tmplStorchenkoffer = getTemplate("tmpl/storchenkoffer.html");

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
var storchenkofferIcon = L.icon({
  iconUrl: "icons/storchenkoffer.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37]
});

var storchenkofferIconHighlight = L.icon({
  iconUrl: "icons/storchenkoffer.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37]
});

var storchenkoffer = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: storchenkofferIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(String("<b>" + feature.properties["name"] + "</b>"), {
      offset: [32, 18],
      direction: "right"
    });
    layer.on("mouseover", function(e) {
      e.target.setIcon(storchenkofferIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(storchenkofferIcon);
    });
    layer.on("click", function(e) {
      renderPopUP(tmplStorchenkoffer, e.sourceTarget.feature);
      map.setView(e.latlng, 13);
    });
  }
});

var kindergruppenIcon = L.icon({
  iconUrl: "icons/gruppe.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37]
});

var kindergruppenIconHighlight = L.icon({
  iconUrl: "icons/gruppe.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37]
});

var kindergruppen = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: kindergruppenIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(
      String("<b>" + feature.properties["gruppenname"] + "</b>"),
      {
        offset: [32, 18],
        direction: "right"
      }
    );
    layer.on("mouseover", function(e) {
      e.target.setIcon(kindergruppenIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(kindergruppenIcon);
    });
    layer.on("click", function(e) {
      renderPopUP(tmplGruppen, e.sourceTarget.feature);
      map.setView(e.latlng, 13);
    });
  }
});

var markersKindergruppen = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 25,
  iconCreateFunction: function(cluster) {
    return L.divIcon({
      html:
        '<div class="divIconGruppe"></div><div class="myMarkerCluster">' +
        cluster.getChildCount() +
        "</div>",
      iconSize: [32, 37],
      className: ""
    });
  }
});

var dateIcon = L.icon({
  iconUrl: "icons/termine.png",
  iconSize: [32, 37],
  iconAnchor: [16, 37]
});

var dateIconHighlight = L.icon({
  iconUrl: "icons/termine.png"
});

var dates = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: dateIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(String("<b>" + feature.properties["thema"] + "</b>"), {
      offset: [32, 18],
      direction: "right"
    });

    layer.on("mouseover", function(e) {
      //map.panTo(e.latlng);
      e.target.setIcon(dateIconHighlight);
    });
    layer.on("mouseout", function(e) {
      e.target.setIcon(dateIcon);
    });
    layer.on("click", function(e) {
      renderPopUP(tmplTermine, e.sourceTarget.feature);
      map.setView(e.latlng, 13);
    });
  }
});

var markersDates = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 25,
  spiderLegPolylineOptions: { weight: 1.5, color: "#222", opacity: 0.5 },
  iconCreateFunction: function(cluster) {
    return L.divIcon({
      html:
        '<div class="divIconTermin"></div><div class="myMarkerCluster">' +
        cluster.getChildCount() +
        "</div>",
      iconSize: [32, 37],
      iconAnchor: [16, 37],
      className: ""
    });
  }
});

markersDates.on("spiderfied", event => {
  event.cluster.setOpacity(0);
});

markersDates.on("unspiderfied", event => {
  event.cluster.setOpacity(1);
});

markersKindergruppen.on("spiderfied", event => {
  event.cluster.setOpacity(0);
});

markersKindergruppen.on("unspiderfied", event => {
  event.cluster.setOpacity(1);
});

var officeIcon = L.icon({
  iconUrl: "icons/geschaeftsstellen.png"
});

var officeIconHighlight = L.icon({
  iconUrl: "icons/geschaeftsstellen.png"
});

var offices = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {
      icon: officeIcon,
      riseOnHover: true
    });
  },
  onEachFeature: function(feature, layer) {
    layer.bindTooltip(
      String("<b>" + feature.properties["landesverband"] + "</b>"),
      {
        offset: [32, 18],
        direction: "right"
      }
    );
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
          }
        }
        break;
      case "mouseout":
        if (!menu.className.includes("clicked")) {
          if (map.hasLayer(typ)) {
            map.removeLayer(typ);
          }
        }
        break;
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
var sk = document.getElementById("sk");
sk.addEventListener("click", handleMenuEvent(storchenkoffer, "red"), false);
sk.addEventListener("mouseover", handleMenuEvent(storchenkoffer, "red"), false);
sk.addEventListener("mouseout", handleMenuEvent(storchenkoffer, "red"), false);

var lvs = document.getElementById("lvs");
lvs.addEventListener("click", handleMenuEvent(offices, "green"), false);
lvs.addEventListener("mouseover", handleMenuEvent(offices, "green"), false);
lvs.addEventListener("mouseout", handleMenuEvent(offices, "green"), false);

var termine = document.getElementById("termine");
termine.addEventListener(
  "click",
  handleMenuEvent(markersDates, "orange"),
  false
);
termine.addEventListener(
  "mouseover",
  handleMenuEvent(markersDates, "orange"),
  false
);
termine.addEventListener(
  "mouseout",
  handleMenuEvent(markersDates, "orange"),
  false
);

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

fetch("https://mapserver.nabu.de/fcgi-bin/najukoffer/storchenkoffer") // Call the fetch function passing the url of the API as a parameter
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    storchenkoffer.addData(json);
  })
  .catch(function(error) {
    console.log(error.message);
    M.toast({ html: "Fehler beim Laden der Storchenkoffer!" });
  });

fetch("https://mapserver.nabu.de/fcgi-bin/najukoffer/landesverbaende") // Call the fetch function passing the url of the API as a parameter
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

fetch("https://mapserver.nabu.de/fcgi-bin/najukoffer/next_6month") // Call the fetch function passing the url of the API as a parameter
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

fetch("https://mapserver.nabu.de/fcgi-bin/najukoffer/kindergruppen") // Call the fetch function passing the url of the API as a parameter
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
