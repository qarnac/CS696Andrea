function Missile()
{

	this.NORMAL = 1;
	this.EXPLODED = 2;
	this.state = this.NORMAL;
	
	this.sourceX = 96;
	this.sourceY = 0;
	this.sourceWidth = 32;
	this.sourceHeight = 32;
	this.width = 16;
	this.height = 16;
  
}

Missile.prototype = new Entity();


