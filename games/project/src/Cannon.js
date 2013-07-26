function Cannon(canvas) {
	this.x = canvas.width / 2 - this.width / 2;
	this.y = 280;
	this.health = 3;
	
	//Cannon Directions
	this.moveRight = false;
	this.moveLeft = false;
	this.moveUp = false;
	this.moveDown = false;
	
	//Variables to help fire missiles
	this.shoot = false;
	this.spaceKeyIsDown = false;
	
	this.missiles = [];
}

Cannon.prototype = new Entity();

Cannon.prototype.moveAction = function(canvas, camera, gameWorld) {

	//Left
	if(this.moveLeft && !this.moveRight)
	{
		//console.log("left");
		this.vx = -4;
	}
	//Right
	if(this.moveRight && !this.moveLeft)
	{
		//console.log("right");
		this.vx = 4;
	}

	//UP
	if(this.moveUp && !this.moveDown)
	{
		this.vy = -4;
	}

	//DOWN
	if(this.moveDown && !this.moveUp)
	{
		this.vy = 4;
	}

	if(!this.moveUp && !this.moveDown)
	{
		this.vy = 0;
	}

	//Set the cannon's velocity to zero if none of the keys are being pressed
	if(!this.moveLeft && !this.moveRight)
	{
		//console.log("cannon velocity");
		this.vx = 0;
	}

	//Move the cannon and keep it inside the gameWorld boundaries
	this.x = Math.max(0, Math.min(this.x + this.vx, gameWorld.width - this.width)); 
	this.y = Math.max(0, Math.min(this.y + this.vy, gameWorld.height - this.height)); 

	//Scroll the camera
	if(this.x < camera.leftInnerBoundary())
	{
		
		camera.x = Math.floor(this.x - (camera.width * 0.25));
	}
	if(this.y < camera.topInnerBoundary())
	{
		
		camera.y = Math.floor(this.y - (camera.height * 0.25));
	}
	if(this.x + this.width > camera.rightInnerBoundary())
	{
		
		camera.x = Math.floor(this.x + this.width - (camera.width * 0.75));
	}
	if(this.y + this.height > camera.bottomInnerBoundary())
	{
		
		camera.y = Math.floor(this.y + this.height - (camera.height * 0.75));
	}

	//The camera's world boundaries
	if(camera.x < gameWorld.x)
	{
		camera.x = gameWorld.x;
	}
	if(camera.y < gameWorld.y)
	{
		camera.y = gameWorld.y;
	}
	if(camera.x + camera.width > gameWorld.x + gameWorld.width)
	{
		console.log("IN HERE");
		camera.x = gameWorld.x + gameWorld.width - camera.width;
	}
	if(camera.y + camera.height > gameWorld.height)
	{
		camera.y = gameWorld.height - camera.height;
	} 
  
	//The camera's world boundaries
	if(camera.x < gameWorld.x)
	{
		camera.x = gameWorld.x;
	}
	if(camera.y < gameWorld.y)
	{
		camera.y = gameWorld.y;
	}
	if(camera.x + camera.width > gameWorld.x + gameWorld.width)
	{
		camera.x = gameWorld.x + gameWorld.width - camera.width;
	}
	if(camera.y + camera.height > gameWorld.height)
	{
		
		camera.y = gameWorld.height - camera.height;
	} 
  
};

Cannon.prototype.fireMissile = function(sprites){
  //Create a missile sprite
  this.missile = new Missile();

  
  //Center it over the cannon
  this.missile.x = this.centerX() - this.missile.halfWidth();
  this.missile.y = this.y - this.missile.height;
  
  //Set its speed
  this.missile.vy = -8;
  
  //Push the missile into both the sprites and missiles arrays
  sprites.push(this.missile);
  this.missiles.push(this.missile);
  
  this.shoot = false;
};