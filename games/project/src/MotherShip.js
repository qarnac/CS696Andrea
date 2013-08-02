function MotherShip()
{
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.state = this.NORMAL;
	this.shoot = true;
	this.move = true;
	this.health = 10;
}

MotherShip.prototype = new Entity();

MotherShip.prototype.update = function(){
	this.sourceX = this.state * this.width;
};

MotherShip.prototype.fireMissile = function(sprites, MotherShipMissiles){
  
	if( this.shoot === false)
		return;

	//Create a missile sprite
	this.missile = new Missile();
	this.missile.sourceX = 96;
	this.missile.sourceY = 0;
	this.missile.sourceWidth = 32;
	this.missile.sourceHeight = 32;
	this.missile.width = 16;
	this.missile.height = 16;

	//Center it over the MotherShip for release
	this.missile.x = this.centerX() - this.missile.halfWidth();
	this.missile.y = this.y + this.missile.height;

	//Set its speed
	this.missile.vy = 2;

	//Push the missile into both the sprites and missiles arrays
	sprites.push(this.missile);
	MotherShipMissiles.push(this.missile);

	this.shoot = false;
};