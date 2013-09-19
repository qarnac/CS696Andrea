	var map;
	var marker;
	var marker2;
	var defaultLocation = new google.maps.LatLng(33.00, -117.0);

	var watchID;
	var geoLoc;
	var output = document.getElementById("out");
	
	var myOptions = {
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("map"), myOptions);
	
	map.setCenter(defaultLocation);
	
	addMarker(marker, defaultLocation, "test default marker");
	
	
	function showLocation(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var accuracy = position.coords.accuracy;

		if (accuracy < 50)
		{
			clearWatch();
			console.log("in clear watch");
		}
		
		/*
		var img = new Image();
		img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
		*/
		//output.appendChild(img);
		
		output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '° <br>Accuracy is '+ accuracy +'</p>';
		addMarker(marker2, new google.maps.LatLng(position.coords.latitude, position.coords.longitude), "My location");
		
		console.log("HELLO");
	  
	}
	
	function addMarker(marker, latitudeLongitude, titleMarker)
	{
		if(marker) 
			marker.setMap(null); 
		
		marker = new google.maps.Marker({
			position: latitudeLongitude,  
			title: titleMarker,
		});
		
		
		google.maps.event.addListener(marker, 'click', function() {
		  slidfast.ui.slideTo('products-page');
		});
		
		
		marker.setMap(map);

		map.panTo(latitudeLongitude);
	}

	function errorHandler(err) {
	  if(err.code == 1) {
		alert("Error: Access is denied!");
	  }else if( err.code == 2) {
		alert("Error: Position is unavailable!");
	  }
	}
	
	function getLocationUpdate(){

	   if(navigator.geolocation){
		  // timeout at 60000 milliseconds (60 seconds)
		  var options = {	//frequency:60000, 
							enableHighAccuracy: true
							};
		  geoLoc = navigator.geolocation;
		  
		  watchID = geoLoc.watchPosition (showLocation, 
										 errorHandler, options);
										 								 
	   }else{
		  alert("Sorry, browser does not support geolocation!");
	   }
	}
	
	// stop WatchPostition that was started earlier
	// 
	function clearWatch() {
		if (watchID != null) {
			navigator.geolocation.clearWatch(watchID);
			watchID = null;
		}
	}
	
    var takePicture = document.querySelector("#take-picture"),
        showPicture = document.querySelector("#show-picture");

    if (takePicture && showPicture) {
        // Set events
        takePicture.onchange = function (event) {
            // Get a reference to the taken picture or chosen file
            var files = event.target.files,
                file;
            if (files && files.length > 0) {
                file = files[0];
                try {
                    // Get window.URL object
                    var URL = window.URL || window.webkitURL;

                    // Create ObjectURL
                    var imgURL = URL.createObjectURL(file);

                    // Set img src to ObjectURL
                    showPicture.src = imgURL;

                    // Revoke ObjectURL
                    URL.revokeObjectURL(imgURL);
                }
                catch (e) {
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        //
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }
        };
    }