function Game()
{
	//Game variables
	this.score = 0;
	this.scoreNeededToWin = 60;
	this.alienFrequency = 100;
	this.alienTimer = 0;
	
	//Arrays to store the game objects and assets to load
	this.sprites = [];
	this.assetsToLoad = [];
	this.aliens = [];
	this.messages = [];

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

	//Directions
	this.moveRight = false;
	this.moveLeft = false;

	//Variables to help fire missiles
	this.shoot = false;
	this.spaceKeyIsDown = false;

	//Game variables
	this.score = 0;
	this.scoreNeededToWin = 60;
	this.alienFrequency = 100;
	this.alienTimer = 0;

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
}

