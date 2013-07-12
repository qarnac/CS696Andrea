function Cannon(canvas) {
	this.x = canvas.width / 2 - this.width / 2;
	this.y = 280;
	
	//Cannon Directions
	this.moveRight = false;
	this.moveLeft = false;
	
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
    this.vx = -8;
  }
  //Right
  if(this.moveRight && !this.moveLeft)
  {
	//console.log("right");
    this.vx = 8;
  }
  
  //UP
  if(this.moveUP && !this.moveDown)
  {
	this.vy = -8;
  }
  
  //DOWN
  if(this.moveDown && !this.moveUP)
  {
	this.vy = 8;
  }

  //Set the cannon's velocity to zero if none of the keys are being pressed
  if(!this.moveLeft && !this.moveRight)
  {
	//console.log("cannon velocity");
    this.vx = 0;
  }
  
  //Move the cannon and keep it within the screen boundaries
  this.x = Math.max(0, Math.min(this.x + this.vx, canvas.width - this.width));
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