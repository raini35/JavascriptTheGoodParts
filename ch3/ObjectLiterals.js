var empty_object = {}; 

var stooge = {
	"first-name" : "Jerome", 
	"last-name" : "Howard"
};

var flight = {
	airline: "Oceanic", 
	number: 815, 
	departure: {
		IATA: "SYD", 
		time: "2004-09-22 14:55", 
		city: "Sydney"
	}, 
	arrival: {
		IATA: "LAX", 
		time: "2004-09-23 10:42", 
		city: "Los Angeles"
	}
}; 

console.log(stooge["first-name"]); 
console.log(flight.departure.IATA);

console.log(stooge["middle-name"]); 
console.log(flight.status); 
console.log(stooge["FIRST-NAME"]);  

stooge['first-name'] = 'Jerome'; 

stooge['middle-name'] = 'Curly'; 
stooge.nickname = 'Curly'; 
flight.equipment = {
	model: 'Boeing 777'
}; 

flight.status = 'overdue'; 

//Objects are passed around by reference. They are never copied. 

if (typeof Object.create !== 'function') {
		Object.create = function (o) {
			var F = function () {}; 
			F.prototype = o; 
			return new F(); 
		}; 
}

var another_stooge = Object.create(stooge); 

console.log(another_stooge); 
console.log(stooge); 

console.log(typeof flight.number); 
console.log(typeof flight.status); 

console.log(typeof flight.constructor); 
console.log(flight.hasOwnProperty('constructor')); 

var name; 
for (name in another_stooge) {
	console.log(name + ':' + another_stooge[name]); 
}

var i; 
var properties = [
	'first-name', 
	'middle-name', 
	'last-name', 
	'profession'
]; 
for (i = 0; i < properties.length; i += 1) {
	console.log(properties[i] + ':' + another_stooge[properties[i]]); 
}

another_stooge.nickname = 'Moe'; 
console.log(another_stooge.nickname);
delete another_stooge.nickname; 
console.log(another_stooge.nickname);

//Javascript makes it easy to define global variables that can hold all of the assets of 
//your application. Unfortunately, global variables weaken the resiliency of programs 
//and should be avoided. 