<?php

include_once('./SimpleImage.php');
include_once('./UpdateActivity.php');
require('./cyberScavengerAPIAdmin.php');

$uploaddir = '../../images/';//your-path-to-upload

$response = new stdClass();

try {
    if ($_FILES['userfile']['error'] !== UPLOAD_ERR_OK) {

        if ($_SERVER['REQUEST_METHOD'] == 'POST' && 
            empty($_POST) &&
            empty($_FILES) && 
            $_SERVER['CONTENT_LENGTH'] > 0) {

            $displayMaxSize = ini_get('post_max_size');

            switch (substr($displayMaxSize, -1)) {
                case 'G':
                    $displayMaxSize = $displayMaxSize * 1024;
                case 'M':
                    $displayMaxSize = $displayMaxSize * 1024;
                case 'K':
                    $displayMaxSize = $displayMaxSize * 1024;
            }

            $errMessage = 'Your file is too large. ' . 
                    $_SERVER[CONTENT_LENGTH] . 
                    ' bytes exceeds the maximum size of ' . 
                    $displayMaxSize . ' bytes.';            
        } else {
            switch ($_FILES['userfile']['error']) {
                case UPLOAD_ERR_INI_SIZE:
                    $errMessage = "The uploaded file exceeds the upload_max_filesize directive in php.ini";
                    break;
                case UPLOAD_ERR_FORM_SIZE:
                    $errMessage = "The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form";
                    break;
                case UPLOAD_ERR_PARTIAL:
                    $errMessage = "The uploaded file was only partially uploaded";
                    break;
                case UPLOAD_ERR_NO_FILE:
                    $errMessage = "No file was uploaded";
                    break;
                case UPLOAD_ERR_NO_TMP_DIR:
                    $errMessage = "Missing a temporary folder";
                    break;
                case UPLOAD_ERR_CANT_WRITE:
                    $errMessage = "Failed to write file to disk";
                    break;
                case UPLOAD_ERR_EXTENSION:
                    $errMessage = "File upload stopped by extension";
                    break;

                default:
                    $errMessage = "Unknown upload error";
                    break;
            }
        }

        $response->success = false;
        $response->message = $errMessage;

    } else {  
	
		//print_r($_FILES['userfile']);
		$obj = $_POST['info'];
		$obj = str_replace('\\',"",$obj);
		$obj  = json_decode($obj, true);
		//print($json['countryId']."\n");
		//print($obj['partners']."\n");
	
        //$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);
		$str = basename($_FILES['userfile']['tmp_name']);
		$res = strtok($str, "/");
		$uploadfile = $uploaddir . $res . '.jpeg';
		
        if (is_uploaded_file($_FILES['userfile']['tmp_name']) && 
            move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
			
			//src code and example found at: http://stackoverflow.com/questions/9839150/image-compression-in-php
            //function used from https://www.apptha.com/blog/how-to-reduce-image-file-size-while-uploading-using-php-code/

			//$image = new SimpleImage();
			
			//Now DataBase Part
			//Do insertion then update ID
			$mediaID = insertImage($con, $uploadfile);
			
			updateActivity($con, $obj, $mediaID);

            $response->success = true;
        } else {
            $response->success = false;
            $response->message = 'File was uploaded but not saved on server';
        }    
    }
} catch (Exception $e) {
    $response->success = false;
    $response->message = $e->getMessage();
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode($response);
exit;
?>
