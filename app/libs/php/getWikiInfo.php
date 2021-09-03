<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);
	//urlencode helps with unwanted characters in the parameter search &&%%

	$url = 'http://api.geonames.org/wikipediaSearchJSON?formatted=true&q=' . urlencode($_REQUEST['title']) . '&username=rbaw';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);
	
	curl_close($ch);
	$wikipediaSearch = json_decode($result, true);

    $output = array();
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['wikipediaSearch'] = $wikipediaSearch;

    header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>