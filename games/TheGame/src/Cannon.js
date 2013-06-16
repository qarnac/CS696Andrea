function Cannon() {

}

Cannon.prototype = new Entity();

Cannon.prototype.getName = function() {
	return this.name;
};

