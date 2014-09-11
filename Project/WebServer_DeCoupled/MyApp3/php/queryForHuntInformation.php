<?php
	require_once('cyberScavengerAPI.php');

	function queryHuntInfo($con, $id)
	{
		$queryStmt = "SELECT * FROM hunt WHERE id = '$id'";
		
		if ( $result = $con->query($queryStmt) )
		{
		}
		
		$arrayOfResult = $result->fetch_array(MYSQLI_NUM);
		
		/*
		[0] => Rancho Bernardo
		[1] => 22
		[2] => 33.020731576
		[3] => -117.0799775
		[4] => 33.003854619
		[5] => -117.0946223
		[6] => 33.037608534
		[7] => -117.0653327
		[8] => 100020001
		[9] => 2014-02-23
		[10] => 2014-02-23
		[11] => 0000-00-00
		[12] => 0000-00-00
		[13] => {"questiona":"What does this hunt explain?","questionb":"What question do you have about this hunt","questionc":"What do you want people to focus on this hunt?"}
		*/
		
		
		return $arrayOfResult;
		
	}
	
?>