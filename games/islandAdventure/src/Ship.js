//class constructor
function Ship()
{
	
}

//class method
Ship.prototype.move = function(navigate)
{
	switch(navigate)
	{
		case UP:
			if(this.shipRow > 0)
				this.shipRow--;
			else
				this.shipRow = ROWS - 1;
			break;
	  
		case DOWN:
			this.shipRow = (this.shipRow + 1) % ROWS;
			break;
	    
		case LEFT:
			if(this.shipColumn > 0)
				this.shipColumn--;
			else
				this.shipColumn = COLUMNS - 1;
			break;  
	    
		case RIGHT:
			this.shipColumn = (this.shipColumn + 1) % COLUMNS;
	}
}