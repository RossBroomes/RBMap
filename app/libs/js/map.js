
let map = L.map("map").fitWorld();
map.locate({ setView: true, maxZoom: 12});

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=JD1HgqNKp28vYjHqWi4p', {
   
    attribution: "a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    
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