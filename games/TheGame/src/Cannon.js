function Cannon()
{
	this.test = "test";	
};

Cannon.prototype = new Entity();

Cannon.prototype.getName = function() {
	return this.name;
};

