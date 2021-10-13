function displayCountryData(countryData) {
  const {
    continent,
    capital,
    languages,
    population,
    areaInSqKm,
    countryName,
    continentName,
    currencyCode,
  } = countryData;

  $("#txtCountryName").html(countryName);
  $("#txtContinentName").html(continentName);
  $(".txtCurrencyCode").html(currencyCode);
  $("#txtContinent").html(continent);
  $("#txtCapital").html(capital);
  $("#txtLanguages").html(languages);
  $("#txtPopulation").html(population);
  $("#txtArea").html(areaInSqKm);
}

function displayExchangeRates(exchange) {
  const { rates } = exchange;

  $("#txtExchangeRate").html(rates);
}
// return object

async function getExchangeRates(selectedCountry) {
  return $.ajax({
    url: "app/libs/php/getExchangeRates.php",
    type: "POST",
    dataType: "json",
    data: {
      country: selectedCountry,
    },
  });
}

async function getCountryData(selectedCountry) {
  return $.ajax({
    url: "app/libs/php/getCountryInfo.php",
    type: "POST",
    dataType: "json",
    data: {
      country: selectedCountry,
    },
  });
}

async function getCountryPolygonFromBackend(iso3) {
  return $.ajax({
    url: "app/libs/php/getCountryPolygon.php",
    type: "POST",
    dataType: "json",
    data: {
      iso3: iso3,
    },
  });
}

let plottedGeoJson;
async function getCountryDataAndDisplay(isoAlpha3) {
  if (plottedGeoJson) {
    plottedGeoJson.removeFrom(map);
  }

  const { data: countryPolygon } = await getCountryPolygonFromBackend(
    isoAlpha3
  );

  plottedGeoJson = L.geoJSON(countryPolygon).addTo(map);
}

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
						$('#url').attr(response.wikipediaSearch.geonames[0].wikipediaUrl);
						$('#thumbNail').attr('src', response.wikipediaSearch.geonames[0].thumbnailImg);
					});
				
				}
					
			},
			error: function(jqXHR, textStatus, errorThrown) {
				
			
			}
		}); 
	
	});


