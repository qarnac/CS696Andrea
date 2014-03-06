<?php
	session_start();
	require('cyberScavengerAPI.php');
	
	$loginUsername = $_POST["user"];
	$loginPassword = $_POST["pwd"];
	
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
			
			
			if ($returnedPassword[6] != $loginPassword)
			{
				$errorMessage = 'Login failed - incorrect password';
				$_SESSION['loggedin'] = false;
				echo "{success: false, errors: { reason: '$errorMessage' }}";
			}
			else
			{
				$_SESSION['start'] = time(); // taking now logged in time
				$_SESSION['expire'] = $_SESSION['start'] + (60 * 60);
				$_SESSION['loggedin'] = true;
				$_SESSION['huntID'] = true;
				echo "{success: true}";
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
