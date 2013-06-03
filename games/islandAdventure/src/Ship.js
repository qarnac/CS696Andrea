//class constructor
function Ship(row, col)
{
	this.shipRow = row;
	this.shipColumn = col;
}

//class method
Ship.prototype.move = function(navigate)
{
	console.log(map);
	console.log(ValuefOfTargetMoveLocation);

	if(ValuefOfTargetMoveLocation != SHIP || ValuefOfTargetMoveLocation != WATER )
	{
		//Clear the ship's current cell
		map[shipRow][shipColumn] = ValuefOfTargetMoveLocation;
	}
	else
	{
		map[shipRow][shipColumn] = 0;
	}
	
	if(ValuefOfTargetMoveLocation != SHIP || ValuefOfTargetMoveLocation != WATER )
	{
		//Clear the ship's current cell
		map[shipRow][shipColumn] = ValuefOfTargetMoveLocation;
	}
	else
	{
		map[shipRow][shipColumn] = 0;
	}
  
		switch(navigate)
		{
		case UP:
		if(shipRow > 0)
		{ 
			ValuefOfTargetMoveLocation = map[shipRow-1][shipColumn];

			//Subract 1 from the ship's row
			shipRow--;

			//Apply the ship's new updated position to the array
			map[shipRow][shipColumn] = SHIP;
		}
		break;

		case DOWN:
		if(shipRow < ROWS - 1)
		{		  
			ValuefOfTargetMoveLocation = map[shipRow+1][shipColumn];
			shipRow++;
			map[shipRow][shipColumn] = SHIP;
		}
		break;

		case LEFT:
		if(shipColumn > 0)
		{		  
			ValuefOfTargetMoveLocation = map[shipRow][shipColumn-1];

			shipColumn--;
			map[shipRow][shipColumn] = SHIP;
		}
		break;  

		case RIGHT:
		if(shipColumn < COLUMNS - 1)
		{ 
			ValuefOfTargetMoveLocation = map[shipRow][shipColumn+1]; 
			shipColumn++;
			map[shipRow][shipColumn] = SHIP;
		}
		break; 
	}
}
