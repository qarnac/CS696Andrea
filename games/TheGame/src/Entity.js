function Entity(type) {
	
	this.sourceX = 0;
    this.sourceY = 0;
    this.sourceWidth = 32;
    this.sourceHeight = 32;
    this.width = 32;
    this.height= 32;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.visible = true;
	
	if( type === "alien" )
		this.prototype = new Alien();
	if ( type === "cannon" )
		this.prototype = new Canon();
	if ( type === "map" )
		this.prototype  = new Map();
				
}


