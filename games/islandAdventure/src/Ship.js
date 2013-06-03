//class constructor
function Ship(row, col)
{
	this.shipRow = row;
	this.shipColumn = col;
    this.food = 10;
	this.gold = 10;
	this.experience = 0;
	this.ValuefOfTargetMoveLocation = 0; //means the location is empty
}

Ship.prototype.fight = function()
{
  //The ships strength
  var shipStrength = Math.ceil((this.food + this.gold) / 2);
  
  //A random number between 1 and the ship's strength
  var pirateStrength = Math.ceil(Math.random() * shipStrength * 2);
  
  if(pirateStrength > shipStrength)
  {
    //The pirates ransack the ship
    var stolenGold = Math.round(pirateStrength / 2);
    this.gold -= stolenGold;
    
    //Give the player some ship.experience for trying  
    this.experience += 1;
    
    //Update the game message
    gameMessage 
      = "You fight and LOSE " + stolenGold + " gold pieces."
      + " Ship's strength: " + shipStrength 
      + " Pirate's strength: " + pirateStrength;
  }
  else
  {
    //You win the pirates' gold
    var pirateGold = Math.round(pirateStrength / 2);
    this.gold += pirateGold;
    
    //Add some ship.experience  
    this.experience += 2;
    
    //Update the game message
    gameMessage 
      = "You fight and WIN " + pirateGold + " gold pieces."
      + " Ship's strength: " + shipStrength 
      + " Pirate's strength: " + pirateStrength;
  } 
}

Ship.prototype.trade = function()
{
  //Figure out how much food the island has
  //and how much it should cost
  var islandsFood = this.experience + this.gold;
  var cost = Math.ceil(Math.random() * islandsFood);
  
  //Let the player buy food if there's enough gold
  //to afford it
  if(this.gold > cost)
  {
    this.food += islandsFood;
    this.gold -= cost;
    this.experience += 2;
    
    gameMessage 
      = "You buy " + islandsFood + " coconuts"
      + " for " + cost + " gold pieces."
  }
  else
  {
    //Tell the player if they don't have enough gold
    this.experience += 1;
    gameMessage = "You don't have enough gold to buy food."
  }
}

//class method
Ship.prototype.move = function(navigate)
{
	console.log(map);
	console.log(this.ValuefOfTargetMoveLocation);

	if(this.ValuefOfTargetMoveLocation != SHIP || this.ValuefOfTargetMoveLocation != WATER )
	{
		//Clear the ship's current cell
		map[shipRow][shipColumn] = this.ValuefOfTargetMoveLocation;
	}
	else
	{
		map[shipRow][shipColumn] = 0;
	}
	
	if(this.ValuefOfTargetMoveLocation != SHIP || this.ValuefOfTargetMoveLocation != WATER )
	{
		//Clear the ship's current cell
		map[shipRow][shipColumn] = this.ValuefOfTargetMoveLocation;
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
			this.ValuefOfTargetMoveLocation = map[shipRow-1][shipColumn];

			//Subract 1 from the ship's row
			shipRow--;

			//Apply the ship's new updated position to the array
			map[shipRow][shipColumn] = SHIP;
		}
		break;

		case DOWN:
		if(shipRow < ROWS - 1)
		{		  
			this.ValuefOfTargetMoveLocation = map[shipRow+1][shipColumn];
			shipRow++;
			map[shipRow][shipColumn] = SHIP;
		}
		break;

		case LEFT:
		if(shipColumn > 0)
		{		  
			this.ValuefOfTargetMoveLocation = map[shipRow][shipColumn-1];

			shipColumn--;
			map[shipRow][shipColumn] = SHIP;
		}
		break;  

		case RIGHT:
		if(shipColumn < COLUMNS - 1)
		{ 
			this.ValuefOfTargetMoveLocation = map[shipRow][shipColumn+1]; 
			shipColumn++;
			map[shipRow][shipColumn] = SHIP;
		}
		break; 
	}
}
