function Cannon(canvas) {
	this.x = canvas.width / 2 - this.width / 2;
	this.y = 280;
	
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

Cannon.prototype.moveAction = function(canvas) {
   
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

  this.y = Math.max(0, Math.min(this.y + this.vy, canvas.height - this.height));
  //Move the cannon and keep it within the screen boundaries
  this.x = Math.max(0, Math.min(this.x + this.vx, canvas.width - this.width));
  
  camera.x = Math.floor(this.x + (this.width / 2) - (camera.width / 2));
  camera.y = Math.floor(this.y + (this.height / 2) - (camera.height / 2));
  
  //Keep the camera inside the gameWorld boundaries
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
  this.missile = new Entity();
  this.missile.sourceX = 96;
  this.missile.sourceWidth = 16;
  this.missile.sourceHeight = 16;
  this.missile.width = 16;
  this.missile.height = 16;
  
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