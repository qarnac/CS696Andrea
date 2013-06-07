function takeItem()
{
  //Find the index number of the item in the items array
  var itemIndexNumber = game.items.indexOf(item);
  
  //Does the item exist in the game world
  //and is it at the player's current location?
  if(itemIndexNumber !== -1 
  && game.itemLocations[itemIndexNumber] === player.mapLocation)
  {
    game.gameMessage = "You take the " + item + ".";
    
    //Add the item to the player's backpack 
    player.backpack.push(item);
   
    //Remove the item from the game world
    game.items.splice(itemIndexNumber, 1);
    game.itemLocations.splice(itemIndexNumber, 1);
          
    //Display in the console for testing
    console.log("World items: " + game.items);
    console.log("backpack items: " + player.backpack);
  }
  else
  {
    //Message if you try and take an item
    //that isn't in the current location
    game.gameMessage = "You can't do that.";
  }
}

function dropItem()
{
  //Try to drop the item only if the backpack isn't empty
  if(player.backpack.length !== 0)
  {
    //Find the item's array index number in the backpack
    var backpackIndexNumber = player.backpack.indexOf(item);
	  
	  //The item is in the backpack if backpackIndex number isn't -1
    if(backpackIndexNumber !== -1)
    {
    
     //Tell the player that the item has been dropped
   	 game.gameMessage = "You drop the " + item + ".";
     
     //Add the item from the backpack to the game world 
     game.items.push(backpack[backpackIndexNumber]);
     game.itemLocations.push(player.mapLocation); 
     
     //Remove the item from the player's backpack 
     backpack.splice(backpackIndexNumber, 1);
    }
    else
    {
      //Message if the player tries to drop
      //something that's not in the backpack
      game.gameMessage = "You can't do that.";
    }
  }
  else
  {
    //Message if the backpack is empty
    game.gameMessage = "You're not carrying anything.";
  }
}

function useItem()
{
  //If there are no items in the backpack, then
  //tell the player the backpack is empty
  if(player.backpack.length === 0)
  {
    game.gameMessage += " Your backpack is empty";
	return;
  }

  //1. Find out if the item is in the backpack
  //Find the item's array index number in the backpack
  var backpackIndexNumber = player.backpack.indexOf(player.item);
       
  //If the index number is -1, then it isn't in the backpack.
  //Tell the player that he or she isn't carrying it.
  if(backpackIndexNumber === -1)
  {
    game.gameMessage = "You're not carrying it.";
  }
  
   
  //2. If the item is found in the backpack
  //figure out what to do with it
  if(backpackIndexNumber !== -1)
  {
    switch(item)
    {
	    case "flute":
	      if(player.mapLocation === 8)
        {
          game.gameMessage = "Beautiful music fills the air.";
          game.gameMessage += "A wizend old man steps outside " 
          game.gameMessage += "and hands you a sword!";
          
          //Add the sword to the world
          game.items.push("sword");
          game.itemLocations.push(player.mapLocation);
          
          //Reset the location's help message
          helpMessages[player.mapLocation] = "";
        }
        else
        {
          game.gameMessage = "You try and play the flute " 
          game.gameMessage += "but it makes no sound here.";
        }
	      break;
	      
	    case "sword":
	      if(player.mapLocation === 3)
        {
          game.gameMessage 
            = "You swing the sword and slay the dragon! ";
          game.gameMessage 
            += "You've saved the forest of Lyrica!";
          
          //Reset the location's help message
          helpMessages[player.mapLocation] = "";  
        }
        else
        {
          game.gameMessage 
            = "You swing the sword listlessly.";
        }
	      break;
	      
	    case "stone":
	      if(player.mapLocation === 1)
	      {
	        game.gameMessage = "You drop the stone in the well.";
	        game.gameMessage += " A magical flute appears!";
	        
	        //Remove the stone from the player's backpack 
          backpack.splice(backpackIndexNumber, 1);
          
          //Add the flute to the world
	        game.items.push("flute");
	        game.itemLocations.push(player.mapLocation);
	        
	        //Reset the location's help message
          helpMessages[player.mapLocation] = "";
	      }
        else
        {
	        game.gameMessage 
	          = "You fumble with the stone in your pocket.";
	      }
	      break;			          
	   }
   }
}

function render()
{
  //Render the location
  
  output.innerHTML = gameDatas[player.mapLocation].map;
  image.src = "../images/" + gameDatas[player.mapLocation].images;
  
  //Display an item if there's one in this location
  //1. Loop through all the game items
  for(var i = 0; i < game.items.length; i++)
  {
   //Find out if there's an item at this location
   if(player.mapLocation === game.itemLocations[i])
   {
     //Display it
     output.innerHTML 
      += "<br>You see a <strong>" 
      + game.items[i]
      + "</strong> here.";
   }
  }
  
  //Display the player's backpack contents
  if(player.backpack.length !== 0)
  {
		output.innerHTML += "<br>You are carrying: " + player.backpack.join(", ");  
  }
  
  //Display the game message
  output.innerHTML += "<br><em>" + game.gameMessage + "</em>";
  
  //Clear the input field
  input.value = "";
}