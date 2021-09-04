
let map = L.map("map").fitWorld();
map.locate({ setView: true, maxZoom: 22});

L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=b352388057e24935bb02090ec580105e', {
	maxZoom: 17,
	attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	
}).addTo(map);


L.control.scale().addTo(map);

var addressPoints = [
  [-37.8210922667, 175.2209316333, "2"],
  [-37.8210819833, 175.2213903167, "3"],
  [-37.8210881833, 175.2215004833, "3A"],
  [-37.8211946833, 175.2213655333, "1"],
  [-37.8209458667, 175.2214051333, "5"],
  [-37.8208292333, 175.2214374833, "7"],
  [-37.8325816, 175.2238798667, "537"],
  [-37.8315855167, 175.2279767, "454"],
  [-37.8096336833, 175.2223743833, "176"],
  [-37.80970685, 175.2221815833, "178"],
  [-37.8102146667, 175.2211562833, "190"],
  [-37.8088037167, 175.2242227, "156"],
  [-37.8112330167, 175.2193425667, "210"],
  [-37.8116368667, 175.2193005167, "212"],
  [-37.80812645, 175.2255449333, "146"],
  [-37.8080231333, 175.2286383167, "125"],
  [-37.8089538667, 175.2222222333, "174"],
  [-37.8080905833, 175.2275400667, "129"]
]


var markers = L.markerClusterGroup();

for (var i = 0; i < addressPoints.length; i++) {
  var a = addressPoints[i];
  var title = a[2];
  var marker = L.marker(new L.LatLng(a[0], a[1]), {
    title: title
  });
  marker.bindPopup(title);
  markers.addLayer(marker);
}

map.addLayer(markers);

	
// Map country Search Open Cage
    var options = {
    key: '4d2bcc7bf5bc4d5297ca437a245994b7',
    limit: 5,
	position: 'topright',
    placeholder: 'Search...', // the text in the empty search box
    errorMessage: 'Nothing found.',
    showResultIcons: false,
    collapsed: true,
    expand: 'click',
	addResultToMap: true, // if a map marker should be added after the user clicks a result
    onResultClick: undefined, // callback with result as first parameter
	resultExtension: {
        geohash: "annotations.geohash",
        what3words: "annotations.what3words",
        addressComponents: "components"
    } //if additional attributes from OpenCage search API should be added to the result
	};    
	var control = L.Control.openCageSearch(options).addTo(map);

    // };
    // var geocoder = L.Control.OpenCageSearch.geocoder(options);
    // var control = L.Control.openCageSearch(options).addTo(map);
    // var marker;

    // map.on('click', function(e) {
    //   var query = e.latlng.lat.toString() + ',' + e.latlng.lng.toString();
    //   geocoder.geocode(query, function(results) {
    //     var r = results[0];
    //     if (r) {
    //       if (marker) {
    //         marker.setLatLng(r.center).setPopupContent(r.name).openPopup();
    //       } else {
    //         marker = L.marker(r.center).bindPopup(r.name).addTo(map).openPopup();
    //       }
    //     }
    //   })
    // })