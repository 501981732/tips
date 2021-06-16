// 单例模式很常用，比如全局缓存、全局状态管理等等这些只需要一个对象，就可以使用单例模式。

//单例模式的核心就是保证全局只有一个对象可以访问 产生一个类的唯一实例


// 应用 登录弹窗SDK 多次调用只会生成一次dom


// 1 传统语言描述的单例
class Singleton {
    constructor() {

    }
    this.instance = null

    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton()
        }
        return this.instance
    }
}


// 私有属性提案
class Singleton {
  #instance;
  getInstance() {
    if (!this.#instance) {
      this.#instance = new Singleton()
    }
    return this.#instance
  }
}

// 2 闭包的形式创建单例模式,同时符合惰性单例的特性

let Singleton = function(name) {
    this.name = name;
};

Singleton.prototype.getName = function() {
    alert(this.name);
};

Singleton.getInstance = (function() {
  let instance
  return function() {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()
let s1 = Singleton.getInstance()
let s2 = Singleton.getInstance()

console.log(s1 === s2)

// 透明单例 和其他构造函数一样
// 惰性单例 只有当使用的时候再创建

function Singleton (fn) {
  let result;
  return function() {
    return result || (result = fn.call(this, arguments))
  }
}


// 应用
// 在 Vuex 源码中，你也可以看到单例模式的使用，虽然它的实现方式不大一样，通过一个外部变量来控制只安装一次 Vuex
let Vue // bind on install

export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    // 如果发现 Vue 有值，就不重新创建实例了
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}

function Singleton(fn) {
  let result;
  return function() {
    return result ||  (result = fn.call(this, arguments))
  }
}

