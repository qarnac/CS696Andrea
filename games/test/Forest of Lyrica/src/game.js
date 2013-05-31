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
