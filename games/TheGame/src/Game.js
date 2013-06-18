function Game()
{
	this.aliens = [];

	//Game variables
	this.score = 0;
	this.scoreNeededToWin = 60;
	this.alienFrequency = 100;
	this.alienTimer = 0;
	
	//Variable to count the number of assets the game needs to load
	this.assetsLoaded = 0;

	//Game states
	this.LOADING = 0;
	this.PLAYING = 1;
	this.OVER = 2;
	this.gameState = this.LOADING;

	//Arrow key codes
	this.RIGHT = 39;
	this.LEFT = 37;
	this.SPACE = 32;
}

// Integrated
Game.prototype.endGame = function(gameOverMessage)
{
  gameOverMessage.visible = true;
  if(this.score < this.scoreNeededToWin)
  {
    gameOverMessage.text = "EARTH DESTROYED!";
  }
  else
  {
    gameOverMessage.x = 120;
    gameOverMessage.text = "EARTH SAVED!";
  }
};

Game.prototype.makeAlien = function(sprites)
{
  //Create the alien
  var alien = Object.create(alienObject);
  alien.sourceX = 32;
  
  //Set its y position above the screen boundary
  alien.y = 0 - alien.height;
  
  //Assign the alien a random x position
  var randomPosition = Math.floor(Math.random() * 15);
  //var randomPosition = Math.floor(Math.random() * (canvas.width / alien.width));
  alien.x = randomPosition * alien.width;
  
  //Set its speed
  alien.vy = 1;
  
  //Push the alien into both the sprites and aliens arrays
  sprites.push(alien);
  this.aliens.push(alien);
};

Game.prototype.alienSpawnTimer = function(sprites){
	  
  //Add one to the game.alienTimer
  this.alienTimer++;

  //Make a new alien if game.alienTimer equals the game.alienFrequency
  if(this.alienTimer === this.alienFrequency)
  {
    this.makeAlien(sprites);
    this.alienTimer = 0;

    //Reduce game.alienFrequency by one to gradually increase
    //the frequency that aliens are created
    if(this.alienFrequency > 2)
    {  
      this.alienFrequency--;
    }
  }
};


Game.prototype.alienDropDownAndStatus = function(canvas){
  //Loop through the aliens
  for(var i = 0; i < this.aliens.length; i++)
  { 
    var alien = this.aliens[i];

    if(alien.state === alien.NORMAL)
    {
      //Move the current alien if its state is NORMAL
      alien.y += alien.vy;
    }

    //Check if the alien has crossed the bottom of the screen
    if(alien.y > canvas.height + alien.height)
    { 
      //End the game if an alien has reached Earth
      this.gameState = this.OVER;
    }
  }

};

