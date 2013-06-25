function generateMaze(maze)
{
	
	var row = Math.floor((Math.random()*16)+1);
	while( (row % 2) === 0)
		row = Math.floor((Math.random()*16)+1);
	
	var col = Math.floor((Math.random()*16)+1);
	while( (col % 2) === 0)
		col = Math.floor((Math.random()*16)+1);
		
	console.log("row = " + row);
	console.log("col = " + col);
	
	//set the starting cell at
	maze[row][col];
	
	//missing recursionCall
	
	return maze;
}

