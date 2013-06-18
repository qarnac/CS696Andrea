(function(){

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//Arrays to store the game objects and assets to load
var sprites = [];
var assetsToLoad = [];
//var aliens = [];
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

var cannon = new Cannon(canvas);
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
	 
	  case game.SPACE:
	    if(!game.spaceKeyIsDown)
	    {
	      cannon.shoot = true;
	      cannon.spaceKeyIsDown = true;
	    }
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
      game.endGame(gameOverMessage);
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
  cannon.moveAction(canvas);
  
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

  game.alienSpawnTimer(sprites);
  
  game.alienDropDownAndStatus(canvas);

  //--- The collisions 

  //Check for a collision between the aliens and missiles
  for(var i = 0; i < game.aliens.length; i++)
  {
    var alien = game.aliens[i];

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
