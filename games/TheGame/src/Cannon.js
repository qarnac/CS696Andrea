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
