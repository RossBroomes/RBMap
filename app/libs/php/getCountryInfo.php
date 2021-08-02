<?php

	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	/**
	 * Get the country info
	 */
	$url='http://api.geonames.org/countryInfoJSON?formatted=true&lang=en&country=' . $_REQUEST['country'] . '&username=rbaw&style=full';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);


	$output = array();
	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['geonames'][0];


	/**
	 * Get the capital info
	 */
	$capital = $output['data']['capital'];
	//$url='https://restcountries.eu/rest/v2/capital/' . urlencode($capital);
	$url = 'https://api.opencagedata.com/geocode/v1/json?q=' . urlencode($capital) . '&key=4d2bcc7bf5bc4d5297ca437a245994b7';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);
	
	$decode = json_decode($result,true);

	$output['data']['capital'] = [
		'name' => $capital,
		'geometry' => $decode['results'][0]['geometry']
	];


	/**
	 * Send back to js
	 */
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>