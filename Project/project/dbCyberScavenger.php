<?php

$host = "";
$userName = "";
$passwrd= "";

$databaseName = "cyberscavenger";
$tablename = "hunt";

	// Create connection
	$con=mysqli_connect("68.178.216.51","cyberscavenger","Yenngsd101@","c");
	
	// Check connection
	if (mysqli_connect_errno($con))
	{
	  //echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  echo "Failed to connect to MySQL please contact your administaror";
	  
	}
?>