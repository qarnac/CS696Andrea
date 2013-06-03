function Map()
{
	this.map =
	[
		[0, 2, 0, 0, 0, 3],
		[0, 0, 5, 1, 0, 0],
		[0, 1, 0, 0, 0, 0],
		[0, 0, 0, 0, 2, 0],
		[0, 2, 0, 1, 0, 0],
		[4, 0, 0, 0, 0, 0]
	];
	
	this.WATER = 0;
	this.ISLAND = 1;
	this.PIRATE = 2;
	this.HOME = 3;
	this.SHIP = 4;
	this.MONSTER = 5;
	
	for(var row = 0; row < ROWS; row++) 
	{	
	  for(var column = 0; column < COLUMNS; column++) 
	  {
		if(map[row][column] === SHIP)
		{ 
		  shipRow = row;
		  shipColumn = column;
		}
		if(map[row][column] === MONSTER)
		{ 
		  monsterRow = row;
		  monsterColumn = column;
		}
	  }
	}
}