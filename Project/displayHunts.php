<?php
header("Content-type: text/XML");
require('cyberScavengerAPI.php');
require('queryMarkersLatitudesLongitudes.php');


$tablename = "hunt";
$sqlStmt = "SELECT * FROM $tablename";//when query is sucessful


if ( $result = $con->query($sqlStmt) )
{
	$xml = appendResultToXml($result,$markersResult);
	writeToXml($xml);
}

function appendResultToXml($result, $markersResult)
{
	//load the string to xml objects
	$xml = simplexml_load_string($markersResult);

	$xmlResult = "<hunts>";
	while ($row = $result->fetch_assoc()) 
	{
		//xpath
		$resLat = $xml->xpath("/root/hunt_id[@id=".$row['id']."]/lat");
		$resLng = $xml->xpath("/root/hunt_id[@id=".$row['id']."]/lng");
		$latStr = "";
		$lngStr = "";
		

		foreach ( $resLat as $index => $valueLat ) {
			$latStr .= "<lat_lng>".$valueLat.", ".$resLng[$index]."</lat_lng>";	
		}
		

		
		
		$xmlResult .= "<hunt>
					  <id>".$row['id']."</id>
					  <title>".$row['title']."</title><latitude>".$row['start_lat']."</latitude><longitude>".$row['start_lng']."</longitude>
					  <min_lat>".$row['minlat']."</min_lat><min_lng>".$row['minlng']."</min_lng>
					  <max_lat>".$row['maxlat']."</max_lat><max_lng>".$row['maxlng']."</max_lng>
					  <question>".$row['additionalQuestions']."</question>"
					  .$latStr.$lngStr."
					  </hunt>";
				
	}
	
	$xmlResult .= "</hunts>";

	
	return $xmlResult;
}

function writeToXml($xml)
{
	$sxe = new SimpleXMLElement($xml);
	echo $sxe -> asXML();
}

?>