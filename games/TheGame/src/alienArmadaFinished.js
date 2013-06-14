

//The canvas
var canvas = document.querySelector("canvas");

//Create the drawing surface 
var drawingSurface = canvas.getContext("2d");

//Arrays to store the game objects and assets to load
var sprites = []; 
var assetsToLoad = []; //containing maps, alien and spaceship
var missiles = [];
var aliens = [];
var messages = []; //for messages such as score, or other misc descriptions

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
var cannon = new Entity("cannon");
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

//var shootSound = document.querySelector("#shootSound");
//shootSound.addEventListener("canplaythrough", loadHandler, false);
//shootSound.load();
//assetsToLoad.push(shootSound);

//var explosionSound = document.querySelector("#explosionSound");
//explosionSound.addEventListener("canplaythrough", loadHandler, false);
//explosionSound.load();
//assetsToLoad.push(explosionSound);

var game = new Game();

/*
//Variable to count the number of assets the game needs to load
var assetsLoaded = 0;

//Game states
var LOADING = 0
var PLAYING = 1;
var OVER = 2;
var gameState = LOADING;

//Arrow key codes
var RIGHT = 39;
var LEFT = 37;
var SPACE = 32;

//Directions
var moveRight = false;
var moveLeft = false;

//Variables to help fire missiles
var shoot = false;
var spaceKeyIsDown = false;

//Game variables
var score = 0;
var scoreNeededToWin = 60;
var alienFrequency = 100;
var alienTimer = 0;
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
	    if(!spaceKeyIsDown)
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
		console.log("move left");
	    game.moveLeft = false;
	    break;  
	    
	  case game.RIGHT:
		console.log("move right");
	    game.moveRight = false;
	    break; 
	
	  case game.SPACE:
		console.log("button space");
	    spaceKeyIsDown = false;
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
      console.log("LOADING…");
      break;
    
    case game.PLAYING:
	  console.log("PLAYING…");
      playGame();
      break;
    
    case game.OVER:
	  console.log("over…");
      endGame();
      break;
  }
  
  //Render the game
  game.render();
}

function loadHandler()
{ 
  console.log("im in here");
  game.assetsLoaded++;
  console.log(assetsToLoad.length);
  console.log(game.assetsLoaded);
  if(game.assetsLoaded === assetsToLoad.length)
  {
    //Remove the load event listener from the image and sounds
    image.removeEventListener("load", loadHandler, false);
    //music.removeEventListener("canplaythrough", loadHandler, false);
    //shootSound.removeEventListener("canplaythrough", loadHandler, false);
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

  //Fire a missile if shoot is true
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
  
  //Add one to the alienTimer
  game.alienTimer++;

  //Make a new alien if alienTimer equals the game.alienFrequency
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
  //shootSound.currentTime = 0;
  //shootSound.play();
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

