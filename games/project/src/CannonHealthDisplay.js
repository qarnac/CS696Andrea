function CannonHealthDisplay(camera) {

	this.name = "CannonHealth";
	this.sourceX = 300;
	this.sourceWidth = 108;
	this.width = 108;
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
		return 1;
	}
	else
		return 0;
	
	//supposed to return health
	return 1;
};

CannonHealthDisplay.prototype.loseHealth = function() {
	
	var result = -1;
	
	if(this.width > 36)
	{
		this.sourceWidth -= 36;
		this.width -= 36;
		
	}
	
	else if (this.width === 36)
	{
		this.sourceWidth = 1;
		this.width = 1;
	}
	
	return result;
};