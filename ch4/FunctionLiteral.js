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

var sum = function() {
	var i, sum = 0; 
	for(i = 0; i < arguments.length; i += 1) {
		sum+= arguments[i]; 
	}	
	return sum; 
};

console.log(sum(4, 8, 15, 16, 23, 42)); 

var add = function(a, b) {
	if(typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError', 
			message: 'add needs numbers'
		}; 
	}
	return a + b; 
}

var try_it = function () {
	try {
		add("seven"); 
	} catch(e) {
		console.log(e.name + ': ' + e.message); 
	}
}

try_it(); 

var walk_the_DOM = function walk(node, func) {
	func(node); 
	node = node.firstChild; 
	while(node) {
		walk(node, func); 
		node = node.nextSibling; 
	}
}; 

var getElementsByAttribute = function (att, value) {
	var results = []; 
	
	walk_the_DOM(document.body, function(node) {
		var actual = node.nodeType == 1 && node.getAttribute(att); 
		if (typeof actual === 'string' && 
			(actual === value || typeof value !== 'string')) {
			results.push(node); 
			}
	}); 
}; 

//SCOPE 
var foo = function () {
	var a = 3, b = 5; 
	
	var bar = function () {
		var b = 7, c= 11; 
		
		a += b + c; 
	}; 
	
	bar(); 
}; 


var myObject = function () {
	var value = 0; 
	
	return {
		increment : function (inc) {
			value += typeof inc === 'number' ? inc: 1; 
		}, 
		getValue : function () {
			return value; 
		}
	}; 
}(); 


var quo = function (status) {
	return {
		get_status: function() {
			return status; 
		}
	}; 
}; 	

var myQuo = quo("amazed"); 

console.log(myQuo.get_status()); 

var fade = function (node) {
	var level = 1; 
	var step = function () {
		var hex = level.toString(16); 
		node.style.backgroundColor = '#FFFF' + hex + hex; 
		if( level < 15) {
			level += 1; 
			setTimeout(step, 100); 
		}
	}; 
	setTimeout(step, 100); 
}; 

//fade(document.body); 

var serial_maker = function () {
	var prefix = ''; 
	var seq = 0; 
	return {
		set_prefix: function (p) {
			prefix = String(p); 
		}, 
		set_seq: function (s) {
			seq = s; 
		},
		gensym: function () {
			var result = prefix + seq; 
			seq += 1; 
			return result; 
		}
	}; 
}; 

var seqer = serial_maker(); 
seqer.set_prefix('Q');
seqer.set_seq(1000); 
console.log(seqer); 
var unique = seqer.gensym(); 

console.log(seqer.gensym()); 

var fibonacci = function () {
	var memo = [0, 1]; 
	var fib = function (n) {
		var result = memo[n]; 
		if(typeof result !== 'number') {
			result = fib(n-1) + fib(n-2); 
			memo[n] = result; 
		}
		return result; 
	}; 	
	return fib; 
}(); 
console.log(fibonacci(10));

var memoizer = function (memo, fundamental) {
	var shell = function (n) {
		var result = memo[n]; 
		if (typeof result !== 'number') {
			result = fundamental(shell, n); 
			memo[n] = result; 
		}
		return result; 
	}; 
	
	return shell; 
}; 

var fibonacci = memoizer([0,1], function (shell, n) {
	return shell(n-1) + shell(n-2); 	
}); 

console.log(fibonacci(10));
