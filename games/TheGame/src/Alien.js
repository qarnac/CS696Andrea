function Alien()
{
	this.alienObject = Object.create(spriteObject);
	this.alienObject.NORMAL = 1;
	this.alienObject.EXPLODED = 2;
	this.alienObject.state = alienObject.NORMAL;
}

Alien.prototype = new Entity();

Alien.prototype.update = function(){
	this.sourceX = this.state * this.width;
};