<?php
header("Content-type: text/XML");
require('cyberScavengerAPI.php');

$studentTableName = "stud_activity";

$markersResult = "";

if( $distinctIDresult = queryDistinctHuntId($con))
{
	if( $stud_activityResult = queryStudActivityTable($con) )
	{
		$xml = formatResultIntoXMLformat($distinctIDresult, $stud_activityResult);
		//writeToXml($xml);
		$markersResult = $xml;
	}
}

function queryStudActivityTable($con)
{
	$studentTableName = "stud_activity";
	$sqlStmt = "SELECT * FROM $studentTableName";
	
	if ( $result = $con->query($sqlStmt) )
	{
		return $result;
	}
	
	return null;
}

function formatResultIntoXMLformat($distinctIDresult, $stud_activityResult)
{
	$target = array();
	
	while ($row = $stud_activityResult->fetch_assoc()) {
	  $target[] = $row;
	}
	
	$xmlResult = "<root>";
	while ($row = $distinctIDresult->fetch_assoc() ) 
	{
		$hunt_id = $row['hunt_id'];
		
		$xmlResult .= "<hunt_id id=\"$hunt_id\">";

		foreach ($target as $val) 
		{
			$target_hunt_id = $val['hunt_id'];
			
			if( $hunt_id == $target_hunt_id)
				$xmlResult .= "<lat>".$val['lat']."</lat><lng>".$val['lng']."</lng>";
		}
		
		$xmlResult .= "</hunt_id>";
	}
	
	$xmlResult .= "</root>";
	return $xmlResult;
}

function queryDistinctHuntId($con)
{
	$studentTableName = "stud_activity";
	$sqlStmt = "SELECT DISTINCT hunt_id FROM $studentTableName";//when query is sucessful
	//$sqlStmt = "SELECT * FROM $studentTableName";//when query is sucessful
	
	$studentTableName = "stud_activity";
	$result = null;
	
	if ( $result = $con->query($sqlStmt) )
	{
		return $result;
	}
	
	return null;
}

function queryXMLResult($result)
{
	$xmlResult = "<hunts>";
	
	while ($row = $result->fetch_assoc() ) 
	{
		print_r ($row);
		$xmlResult .= "<hunt>
					  <hunt_id>".$row['lat']."</hunt_id>
					  </hunt>"; //<lat>".$row['lat']."</lat><lng>".$row['lng']."</lng>
	}
	
	$xmlResult .= "</hunts>";
	
	
	return $xmlResult;
}

?>