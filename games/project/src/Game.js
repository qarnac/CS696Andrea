function Game()
{
	this.aliens = [];
	this.items  = [];
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
	this.UP = 38;
	this.DOWN = 40;
	this.SPACE = 32;
	
}

// Integrated
Game.prototype.endGame = function(gameOverMessage, camera)
{
	gameOverMessage.visible = true;
	
	gameOverMessage.x = camera.x + 120;
	gameOverMessage.y = camera.y + 170;
	
	if(this.score < this.scoreNeededToWin)
	{
		gameOverMessage.text = "Game Over!";
	}
	else
	{
		gameOverMessage.text = "You've Won!";
	}
	
};

Game.prototype.makeItem = function(sprites, camera)
{
	var item = new Repair();
	
	
	//Set its y position above the screen boundary
	if( camera.y != 0)
		item.y = camera.y - 64;
	else 
		item.y = camera.y;
		
	//Assign the alien a random x position
	var randomPosition = Math.floor(Math.random() * camera.width);
	
	//alien.x = randomPosition * alien.width;
	item.x = camera.x + randomPosition + 30;
	
	//Set its speed
	item.vy = 1;
	
	sprites.push(item);
	this.items.push(item);
}

Game.prototype.makeAlien = function(sprites, camera)
{
	//Create the alien
	var alien = new Alien();
	alien.sourceX = 32;
	
	//Set its y position above the screen boundary
	if( camera.y != 0)
		alien.y = camera.y - 64;
	else 
		alien.y = camera.y;
		
	//Assign the alien a random x position
	var randomPosition = Math.floor(Math.random() * camera.width);
	
	//alien.x = randomPosition * alien.width;
	alien.x = camera.x + randomPosition + 30;
	
	//Set its speed
	alien.vy = 1;

	//Push the alien into both the sprites and aliens arrays
	sprites.push(alien);
	this.aliens.push(alien);
	
};

Game.prototype.alienSpawnTimer = function(sprites, camera){
	  
	//Add one to the game.alienTimer
	this.alienTimer++;

	//Make a new alien if game.alienTimer equals the game.alienFrequency
	if(this.alienTimer === this.alienFrequency)
	{
		this.makeAlien(sprites, camera);
		
		//modify this to spawn the health on low
		
		/*
		if( this.alienFrequency === 80 ||
			this.alienFrequency === 90 ||
			this.alienFrequency === 70 ||
			this.alienFrequency === 50 )
		{
			this.makeItem(sprites, camera);
		}
		*/
		this.makeItem(sprites, camera);
		   

		this.alienTimer = 0;
		
		if( this.alienFrequency === 30)
		{
			this.alienFrequency = 100;
		}
			
		//Reduce game.alienFrequency by one to gradually increase
		//the frequency that aliens are created
		if(this.alienFrequency > 2)
		{  
			this.alienFrequency--;
		}
	}
};

Game.prototype.alienAndItemDropDownAndStatus = function(canvas){
  
	//Loop through the aliens
	for(var i = 0; i < this.aliens.length; i++)
	{ 
		var alien = this.aliens[i];

		if(alien.state === alien.NORMAL)
		{
			//Move the current alien if its state is NORMAL
			alien.y += alien.vy;

		if(alien.move === true)
		{
			alien.move = false;
			setTimeout(function(){alien.moveLeftRight()},2000);
		}

			alien.x += alien.vx;
		}
	}
	
	for(var i = 0; i < this.items.length; i++)
	{ 
		var item = this.items[i];

		if(item.state === item.NORMAL)
		{
			//Move the current alien if its state is NORMAL
			item.y += item.vy;
		}
	}
};

Game.prototype.destroyAlien = function(alien, sprites){
  //Change the alien's state and update the object 
  alien.state = alien.EXPLODED;
  alien.update();  
  
  //Remove the alien after 1 second
  setTimeout(removeAlien, 1000);

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

