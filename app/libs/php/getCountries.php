<?php
$countries = [];
$json = json_decode(file_get_contents('../../vendors/json/countryBorders.geo.json'));

foreach ($json->features as $feature) {
    $countries[$feature->properties->iso_a2] = $feature->properties->name;
}

echo json_encode($countries);