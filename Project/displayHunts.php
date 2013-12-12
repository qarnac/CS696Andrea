<?php
header("Content-type: text/XML");

require('cyberScavengerAPI.php');

$tablename = "hunt";
$sqlStmt = "SELECT * FROM $tablename";//when query is sucessful

if ( $result = $con->query($sqlStmt) )
{
	$xml = appendResultToXml($result);
	writeToXml($xml);
}

function appendResultToXml($result)
{
	$xmlResult = "<hunts>";
	while ($row = $result->fetch_assoc()) 
	{
		$xmlResult .= "<hunt>
					  <id>".$row['id']."</id>
					  <title>".$row['title']."</title><latitude>".$row['start_lat']."</latitude><longitude>".$row['start_lng']."</longitude>
					  <min_lat>".$row['minlat']."</min_lat><min_lng>".$row['minlng']."</min_lng>
					  <max_lat>".$row['maxlat']."</max_lat><max_lng>".$row['maxlng']."</max_lng>
					  <question>".$row['additionalQuestions']."</question>
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