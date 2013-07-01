function Entity() {
	this.sourceX= 0;
	this.sourceY= 0;
	this.sourceWidth= 64;
	this.sourceHeight= 64;
	this.width= 64;
	this.height= 64;
	this.x= 0;
	this.y= 0;
	this.vx= 0;
	this.vy= 0;
	this.visible= true;
	
	//Physics properties
	this.accelerationX= 0;
	this.accelerationY= 0;
	this.speedLimit= 5;
	this.friction= 0.96;
	this.bounce= -0.7;
	this.gravity= 0.3;
	
	//Platform game properties
	this.isOnGround= undefined;
	this.jumpForce= -10;			
}


Entity.prototype.centerX = function() {
	return this.x + (this.width / 2);
};

Entity.prototype.centerY = function() {
	return this.y + (this.height / 2);
};

Entity.prototype.halfWidth = function() {
	return this.width / 2;
};

Entity.prototype.halfHeight = function() {
	return this.height / 2;
};


