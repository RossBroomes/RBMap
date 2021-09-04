$.ajax({
    url: "app/libs/php/getDropdownCountry.php",
    type: 'POST',
    dataType: "json",       
    success: function(result) {
        console.log(result);

        if (result.status.name == "ok") {

            $('#selectCountry').append(`<option value="${result.data.border.features.properties.iso_a2}">${result.data.border.features.properties.name}</option>`);


        }        

        
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR);
    }
    
});