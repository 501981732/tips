if (!Function.prototype.call) {
	Function.prototype.call = function(context = window) {
	    if (typeof this !== 'function') {
	        throw new TypeError('Error')
	    }
		context.fn = this
		let restArg = [...arguments].slice(1)
		const result = context.fn(...restArg)
		delete context.fn
		return result
	}
}
// a.call(this,1,2,3)

if (!Function.prototype.apply) {
	Function.prototype.apply = function(context = window) {
	    if (typeof this !== 'function') {
	        throw new TypeError('Error')
	    }
		context.fn = this
		let result;
		if (arguments[1]) {
			result = context.fn(arguments[1])
		} else {
			result = context.fn()
		}
		delete context.fn
		return result
	}
}

if (!Function.prototype.bind) {
	Function.prototype.bind = function (context = window) {
		if (typeof this !== 'function') {
			throw new Error('Error')
		}
		let restArg = [...arguments].slice(1)
		context.__fn__ = this

		context.__result = function F() {
			cosnt args = [...arguments,...restArg]
			if (this instanceof F) {
				return new context.__fn__(...args)
			} else {
				return context.__fn__(...args);
			}
		}
		return context.__result
	}
}

a.bind(this,x,x,x)
// new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别？
// 对于创建一个对象来说，更推荐使用字面量的方式创建对象（无论性能上还是可读性）。
// 因为你使用 new Object() 的方式创建对象需要通过作用域链一层层找到 Object，但是你使用字面量的方式就没这个问题

// 创建空对象
// 获取构造函数
// 设置空对象的原型 指向构造函数的原型对象
// 绑定this 执行构造函数
// 保证返回的值为对象
function myNew() {
	let obj = {}
	let Cons = [].shift.call(arguments)
	obj.__proto__ = Cons.prototype
	const result = Cons.apply(obj, arguments)
	// return obj
	return result instanceof Object ? result : obj
}

function myInstance(left, right) {
	let prototype = right.prototype
	let left = left.__proto__

	while (true) {
		if (left === undefined || left === null) {
			return false
		}
		if (left === prototype) {
			return true
		}
		left = left.__proto__
	}
}









