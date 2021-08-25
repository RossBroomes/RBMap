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
  $("#txtCurrencyCode").html(currencyCode);
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
// returns a promise-like object which needs to be await-ed to get the data

async function getExchangeRates(selectedCountry) {
  return $.ajax({
    url: "libs/php/getExchangeRates.php",
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
