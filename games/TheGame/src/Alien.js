function Alien()
{
	this.name = "alien";
	this.sourceX = 32;
	
	alien.sourceX = 32;

	//Set its y position above the screen boundary
	alien.y = 0 - alien.height;
	
	//Assign the alien a random x position
	var randomPosition = Math.floor(Math.random() * 15);
	//var randomPosition = Math.floor(Math.random() * (canvas.width / alien.width));
	alien.x = randomPosition * alien.width;
	
	//Set its speed
	alien.vy = 1;

}

Alien.prototype.getName = function() {
	return this.name;
};