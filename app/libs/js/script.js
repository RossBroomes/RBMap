// Populate countries dropdown

$.getJSON('app/libs/php/getCountries.php', function(json){
	$('#selCountry').html('<option>---Select country---</option>');
	$.each(json, function(key, value){
		$('#selCountry').append('<option value="' + key + '">' + value + '</option>');
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

					console.log(result);
					
					L.marker(result['data']['capital']['geometry']).addTo(map);
                    map.panTo(result['data']['capital']['geometry']);
					getCountryDataAndDisplay(result['data']['isoAlpha3']);

					let capital = result['data']['capital'];
					
					// Populate info modal
					
					let countryData = result['data'];
					countryData['capital'] = capital['name'];
					displayCountryData(countryData);

					//Populate Exchange modal
								
					
					$.getJSON('../php/getExchangeRates.php?countryCode=' + countryData.currencyCode,
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

					$.getJSON('/ITCS/project1/app/libs/php/getWeatherInfo.php?lat=' + capital['geometry']['lat'] + '&lon=' + capital['geometry']['lng'], 
					function(response){

						console.log(response.weather.feels_like);
						console.log($('#feelsLike').length);

						$('#weatherDescription').text(response.weather[0].description);
						$('#temp').text(response.weather.temp);
						$('#feelsLike').text(response.weather.feels_like);
						$('#pressure').text(response.weather.pressure);
						$('#tempMax').text(response.weather.temp_max);
						$('#tempMin').text(response.weather.temp_min);

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

					$.getJSON('http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=' + capital['name'] + '&maxRows=10&username=rbaw', 
					function(response){
						$('#title').text(response.geonames[0].title);
						$('#summary').text(response.geonames[0].summary);
						$('#url').text(response.geonames[0].wikipediaUrl);
						$('#thumbNail').attr('src', response.geonames[0].thumbnailImg);
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