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
	generateRandomDirections();
	
	return maze;
}

function generateRandomDirections()
{
	var randoms = [];
	for ( var i = 0; i < 4; ++i)
	{
		randoms[i] = i+1;
	}
	
	shuffle(randoms);
	console.log(randoms);
	
}

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
