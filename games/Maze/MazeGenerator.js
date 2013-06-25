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
	recursion(row,col, maze);
	
	console.log(maze);
	return maze;
}

function recursion(row, col, maze)
{
	var randDirections = generateRandomDirections();
	
	for ( var i = 0; i < randDirections.length; ++i)
	{
		switch(randDirections[i])
		{
			case 1:
				if ( (row - 2) <= 0)
					continue;
				if (maze[row - 2][col] !== 0) 
				{
					maze[row-2][col] = 0;
					maze[row-1][col] = 0;
					recursion(row - 2, col, maze);
				}
			break;
			case 2:
				if ( col + 2 >= 16 - 1)
					continue;
				if ( maze[row][col + 2] !== 0)
				{
					maze[row][col + 2] = 0;
					maze[row][col + 1] = 0;
					recursion(row, col + 2, maze);
				}
			break;
			case 3:
				if(row + 2 >= 16 - 1)
					continue;
				if (maze[row + 2][col] !== 0)
				{
					maze[row+2][col] = 0;
					maze[row+1][col] = 0;
					recursion(row+2, col, maze);
				}
			break;
			case 4:
				if( col - 2 <= 0)
					continue;
				if( maze[row][col-2] !== 0)
				{
					maze[row][col-2] = 0;
					maze[row][col-1] = 0;
					recursion(row, col-2, maze);
				}
			break;
		}
		
	}
	
}


function generateRandomDirections()
{
	var randoms = [];
	for ( var i = 0; i < 4; ++i)
	{
		randoms[i] = i+1;
	}
	
	shuffle(randoms);
	
	
	return randoms;
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
