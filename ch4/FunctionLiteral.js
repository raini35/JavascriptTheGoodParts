var add = function (a, b) {
	return a + b; 
};

//THE METHOD INVOCATION PATTERN 

var myObject = {
	value: 0,
	increment: function (inc) {
		this.value += typeof inc === 'number' ? inc : 1; 
	}
}; 

myObject.increment(); 
console.log(myObject.value); 

myObject.increment(2); 
console.log(myObject.value); 

//THE FUNCTION INVOCATION PATTERN 
myObject.double = function () {
	var that = this; 
	
	var helper = function () {
		that.value = add(that.value, that.value); 
	}; 
	
	helper(); 
}; 

myObject.double(); 
console.log(myObject.value); 

//THE CONSTRUCTOR INVOCATION PATTERN 
var Quo = function (string) {
	this.status = string; 
}; 

Quo.prototype.get_status = function () {
	return this.status; 
}; 

var myQuo = new Quo("confused"); 

console.log(myQuo.get_status());

//THE APPLY INVOCATION PATTERN 
var array = [3, 4]; 
var sum = add.apply(null, array); 

var statusObject = {
	status: 'A-OK'
};  

var status = Quo.prototype.get_status.apply(statusObject); 
console.log(status); 

//Look up how apply works!!