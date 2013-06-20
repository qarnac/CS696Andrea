//The canvas
var canvas = document.querySelector("canvas"); 
var drawingSurface = canvas.getContext("2d");

//The game map
var map = 
[
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,3],
  [3,1,2,1,1,2,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,3],
  [3,1,1,1,1,2,1,1,1,2,2,2,1,1,1,1,1,2,1,1,1,3],
  [3,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2,3],
  [3,1,1,2,2,2,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,3],
  [3,1,1,1,1,1,1,1,2,2,1,1,2,1,1,1,2,2,2,1,1,3],
  [3,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,1,1,1,3],
  [3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,3],
  [3,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,2,2,1,1,1,3],
  [3,1,1,2,2,2,2,1,1,1,1,1,2,1,1,1,1,1,1,1,1,3],
  [3,1,1,1,1,1,2,1,1,2,1,1,2,2,2,2,2,1,1,1,1,3],
  [3,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,2,2,2,2,1,3],
  [3,1,1,2,1,1,1,1,1,2,2,1,1,2,2,1,2,1,1,1,1,3],
  [3,1,1,2,1,1,2,1,1,1,1,1,1,1,2,1,1,1,1,1,1,3],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
];

//The game objects map
var gameObjects =
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0],
  [0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,5,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];


//Map code
var EMPTY = 0;
var FLOOR = 1;
var BOX = 2;
var WALL = 3;
var ALIEN = 4;
var BOMB = 5;

//The size of each tile cell
var SIZE = 64;

//Sprites we need to access by name
var alien = null;
var timeDisplay = null;
var gameOverDisplay = null;
var gameOverMessage = null;
var timerMessage = null;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//The number of columns on the tilesheet
var tilesheetColumns = 5;

//Arrays to store the game objects
var sprites = [];
var messages = [];
var boxes = [];
var bombs = [];

var assetsToLoad = [];
var assetsLoaded = 0;

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "./images/timeBombPanic.png";
assetsToLoad.push(image);

//Game variables
var bombsDefused = 0;

//--- The gameWorld object
var gameWorld = 
{
  x: 0,
  y: 0,
  width: map[0].length * SIZE,
  height: map.length * SIZE,
};

//--- The camera object
var camera = 
{
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
  
  //The camera's inner scroll boundaries
  rightInnerBoundary: function()
  {
    return this.x + (this.width / 2) + (this.width / 4);
  },
  leftInnerBoundary: function()
  {
    return this.x + (this.width / 2) - (this.width / 4);
  },
  topInnerBoundary: function()
  {
    return this.y + (this.height / 2) - (this.height / 4);
  },
  bottomInnerBoundary: function()
  {
    return this.y + (this.height / 2) + (this.height / 4);
  }
};

//Center the camera over the gameWorld
camera.x = (gameWorld.x + gameWorld.width / 2) - camera.width / 2;
camera.y = (gameWorld.y + gameWorld.height / 2) - camera.height / 2;

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;

//Directions
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
  switch(event.keyCode)
  {
    case UP:
	    moveUp = true;
	    break;
	  
	  case DOWN:
	    moveDown = true;
	    break;
	    
	  case LEFT:
	    moveLeft = true;
	    break;  
	    
	  case RIGHT:
	    moveRight = true;
	    break; 
  }
}, false);

window.addEventListener("keyup", function(event)
{
  switch(event.keyCode)
  {
    case UP:
	    moveUp = false;
	    break;
	  
	  case DOWN:
	    moveDown = false;
	    break;
	    
	  case LEFT:
	    moveLeft = false;
	    break;  
	    
	  case RIGHT:
	    moveRight = false;
	    break; 
  }
}, false);

//Start the game animation loop
update();

function update()
{ 
  //The animation loop
  requestAnimationFrame(update, canvas);
  
  //Change what the game is doing based on the game state
  switch(gameState)
  {
    case LOADING:
      console.log("loading...");
      break;
      
    case BUILD_MAP:
      buildMap(map);
      buildMap(gameObjects);
      createOtherObjects();
      gameState = PLAYING;
      break;
    
    case PLAYING:
      playGame();
      break;
    
    case OVER:
      endGame();
      break;
  }
  
  //Render the game
  render();
}

function loadHandler()
{ 
  assetsLoaded++;
  if(assetsLoaded === assetsToLoad.length)
  {
    //Remove the load handlers
    image.removeEventListener("load", loadHandler, false);
        
    //Build the map 
    gameState = BUILD_MAP;
  }
}

function buildMap(levelMap)
{
  for(var row = 0; row < ROWS; row++) 
  {	
    for(var column = 0; column < COLUMNS; column++) 
    { 
      var currentTile = levelMap[row][column];
    
      if(currentTile !== EMPTY)
      {
        //Find the tile's x and y position on the tile sheet
        var tileSheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE; 
        var tileSheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;
        
        switch (currentTile)
        {
          case FLOOR:
            var floor = Object.create(spriteObject);
            floor.sourceX = tileSheetX;
            floor.sourceY = tileSheetY;
            floor.x = column * SIZE;
            floor.y = row * SIZE;
            sprites.push(floor);
            break;
          
          case BOX:
            var box = Object.create(spriteObject);
            box.sourceX = tileSheetX;
            box.sourceY = tileSheetY;
            box.x = column * SIZE;
            box.y = row * SIZE;
            sprites.push(box);
            boxes.push(box);
            break;
          
          case WALL:
            var wall = Object.create(spriteObject);
            wall.sourceX = tileSheetX;
            wall.sourceY = tileSheetY;           
            wall.x = column * SIZE;
            wall.y = row * SIZE;
            sprites.push(wall);
            break;
          
          case BOMB:
            var bomb = Object.create(spriteObject);
            bomb.sourceX = tileSheetX;
            bomb.sourceY = tileSheetY; 
            bomb.sourceWidth = 48;
            bomb.sourceHeight = 36;
            bomb.width = 48;  
            bomb.height = 36;          
            bomb.x = column * SIZE + 10;
            bomb.y = row * SIZE + 16;
            bombs.push(bomb);
            sprites.push(bomb);
            break;
            
          case ALIEN:
            //Note: "alien" has already been defined in the main
            //program so you don't neeed to preceed it with "var"
            alien = Object.create(spriteObject);
            alien.sourceX = tileSheetX;
            alien.sourceY = tileSheetY;          
            alien.x = column * SIZE;
            alien.y = row * SIZE;
            sprites.push(alien);
            break;
        }
      }
    }
  }
}

function createOtherObjects()
{
  timeDisplay = Object.create(spriteObject);
  timeDisplay.sourceX = 0;
  timeDisplay.sourceY = 64;
  timeDisplay.sourceWidth = 128;
  timeDisplay.sourceHeight = 48;
  timeDisplay.width = 128;  
  timeDisplay.height = 48;            
  timeDisplay.x = canvas.width / 2 - timeDisplay.width / 2;
  timeDisplay.y = 8;
  timeDisplay.scrollable = false;
  sprites.push(timeDisplay);
  
  gameOverDisplay = Object.create(spriteObject);
  gameOverDisplay.sourceX = 0;
  gameOverDisplay.sourceY = 129;
  gameOverDisplay.sourceWidth = 316;
  gameOverDisplay.sourceHeight = 290;
  gameOverDisplay.width = 316;  
  gameOverDisplay.height = 290;            
  gameOverDisplay.x = canvas.width / 2 - gameOverDisplay.width / 2;
  gameOverDisplay.y = canvas.height / 2 - gameOverDisplay.height / 2;
  gameOverDisplay.visible = false;
  gameOverDisplay.scrollable = false;
  sprites.push(gameOverDisplay);
  
  gameOverMessage = Object.create(messageObject);
  gameOverMessage.x = 275;
  gameOverMessage.y = 270;
  gameOverMessage.font = "bold 30px Helvetica";
  gameOverMessage.fillStyle = "black";
  gameOverMessage.text = "";
  gameOverMessage.visible = false;
  messages.push(gameOverMessage);
  
  timerMessage = Object.create(messageObject);
  timerMessage.x = 330;
  timerMessage.y = 10;
  timerMessage.font = "bold 40px Helvetica";
  timerMessage.fillStyle = "white";
  timerMessage.text = "";
  messages.push(timerMessage);
}

function playGame()
{ 
  //Up
  if(moveUp && !moveDown)
  {
    alien.vy = -4;
  }
  //Down
  if(moveDown && !moveUp)
  {
    alien.vy = 4;
  }
  //Left
  if(moveLeft && !moveRight)
  {
    alien.vx = -4;
  }
  //Right
  if(moveRight && !moveLeft)
  {
    alien.vx = 4;
  }

  //Set the alien's velocity to zero if none of the keys are being pressed
  if(!moveUp && !moveDown)
  {
    alien.vy = 0;
  }
  if(!moveLeft && !moveRight)
  {
    alien.vx = 0;
  }
  
  //Move the alien and set its screen boundaries
  alien.x = Math.max(64, Math.min(alien.x + alien.vx, gameWorld.width - alien.width - 64)); 
  alien.y = Math.max(64, Math.min(alien.y + alien.vy, gameWorld.height - alien.height - 64));
  
  //Collisions with boxes
  for(var i = 0; i < boxes.length; i++)
  {
    blockRectangle(alien, boxes[i]);
  }
    
  //Collisions with bombs
  for(var i = 0; i < bombs.length; i++)
  {
    var bomb = bombs[i];
    
    //If there's a collision, make the bombs invisible,
    //reduce bombsDefused by 1, and check whether
    //the player has won the game
    if(hitTestCircle(alien, bomb) && bomb.visible)
    {
      bomb.visible = false;
      bombsDefused++;
      if(bombsDefused === bombs.length)
      {
        //Change the game state to OVER if the player has defused all the bombs
        gameState = OVER;
      }
    }
  }
  
  //Display the gameTimer.
  //This modification adds an extra "0" to the time
  //if the time is less than 10
  timerMessage.text = gameTimer.time;
  if(gameTimer.time < 10)
  {
    timerMessage.text = "0" + gameTimer.time;
  }
  
  //Check whether the time is over
  if(gameTimer.time === 0)
  {
    gameState = OVER;
  }
  
  //Scroll the camera
  if(alien.x < camera.leftInnerBoundary())
  {
    camera.x = Math.floor(alien.x - (camera.width / 4));
  }
  if(alien.y < camera.topInnerBoundary())
  {
    camera.y = Math.floor(alien.y - (camera.height / 4));
  }
  if(alien.x + alien.width > camera.rightInnerBoundary())
  {
    camera.x = Math.floor(alien.x + alien.width - (camera.width / 4 * 3));
  }
  if(alien.y + alien.height > camera.bottomInnerBoundary())
  {
    camera.y = Math.floor(alien.y + alien.height - (camera.height / 4 * 3));
  }
  
  //The camera's gameWorld boundaries
  if(camera.x < gameWorld.x)
  {
    camera.x = gameWorld.x;
  }
  if(camera.y < gameWorld.y)
  {
    camera.y = gameWorld.y;
  }
  if(camera.x + camera.width > gameWorld.x + gameWorld.width)
  {
    camera.x = gameWorld.x + gameWorld.width - camera.width;
  }
  if(camera.y + camera.height > gameWorld.height)
  {
    camera.y = gameWorld.height - camera.height;
  } 
}

function endGame()
{
  gameTimer.stop();
  gameOverDisplay.visible = true;
  gameOverMessage.visible = true;
    
  if(bombsDefused === bombs.length)
  {
    gameOverMessage.text = "You Won!";
  }
  else
  {
    gameOverMessage.text = "You Lost!";
  }
}