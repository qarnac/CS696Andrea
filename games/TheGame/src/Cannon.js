function Cannon() {
  // Call the parent constructor
  //Cannon.call(this);
}

Cannon.prototype = new Entity();



Cannon.prototype.getName = function() {
	return this.name;
};

