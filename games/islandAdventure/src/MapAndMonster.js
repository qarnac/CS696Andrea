function Monster(row, col)
{
	this.monsterRow = row;
	this.monsterColumn = col;
}

Monster.prototype.move = function() {
  //The 4 possible directions that the monster can move
  var UP = 1;
  var DOWN = 2;
  var LEFT = 3;
  var RIGHT = 4;
  
  //An array to store the valid direction that
  //the monster is allowed to move in
  var validDirections = [];
  
  //The final direction that the monster will move in
  var direction = undefined;
  
  //Find out what kinds of things are in the cells 
  //that surround the monster. If the cells contain water,
  //push the corresponding direction into the validDirections array
  if(this.monsterRow > 0)
  {
    var thingAbove = map[this.monsterRow - 1][this.monsterColumn];
    if(thingAbove === WATER)
	  {
	    validDirections.push(UP);
	  }
  }
  if(this.monsterRow < ROWS - 1)
  { 
    var thingBelow = map[this.monsterRow + 1][this.monsterColumn];
    if(thingBelow === WATER)
	  {
	    validDirections.push(DOWN);
	  }
  }
  if(this.monsterColumn > 0)
  {
    var thingToTheLeft = map[this.monsterRow][this.monsterColumn - 1];
    if(thingToTheLeft === WATER)
	  {
	    validDirections.push(LEFT);
	  }
  } 
  if(this.monsterColumn < COLUMNS - 1)
  {
    var thingToTheRight = map[this.monsterRow][this.monsterColumn + 1];
    if(thingToTheRight === WATER)
	  {
	    validDirections.push(RIGHT);
	  }
  } 
  
  //The validDirections array now contains 0 to 4 directions that the 
  //contain WATER cells. Which of those directions will the monster
  //choose to move in?
  
  //If a valid direction was found, Randomly choose one of the 
  //possible directions and assign it to the direction variable
  if(validDirections.length !== 0)
  {
    var randomNumber = Math.floor(Math.random() * validDirections.length);
    direction = validDirections[randomNumber];
  }
  
  //Move the monster in the chosen direction
  switch(direction)
  {
    case UP:
      //Clear the monster's current cell
		  gameObjects[this.monsterRow][this.monsterColumn] = 0;
		  //Subtract 1 from the monster's row
		  this.monsterRow--; 
		  //Apply the monster's new updated position to the array
		  gameObjects[this.monsterRow][this.monsterColumn] = MONSTER;
		  break;
	  
	  case DOWN:
	    gameObjects[this.monsterRow][this.monsterColumn] = 0;
		  this.monsterRow++;
		  gameObjects[this.monsterRow][this.monsterColumn] = MONSTER;
	    break;
	  
	  case LEFT:
	    gameObjects[this.monsterRow][this.monsterColumn] = 0;
		  this.monsterColumn--;
		  gameObjects[this.monsterRow][this.monsterColumn] = MONSTER;
	    break;
	 
	 case RIGHT:
	    gameObjects[this.monsterRow][this.monsterColumn] = 0;
		  this.monsterColumn++;
		  gameObjects[this.monsterRow][this.monsterColumn] = MONSTER;
  }
}