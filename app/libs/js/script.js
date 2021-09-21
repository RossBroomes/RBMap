// Populate countries dropdown

$.getJSON('app/libs/php/getCountries.php', function(json){
	$('#selCountry').html('<option>---Select country---</option>');
	$.each(json, function(key, value){
		$('#selCountry').append('<option value="' + key + '">' + value + '</option>');
	});

	var options = $('#selCountry option');
	var arr = options.map(function(_, o) {
		return { t: $(o).text(), v: o.value };
	}).get();

	arr.sort(function(o1, o2) {
		return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0;
	});
	options.each(function(i, o) {
		o.value = arr[i].v;
		$(o).text(arr[i].t);
	});

});


$('#selCountry').change(function() {
		$.ajax({
			url: "app/libs/php/getCountryInfo.php",
			type: 'POST',
			dataType: 'json',
			data: {
			country: $('#selCountry').val(),
			},success: function(result) {

				
				if (result.status.name == "ok") {

					$('.btn-modal').show();
					
					L.marker(result['data']['capital']['geometry']).addTo(map);
                    map.panTo(result['data']['capital']['geometry']);
					getCountryDataAndDisplay(result['data']['isoAlpha3']);

					let capital = result['data']['capital'];
					
					// Populate info modal
					
					let countryData = result['data'];
					countryData['capital'] = capital['name'];
					displayCountryData(countryData);

					//Populate Exchange modal
								
					
					$.getJSON('app/libs/php/getExchangeRates.php?currencyCode=' + countryData.currencyCode,
					function(response){
						
						$("#txtBase").text(response.base);
						$('#txtExchangeRate').text(response.rates[countryData.currencyCode]);
						

						$('#timeStamp').text(date = new Date(response.timestamp * 1000));
						hours = date.getHours();
						minutes = "0" + date.getMinutes();
						seconds = "0" + date.getSeconds();
						formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
						
					});
					
					// $.ajax({
					// 	url: '../php/getExchangeRates.php',
					// 	type: 'GET',
					// 	dataType: 'json',
					// 	data: {
					// 		countryCode: countryData.currencyCode,
					// 	},success: function(response) {
					// 		$("#txtBase").text(response.base);
					// 		$('#txtExchangeRate').text(response.rates[countryData.currencyCode]);
							

					// 		$('#timeStamp').text(date = new Date(response.timestamp * 1000));
					// 		hours = date.getHours();
					// 		minutes = "0" + date.getMinutes();
					// 		seconds = "0" + date.getSeconds();
					// 		formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
					// 	}
					// });

					// Populate weather modal

					$.getJSON('app/libs/php/getWeatherInfo.php?lat=' + capital['geometry']['lat'] + '&lon=' + capital['geometry']['lng'], 
					function(response){

						$('#weatherDescription').text(response.weather[0].description);
						$('#temp').text(response.main.temp);
						$('#feelsLike').text(response.main.feels_like);
						$('#pressure').text(response.main.pressure);
						$('#tempMax').text(response.main.temp_max);
						$('#tempMin').text(response.main.temp_min);

						$('#deg').text(response.wind.deg);
						$('#gust').text(response.wind.gust);
						$('#speed').text(response.wind.speed);
						
						$('#country').text(response.sys.country);
						
						//converting the time format
						$('#sunset').text(date = new Date(response.sys.sunset * 1000));
						hours = date.getHours();
						minutes = "0" + date.getMinutes();
						seconds = "0" + date.getSeconds();
						formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
						
						
						$('#sunrise').text(date = new Date(response.sys.sunrise * 1000));
						hours = date.getHours();
						minutes = "0" + date.getMinutes();
						seconds = "0" + date.getSeconds();
						formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
						

					}, function(error){
						
					});
					
					// populate Wiki

					$.getJSON('app/libs/php/getWikiInfo.php?q=' + capital['name'],
					function(response){
						$('#title').text(response.wikipediaSearch.geonames[0].title);
						$('#summary').text(response.wikipediaSearch.geonames[0].summary);
						$('#url').text(response.wikipediaSearch.geonames[0].wikipediaUrl);
						$('#thumbNail').attr('src', response.wikipediaSearch.geonames[0].thumbnailImg);
					});
				
				}
					
			},
			error: function(jqXHR, textStatus, errorThrown) {
				
			
			}
		}); 
	
	});


// populate Marks

// $.getJSON('https://api.covid19api.com/all', 
// 	function(response){
// 		$('#').text(response.Lat);
// 		$('#').text(response.Lon);
// 		$('#').text(response.confirmed);
// 		$('#').text(response.Deaths);
// 		$('#').text(response.Date = new Date(response.sys.sunset * 1000));
// 			hours = date.getHours();
// 			minutes = "0" + date.getMinutes();
// 			seconds = "0" + date.getSeconds();
// 			formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
// });


// $.getJSON('app/libs/php/getEarthquakes.php', 
// 	function(response){
// 		console.log(response);

// 		//let map = L.map("map");
// 		let map = window.maps.leafletList[0].map;
		
// 		var markers = L.markerClusterGroup();

// 		for (var i = 0; i < response.features.length; i++) {
// 			var a = response.features[i];
// 			var title = a.properties.place;
// 			var marker = L.marker(new L.LatLng(a.geometery.coordinates[0], a.geometery.coordinates[1]), {
// 				title: title
// 			});
// 			marker.bindPopup(title);
// 			markers.addLayer(marker);
// 		}

// 		map.addLayer(markers);

// 		// $('#').text(response.Lat);
// 		// $('#').text(response.Lon);
// 		// $('#').text(response.confirmed);
// 		// $('#').text(response.Deaths);
// 		// $('#').text(response.Date = new Date(response.sys.sunset * 1000));
// });