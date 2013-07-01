function Game() {
	//Object arrays
	this.sprites = [];
	this.assetsToLoad = [];
	this.assetsLoaded = 0;
	
	//Game states
	this.LOADING = 0;
	this.PLAYING = 1;
	this.gameState = this.LOADING;
	
	//Arrow key codes
	this.UP = 38;
	this.DOWN = 40;
	this.RIGHT = 39;
	this.LEFT = 37;

	//Directions
	this.moveUp = false;
	this.moveDown = false;
	this.moveRight = false;
	this.moveLeft = false;
}