// 各种源码实现：https://mp.weixin.qq.com/s/9xvI37cKpSRFRMhQ2yc_zg
Function.prototype.mycall = function (context = window) {
	// 不传第一个参数默认挂载到window上
	// 改变this指向让新对象可以执行该函数，并能接收函数
	if (typeof this !== 'function') {
		throw new TypeError('Error')
	}
	context.fn = this // 将方法挂在到call的对象里面
	var args = [...arguments].slice(1) // 取剩余的参数
	var result = context.fn(...args) // 
	delete context.fn
	return result
}
Function.prototype.myApply = function (context = window) {
	if (typeof this !== 'function') {
		throw new TypeError('Error')
	}
	let result
	context.fn = this
	if (arguments[1]) {
		result = context.fn(arguments[1])
	} else {
		result = context.fn()
	}
	return result

}


// bind 需要返回一个函数
//一种直接调用 一种通过new来调用
// 直接调用的话 通过apply实现  因为 bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以我们需要将两边的参数拼接起来，于是就有了这样的实现 args.concat(...arguments)
// 


Function.prototype.myBind = function(context = window) {
	if (typeof context !== 'function') {
		throw new TypeError()
	}
	const _this = this
	const args = [...arguments].slice(1)
	return function F() {
		// 假如通过new来实现
		if (this instanceof F) {
			return new _this(...args,...arguments)
		} else {
			return _this.apply(context,args.concat(...arguments))
		}
	}
}
// test
var people = {
	name: "people",
	sayHello: function (age, sex) {
		console.log("hello, i am ", this.name + " " + age + " years old" + sex);
	}
};

var wang = {
	name: "wang",
};

people.sayHello(18)
people.sayHello.mycall(wang, 20, 'boy')
people.sayHello.mycall(wang, [20,'boy'])

let counter = 10;
export default counter;



// new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别

// （1）创建一个新对象；
// （2）将构造函数的作用域赋给新对象（因此this就指向了这个对象）；
// （3）执行构造函数中的代码（为这个新对象添加属性）；
// （4）返回新对象。

function myNew (constructor){
    var o = {};
    o.__proto__ = constructor.prototype;
    constructor.apply(o, Array.prototype.slice.call(arguments, 1));
    return o;
}

var person1 = myNew(Person, 'MeloGuo', 21)


// jsonp

function jsonp(url,callbackName,success) {
	let script = document.createElement('script')
	script.src = url
	script.type = 'text/javascript'
	script.async = true
	window[callbackName] = function(data) {
		success && success(data)
	}
	document.body.appendChild(script)
}
// 节流
const throttle = (func,wait=50) => {
	let lastDate = 0;
	return function(...args) {
		let now = + new Date()
		const that = this
		if (now - lastDate >= wait) {
			lastDate = now
			func.apply(that,args)
		}
	}
}


const throttle2 = (func,wait) => {
	let timer = null
	return function(...args) {
		const that = this
		if (timer) return;
		timer = setTimeout(function(){
			func.call(this,args)
			timer = null
		},wait)
	}
}

const debounce = (func,wait,immediate) => {
	let timer = null,result;
	return function(args) {
		const context = this
		if (timer) {
			clearTimeout(timer)
		}
		if (immediate) {
			// 如果已经执行过 不再执行
			let callNow = !timer
			timer = setTimeout(function(){
				timer = null
			},wait)
			if (callNow) result = func.apply(context,args)
		} else {
			timer = setTimeout(function(){
				result = func.apply(context,args)
			},wait)	
		}
	}
}
// 用于创建已经设置好了一个或多个的函数。和函数绑定一样，使用闭包返回一个函数。
// 动态创建步骤：调用另一个函数，并为它传入要柯里化的函数和必要的参数。

function curry(fn) {
	const args = Array.prototype.slice.call(arguments,1)
	return function() {
		const innerArgs = Array.prototype.slice.call(arguments)
		const finalArgs = args.concat(innerArgs)
		console.log(innerArgs)
		fn.apply(null,finalArgs)
	}
}

function curry(fn,...args1) {
	return (...args2) => {
		return (arg => {
			arg.length === fn.length ? fn(...arg) : curry(fn,...arg)
		})([...args1,...args2])
	}
}
// const curry = (fn, ...args1) => (...args2) => (
// 	arg => arg.length === fn.length ? fn(...arg) : curry(fn, ...arg)
//    )([...args1, ...args2])

const throttle = function(fn,wait,immediate) {
	let lastDate = 0;
	return function(...args) {
		let now = + new Date()
		let that = this
		if (now - lastDate >= wait) {
			fn.apply(that,args)
			lastDate = now
		}
	}
}

const debounce = function(fn,wait,immediate) {

	
}
	