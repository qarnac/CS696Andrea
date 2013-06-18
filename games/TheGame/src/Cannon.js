function Cannon(canvas) {
	this.x = canvas.width / 2 - this.width / 2;
	this.y = 280;
	
	//Cannon Directions
	this.moveRight = false;
	this.moveLeft = false;
}

Cannon.prototype = new Entity();


Cannon.prototype.getName = function() {
	return this.name;
};

