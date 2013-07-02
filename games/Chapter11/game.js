function Game() {
	//Object arrays
	this.sprites = [];
	this.assetsToLoad = [];
	this.assetsLoaded = 0;
	
	//Game states
	this.LOADING = 0;
	this.PLAYING = 1;
	this.gameState = this.LOADING;
	
	//Arrow key codes
	this.UP = 38;
	this.DOWN = 40;
	this.RIGHT = 39;
	this.LEFT = 37;

	//Directions
	this.moveUp = false;
	this.moveDown = false;
	this.moveRight = false;
	this.moveLeft = false;
}

Game.prototypeKeyDownEventDetemineDirection = function(keyCode){
	  switch(event.keyCode)
	  {
		case this.UP:
			this.moveUp = true;
			break;
		  
		  case this.DOWN:
			this.moveDown = true;
			break;
			
		  case this.LEFT:
			this.moveLeft = true;
			break;  
			
		  case this.RIGHT:
			this.moveRight = true;
			break; 
	  }
};

Game.prototype.KeyUpEventdetermineDirection = function(keyCode){
	  switch(keyCode)
	  {
		case this.UP:
			this.moveUp = false;
			break;
		  
		  case this.DOWN:
			this.moveDown = false;
			break;
			
		  case this.LEFT:
			this.moveLeft = false;
			break;  
			
		  case this.RIGHT:
			this.moveRight = false;
			break; 
	  }
};

Game.prototype.render = function(){

  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  //Display the game.sprites
  if(this.sprites.length !== 0)
  {
	  for(var i = 0; i < this.sprites.length; i++)
	  {
		 var sprite = this.sprites[i];
		 if(sprite.visible)
		 {
			 drawingSurface.drawImage
			 (
			   image, 
			   sprite.sourceX, sprite.sourceY, 
			   sprite.sourceWidth, sprite.sourceHeight,
			   Math.floor(sprite.x), Math.floor(sprite.y), 
			   sprite.width, sprite.height
			 ); 
		 }
	  }
  }

};

Game.prototype.changeGameStates = function(controlObject, bigObject, canvas) {
     
	  //Change what the game is doing based on the game state
	  switch(this.gameState)
	  {
		case this.LOADING:
		  console.log("loading...");
		  break;
		
		case this.PLAYING:
		  this.playGame(controlObject, bigObject, canvas);
		  break;
	  }
};

Game.prototype.playGame = function(controlObject, bigObject, canvas) {

	//Set the controlObject's acceleration if the keys are being pressed
	//Up
	if(this.moveUp && !this.moveDown)
	{
		controlObject.accelerationY = -0.2;
		controlObject.friction = 1;
		controlObject.gravity = 0;
	}
	//Down
	if(this.moveDown && !this.moveUp)
	{
		controlObject.accelerationY = 0.2;
		controlObject.friction = 1;
	}
	//Left
	if(this.moveLeft && !this.moveRight)
	{
		controlObject.accelerationX = -0.2;
		controlObject.friction = 1;
	}
	//Right
	if(this.moveRight && !this.moveLeft)
	{
		controlObject.accelerationX = 0.2;
		controlObject.friction = 1;
	}

	//Set the controlObject's velocity and acceleration to zero if none of the keys are being pressed
	if(!this.moveUp && !this.moveDown)
	{
		controlObject.accelerationY = 0;
		controlObject.vy = 0;
	}
	if(!this.moveLeft && !this.moveRight)
	{
		controlObject.accelerationX = 0;
		controlObject.vx = 0;
	}
	
	if( !this.moveUP && !this.moveDown && !this.moveLeft && !this.moveRight)
	{
		controlObject.friction = 0.96;
		controlObject.friction = 0.3;
	}

	//Apply the acceleration
	controlObject.vx += controlObject.accelerationX; 
	controlObject.vy += controlObject.accelerationY;
	
	//Apply friction
	controlObject.vx *= controlObject.friction;
	controlObject.vy *= controlObject.friction;
	
	//Apply gravity
	cat.vy += cat.gravity;
	
	

	//Limit the speed
	if (controlObject.vx > controlObject.speedLimit)
	{
		controlObject.vx = controlObject.speedLimit;
	}
	if (controlObject.vx < -controlObject.speedLimit)
	{
		controlObject.vx = -controlObject.speedLimit;
	}
	if (controlObject.vy > controlObject.speedLimit)
	{
		controlObject.vy = controlObject.speedLimit;
	} 
	if (controlObject.vy < -controlObject.speedLimit)
	{
		controlObject.vy = -controlObject.speedLimit;
	}
	
	//Move the controlObject
	controlObject.x += controlObject.vx;
	controlObject.y += controlObject.vy;
	
	if( bigObject.shape === "rectangular")
		//Bounce the objects
		this.blockRectangle(controlObject, bigObject, true);
	else if ( bigObject.shape === "circle")
		//Bounce the circles
		this.blockCircle(blueCircle, redCircle, true);
	
	//Screen boundaries
	//Adding bounce on the screen boundaries
	if (controlObject.x < 0)
	{
		controlObject.x = 0;
		controlObject.vx *= controlObject.bounce;
	}
	if (controlObject.y < 0)
	{
		controlObject.y = 0;
		controlObject.vy *= controlObject.bounce;
	}
	if (controlObject.x + controlObject.width > canvas.width)
	{
		controlObject.x = canvas.width - controlObject.width;
		controlObject.vx *= controlObject.bounce;
	}
	if (controlObject.y + controlObject.height > canvas.height)
	{
		controlObject.y = canvas.height - controlObject.height;
		controlObject.vy *= controlObject.bounce;
	}
};

Game.prototype.blockRectangle = function(r1, r2, bounce) {
	
	//Set bounce to a default value of false if it's not specified
	if(typeof bounce === "undefined")
	{
		bounce = false;
	}
	
	//A variable to tell us which side the 
	//collision is occurring on
	var collisionSide = "";

	//Calculate the distance vector
	var vx = r1.centerX() - r2.centerX();
	var vy = r1.centerY() - r2.centerY();
	
	//Figure out the combined half-widths and half-heights
	var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
	var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
	
	//Check whether vx is less than the combined half widths 
	if(Math.abs(vx) < combinedHalfWidths) 
	{
		//A collision might be occurring! 
		//Check whether vy is less than the combined half heights 
		if(Math.abs(vy) < combinedHalfHeights)
		{
			//A collision has occurred! This is good! 
			//Find out the size of the overlap on both the X and Y axes
			var overlapX = combinedHalfWidths - Math.abs(vx);
			var overlapY = combinedHalfHeights - Math.abs(vy);

			if(overlapX >= overlapY)
			{
				//The collision is happening on the X axis 
				//But on which side? vy can tell us
				if(vy > 0)
				{
					collisionSide = "top";

					//Move the rectangle out of the collision
					r1.y = r1.y + overlapY;
				}
				else 
				{
					collisionSide = "bottom";

					//Move the rectangle out of the collision
					r1.y = r1.y - overlapY;
				}

				//Bounce
				if(bounce)
				{
				  r1.vy *= -1;
					  
				  /*Alternative
				  //Find the bounce surface's vx and vy properties
				  var s = {};
				  s.vx = r2.x - r2.x + r2.width; 
				  s.vy = 0;
					
				  //Bounce r1 off the surface
				  //bounceOffSurface(r1, s);
				  */
				}
			} 
			else 
			{
				//The collision is happening on the Y axis 
				//But on which side? vx can tell us
				if(vx > 0)
				{
					collisionSide = "left";

					//Move the rectangle out of the collision
					r1.x = r1.x + overlapX;
				}
				else 
				{
					collisionSide = "right";

					//Move the rectangle out of the collision
					r1.x = r1.x - overlapX;
				}

				//Bounce
				if(bounce)
				{
					r1.vx *= -1;
				}
			} 
		}
		else 
		{
			//No collision
			collisionSide = "none";
		}
	} 
	else 
	{
		//No collision
		collisionSide = "none";
	}

	return collisionSide;
};

Game.prototype.blockCircle = function(c1, c2, bounce){
	//Set bounce to a default value of false if it's not specified
	if(typeof bounce === "undefined")
	{
		bounce = false;
	}
  
	//Calculate the vector between the circles’ center points
	var vx = c1.centerX() - c2.centerX();
	var vy = c1.centerY() - c2.centerY();
  
	//Find the distance between the circles by calculating
	//the vector's magnitude (how long the vector is) 
	var magnitude = Math.sqrt(vx * vx + vy * vy);
  
	//Add together the circles' combined half-widths
	var combinedHalfWidths = c1.halfWidth() + c2.halfWidth();
  
	//Figure out if there's a collision
	if(magnitude < combinedHalfWidths)
	{
		//Yes, a collision is happening.
		//Find the amount of overlap between the circles 
		var overlap = combinedHalfWidths - magnitude;
    
		//Normalize the vector.
		//These numbers tell us the direction of the collision
		dx = vx / magnitude;
		dy = vy / magnitude;

		//Move circle 1 out of the collision by multiplying
		//the overlap with the normalized vector and add it to 
		//circle 1's position
		c1.x += overlap * dx; 
		c1.y += overlap * dy;
    
		//Bounce    
		if(bounce)
		{
			//Create a collision vector object to represent the bounce surface
			var s = {};
      
			//Find the bounce surface's vx and vy properties
			//(This represents the normal of the distance vector between the circles)
			s.vx = vy; 
			s.vy = -vx;
    
			//Bounce c1 off the surface
			this.bounceOffSurface(c1, s);
		}
	}
}

Game.prototype.bounceOffSurface = function(o, s){

	//1. Calculate the collision surface's properties

	//Find the surface vector's left normal
	s.lx = s.vy; 
	s.ly = -s.vx;
  
	//Find its magnitude
	s.magnitude = Math.sqrt(s.vx * s.vx + s.vy * s.vy);

	//Find its normalized values
	s.dx = s.vx / s.magnitude;
	s.dy = s.vy / s.magnitude;
  
	//2. Bounce the object (o) off the surface (s)

	//Find the dot product between the object and the surface
	var dp1 = o.vx * s.dx + o.vy * s.dy;
  
	//Project the object's velocity onto the collision surface
	var p1Vx = dp1 * s.dx; 
	var p1Vy = dp1 * s.dy;
  
	//Find the dot product of the object and the surface's left normal (s.lx and s.ly)
	var dp2 = o.vx * (s.lx / s.magnitude) + o.vy * (s.ly / s.magnitude); 
  
	//Project the object's velocity onto the surface's left normal
	var p2Vx = dp2 * (s.lx / s.magnitude);
	var p2Vy = dp2 * (s.ly / s.magnitude);
  
	//Reverse the projection on the surface's left normal
	p2Vx *= -1; 
	p2Vy *= -1;
  
	//Add up the projections to create a new bounce vector
	var bounceVx = p1Vx + p2Vx;
	var bounceVy = p1Vy + p2Vy;
  
	//Assign the bounce vector to the object's velocity
	o.vx = bounceVx; 
	o.vy = bounceVy;
};
