function CannonHealthDisplay(camera) {
	this.name = "CannonHealth";
	this.sourceX = 300;
	this.sourceWidth = 144;
	this.width = 144;
	this.x = camera.x + 20;
	this.y = camera.y + 10;
	
}

CannonHealthDisplay.prototype = new Entity();

CannonHealthDisplay.prototype.display = function(camera) {
	this.x = camera.x + 20;
	this.y = camera.y + 10;
};


CannonHealthDisplay.prototype.gainHealth = function() {

	if(this.width < 180)
	{
		this.sourceWidth += 36;
		this.width += 36;
	}
	
	//supposed to return health
	return 1;
};

CannonHealthDisplay.prototype.loseHealth = function() {
	
	if(this.width > 36)
	{
		this.sourceWidth -= 36;
		this.width -= 36;
	}
	
	//supposed to return health
	return 1;
};