<?php

$host = "68.178.216.51";
$userName = "cyberread";
$passwrd= "Carefusion101@";

$databaseName = "cyberscavenger";
$tablename = "hunt";

	// Create connection
	$con=mysqli_connect($host,$userName,$passwrd,$databaseName);
	
	// Check connection
	if (mysqli_connect_errno($con))
	{
	  //echo "Failed to connect to MySQL: " . mysqli_connect_error();
	  echo "Failed to connect to MySQL please contact your administaror";
	  print('connection failed');
	}
	
	print('DB connecteed!');
?>
