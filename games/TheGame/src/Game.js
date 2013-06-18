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
	
	//Create the score message
	this.scoreDisplay = Object.create(messageObject);
	this.scoreDisplay.font = "normal bold 30px emulogic";
	this.scoreDisplay.fillStyle = "#00FF00";
	this.scoreDisplay.x = 400;
	this.scoreDisplay.y = 10;
	this.messages.push(this.scoreDisplay);

	//The game over message
	this.gameOverMessage = Object.create(messageObject);
	this.gameOverMessage.font = "normal bold 20px emulogic";
	this.gameOverMessage.fillStyle = "#00FF00";
	this.gameOverMessage.x = 70;
	this.gameOverMessage.y = 120;
	this.gameOverMessage.visible = false;
	this.messages.push(this.gameOverMessage);

}

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


Game.prototype.render = function() 
{ 
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  //Display the sprites
  if(sprites.length !== 0)
  {
    for(var i = 0; i < sprites.length; i++)
    {
      var sprite = sprites[i];
      drawingSurface.drawImage
      (
        image, 
        sprite.sourceX, sprite.sourceY, 
        sprite.sourceWidth, sprite.sourceHeight,
        Math.floor(sprite.x), Math.floor(sprite.y), 
        sprite.width, sprite.height
      ); 
    }
  }

  //Display game messages
  if(messages.length !== 0)
  {
    for(var i = 0; i < messages.length; i++)
	{
	  var message = messages[i];
	  if(message.visible)
	  {
	    drawingSurface.font = message.font;  
        drawingSurface.fillStyle = message.fillStyle;
        drawingSurface.textBaseline = message.textBaseline;
		drawingSurface.fillText(message.text, message.x, message.y);  
	  }
	}
  }
}


Game.prototype.playGame = function(canvas, cannon, missiles) 
{
  //Left
  if(this.moveLeft && !this.moveRight)
  {
    cannon.vx = -8;
  }
  //Right
  if(this.moveRight && !this.moveLeft)
  {
    cannon.vx = 8;
  }

  //Set the cannon's velocity to zero if none of the keys are being pressed
  if(!this.moveLeft && !this.moveRight)
  {
    cannon.vx = 0;
  }

  //Fire a missile if game.shoot is true
  if(this.shoot)
  {
    //fireMissile();
    this.shoot = false;	
  }
  
  //Move the cannon and keep it within the screen boundaries
  cannon.x = Math.max(0, Math.min(cannon.x + cannon.vx, canvas.width - cannon.width));
  
  //Move the missiles
  for(var i = 0; i < missiles.length; i++)
  {
    var missile = missiles[i];

    //Move it up the screen
    missile.y += missile.vy;

    //Remove the missile if it crosses the top of the screen
    if(missile.y < 0 - missile.height)
    { 
      //Remove the missile from the missiles array
      removeObject(missile, missiles);

      //Remove the missile from the sprites array
      removeObject(missile, sprites);

      //Reduce the loop counter by 1 to compensate 
      //for the removed element
      i--;
    }
  }

  //Make the aliens

  //Add one to the game.alienTimer
  this.alienTimer++;

  //Make a new alien if game.alienTimer equals the game.alienFrequency
  if(this.alienTimer === this.alienFrequency)
  {
    makeAlien();
    this.alienTimer = 0;

    //Reduce game.alienFrequency by one to gradually increase
    //the frequency that aliens are created
    if(this.alienFrequency > 2)
    {  
      this.alienFrequency--;
    }
  }

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
      this.gameState = game.OVER;
    }
  }
  
  //--- The collisions 

  //Check for a collision between the aliens and missiles
  for(var i = 0; i < this.aliens.length; i++)
  {
    var alien = this.aliens[i];

    for(var j = 0; j < missiles.length; j++)
    {
      var missile = missiles[j];

      if(hitTestRectangle(missile, alien)
      && alien.state === alien.NORMAL)
      {
        //Destroy the alien
        destroyAlien(alien);

        //Update the score
        this.score++;

        //Remove the missile
        removeObject(missile, missiles);
        removeObject(missile, sprites);

        //Subtract 1 from the loop counter to compensate
        //for the removed missile
        j--;
      }
    }
  }
  
  //--- The score 

  //Display the score
  this.scoreDisplay.text = this.score;

  //Check for the end of the game
  if(this.score === this.scoreNeededToWin)
  {
    this.gameState = this.OVER;
  }
}
