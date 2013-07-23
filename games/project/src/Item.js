function Item()
{
	this.NORMAL = 1;
	this.state = this.NORMAL;
	this.move = true;
}

Item.prototype = new Entity();

Item.prototype.update = function(){
	this.sourceX = this.state * this.width;
};
