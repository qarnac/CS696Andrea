function Entity(type) {
	var entity;
	
	if( type === "alien" )
		entity = new Alien();
	else if ( type === "canon" )
		entity = new Canon();
	else if ( type === "map" )
		entity = new Map();
		
	return entity;
}


