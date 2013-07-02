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

Game.prototype.changeGameStates = function(cat, canvas) {
      console.log("test" + this.gameState);
	  //Change what the game is doing based on the game state
	  switch(this.gameState)
	  {
		case this.LOADING:
		  console.log("loading...");
		  break;
		
		case this.PLAYING:
		  this.playGame(cat, canvas);
		  break;
	  }
};

Game.prototype.playGame = function(cat, canvas) {

		//Set the cat's acceleration if the keys are being pressed
		//Up
		if(this.moveUp && !this.moveDown)
		{
			cat.accelerationY = -0.2;
			cat.friction = 1;
		}
		//Down
		if(this.moveDown && !this.moveUp)
		{
			cat.accelerationY = 0.2;
			cat.friction = 1;
		}
		//Left
		if(this.moveLeft && !this.moveRight)
		{
			cat.accelerationX = -0.2;
			cat.friction = 1;
		}
		//Right
		if(this.moveRight && !this.moveLeft)
		{
			cat.accelerationX = 0.2;
			cat.friction = 1;
		}

		//Set the cat's velocity and acceleration to zero if none of the keys are being pressed
		if(!this.moveUp && !this.moveDown)
		{
			cat.accelerationY = 0;
			cat.vy = 0;
		}
		if(!this.moveLeft && !this.moveRight)
		{
			cat.accelerationX = 0;
			cat.vx = 0;
		}
		
		if( !this.moveUP && !this.moveDown && !this.moveLeft && !this.moveRight)
		{
			cat.friction = 0.96
		}

		//Apply the acceleration
		cat.vx += cat.accelerationX; 
		cat.vy += cat.accelerationY;
		
		//Apply friction
		cat.vx *= cat.friction;
		cat.vy *= cat.friction;
		

		//Limit the speed
		if (cat.vx > cat.speedLimit)
		{
			cat.vx = cat.speedLimit;
		}
		if (cat.vx < -cat.speedLimit)
		{
			cat.vx = -cat.speedLimit;
		}
		if (cat.vy > cat.speedLimit)
		{
			cat.vy = cat.speedLimit;
		} 
		if (cat.vy < -cat.speedLimit)
		{
			cat.vy = -cat.speedLimit;
		}
		
		//Move the cat
		cat.x += cat.vx;
		cat.y += cat.vy;
		
		//Bounce the objects
		this.blockRectangle(cat, box, true);

		//Screen boundaries
		//Adding bounce on the screen boundaries
		if (cat.x < 0)
		{
			cat.x = 0;
			cat.vx *= cat.bounce;
		}
		if (cat.y < 0)
		{
			cat.y = 0;
			cat.vy *= cat.bounce;
		}
		if (cat.x + cat.width > canvas.width)
		{
			cat.x = canvas.width - cat.width;
			cat.vx *= cat.bounce;
		}
		if (cat.y + cat.height > canvas.height)
		{
			cat.y = canvas.height - cat.height;
			cat.vy *= cat.bounce;
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