
$('#selCountry').change(function() {
		$.ajax({
			url: "app/libs/php/getCountryInfo.php",
			type: 'POST',
			dataType: 'json',
			data: {
			country: $('#selCountry').val(),
			},success: function(result) {

				
				if (result.status.name == "ok") {
					
					L.marker(result['data']['capital']['geometry']).addTo(map);
                    map.panTo(result['data']['capital']['geometry']);
					getCountryDataAndDisplay(result['data']['isoAlpha3']);

					let capital = result['data']['capital'];
					
					// Populate info modal
					
					let countryData = result['data'];
					countryData['capital'] = capital['name'];
					displayCountryData(countryData);

					//Populate Exchange modal
								
					$.getJSON('https://openexchangerates.org/api/latest.json?app_id=ee7c590fa710406b9327bb70d67037dc&symbols=' + countryData.currencyCode,
					function(response){
						
						$("#txtBase").text(response.base);
						$('#txtExchangeRate').text(response.rates[countryData.currencyCode]);
						

						$('#timeStamp').text(date = new Date(response.timestamp * 1000));
						hours = date.getHours();
						minutes = "0" + date.getMinutes();
						seconds = "0" + date.getSeconds();
						formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
						
					});
					
					
					// Populate weather modal

					$.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + capital['geometry']['lat'] + '&lon=' + capital['geometry']['lng'] + '&units=metric' + '&appid=0a97b286ef39e6c7365556f44496b631', 
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

					$.getJSON('http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=' + capital['name'] + '&maxRows=10&username=rbaw', function(response){
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

						
					