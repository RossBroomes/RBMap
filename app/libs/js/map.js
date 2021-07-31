 
      //var map = L.map('map').setView([51.505, -0.09], 13);
      //var map = L.map('map').fitWorld(); 
      map.locate({setView: true, maxZoom: 16});
      
        
      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=JD1HgqNKp28vYjHqWi4p',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "a href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true
      }).addTo(map);

    function onLocationFound(e) {
      var radius = e.accuracy / 2;

      L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();

      L.circle(e.latlng, radius).addTo(map);
}
      map.on('locationfound', onLocationFound);

    function onLocationError(e) {
      alert(e.message);
}

      map.on('locationerror', onLocationError);