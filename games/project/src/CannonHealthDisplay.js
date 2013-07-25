function CannonHealthDisplay(camera) {

	this.name = "CannonHealth";
	this.sourceX = 300;
	this.sourceWidth = 180;
	this.width = 150;
	this.x = camera.x + 20;
	this.y = camera.y + 10;
	
}

CannonHealthDisplay.prototype = new Entity();


CannonHealthDisplay.prototype.display = function(camera) {
  this.x = camera.x + 20;
  this.y = camera.y + 10;
};