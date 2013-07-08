function Alien()
{
	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.state = this.NORMAL;
}

Alien.prototype = new Entity();

Alien.prototype.update = function(){
	this.sourceX = this.state * this.width;
};

