// 原型链
// Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
// Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
// 函数的 prototype 是一个对象
// 对象的 __proto__ 属性指向原型， __proto__ 将对象和原型连接起来组成了原型链


// class实现继承
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}


class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}

class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}

// babel转es5
function _inherits(subClass, superClass) { 
  subClass.prototype = Object.create(
      superClass && superClass.prototype, 
      { 
      constructor: { 
        value: subClass, 
        enumerable: false,
        writable: true, 
        configurable: true 
      } 
      }
  );
    if (superClass) {
      Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
  }




// 原型链作为实现继承的主要方法

// 构造函数 原型 和实例的关系：
// 每一个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。 ===》
// 原型的 constructor 属性指向构造函数，构造函数又通过 prototype 属性指回原型，但是并不是所有函数都具有这个属性，Function.prototype.bind() 就没有这个属性
// a.__proto__.constructor.prototype === a.__proto__
// 
// 假如我们让原型对象等于另一个类型的实例，那么原型对象将包含一个指向另一个原型的指针，相应的 另一个原型中也包含着一个指向另一个构造函数的指针

// 每一个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含一个指向原型对象的内部指针。 ===》

// 原型链继承
function SuperType() {
    this.color = ['red','green']
}

SuperType.prototype.toString = function() {}

function SubType() {
    this.subProp = 1
}

SubType.prototype = new SubType()

let instance = new SubType()

// 原型链继承最大的问题 是 引用类型的原型属性会被所有实例共享


// 借用构造函数： 在子类构造函数中调用超类的构造函数
function SuperType(color) {
    this.color = color
}

function SubType() {
    // 继承了superType
    superType.call(this,'red') //在子类构造函数中向超类传参
}

// 借用构造函数最大的问题是不能继承原型方法，无法实现复用



// 组合式继承：借用构造函数实现对实例属性的继承，使用原型链实现对原型属性和方法的继承

function superType(name) {
    this.name = name
    this.color = ['red','green']
}

superType.prototype.sayName = function() {}

function SubType(name, age) {
    superType.call(this,name)
    this.age = age
}

SubType.prototype = new superType()
SubType.prototype.constructor = SubType //修正constructor
superType.prototype.asyAge = function() {

}

// 组合式继承最大的问题是 无论何时 都会调用2次父类的构造函数

// 寄生组合继承 ：不必为了指定子类的原型而调用父类的构造函数。我们需要的只是父类原型的一个副本

function inherit(SubType,superType) {
    let prototype = Object.create(superType.prototype,{ 
      constructor: {
        value: SubType, 
        enumerable: false, 
        writable: true, 
        configurable: true 
      }
    })
        SubType.prototype = prototype
}

// 最理想的继承方式

function SuperType(name) {
    this.name = name
}

SuperType.prototype.sayName() {}

function SubType(age) {
    SuperType.call(this,name)
    this.age = age
}

inherit(SubType,SuperType)
superType.prototype.asyAge = function() {

}



function inherit(subType,superType) {
  subType.prototype = Object.create(subType.prototype,{
    constructor: {
      value: subType,
      enumerbale: false,
      writable: true,
      configurable: true
    }
  })
}

function subType(){
  superType.call(this,arguments)
}
// a.__proto__.constructor.prototype === a.__proto__
// subType.prototype = new superType()
// subType.prototype.constructor = subType
