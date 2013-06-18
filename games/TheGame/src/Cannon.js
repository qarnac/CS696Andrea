function Cannon(canvas) {
	this.x = canvas.width / 2 - this.width / 2;
	this.y = 280;
	
	//Cannon Directions
	this.moveRight = false;
	this.moveLeft = false;
}

Cannon.prototype = new Entity();


Cannon.prototype.moveAction = function() {
   
  //Left
  if(this.moveLeft && !this.moveRight)
  {
	console.log("left");
    this.vx = -8;
  }
  //Right
  if(this.moveRight && !this.moveLeft)
  {
	console.log("right");
    this.vx = 8;
  }

  //Set the cannon's velocity to zero if none of the keys are being pressed
  if(!this.moveLeft && !this.moveRight)
  {
	console.log("cannon velocity");
    this.vx = 0;
  }
};

