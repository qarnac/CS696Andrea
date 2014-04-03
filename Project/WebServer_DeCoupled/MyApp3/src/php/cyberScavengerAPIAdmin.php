<?php

define('DB_USER','cyberscavenger'); 
define('DB_PASSWORD','Carefusion101@'); 
define('DB_HOST','68.178.216.51'); 
define('DB_NAME','cyberscavenger'); 

//$dbc = mysql_connect(DB_HOST,DB_USER,DB_PASSWORD) OR die('Cound not connect to MySQL: '.mysql_error());
//@mysql_select_db(DB_NAME) OR die('Could not select database: '.mysql_error());

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

function insertImage($con, $imageFilename)
{	
	$studentTableName = "image";
	$sqlStmt = "INSERT INTO image(images) VALUES ('".$imageFilename."')";
	$id = "";
	
	if ( $result = $con->query($sqlStmt) )
	{
		//update the update to image name to ID name;
		$sqlStmt = "UPDATE image SET images='". $con->insert_id .".jpg'". " WHERE id=" . $con->insert_id;
		
		echo $sqlStmt;
		
		$retval = $con->query($sqlStmt);
		
		if(! $retval )
		{
			die('Could not update data: ' . mysql_error());
		}
		
	}
	
	return $id;
}

function writeToXml($xml)
{
	$sxe = new SimpleXMLElement($xml);
	echo $sxe -> asXML();
}





?>