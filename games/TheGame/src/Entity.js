function Entity() {
	
	this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = 32;
    this.sourceHeight = 32;
    this.width = 32;
    this.height= 32;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.visible = true;
	
	/*
	if( type === "alien" )
		this.prototype = new Alien();
	if ( type === "cannon" )
		this.prototype = new Cannon();
	if ( type === "map" )
		this.prototype  = new Map();
	*/
				
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


