<?php
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);
	
	$executionStartTime = microtime(true);
	
	$url='https://openexchangerates.org/api/latest.json?app_id=0f00b7b62c0d416ab98cc8256337dcf6';

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);
 
	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
	$output['data'] = $decode['rates'];
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output); 

?>




<?php
 
    $executionStartTime = microtime(true);
 
    $countryData = json_decode(file_get_contents("countryBorders.geo.json"), true);
 
    $country = [];
 
    foreach ($countryData['features'] as $feature) {
 
        $temp = null;
        $temp['code'] = $feature["properties"]['iso_a2'];
        $temp['name'] = $feature["properties"]['name'];
 
        array_push($country, $temp);
        
    }
 
    usort($country, function ($item1, $item2) {
 
        return $item1['name'] <=> $item2['name'];
 
    });
 
    $output['status']['code'] = "200";
    $output['status']['name'] = "ok";
    $output['status']['description'] = "success";
    $output['status']['executedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    $output['data'] = $country;
    
    header('Content-Type: application/json; charset=UTF-8');
 
    echo json_encode($output);
 
?>