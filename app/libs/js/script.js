
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
						$('#sunset').text(response.sys.sunset)
						var date = new Date("#sunset" * 1000)
						hours = date.getHours();
						minutes = "0" + date.getMinutes();
						seconds = "0" + date.getSeconds();
						formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
						console.log(formattedTime);
						;
						
						$('#sunrise').text(response.sys.sunrise);

						

						// let main = response.main.temp;
						// $('#temp').text(main);
						
						// let main = response.wind.deg;
						// $('#deg').text(wind)
						// $('#gust').text(wind)
						// $('#speed').text(wind)

						// let sys = response.sys.country;
						// $('#country').text(sys);

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

						
						// // Create a new JavaScript Date object based on the timestamp
						// // multiplied by 1000 so that the argument is in milliseconds, not seconds.
						// var date = new Date("sunset" * 1000);
						// // Hours part from the timestamp
						// var hours = date.getHours();
						// // Minutes part from the timestamp
						// var minutes = "0" + date.getMinutes();
						// // Seconds part from the timestamp
						// var seconds = "0" + date.getSeconds();

						// // Will display time in 10:30:23 format
						// var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

						// console.log(formattedTime);