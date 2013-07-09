function Alien()
{
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.state = this.NORMAL;
	this.shoot = true;

}

Alien.prototype = new Entity();

Alien.prototype.update = function(){
	this.sourceX = this.state * this.width;
};

Alien.prototype.fireMissile = function(sprites){

  if( this.shoot === false)
	return;

  //Create a missile sprite
  this.missile = new Entity();
  this.missile.sourceX = 96;
  this.missile.sourceWidth = 16;
  this.missile.sourceHeight = 16;
  this.missile.width = 16;
  this.missile.height = 16;
  
  //Center it over the alien for release
  this.missile.x = this.centerX() - this.missile.halfWidth();
  this.missile.y = this.y + this.missile.height;
  
  //Set its speed
  this.missile.vy = 2;
  
  //Push the missile into both the sprites and missiles arrays
  sprites.push(this.missile);
  this.missiles.push(this.missile);
  
  this.shoot = false;
};