(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//Arrays to store the game objects and assets to load
var sprites = [];
var assetsToLoad = [];
var missiles = [];
var aliens = [];
var messages = [];

//Create the background
var background = new Entity();
background.x = 0;
background.y = 0;
background.sourceY = 32;
background.sourceWidth = 480;
background.sourceHeight = 320;
background.width = 480;
background.height = 320;
sprites.push(background);

//Create the cannon and center it
var cannon = new Cannon();
cannon.x = canvas.width / 2 - cannon.width / 2;
cannon.y = 280;
sprites.push(cannon);

//Create the score message
var scoreDisplay = Object.create(messageObject);
scoreDisplay.font = "normal bold 30px emulogic";
scoreDisplay.fillStyle = "#00FF00";
scoreDisplay.x = 400;
scoreDisplay.y = 10;
messages.push(scoreDisplay);

//The game over message
var gameOverMessage = Object.create(messageObject);
gameOverMessage.font = "normal bold 20px emulogic";
gameOverMessage.fillStyle = "#00FF00";
gameOverMessage.x = 70;
gameOverMessage.y = 120;
gameOverMessage.visible = false;
messages.push(gameOverMessage);

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "../images/alienArmada.png";
assetsToLoad.push(image);

//Load the sounds
//var music = document.querySelector("#music");
//music.addEventListener("canplaythrough", loadHandler, false);
//music.load();
//assetsToLoad.push(music);

//var shootSound = document.querySelector("#game.shootSound");
//game.shootSound.addEventListener("canplaythrough", loadHandler, false);
//game.shootSound.load();
//assetsToLoad.push(game.shootSound);

//var explosionSound = document.querySelector("#explosionSound");
//explosionSound.addEventListener("canplaythrough", loadHandler, false);
//explosionSound.load();
//assetsToLoad.push(explosionSound);

var game = new Game();

/*
//Variable to count the number of assets the game needs to load
var game.assetsLoaded = 0;

//Game states
var game.LOADING = 0
var game.PLAYING = 1;
var game.OVER = 2;
var gameState = game.LOADING;

//Arrow key codes
var game.RIGHT = 39;
var game.LEFT = 37;
var game.SPACE = 32;

//Directions
var game.moveRight = false;
var game.moveLeft = false;

//Variables to help fire missiles
var game.shoot = false;
var game.spaceKeyIsDown = false;

//Game variables
var score = 0;
var scoreNeededToWin = 60;
var game.alienFrequency = 100;
var game.alienTimer = 0;
*/

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
  switch(event.keyCode)
  {
	  case game.LEFT:
	    game.moveLeft = true;
	    break;  
	    
	  case game.RIGHT:
	    game.moveRight = true;
	    break;
	 
	  case game.SPACE:
	    if(!game.spaceKeyIsDown)
	    {
	      game.shoot = true;
	      game.spaceKeyIsDown = true;
	    }
   }

}, false);

window.addEventListener("keyup", function(event)
{
  switch(event.keyCode)
  {	    
	  case game.LEFT:
	    game.moveLeft = false;
	    break;  
	    
	  case game.RIGHT:
	    game.moveRight = false;
	    break; 
	
	  case game.SPACE:
	    game.spaceKeyIsDown = false;
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
      endGame();
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
    //Remove the load event listener from the image and sounds
    image.removeEventListener("load", loadHandler, false);
    //music.removeEventListener("canplaythrough", loadHandler, false);
    //game.shootSound.removeEventListener("canplaythrough", loadHandler, false);
    //explosionSound.removeEventListener("canplaythrough", loadHandler, false);
    console.log(game.assetsLoaded);
    //Play the music
    //music.play();
    //music.volume = 0.3;
    
    //Start the game 
    game.gameState = game.PLAYING;
  }
}

function playGame()
{
  //Left
  if(game.moveLeft && !game.moveRight)
  {
    cannon.vx = -8;
  }
  //Right
  if(game.moveRight && !game.moveLeft)
  {
    cannon.vx = 8;
  }

  //Set the cannon's velocity to zero if none of the keys are being pressed
  if(!game.moveLeft && !game.moveRight)
  {
    cannon.vx = 0;
  }

  //Fire a missile if game.shoot is true
  if(game.shoot)
  {
    fireMissile();
    game.shoot = false;	
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
  game.alienTimer++;

  //Make a new alien if game.alienTimer equals the game.alienFrequency
  if(game.alienTimer === game.alienFrequency)
  {
    makeAlien();
    game.alienTimer = 0;

    //Reduce game.alienFrequency by one to gradually increase
    //the frequency that aliens are created
    if(game.alienFrequency > 2)
    {  
      game.alienFrequency--;
    }
  }

  //Loop through the aliens
  for(var i = 0; i < aliens.length; i++)
  { 
    var alien = aliens[i];

    if(alien.state === alien.NORMAL)
    {
      //Move the current alien if its state is NORMAL
      alien.y += alien.vy;
    }

    //Check if the alien has crossed the bottom of the screen
    if(alien.y > canvas.height + alien.height)
    { 
      //End the game if an alien has reached Earth
      game.gameState = game.OVER;
    }
  }
  
  //--- The collisions 

  //Check for a collision between the aliens and missiles
  for(var i = 0; i < aliens.length; i++)
  {
    var alien = aliens[i];

    for(var j = 0; j < missiles.length; j++)
    {
      var missile = missiles[j];

      if(hitTestRectangle(missile, alien)
      && alien.state === alien.NORMAL)
      {
        //Destroy the alien
        destroyAlien(alien);

        //Update the score
        game.score++;

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
  scoreDisplay.text = game.score;

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
    removeObject(alien, aliens);
    removeObject(alien, sprites);
  }
}

function endGame()
{
  gameOverMessage.visible = true;
  if(game.score < game.scoreNeededToWin)
  {
    gameOverMessage.text = "EARTH DESTROYED!";
  }
  else
  {
    gameOverMessage.x = 120;
    gameOverMessage.text = "EARTH SAVED!";
  }
}

function makeAlien()
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
  aliens.push(alien);
}

function fireMissile()
{ 
  //Create a missile sprite
  var missile = Object.create(spriteObject);
  missile.sourceX = 96;
  missile.sourceWidth = 16;
  missile.sourceHeight = 16;
  missile.width = 16;
  missile.height = 16;
  
  //Center it over the cannon
  missile.x = cannon.centerX() - missile.halfWidth();
  missile.y = cannon.y - missile.height;
  
  //Set its speed
  missile.vy = -8;
  
  //Push the missile into both the sprites and missiles arrays
  sprites.push(missile);
  missiles.push(missile);

  //Play the firing sound
  //game.shootSound.currentTime = 0;
  //game.shootSound.play();
}

function removeObject(objectToRemove, array) 
{ 
  var i = array.indexOf(objectToRemove);
  if (i !== -1)
  {
    array.splice(i, 1);
  }
}

function endGame()
{
  gameOverMessage.visible = true;
  if(game.score < game.scoreNeededToWin)
  {
    gameOverMessage.text = "EARTH DESTROYED!";
  }
  else
  {
    gameOverMessage.x = 120;
    gameOverMessage.text = "EARTH SAVED!";
  }
}

function render()
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

}());
