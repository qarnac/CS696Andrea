<?php

// created April 1st 2014
// this class was adopted and modified slightly from https://www.apptha.com/blog/how-to-reduce-image-file-size-while-uploading-using-php-code/
// to meet this project need

class SimpleImage {

	var $image;

	// this function is where the compression is being done with the level scale of 0-100
	// from 0 being the lowest quality and 100 to be the best quality
	function compress($source, $destination, $quality=70) {

		$imageFileSize = filesize ($source);

		//check if the image is less than 1 mega bytes
		//there will be no point of compression
		if($imageFileSize < 1000000)
			return $source;

		$info = getimagesize($source);

		if ($info['mime'] == 'image/jpeg') 
			$image = imagecreatefromjpeg($source);

		elseif ($info['mime'] == 'image/gif') 
			$image = imagecreatefromgif($source);

		elseif ($info['mime'] == 'image/png') 
			$image = imagecreatefrompng($source);

		imagejpeg($image, $destination, $quality);

		return $destination;
	}


	/**
	 * Returns an array of latitude and longitude from the Image file
	 * @param image $file
	 * @return multitype:number |boolean
	 * src: http://stackoverflow.com/questions/5449282/reading-geotag-data-from-image-in-php
	 */
	function read_gps_location($file){
	    if (is_file($file)) {
	        $info = exif_read_data($file);
	        if (isset($info['GPSLatitude']) && isset($info['GPSLongitude']) &&
	            isset($info['GPSLatitudeRef']) && isset($info['GPSLongitudeRef']) &&
	            in_array($info['GPSLatitudeRef'], array('E','W','N','S')) && in_array($info['GPSLongitudeRef'], array('E','W','N','S'))) {

	            $GPSLatitudeRef  = strtolower(trim($info['GPSLatitudeRef']));
	            $GPSLongitudeRef = strtolower(trim($info['GPSLongitudeRef']));

	            $lat_degrees_a = explode('/',$info['GPSLatitude'][0]);
	            $lat_minutes_a = explode('/',$info['GPSLatitude'][1]);
	            $lat_seconds_a = explode('/',$info['GPSLatitude'][2]);
	            $lng_degrees_a = explode('/',$info['GPSLongitude'][0]);
	            $lng_minutes_a = explode('/',$info['GPSLongitude'][1]);
	            $lng_seconds_a = explode('/',$info['GPSLongitude'][2]);

	            $lat_degrees = $lat_degrees_a[0] / $lat_degrees_a[1];
	            $lat_minutes = $lat_minutes_a[0] / $lat_minutes_a[1];
	            $lat_seconds = $lat_seconds_a[0] / $lat_seconds_a[1];
	            $lng_degrees = $lng_degrees_a[0] / $lng_degrees_a[1];
	            $lng_minutes = $lng_minutes_a[0] / $lng_minutes_a[1];
	            $lng_seconds = $lng_seconds_a[0] / $lng_seconds_a[1];

	            $lat = (float) $lat_degrees+((($lat_minutes*60)+($lat_seconds))/3600);
	            $lng = (float) $lng_degrees+((($lng_minutes*60)+($lng_seconds))/3600);

	            //If the latitude is South, make it negative. 
	            //If the longitude is west, make it negative
	            $GPSLatitudeRef  == 's' ? $lat *= -1 : '';
	            $GPSLongitudeRef == 'w' ? $lng *= -1 : '';

	            return array(
	                'lat' => $lat,
	                'lng' => $lng
	            );
	        }           
	    }
	    return false;
	}

	//added
	function checkForGPS($filename)
	{
		$result = $this->getGPS($filename, true);
		
		if( $result['latitude'] === 0 && $result['longitude'] === 0)
		{
			return false;
		}
		
		return true;
	}
	
	/*
		src: http://stackoverflow.com/questions/2526304/php-extract-gps-exif-data
		description: 
		- for getting gps positioning of the image
		- modified original to meet project's need.
	*/

	//if assoc is disabled it will return in json format
	//else return in array
	function getGPS($fileName, $assoc = false)
	{
		//get the EXIF
		$exif = exif_read_data($fileName);

		//get the Hemisphere multiplier
		$LatM = 1; $LongM = 1;
		if($exif["GPSLatitudeRef"] == 'S')
		{
			$LatM = -1;
		}
		if($exif["GPSLongitudeRef"] == 'W')
		{
			$LongM = -1;
		}

		//get the GPS data
		$gps['LatDegree'] = $exif["GPSLatitude"][0];
		$gps['LatMinute'] = $exif["GPSLatitude"][1];
		$gps['LatgSeconds'] = $exif["GPSLatitude"][2];
		$gps['LongDegree'] = $exif["GPSLongitude"][0];
		$gps['LongMinute'] = $exif["GPSLongitude"][1];
		$gps['LongSeconds'] = $exif["GPSLongitude"][2];

		//convert strings to numbers
		foreach($gps as $key => $value)
		{
			$pos = strpos($value, '/');
			if($pos !== false)
			{
				$temp = explode('/',$value);
				$gps[$key] = $temp[0] / $temp[1];
			}
		}

		//calculate the decimal degree
		$result['latitude'] = $LatM * ($gps['LatDegree'] + ($gps['LatMinute'] / 60) + ($gps['LatgSeconds'] / 3600));
		$result['longitude'] = $LongM * ($gps['LongDegree'] + ($gps['LongMinute'] / 60) + ($gps['LongSeconds'] / 3600));

		if($assoc)
		{
			return $result;
		}

		return json_encode($result);
	}


}

?>