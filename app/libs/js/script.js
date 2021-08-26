// $('#selCountry').click(function(e){
//     e.preventDefault();
//     let country = $(this).data('iso');

//     $.getJSON('./app/libs/php/getCountryInfo.php', 'country=' + country, function(d) {
//         let capital = d['data']['capital'];
//         var marker = L.marker(capital.geometry).addTo(map);
//         map.panTo(capital.geometry);
//         console.log(capital);
//     });


// });

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

					$.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + capital['geometry']['lat'] + '&lon=' + capital['geometry']['lng'] + '&appid=0a97b286ef39e6c7365556f44496b631', function(response){
						let weather = response.weather[0].description;
						$('#weatherDescription').text(weather);
					}, function(error){
						
					});
					
					// populate Wiki

					$.getJSON('http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=' + capital['name'] + '&maxRows=10&username=rbaw', function(response){
						console.log(response);
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

    
