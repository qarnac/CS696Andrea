function Game()
{
	this.aliens = [];
	this.alienMissiles = [];

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
    gameOverMessage.text = "Game Over!";
  }
  else
  {
    gameOverMessage.x = 120;
    gameOverMessage.text = "You've Won!";
  }
};

Game.prototype.makeAlien = function(sprites)
{
  //Create the alien
  var alien = new Alien();
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
	  alien.x += alien.vx;
    }

    //Check if the alien has crossed the bottom of the screen
    if(alien.y > canvas.height + alien.height)
    { 
      //End the game if an alien has reached Earth
      this.gameState = this.OVER;
    }
  }

};

Game.prototype.destroyAlien = function(alien, sprites){
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
};

function blockRectangle(r1, r2, bounce)
{  
  //Check whether vx is less than the combined half widths 
  if(Math.abs(vx) < combinedHalfWidths) 
  {
    //A collision might be occurring! 
    //Check whether vy is less than the combined half heights 
    if(Math.abs(vy) < combinedHalfHeights)
    {
      //A collision has occurred! This is good! 
      //Find out the size of the overlap on both the X and Y axes
      var overlapX = combinedHalfWidths - Math.abs(vx);
      var overlapY = combinedHalfHeights - Math.abs(vy);
        
      //The collision has occurred on the axis with the
      //*smallest* amount of overlap. Let's figure out which
      //axis that is
        
      if(overlapX >= overlapY)
      {
        //The collision is happening on the X axis 
        //But on which side? vy can tell us
        if(vy > 0)
        {
          collisionSide = "top";
            
          //Move the rectangle out of the collision
          r1.y = r1.y + overlapY;
        }
        else 
        {
          collisionSide = "bottom";
          
          //Move the rectangle out of the collision
          r1.y = r1.y - overlapY;
        }
    
        //Bounce
        if(bounce)
        {
          r1.vy *= -1;
		      
          /*Alternative
          //Find the bounce surface's vx and vy properties
          var s = {};
          s.vx = r2.x - r2.x + r2.width; 
          s.vy = 0;
		    
          //Bounce r1 off the surface
          //bounceOffSurface(r1, s);
          */
        }
      } 
      else 
      {
        //The collision is happening on the Y axis 
        //But on which side? vx can tell us
        if(vx > 0)
        {
          collisionSide = "left";
            
          //Move the rectangle out of the collision
          r1.x = r1.x + overlapX;
        }
        else 
        {
          collisionSide = "right";
            
          //Move the rectangle out of the collision
          r1.x = r1.x - overlapX;
        }
        
        //Bounce
        if(bounce)
        {
          r1.vx *= -1;
			    
          /*Alternative
          //Find the bounce surface's vx and vy properties
          var s = {};
          s.vx = 0; 
          s.vy = r2.y - r2.y + r2.height;
			    
          //Bounce r1 off the surface
          bounceOffSurface(r1, s);
          */
        }
      } 
    }
    else 
    {
      //No collision
      collisionSide = "none";
    }
  } 
  else 
  {
    //No collision
    collisionSide = "none";
  }
  
  return collisionSide;
};

