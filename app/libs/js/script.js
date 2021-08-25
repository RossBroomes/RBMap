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

				console.log(JSON.stringify(result));

				if (result.status.name == "ok") {

					L.marker(result['data']['capital']['geometry']).addTo(map);
                    map.panTo(result['data']['capital']['geometry']);
					getCountryDataAndDisplay(result['data']['isoAlpha3']);
					
				
				}
					
			},
			error: function(jqXHR, textStatus, errorThrown) {
				
			
			}
		}); 
	
	});

    
