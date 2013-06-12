function Entity(type) {
    if (type == "alient") {
        this.__proto__ = Alien.prototype;
    } else if (type == "canon") {
        this.__proto__ = Canon.prototype;
    } else if (type == "map") {
        this.__proto__ = Map.prototype;
    }
	
	Entity.prototype.foo = function() {
    alert("This is Base class");
}