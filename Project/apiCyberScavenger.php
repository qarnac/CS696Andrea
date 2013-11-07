<?php

header("Content-type: text/XML");
$host = "68.178.216.51";
$userName = "cyberread";
$passwrd= "Carefusion101@";
$databaseName = "cyberscavenger";
$tablename = "hunt";
//$xml = new XMLWriter();
$con = ConnectToDatabase($host, $userName, $passwrd, $databaseName);
$sqlStmt = "SELECT title FROM $tablename";//when query is sucessful
if ( $result = $con->query($sqlStmt) )
{
	$xml = appendResultToXml($result);
	writeToXml($xml);
}	
function appendResultToXml($result)
{
	$xmlResult = "<users>";
	while ($row = $result->fetch_assoc()) 
	{
		$xmlResult .= "<user><id>".$row['title']."</id></user>";
	}
	$xmlResult .= "</users>";
	return $xmlResult;
}
function writeToXml($xml)
{
	$sxe = new SimpleXMLElement($xml);
	echo $sxe -> asXML();
}
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
/* close connection */
mysqli_close($con);
?>
