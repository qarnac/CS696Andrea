function Entity(type) {
	this.__proto__ = new Alien();
/*
    if (type == "alien") {
        this.__proto__ = Alien.prototype;
    } else if (type == "canon") {
        this.__proto__ = Canon.prototype;
    } else if (type == "map") {
        this.__proto__ = Map.prototype;
    }
*/
	//alert('person instantiate');
	//this.name = "Entity";
	return this;
}

Entity.prototype.getName = function() {
	return this.name;
};

function Alien()
{
	//alert('im in here ALIEN');
}

/*
function Factory() {
    this.createEmployee = function (type) {
        var employee;

        if (type === "fulltime") {
            employee = new FullTime();
        } else if (type === "parttime") {
            employee = new PartTime();
        } else if (type === "temporary") {
            employee = new Temporary();
        } else if (type === "contractor") {
            employee = new Contractor();
        }

        employee.type = type;
        employee.say = function () {
            log.add(this.type + ": rate " + this.hourly + "/hour");
        }
        return employee;
    }
        
}
*/
