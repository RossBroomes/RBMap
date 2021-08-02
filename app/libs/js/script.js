// $('#').click(function() {
// 		$.ajax({
// 			url: "./app/libs/php/getCountryInfo.php",
// 			type: 'POST',
// 			dataType: 'json',
// 			data: {
// 				country: $('#selCountry').val(),
// 				lang: $('#selLanguage').val(),
// 			},
// 			success: function(result) {

// 				console.log(JSON.stringify(result));

// 				if (result.status.name == "ok") {

// 					$('#txtContinent').html(result['data'][0]['continent']);
// 					$('#txtCapital').html(result['data'][0]['capital']);
// 					$('#txtPopulation').html(result['data'][0]['population']);
					
// 				}
					
// 			},
// 			error: function(jqXHR, textStatus, errorThrown) {
				
			
// 			}
// 		}); 
	
// 	});



$('#countries a').click(function(e){
    e.preventDefault();
    let country = $(this).data('iso');

    $.getJSON('./app/libs/php/getCountryInfo.php', 'country=' + country, function(d) {
        let capital = d['data']['capital'];
        var marker = L.marker(capital.geometry).addTo(map);
        map.panTo(capital.geometry);
        console.log(capital);
    });


});