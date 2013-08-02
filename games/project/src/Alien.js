function Alien()
{
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.health = 1;
	this.state = this.NORMAL;
	this.shoot = true;
	this.move = true;
}

Alien.prototype = new Entity();

Alien.prototype.update = function(){
	this.sourceX = this.state * this.width;
};

Alien.prototype.fireMissile = function(sprites, alienMissiles){
  
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
  
  //Center it over the alien for release
  this.missile.x = this.centerX() - this.missile.halfWidth();
  this.missile.y = this.y + this.missile.height;
  
  //Set its speed
  if( this.health === 1)
	this.missile.vy = 2;
  else 
	this.missile.vy = 4;
  
  //Push the missile into both the sprites and missiles arrays
  sprites.push(this.missile);
  alienMissiles.push(this.missile);
  
  this.shoot = false;
};

Alien.prototype.moveLeftRight = function(){
	var plusOrMinus = Math.random() < 0.5 ? -2 : 2;
	this.vx = plusOrMinus;
	this.move = false;
}