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

var game = new Object();
game.gameMessage = "<br>Welcome to Lyrica! "
game.gameMessage += "Try any of these words: " 
game.gameMessage += "north, east, south, west, take, drop, ";
game.gameMessage += "use, stone, flute, sword, help.";
game.items = ["stone"];
game.itemLocations = [6];

var player = new Object();
player.backpack = [];
player.action = "";
player.mapLocation = 4;		//Set the player's start location
player.item = "";

var playersInput = "";	//Initialize the player's input
