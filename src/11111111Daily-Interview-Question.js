1. key作用 
    diff同级比较的效率
2. ['1', '2', '3'].map(parseInt) 1 NAN NAN what & why ? 
    map的参数item, index, array
3. 节流 防抖
    防抖：debounce 在 n 秒内函数只能执行一次，如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间。思路： 每次调用前清除之前延时调用
    节流： throttle 稀释执行效率  思路：每次触发前判断当前是否有等待执行的延时函数
    function debounce(fn,time) {
        let timer = null
        return function() {
            let context = this
            if (timer) clearTimeout(timer)
            timer = setTimeout(function(){
                fn.call(context,arguments)
                timer = null
            },time)
        }
    }

    function throttle(fn,time) {
        let canRun = true
        return function() {
            if (!canRun) return
            canRun = false
            let context = this
            setTimeout(()=>{
                fn.call(context,arguments)
                canRun = true
            },time)
        }
    }
4. Set 类似数组 成员不重复 map字典 类似集合 key可接受 各种类型的值（包括对象）都可以当作键
weakSet WeakSet 对象中储存的对象值都是被弱引用的，即垃圾回收机制不考虑 WeakSet 对该对象的应用，如果没有其他的变量或属性引用这个对象值，则这个对象将会被垃圾回收掉 可以用来保存DOM节点，不容易造成内存泄漏

5. 深度优先遍历 广度优先遍历

function DFS(node,res) {
    if (node) {
        const {children} = node
        res.push(children)
        if (children && children.length) {
            for (let i = 0,len = children.length; i < len; i++) {
                DFS(children[i],res)
            }
        }
    }
    return res
}

6. 深拷贝

function deepClone(obj,map = new WeakMap()) {
    if (obj === null || typeof obj === 'object') return obj
    if(map.has(obj)) return map.get(obj)
    let clone = Array.isArray(obj) ? [] : {}
    map.set(clone,obj)
    Reflect.ownKeys(item => {
        clone[item] = deepClone(obj[item],map)
    })
}

7. ES5/ES6 的继承除了写法以外还有什么区别？
// class 的所有方法（包括静态方法和实例方法）都是不可枚举的。
// 必须使用 new 调用 class。
// class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用

8. setTimeout、Promise、Async/Await 的区别
其中settimeout的回调函数放到宏任务队列里，等到执行栈清空以后执行；
promise.then里的回调函数会放到相应宏任务的微任务队列里
await后面跟一个表达式，async方法执行时，遇到await会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。

9. Async/Await 如何通过同步的方式实现异步 
其实是generator的语法糖 自执行的generate函数
function* gen(){  // 这里的*可以看成 async
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);  // 这里的yield可以看成 await
    console.log(result.bio);
  }

10. 异步笔试题

async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
    console.log('promise2');
}).then(function() {
    console.log('promise3');
});
console.log('script end');

11.
 var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

function flat(arr) {
    [...new Set(arr.flat(Infinity))].sort()
}

[...new Set(arr.toString().split(',').sort((a,b) => a -b).map(Number))]

12 JS 异步解决方案的发展历程以及优缺点
13 Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？
14 new

function _new(fn,...args) {
    let obj = Object.create(fn.prototype)
    let obj = {}
    obj.__proto__ = fn.prototype
    let result = fn.apply(obj, args)
    return result instanceof Object ? result : obj
}
15 http多路复用
简单来说， 就是在同一个TCP连接，同一时刻可以传输多个HTTP请求。

16 三次握手和四次挥手
a: 你好 我是a
b：你好我是b
a：那我们开始链接吧

男: 我要挂了哦
女： 等下，我还有敷面膜
女：我完事儿了 可以挂了
男：你挂了吧 不用回复了
女： 挂
男： 等2msl听到嘟嘟 挂了

17 A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态 syn_sent

18 React 中 setState 什么时候是同步的，什么时候是异步的


如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state
的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state，还是放到队列中回头再说，
默认false,batchedUpdates会将其修改为true, react事件中会调用
setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，
导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果

19 
this.state = {
    val: 0
  };
}

componentDidMount() {
  this.setState({val: this.state.val + 1});
  console.log(this.state.val);    // 第 1 次 log

  this.setState({val: this.state.val + 1});
  console.log(this.state.val);    // 第 2 次 log

  setTimeout(() => {
    this.setState({val: this.state.val + 1});
    console.log(this.state.val);  // 第 3 次 log

    this.setState({val: this.state.val + 1});
    console.log(this.state.val);  // 第 4 次 log
  }, 0);

    1、第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。

    2、两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。

    3、setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。


20 npm 模块安装机制
发出npm install命令
查询node_modules是否有该模块 
有 不在安装
没有 向register查询模块压缩包地址
下载压缩包到根目录下的.npm目录
解压缩到node_modules
原理： 1 preinstal 2. 确定首层依赖 3. 递归获取模块 如果模块有依赖则从1开始 4. 模块扁平化 5. 安装模块 执行工程资深生命周期

21. Object.prototype.toString.call() 、 instanceof 以及 Array.isArray() 区别和优劣
// Object.prototype.toString.call() 对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。
// instanceof 判断对象的原型链中是不是能找到类型的 prototype 只能判断对象类型
// Array.isArray() 优于 instanceof 可以检车出iframe

22. 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化
整个渲染流水线是： 1构建dom tree 2 计算css样式 3. layout布局阶段layoutTree 4. 分层 layertree 5. paint 为每个图层生成绘制列表，提交到合成层
 6. 合成线程将图层分成图块， 转换成位图 7. 给浏览器进程发命令 8 浏览器进程根据命令生成页面显示到显示器

独立的层 对于复杂动画效果,使用绝对定位让其脱离文档流
GPU加速 使用 transform 替代 top
避免触发同步布局事件

使元素脱离文档流
对其进行多次修改
将元素带回到文档中

22 发布订阅模式
// 观察者模式没中间商赚差价

var Event = (function(){
    let list = {},
    listen,
    trigger,
    once,
    remove;
    listen = function() {

    }

    return {
        listen,
        trigger,
        once,
        remove
    }

})();

// Event.listen('hello',function(name) {
//     console.log('hello' + name)
// })
// Event.trigger('hello', 'wangmeng')

