(function(factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('leaflet'));
    } else {
        window.providers = factory(window.L);
    }
})(function(L) {
    var providers = {};

    providers['OpenStreetMap_Mapnik'] = {
        title: 'osm',
        icon: './app/vendors/css/Leafletlayers/Images/openstreetmap_mapnik.png',
        layer: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    };

    providers['OpenStreetMap_BlackAndWhite'] = {
        title: 'osm bw',
        icon: './app/vendors/css/Leafletlayers/Images/openstreetmap_blackandwhite.png?appid=0a97b286ef39e6c7365556f44496b631',
        layer: L.tileLayer('http://{s}.tile.openweathermap.org/map/TA2/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>'
        })
    };

    providers['OpenStreetMap_DE'] = {
        title: 'osm de',
        icon: './app/vendors/css/Leafletlayers/Images/openstreetmap_de.png',
        layer: L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    }

    providers['Stamen_Toner'] = {
        title: 'toner',
        icon: './app/vendors/css/Leafletlayers/Images/stamen_toner.png',
        layer: L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20,
            ext: 'png'
        })
    };

    providers['Esri_OceanBasemap'] = {
        title: 'esri ocean',
        icon: './app/vendors/css/Leafletlayers/Images/esri_oceanbasemap.png',
        layer: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
            maxZoom: 13
        })
    };

    return providers;
});