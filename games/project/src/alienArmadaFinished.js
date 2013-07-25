(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//Arrays to store the game objects and assets to load
var sprites = [];
var assetsToLoad = [];
var messages = [];

//Create the background
var background = new Entity();
background.sourceY = 64;
background.sourceWidth = 4000;
background.sourceHeight = 3000;
background.width = 4000;
background.height = 3000;
//background.sourceWidth = 2046;
//background.sourceHeight = 748;
//background.width = 2561;
//background.height = 1922;
background.x = 0 //-(background.width - canvas.width) / 2; 
background.y = 0//-(background.height - canvas.height) / 2;
sprites.push(background);


var gameWorld = 
{
	x: 0,
	y: 0,
	width: background.width,
	height: background.height
};

var camera = 
{
	x: 0,
	y: 0,
	width: canvas.width,
	height: canvas.height,

	//The camera's inner scroll boundaries
	rightInnerBoundary: function()
	{
		return this.x + (this.width * 0.75);
	},
	leftInnerBoundary: function()
	{
		return this.x + (this.width * 0.25);
	},
	topInnerBoundary: function()
	{
		return this.y + (this.height * 0.25);
	},
	bottomInnerBoundary: function()
	{
		return this.y + (this.height * 0.75);
	}
};

//Center the camera over the gameWorld
camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;

var cannon = new Cannon(canvas);
cannon.x = (gameWorld.x + gameWorld.width / 2) - cannon.width / 2;
cannon.y = (gameWorld.y + gameWorld.height / 2) - cannon.height / 2;
sprites.push(cannon);

var cannonHealthDisplay = new CannonHealthDisplay(camera);
sprites.push(cannonHealthDisplay);


//Create the score message
var scoreDisplay = Object.create(messageObject);
scoreDisplay.font = "normal bold 30px emulogic";
scoreDisplay.fillStyle = "#00FF00";
scoreDisplay.x = camera.x + 500;
scoreDisplay.y = camera.y + 10;
messages.push(scoreDisplay);


//The game over message
var gameOverMessage = Object.create(messageObject);
gameOverMessage.font = "normal bold 20px emulogic";
gameOverMessage.fillStyle = "#00FF00";
gameOverMessage.x = camera.x + 70;
gameOverMessage.y = camera.y + 120;
gameOverMessage.visible = false;
messages.push(gameOverMessage);

var gameStatusMessage = Object.create(messageObject);
gameStatusMessage.font = "normal bold 20px emulogic";
gameStatusMessage.fillStyle = "#00FF00";
gameStatusMessage.x = camera.x + 70;
gameStatusMessage.y = camera.y + 120;
gameStatusMessage.visible = false;
messages.push(gameStatusMessage);

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/background.png";
assetsToLoad.push(image);

//Load the tilesheet image
var image2 = new Image();
image2.addEventListener("load", loadHandler, false);
image2.src = "../images/alienArmadaRED3.png";
assetsToLoad.push(image2);


//var image2 = new Image();
//image.addEventListener("load", loadHandler, false);
//image.src = "../images/alienArmadaRED3.png";
//assetsToLoad.push(image2);

var game = new Game();

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
	switch(event.keyCode)
	{
		case game.LEFT:
			cannon.moveLeft = true;
			break;  
	    
		case game.RIGHT:
			cannon.moveRight = true;
			break;
		
		case game.UP:
			cannon.moveUp = true;
			break;
		
		case game.DOWN:
			cannon.moveDown = true;
			break;
	 
		case game.SPACE:
			if(!game.spaceKeyIsDown)
			{
				cannon.shoot = true;
				cannon.spaceKeyIsDown = true;
			}
		break;
	}

}, false);

window.addEventListener("keyup", function(event)
{
	switch(event.keyCode)
	{	    
		case game.LEFT:
			cannon.moveLeft = false;
			break;  
			
		case game.RIGHT:
			cannon.moveRight = false;
			break; 
			
		case game.UP:
			cannon.moveUp = false;
			break;
		
		case game.DOWN:
			cannon.moveDown = false;
			break;
		
		case game.SPACE:
			cannon.spaceKeyIsDown = false;
	}
}, false);

//Start the game animation loop
update();

function update()
{ 
  //The animation loop
  requestAnimationFrame(update, canvas);
  
  //Change what the game is doing based on the game state
  switch(game.gameState)
  {
    case game.LOADING:
      console.log("game.LOADING…");
      break;
    
    case game.PLAYING:
      playGame();
      break;
    
    case game.OVER:
      game.endGame(gameOverMessage, camera);
      break;
  }
  
  //Render the game
  render();
}

function loadHandler()
{ 
  game.assetsLoaded++;
  
  if(game.assetsLoaded === assetsToLoad.length)
  {
	console.log("in here");
    image.removeEventListener("load", loadHandler, false);
	image2.removeEventListener("load", loadHandler, false);
    //Start the game 
    game.gameState = game.PLAYING;
  }
}


function playGame()
{
  cannon.moveAction(canvas, camera, gameWorld);
  
  //Fire a missile if game.shoot is true
  if(cannon.shoot)
  {
	cannon.fireMissile(sprites);
  }
  
  //Move the missiles THIS IS PART OF GAME CLASS
  for(var i = 0; i < cannon.missiles.length; i++)
  {
    var missile = cannon.missiles[i];

    //Move it up the screen
    missile.y += missile.vy;

    //Remove the missile if it crosses the top of the screen
    if(missile.y < 0 - missile.height)
    { 
      //Remove the missile from the missiles array
      removeObject(missile, cannon.missiles);

      //Remove the missile from the sprites array
      removeObject(missile, sprites);

      //Reduce the loop counter by 1 to compensate 
      //for the removed element
      i--;
    }
  }

  for(var i = 0; i < game.aliens.length; i++)
  {
	var alien = game.aliens[i];
	var myVar;
	
	
	if( alien.shoot === true)
	{
		alien.fireMissile(sprites,game.alienMissiles);
	}
	
  }
  
	//Move the missiles THIS IS PART OF GAME CLASS
	for(var l = 0; l < game.alienMissiles.length; l++)
	{
		
		var missile = game.alienMissiles[l];
		
		//Move it up the screen
		missile.y += missile.vy;

		//Remove the missile if it crosses the top of the screen
		if(missile.y < 0 - missile.height)
		{ 
		  //Remove the missile from the missiles array
		  removeObject(missile, game.alienMissiles);

		  //Remove the missile from the sprites array
		  removeObject(missile, sprites);

		  //Reduce the loop counter by 1 to compensate 
		  //for the removed element
		  l--;
		}
	}
  
  game.alienSpawnTimer(sprites, camera);
  
  cannonHealthDisplay.gainHealth();
  
  game.alienAndItemDropDownAndStatus(canvas);

  //Check for a collision between the aliens and missiles
  for(var i = 0; i < game.aliens.length; i++)
  {
    var alien = game.aliens[i];
	var item  = game.items[i];

    for(var j = 0; j < cannon.missiles.length; j++)
    {
      var missile = cannon.missiles[j];

      if(hitTestRectangle(missile, alien)
      && alien.state === alien.NORMAL)
      {
        //Destroy the alien
        destroyAlien(alien);

        //Update the score
        game.score++;

        //Remove the missile
        removeObject(missile, cannon.missiles);
        removeObject(missile, sprites);

        //Subtract 1 from the loop counter to compensate
        //for the removed missile
        j--;
      }
    }
	
	// Bug detection on collision
	for(var j = 0; j < game.items.length;j++)
    {
		var item = game.items[j];
		
		if( hitTestRectangle(item, cannon) )
		{
			removeObject(item, sprites);
		}
		
	}
	
	for(var j = 0; j < game.alienMissiles.length; j++)
    {
		var missile = game.alienMissiles[j];
		
		if( hitTestRectangle(missile, cannon) )
		{
			game.gameState = game.OVER;
			break;
		}
		
	}
	
	
	if(hitTestRectangle(cannon, alien)
      && alien.state === alien.NORMAL)
    {
		
		game.gameState = game.OVER;
    }
  }
  
  
  //display Cannon Health
  cannonHealthDisplay.display(camera);
  
  //--- The score 

  //Display the score
  scoreDisplay.text = game.score;
  scoreDisplay.x = camera.x + 500;
  scoreDisplay.y = camera.y + 10;
  

  //Check for the end of the game
  if(game.score === game.scoreNeededToWin)
  {
    game.gameState = game.OVER;
  }
  
}

function destroyAlien(alien)
{
  //Change the alien's state and update the object 
  alien.state = alien.EXPLODED;
  alien.update();  
  
  //Remove the alien after 1 second
  setTimeout(removeAlien, 1000);

  //Play the explosion sound
  //explosionSound.currentTime = 0;
  //explosionSound.play();
  
  function removeAlien()
  {
    removeObject(alien, game.aliens);
    removeObject(alien, sprites);
  }
}

function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}


function render()
{ 
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  
  drawingSurface.save();
  
  //Move the drawing surface so that it's positioned relative to the camera
  drawingSurface.translate(-camera.x, -camera.y);
  
  //Loop through all the sprites and use their properties to display them
	if(sprites.length !== 0)
	{
		for(var i = 0; i < sprites.length; i++)
		{
			var sprite = sprites[i];
			
			if(sprite instanceof Alien || sprite instanceof Cannon || sprite instanceof Missile ||
			   sprite instanceof Item || sprite.name === "CannonHealth")
			{
				drawingSurface.drawImage
				(
					image2, 
					sprite.sourceX, sprite.sourceY, 
					sprite.sourceWidth, sprite.sourceHeight,
					Math.floor(sprite.x), Math.floor(sprite.y), 
					sprite.width, sprite.height
				);
			}
			else
			{
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
	
		drawingSurface.restore();
	}
	
}());
