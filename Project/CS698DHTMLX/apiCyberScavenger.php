<?php

$host = "68.178.216.51";
$userName = "cyberread";
$passwrd= "Carefusion101@";

$databaseName = "cyberscavenger";
$tablename = "hunt";
$sqlStmt = "SELECT * FROM $tablename";
$myArray = array();


// Create connection
$con = mysqli_connect($host,$userName,$passwrd,$databaseName);

// Check connection
if (mysqli_connect_errno($con))
{
  //echo "Failed to connect to MySQL: " . mysqli_connect_error();
  echo "Failed to connect to MySQL please contact your administaror";
  print('connection failed');
}

if ( $result = $con->query($sqlStmt) )
{
   /* fetch associative array */
    while ($row = mysqli_fetch_assoc($result)) {
        //printf ("%s (%s)\n", $row["title"], $row["teacher_id"]);
		array_push($myArray, $row);
    }
	
	echo json_encode($myArray);
}

/* close connection */
mysqli_close($con);
?>
