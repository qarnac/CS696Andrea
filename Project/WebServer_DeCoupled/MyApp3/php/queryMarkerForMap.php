<?php
header("Content-type: text/XML");
require('cyberScavengerAPI.php');

if (isset($_GET["id"]) ) {

	$hello = $_GET["id"];
	echo "<root>".$hello."</root>";
}


?>