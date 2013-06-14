function Cannon()
{
	this.name = "canon";
	
	//Directions
	this.moveRight = false;
	this.moveLeft = false;
	this.shoot = false;
	
};
//this.prototype = new Entity();

Cannon.prototype.getName = function() {
	return this.name;
};

Cannon.prototype.move = function() {
  //Left
  if(this.moveLeft && !this.moveRight)
  {
    this.vx = -8;
  }
  //Right
  if(this.moveRight && !this.moveLeft)
  {
    this.vx = 8;
  }

  //Set the cannon's velocity to zero if none of the keys are being pressed
  if(!this.moveLeft && !this.moveRight)
  {
    this.vx = 0;
  }

  //Fire a missile if shoot is true
  if(shoot)
  {
    fireMissile();
    this.shoot = false;	
  }
};

