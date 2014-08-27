<?php
require('./cyberScavengerAPIAdmin.php');
// created April 1st 2014
// this class was adopted and modified slightly from https://www.apptha.com/blog/how-to-reduce-image-file-size-while-uploading-using-php-code/
// to meet this project need

	function insertImage($con, $imageFilename)
	{
		
		$studentTableName = "image";
		$sqlStmt = "INSERT INTO image(images) VALUES ('".$imageFilename."')";
		$id = "";
		
		if ( $result = $con->query($sqlStmt) )
		{
			$last_id = 0;
			//update the update to image name to ID name;
			$sqlStmt = "UPDATE image SET images='". $con->insert_id .".jpg'". " WHERE id=" . $last_id = $con->insert_id;

			$retval = $con->query($sqlStmt);
		

			if(! $retval )
			{
				die('Could not update data: ' . mysql_error());
			}

			
			rename($imageFilename, "./../../images/".$last_id.".jpeg");

		}

		return $id;
	}
	
	

?>