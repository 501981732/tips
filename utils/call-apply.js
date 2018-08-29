Function.prototype.mycall = function(context = window) {
	context.fn = this // 将方法挂在到call的对象里面
	console.log(context)
	console.log(context.fn)
	var args = [...arguments].slice(1) // 取剩余的参数
	var result = context.fn(...args)  // 
	delete context.fn 
	return result
}


var people = {
    name: "people",
    sayHello: function (age,sex) {
         console.log("hello, i am ", this.name + " " + age + " years old" + sex);
     }
};

var  wang = {
    name: "wang",
};

people.sayHello(18)
people.sayHello.mycall(wang,20,'boy')