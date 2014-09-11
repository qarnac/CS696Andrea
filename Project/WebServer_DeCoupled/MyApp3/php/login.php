<?php
	session_start();
	require('cyberScavengerAPI.php');
	require('queryForHuntInformation.php');
	
	
	$loginUsername = $_POST["user"];
	$loginPassword = $_POST["pwd"];
	$lat = 0.0;
	$lng = 0.0;
	
	//check if the param from sencha is there if it...
	if (isset($loginUsername) && isset($loginPassword))
	{
		//check against the databse to match the username and the password
		
		$queryStmt = "SELECT * FROM students WHERE username = '$loginUsername'";

		$accountExists;
		
		if ( $result = $con->query($queryStmt) )
		{
			$accountExists = $result->num_rows;
		}
		
		if (!$accountExists)
		{
			$errorMessage = 'Login failed - no such account';
			$_SESSION['loggedin'] = false;
			echo "{success: false, errors: { reason: '$errorMessage' }}";
		}
		else
		{
			$returnedPassword = $result->fetch_array(MYSQLI_NUM);
			
			/*
			example of returned arrayPassword
			    [0] => id
				[1] => first name
				[2] => last name
				[3] => 
				[4] => 0
				[5] => username
				[6] => password
				[7] => teacher id
				[8] => parent hunt
			*/
			
			if ($returnedPassword[6] != $loginPassword)
			{
				$errorMessage = 'Login failed - incorrect password';
				$_SESSION['loggedin'] = false;
				echo "{success: false, errors: { reason: '$errorMessage' }}";
			}
			else
			{
				$huntInfo = queryHuntInfo($con, $returnedPassword[0]);
				
				//print_r($huntInfo);
				
				//var $questions = json_decode($huntInfo[13]));
				//vardump($questions,true);
				//print "hunt info test\n";
				//print_r(questions);
				
				$_SESSION['start'] = time(); // taking now logged in time
				$_SESSION['expire'] = $_SESSION['start'] + (60 * 60);
				$_SESSION['loggedin'] = true;
				$_SESSION['huntID'] = true;
				print ("{success: true, hunt: $returnedPassword[8]}");
			}
			
		}
		
	}
	else
	{
		unset($_SESSION['loggedin']);
		unset($_SESSION['username']);
		unset($_SESSION['isAdmin']);
		
	}

?>
