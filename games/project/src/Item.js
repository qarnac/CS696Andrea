function Item()
{
	this.NORMAL = 1;
	this.ACQUIRED = 2;
	this.state = this.NORMAL;
	this.move = true;
}

Item.prototype = new Entity();

Item.prototype.update = function(){
	this.sourceX = this.state * this.width;
};
