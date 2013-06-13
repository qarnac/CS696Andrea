function Canon()
{
	this.name = "canon";
	
	this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = 32;
    this.sourceHeight = 32;
    this.width = 32;
    this.height= 32;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.visible = true;
	
	//Directions
	this.moveRight = false;
	this.moveLeft = false;
	this.shoot = false;

}

Canon.prototype.getName = function() {
	return this.name;
};

Canon.prototype.move = function() {
  //Left
  if(moveLeft && !moveRight)
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

