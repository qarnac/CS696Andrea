function Cannon()
{
	this.prototype = new Entity();
	this.prototype.constructor = Entity;
	
	
};
//this.prototype = new Entity();

Cannon.prototype.getName = function() {
	return this.name;
};

