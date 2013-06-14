function Alien()
{
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.state = this.NORMAL;
	
	//this.prototype = new Entity();
	//this.prototype.constructor = Entity;

}

Alien.prototype.getName = function() {
	return this.name;
};

Alien.prototype = new Entity();

Alien.prototype.update = function() {
	this.prototype.sourceX = this.state * this.prototype.width;
};