function Alien()
{
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.state = this.NORMAL;

}

Alien.prototype.getName = function() {
	return this.name;
};

Alien.prototype.update = function() {
	this.sourceX = this.state * this.width;
};