<?php
header("Content-type: text/XML");
require('cyberScavengerAPI.php');

$studentTableName = "stud_activity";

$markersResult = "";
$huntID = "";

// hunt id exists
if(isset($_GET['huntID'])) {

	$huntID = $_GET['huntID'];
    
	//if( $distinctIDresult = queryDistinctHuntId($con))
	//{
		if( $stud_activityResult = queryStudActivityTable($con,$huntID) )
		{
			//obselete because we will only see the one which contain the same id
			//$xml = formatResultIntoXMLformat($distinctIDresult, $stud_activityResult);
			$xml = formatResultIntoXMLformat($huntID, $stud_activityResult);
			$markersResult = $xml;
			
			writeToXml($markersResult);
		}
		
	//}
}

function queryStudActivityTable($con,$huntID)
{

	$studentTableName = "stud_activity";
	$sqlStmt = "SELECT * FROM $studentTableName WHERE hunt_id = " . $huntID;
	
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
	//while ($row = $distinctIDresult->fetch_assoc() ) 
	//{
		//$hunt_id = $row['hunt_id'];
		$hunt_id = $distinctIDresult;
		
		
		$xmlResult .= "<markers id=\"$hunt_id\">";

		foreach ($target as $val) 
		{
			$target_hunt_id = $val['hunt_id'];
			
			if( $hunt_id == $target_hunt_id)
			{
				$xmlResult .= "<marker><lat>".$val['lat']."</lat><lng>".$val['lng']."</lng><media_id>".$val['media_id']."</media_id><additionalAnswers>".$val['additionalAnswers']."</additionalAnswers></marker>";
			}
		}
		
		$xmlResult .= "</markers>";
	//}
	
	$xmlResult .= "</root>";
	

	return $xmlResult;
}

function queryDistinctHuntId($con, $huntID)
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

if (isset($_GET["id"]) ) {

	$hello = $_GET["id"];
	echo "<root>".$hello."</root>";
	
	
	
}


?>