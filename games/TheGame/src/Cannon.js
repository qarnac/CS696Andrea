function Cannon() {
  // Call the parent constructor
  //Entity.call(this);
}

Cannon.prototype = new Entity();

// correct the constructor pointer because it points to Person
Cannon.prototype.constructor = Cannon;

Cannon.prototype.getName = function() {
	return this.name;
};

