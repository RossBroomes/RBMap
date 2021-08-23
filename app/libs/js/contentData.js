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
    url: "libs/php/getCountryInfo.php",
    type: "POST",
    dataType: "json",
    data: {
      country: selectedCountry,
    },
  });
}

async function getCountryPolygonFromBackend(iso3) {
  return $.ajax({
    url: "libs/php/getCountryPolygon.php",
    type: "POST",
    dataType: "json",
    data: {
      iso3,
    },
  });
}

let plottedGeoJson;
async function getCountryDataAndDisplay() {
  if (plottedGeoJson) {
    plottedGeoJson.removeFrom(map);
  }

  // const selectedCountry = document.querySelector("#selCountry").innerHTML;
  const selectedCountry = $("#selCountry").val(); // "US"
  const response = await getCountryData(selectedCountry);

  const countryInfo = response.data[0];

  displayCountryData(countryInfo);

  const { isoAlpha3 } = countryInfo;

  const { data: countryPolygon } = await getCountryPolygonFromBackend(
    isoAlpha3
  );

  plottedGeoJson = L.geoJSON(countryPolygon).addTo(map);

  map.fitBounds([
    [countryInfo.north, countryInfo.west],
    [countryInfo.south, countryInfo.east],
  ]);
}

$("#selCountry").change(getCountryDataAndDisplay);
$("#selCountry").change(plottedGeoJson);