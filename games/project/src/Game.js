function Game()
{
	this.aliens = [];
	this.motherShips = [];
	this.items  = [];
	this.alienMissiles = [];
	this.level = 1;

	//Game variables
	this.score = 0;
	this.alienFrequency = 100;
	this.alienTimer = 0;
	this.frequencyLimit = 30;
	
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
	
	this.TIMESTOP = false;
	this.DO_NOT_SPAWN_HEALTH = false;
	this.DO_NOT_SPAWN_CLOCK = false;
	this.DO_NOT_SPAWN_ITEM = false;
}

// Integrated
Game.prototype.endGame = function(gameOverMessage, camera)
{
	gameOverMessage.visible = true;
	
	gameOverMessage.x = camera.x + 120;
	gameOverMessage.y = camera.y + 170;
	
	gameOverMessage.text = "Game Over!";
	/*
	if(this.score < this.scoreNeededToWin)
	{
		gameOverMessage.text = "Game Over!";
	}
	else
	{
		gameOverMessage.text = "You've Won!";
	}
	*/
	
};

Game.prototype.makeItem = function(sprites, camera, choice)
{

	var item;
	
	switch(choice)
	{
		case 0:
		  item  = new Repair();
		  break;
		case 1:
		  item  = new ClockStopper();
		  break;
		case 2:
		  item  = new Money();
		  break;
		case 3:
		  item  = new Bullet();
		  break;
	}
	
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
};

Game.prototype.makeMotherShip = function(sprites, camera)
{
	//Create the motherShip
	var motherShip = new MotherShip();
	

	motherShip.health = 10;

	
	//Set its y position above the screen boundary
	if( camera.y != 0)
		motherShip.y = camera.y - 64;
	else 
		motherShip.y = camera.y;
		
	//Assign the alien a random x position
	var randomPosition = Math.floor(Math.random() * camera.width);
	
	//alien.x = randomPosition * alien.width;
	motherShip.x = camera.x + randomPosition + 30;
	
	//Set its speed
	motherShip.vy = 0.5;

	//Push the alien into both the sprites and aliens arrays
	sprites.push(motherShip);
	this.motherShips.push(motherShip);
};

Game.prototype.makeAlien = function(sprites, camera)
{
	//Create the alien
	var alien = new Alien();
	alien.sourceX = 32;
	
	if( this.level === 2)
	{
		alien.health = 5;
	}
	
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

Game.prototype.alienSpawnTimer = function(sprites, camera, cannon){
	  
	//Add one to the game.alienTimer
	this.alienTimer++;
	
	//console.log(this.items.length);
	if( this.items.length === 0 && this.DO_NOT_SPAWN_ITEM === false)
	{
		console.log("making money");
		var money = this;
		var timer = 17000;
		setTimeout(function(){
					money.makeItem(sprites,camera,2); //spawn money
					}, timer);
	}
	
	//health spawn
	if(cannon.health < 5 && this.DO_NOT_SPAWN_HEALTH === false)
	{
		this.DO_NOT_SPAWN_HEALTH = true;
		console.log("making health");
	
		var timer = 0;
		if( this.level === 2) 
			timer = Math.floor( (Math.random()*40000) + 15000);
		else
			timer = Math.floor( (Math.random()*10000) + 5000);
			
		var thisClass = this;
		setTimeout(
			function(){
				thisClass.makeItem(sprites,camera,0); //spawn repair
				},timer);
		
	}
	
	//weapon upgrade
	if(this.items.length === 0 && this.DO_NOT_SPAWN_ITEM === false)
	{
		this.DO_NOT_SPAWN_ITEM = true;
		console.log("making weapon");
		var timer = Math.floor( (Math.random()*9000) + 5000);
		var thisClass = this;
		setTimeout(
			function(){
				thisClass.makeItem(sprites,camera,3); //spawn weapon upgrade
				},timer);
		
		
	}
	
	//Time stopper
	if(this.items.length === 0 && this.DO_NOT_SPAWN_CLOCK === false)
	{
		this.DO_NOT_SPAWN_CLOCK = true;
		console.log("making Clock");
		var timer = Math.floor( (Math.random()*35000) + 20000);
		var thisClass = this;
		setTimeout(
			function(){
				thisClass.makeItem(sprites,camera,1); //spawn weapon upgrade
				},timer);
		
		
	}
	
			
	if( this.alienFrequency < 40)
	{
		console.log("switching to level 2");
		this.level = 2
	}
	
	//Make a new alien if game.alienTimer equals the game.alienFrequency
	if(this.alienTimer === this.alienFrequency)
	{
		this.makeAlien(sprites, camera);
		
		this.makeMotherShip(sprites, camera);
		
		this.alienTimer = 0;

		if( this.alienFrequency === this.frequencyLimit)
		{
			this.alienFrequency = 100;
		}
			
		//Reduce game.alienFrequency by one to gradually increase
		//the frequency that aliens are created
		if(this.alienFrequency > 2)
		{  
				this.alienFrequency -= 2;
		}
		
	}
};

Game.prototype.alienAndItemDropDownAndStatus = function(canvas, gameWorld){
  
	console.log("aliens length " + this.aliens.length);
  
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
		for(var i = 0; i < this.motherShips.length; i++)
	{ 
		var motherShip = this.motherShips[i];

		if(motherShip.state === motherShip.NORMAL)
		{
			//Move the current alien if its state is NORMAL
			motherShip.y += motherShip.vy;


			motherShip.x += motherShip.vx;
			
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

