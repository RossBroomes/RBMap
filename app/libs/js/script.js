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

