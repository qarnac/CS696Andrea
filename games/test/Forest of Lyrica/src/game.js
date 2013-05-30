var game = new Object();
game.gameMessage = "<br>Welcome to Lyrica! "
game.gameMessage += "Try any of these words: " 
game.gameMessage += "north, east, south, west, take, drop, ";
game.gameMessage += "use, stone, flute, sword, help.";
game.items = ["stone"];
game.itemLocations = [6];

//arrays with multiple objects
var gameDatas = [
{ "map":"An old stone keep." , "images":"keep.png" , "blockedPathMessages":"It's too dangerous to move that way." , "helpMessages":""}, 
{ "map":"A deep well" , "images":"well.png" , "blockedPathMessages":"A mysterious force holds you back." , "helpMessages":"I wonder if you could 'use' something to find out how deep the well is?"}, 
{ "map":"A sunny glade." , "images":"glade.png" , "blockedPathMessages":"A tangle of thorns blocks your way." , "helpMessages":""}, 
{ "map":"A sleeping dragon." , "images":"dragon.png" , "blockedPathMessages":"You can't step over the dragon." , "helpMessages":"Maybe if you had a sword, you could slay the dragon?"}, 
{ "map":"A narrow pathway." , "images":"path.png" , "blockedPathMessages":"" , "helpMessages":""}, 
{ "map":"An ancient gate." , "images":"gate.png" , "blockedPathMessages":"The gate locks shut." , "helpMessages":""}, 
{ "map":"The edge of a river." , "images":"river.png" , "blockedPathMessages":"The river is too deep to cross." , "helpMessages":""}, 
{ "map":"A lonely wooden bench." , "images":"bench.png" , "blockedPathMessages":"The trees are too thick to pass." , "helpMessages":""}, 
{ "map":"An isolated cottage. Faint music comes from inside." , "images":"cottage.png" , "blockedPathMessages":"You're too scared to go that way." , "helpMessages":"This seems like a nice place for music."}, 
];

var player = new Object();
player.backpack = [];
player.action = "";
player.playersInput = "";	//Initialize the player's input
player.mapLocation = 4;		//Set the player's start location
player.item = "";

var game = new Object();
game.gameMessage = "<br>Welcome to Lyrica! "
game.gameMessage += "Try any of these words: " 
game.gameMessage += "north, east, south, west, take, drop, ";
game.gameMessage += "use, stone, flute, sword, help.";
game.items = ["stone"];
game.itemLocations = [6];

//Create an array of actions the game understands
//and a variable to store the current action
var actionsIKnow 
  = ["north","east", "south", "west", 
     "help", "take", "use", "drop"];

//An array of items the game understands
//and a variable to store the current item
var itemsIKnow = ["flute", "stone", "sword"];

//The img element
var image = document.querySelector("img");

//The input and output fields
var output = document.querySelector("#output");
var input = document.querySelector("#input");

//The button
var button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
button.addEventListener("mousedown", mousedownHandler, false);
button.addEventListener("mouseout", mouseoutHandler, false);

//Listen for enter key presses
window.addEventListener("keydown", keydownHandler, false);

//Dispay the player's location
render();

function mousedownHandler()
{
 button.style.background 
   = "-webkit-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
 button.style.background 
   = "-moz-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
 button.style.background 
   = "linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
}

function mouseoutHandler()
{
 button.style.background 
   = "-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
 button.style.background 
   = "-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
 button.style.background 
   = "linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
}

function clickHandler()
{
  button.style.background 
   = "-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
  button.style.background 
   = "-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
  button.style.background 
   = "linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
   
  playGame();
}

function keydownHandler(event)
{
  if(event.keyCode === 13)
  {
    playGame();
  }
}

function playGame()
{
  //Get the player's input and convert it to lowercase
  player.playersInput = input.value;
  player.playersInput = player.playersInput.toLowerCase();
  
  //Reset these variables from the previous turn
  game.gameMessage = "";
  player.action = "";
  
  //Figure out the player's action
  for(i = 0; i < actionsIKnow.length; i++)
  {
    if(player.playersInput.indexOf(actionsIKnow[i]) !== -1)
    {
      player.action = actionsIKnow[i];
      console.log("player's action: " + player.action);
      break;
    }
  }
  
  //Figure out the item the player wants
  for(i = 0; i < itemsIKnow.length; i++)
  {
    if(player.playersInput.indexOf(itemsIKnow[i]) !== -1)
    {
      item = itemsIKnow[i];
      console.log("player's item: " + item);
    }
  }
  
  //Choose the correct action
  switch(player.action)
  {
    case "north":
      if(player.mapLocation >= 3)
      {
        player.mapLocation -= 3;
      }
      else
      {
        game.gameMessage = gameDatas[player.mapLocation].blockedPathMessages;
      }
      break;
    
    case "east":
	    if(player.mapLocation % 3 != 2)
      {
        player.mapLocation += 1;
      }
      else
      {
        game.gameMessage = gameDatas[player.mapLocation].blockedPathMessages;
      }
      break;
      
    case "south":
      if(player.mapLocation < 6)
      {
        player.mapLocation += 3;
      }
      else
      {
        game.gameMessage = blockedPathMessages[player.mapLocation];
      }
      break;
      
    case "west":
      if(player.mapLocation % 3 != 0)
      {
        player.mapLocation -= 1;
      }
      else
      {
        game.gameMessage = blockedPathMessages[player.mapLocation];
      }
      break;
      
    case "help":
      //Display a hint if there is one for this location
      if(gameDatas[player.mapLocation].helpMessages !== "")
      {
        game.gameMessage = gameDatas[player.mapLocation].helpMessages + " ";
      }
      game.gameMessage += "Try any of these words: " 
      game.gameMessage += "north, east, south, west, take, drop, ";
      game.gameMessage += "use, stone, flute, sword.";
      break;
      
    case "take":
      takeItem()
		  break;
		
		case "drop":
		  dropItem();
		  break;
		  
		case "use":
		  useItem();
		  break;
    		  
		default:
		  game.gameMessage = "I don't understand that.";
  }
  
  //Render the game
  render();
}

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
  //1. Find out if the item is in the backpack
  
  //Find the item's array index number in the backpack
  var backpackIndexNumber = backpack.indexOf(item);
       
  //If the index number is -1, then it isn't in the backpack.
  //Tell the player that he or she isn't carrying it.
  if(backpackIndexNumber === -1)
  {
    game.gameMessage = "You're not carrying it.";
  }
  
  //If there are no items in the backpack, then
  //tell the player the backpack is empty
  if(backpack.length === 0)
  {
    game.gameMessage += " Your backpack is empty";
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
    output.innerHTML += "<br>You are carrying: " + backpack.join(", ");  
  }
  
  //Display the game message
  output.innerHTML += "<br><em>" + game.gameMessage + "</em>";
  
  //Clear the input field
  input.value = "";
}