function ClockStopper()
{
	this.name = "Clock";
	this.sourceX = 608;
}

ClockStopper.prototype = new Item();


ClockStopper.prototype.haltAllObjects = function(game) {
	
	for(var i = 0; i < game.aliens.length; i++)
	{
		var alien = game.aliens[i];
		
		alien.vx = 0;
		alien.vy = 0;

	}
	
	//Move the missiles THIS IS PART OF GAME CLASS
	for(var l = 0; l < game.alienMissiles.length; l++)
	{
		var missile = game.alienMissiles[l];
		
		missile.vx = 0;
		missile.vy = 0;
	}
	
};

ClockStopper.prototype.UnHaltAllObjects = function(game) {
	
	for(var i = 0; i < game.aliens.length; i++)
	{
		var alien = game.aliens[i];
		
		alien.vy = 1;
		setTimeout(function(){alien.moveLeftRight()},2000);

	}
	
	//Move the missiles THIS IS PART OF GAME CLASS
	for(var l = 0; l < game.alienMissiles.length; l++)
	{
		var missile = game.alienMissiles[l];
		
		missile.vy = 1;
	}
	
	game.TIMESTOP = false;
	
};


