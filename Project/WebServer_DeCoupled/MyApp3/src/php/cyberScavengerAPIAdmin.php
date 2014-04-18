<?php

define('DB_USER','cyberscavenger'); 
define('DB_PASSWORD','Carefusion101@'); 
define('DB_HOST','68.178.216.51'); 
define('DB_NAME','cyberscavenger'); 


$con = ConnectToDatabase(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

function ConnectToDatabase($host, $userName, $passwrd, $databaseName){

	// Create connection
	$con = mysqli_connect($host,$userName,$passwrd,$databaseName);
	// Check connection
	if (mysqli_connect_errno($con))
	{
		echo "Failed to connect to MySQL please contact your administaror\n";
		print('connection failed\n');
	}
	
	return $con;
}


function writeToXml($xml)
{
	$sxe = new SimpleXMLElement($xml);
	echo $sxe -> asXML();
}



?>