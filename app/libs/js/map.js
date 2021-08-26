
let map = L.map("map").fitWorld();
map.locate({ setView: true, maxZoom: 16});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(map);


L.control.scale().addTo(map);


//var geojsonLayer = new L.GeoJSON.AJAX("countryBorders.geo.json");
// Make a call to the jason file but using the country code, whihch is in country boardersgeojson file, then add to map.

//geojsonLayer.addTo(map);
//geojsonLayer.bringToBack();

//will need popup on polygon
//marker.bindPopup("insert information pulled from php call on contry info") https://www.youtube.com/watch?v=OYjFR_CGV8o&ab_channel=MapTiler MARKER only
//geojsonlayer.bindPopup

// geo location
// if('geolocation' in navigator) {
//   console.log('geolocation available');
//   navigator.geolocation.getCurrentPosition(position => {
//       const lat = position.coords.latitude;
//       const lon = position.coords.longitude;
//       document.getElementById('latitude');
//       document.getElementById('longitude');
//      console.log(position);
// });
// } else {
//   console.log('geolocation not available')