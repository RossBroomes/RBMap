<?php

	// Get the location data
	
	$url = 'https://api.opencagedata.com/geocode/v1/json?q=' . urlencode($capital) . '&key=4d2bcc7bf5bc4d5297ca437a245994b7';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);
	
	$decode = json_decode($result,true);
	// used lat and lon to get country = Alplha 2 in countryborders.geojson to trigger boarders and markers.
	// want my geolocation in the urlen code
	
    ?>