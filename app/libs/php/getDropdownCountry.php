<?php
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
    $executionStartTime = microtime(true);
	
	$string = file_get_contents("../../vendors/json/countryBorders.geo.json");
    $json_a = json_decode($string, true);

    $countries = $json_a['features'];
    $properties = array_column($countries, 'properties');
    $name = array_column($properties, 'name');

    $key = array_search($_REQUEST['name'], $name, true);
    if (!$key) {
        $output['status']['code'] = "404";
        $output['status']['name'] = "error";
        $output['status']['description'] = "not found";
        $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
        $output['data'] = null;
        header('Content-Type: application/json; charset=UTF-8');
        http_response_code(404);
        echo json_encode($output);
        return;
    }

    $countryProperty = $properties[$key];

    $countryKey = array_search($countryProperty, $properties, true);

    $output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $countries[$countryKey];

    header('Content-Type: application/json; charset=UTF-8');

    echo json_encode($output); 

    console.log(name)
?>