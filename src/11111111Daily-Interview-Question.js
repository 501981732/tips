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
    Reflect.ownKeys(obj).forEach(item => {
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
    listen = function(key,fn) {
        if (!list[key]) list[key] = []
        list[key].push(fn);
    }
    trigger = function(key,...args) {
        let fns = list[key];
        if (!fns || fns.length === 0) return
        for (let i = 0,len = fns.length; i < len; i++) {
            fns[i].apply(this,args)
        }
    }
    once = function(key,fn) {
        let only = function(args) {
            fn.apply(this,args)
            remove(key)
        }      
        listen(key,only)
    }

    remove = function(key,fn){
        let fns = list[key]
        if (!fns || fns.length === 0) return
        if (!fn) list[key] = []
        for (let i = 0,len = fns.length; i < len; i++) {
            if (fns[i] === fn) {
                list[key].splice(i,1)
            }
        }
    }

    return {
        listen,
        trigger,
        once,
        remove
    }

})();

class Event {
    constructor() {
        this.list = {}
    }
    
}

// Event.listen('hello',function(name) {
//     console.log('hello' + name)
// })
// Event.trigger('hello', 'wangmeng')

24. redux vuex
共同点： 都是处理全局状态的工具库，
        实现思路都是： 全局state保存状态-> dispatch(action) -> reducer() (vuex中是mutation) -> newState，整个状态是同步操作
区别： 
最大的区别在于处理异步的不同，vuex里面多了一步commit操作，在action之后commit(mutation)之前处理异步，而redux里面则是通过中间件处理    

25 浏览器 node事件循环
node10以后的执行顺序和浏览器保持一致
node10以前的
node的事件循环是libuv实现的
分为6个阶段 
1. timers 阶段：这个阶段执行timer（setTimeout、setInterval）的回调
2. I/O callbacks 阶段：处理一些上一轮循环中的少数未执行的 I/O 回调
3. idle, prepare 阶段：仅node内部使用， 标识空闲阶段或达到处理上限
4. poll 阶段：获取新的I/O事件, 适当的条件下node将阻塞在这里
5. check 阶段：执行 setImmediate() 的回调
6. close callbacks 阶段：执行 socket 的 close 事件回调

都是宏任务
6个阶段都不包括 nextTick

1. 执行完一个阶段的所有任务
2. 执行完nextTick队列里面的内容
3. 然后执行完微任务队列的内容


26 模块发展史
iife  
AMD 模块必须先声明 
CMD 支持动态引入依赖文件 
CommonJS  nodejs 中自带的模块化。
UMD：兼容AMD，CommonJS 模块化语法
webpack(require.ensure)：webpack 2.x 版本中的代码分割。
ES Modules： ES6 引入的模块化，支持import 来引入另一个 js 

27 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取

var是在调用栈中的变量环境中实现的
let const 是在调用栈中的词法环境的栈结构中实现的

28 cookie 和 token 都存放在 header 中，为什么不会劫持 token？

1、首先token不是防止XSS的，而是为了防止CSRF的；
2、CSRF攻击的原因是浏览器会自动带上cookie，而浏览器不会自动带上token

29 聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的
也可以说是单向绑定，只有m-v，vue2中通过defineProperty实现数据劫持，getter收集依赖，setter调用更新回调。这个过程是 vue 黑盒提供的，也就是说数据驱动视图，开发人员只需关注数据的变更即可
view到model是开发者通过v-model添加的。如果一个组件有多个 v-model ，你要自己写 v-on 和 data 的修改吧。

30 合并2个有序数组
 请把俩个数组 [A1, A2, B1, B2, C1, C2, D1, D2] 和 [A, B, C, D]，合并为 [A1, A2, A, B1, B2, B, C1, C2, C, D1, D2, D]

 function sort(arr1,arr2) {
     let len1 = arr1.length,
         len2 = arr2.length,
         i = 0,
         j = 0,
         sorted = [],
         curr
         while(i <= len1 || j <= len2) {
             if (i === len1) {
                curr = arr2[j++]
             } else if (j === len2) {
                 curr = arr1[i++]
             } else if (arr1[i] < arr2[j]) {
                curr = arr1[i++]
             } else {
                curr = arr2[j++]
             }
             sorted[i+j-1] = curr
         }
         for (let i = 0,len = len1 + len2; i < len; i ++) {
             num1[i] = sorted[i]
         }
         return num1[i]
 }

 function sort(arr1,arr2) {
    let m = arr1.length,
        n = arr2.length,
        insertPos = m + n -1;
        m--;n--
        while(n > 0) {
            arr1[insertPos] = arr1[m] > arr2[n] ?  arr1[m--] : arr2[n--]
        }
}


31. 
for (var i = 0; i< 10; i++){
	setTimeout(() => {
		console.log(i);
    }, 1000)
}
for (var i = 0; i< 10; i++){
	setTimeout((i) => {
		console.log(i);
    }, 1000,i)
}

for (var i = 0; i< 10; i++){
    ((i)=>{
        setTimeout(() => {
            console.log(i);
        }, 1000)
    })(i)
}


32. vdom比原生dom快？
在我看来 Virtual DOM 真正的价值从来都不是性能，而是它 
1) 为函数式的 UI 编程方式打开了大门；2) 可以渲染到 DOM 以外的 backend，比如 ReactNative

33. 
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
function
=== 
var b = 10;
(function b(){
    var b = 20;
    console.log(b); --> 20
})();

var b = 10;
(function b(b){
    b = 20;
    console.log(b);   --> 20
})(b);
====
var b = 10;
(function b(b) {
 window.b = 20;
 console.log(b)   ----> 10
})(b)

35 请求时浏览器缓存 from memory cache 和 from disk cache 的依据是什么，
哪些数据什么时候存放在 Memory Cache 和 Disk Cache中

36 flatten
37 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

因为更改state的函数必须是纯函数，纯函数既是统一输入就会统一输出，没有任何副作用；
如果是异步则会引入额外的副作用，导致更改后的state不可预测；


38  考察隐式转换
var a = ?;
if(a == 1 && a == 2 && a == 3){
 	console.log(1);
}

var s = {
    value:0,
    valueOf: function(){
    return ++this.value 
}
}

39 BFC  

BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。创建 BFC 的方式有：

html 根元素
float 浮动
绝对定位
overflow 不为 visiable
display 为表格布局或者弹性布局
BFC 主要的作用是：

清除浮动
防止同一 BFC 容器中的相邻元素间的外边距重叠问题

40 在 Vue 中，子组件为何不可以修改父组件传递的 Prop，如果修改了，Vue 是如何监控到属性的修改并给出警告的
单向数据流，易于监测数据的流动，出现了错误可以更加迅速的定位到错误发生的位置。
initprops 如果是开发环境，会在触发set的时候判断是否此key是否处于updatingChildren中被修改，如果不是，说明此修改来自子组件，触发warning提示

41. 
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()

由于变量声明提升，a = 5; 这条语句执行时，局部的变量a已经声明，
因此它产生的效果是对局部的变量a赋值，此时window.a 依旧是最开始赋值的10，

42 实现一个sleep
const sleep = (time) => {
    return new Promise(reslove => setTimeout(reslove,time))
}
sleep(1000).then(()=>{
    console.log(1)
  })

function sleep(callback,time) {
if(typeof callback === 'function')
    setTimeout(callback,time)
}

43 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果
默认的排序方法会将数组元素转换为字符串，然后比较字符串中字符的UTF-16编码顺序来进行排序。所以'102' 会排在 '15' 前面

44. 介绍 HTTPS 握手过程

45. HTTPS 握手过程中，客户端如何验证证书的合法性

46.

var obj = {
    '2': 3,
    '3': 4,
    'length': 2,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
[,,1,2]
47 双向绑定和 vuex 是否冲突
VueX规定了单向数据流，把把VueX的State放到v-model双向绑定报错，本来就是代码问题。和冲突么关系

48 call 和 apply 的区别是什么，哪个性能更好一
apply第二个参数是数组类数组，call则是后面所有的都是传给函数的
call传入参数的格式正是内部所需要的格式

49 为什么通常在发送数据埋点请求的时候使用的是 1x1 像素的透明 gif 图片？
没有跨域问题，一般这种上报数据，代码要写通用的；（排除ajax）
执行过程无阻塞
GIF的最低合法体积最小（最小的BMP文件需要74个字节，PNG需要67个字节，而合法的GIF，只需要43个字节）

50 实现 (5).add(3).minus(2)
5 + 3 - 2，结果为 6
Number.prototype.add = function(n){
    return this.valueOf() + n
}

Number.prototype.minus = function(n){
    return this.valueOf() - n
}

51 Vue 的响应式原理中 Object.defineProperty 有什么缺陷？
    1. 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
    2. 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。 
    3. Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。

52 垂直居中
定宽高 使用定位+margin
定位+transfrom
grid
flex   display:flex; margin:auto

display:flex;
justify-content:center;
align-items:center;

53 输出
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)

连续赋值的坑
1: 点的优先级大于等号的优先级
2: 对象以指针的形式进行存储，每个新对象都是一份新的存储地址
undefined
VM4091:6 {n: 2}


54 冒泡排序 以及优化  n^2
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    console.log(arr);
}
55 某公司 1 到 12 月份的销售额存在一个对象里面
如下：{1:222, 2:123, 5:888}，
请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。
Array.from({length:12}).map((item,index) => obj[index +1] || null)

56. 要求设计 LazyMan 类，实现以下功能。
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');

class LazyMan {
    constructor(name){
        this.name = name
        this.taskList = [];
       console.log(`I am ${this.name}`)
       setTimeout(() => {
        this.next();
    }, 0);
    }
    sleep(time) {
        let task = ()=>{
            setTimeout(()=>{
                console.log(str);
                this.next()
            },time*1000)
        }   
        this.taskList.push(task)

    }

    eat(str) {
        let task = ()=>{
            console.log(str);
            this.next()
        }
        this.taskList.push(task)
    }
    next() {
        let fn = this.taskList.shift()
        fn && fn()
    }
}


57. 分析比较 opacity: 0、visibility: hidden、display: none 
补充：株连性
如果祖先元素遭遇某祸害，则其子孙孙无一例外也要遭殃，比如：
opacity:0和display:none，若父节点元素应用了opacity:0和display:none，无论其子孙元素如何挣扎都不会再出现在大众视野；
而若父节点元素应用visibility:hidden，子孙元素应用visibility:visible，那么其就会毫无意外的显现出来。

display: none 会回流操作 性能开销较大，
visibility: hidden 是重绘制操作 比回流操作性能高一些，（回流会计算相邻元素甚至组先级元素的位置，属性等）
opacity: 0 重建图层，性能较高

58 箭头函数与普通函数（function）的区别是什么？
构造函数（function）可以使用 new 生成实例，那么箭头函数可以吗？为什么？
不可以使用 new 命令，因为：

没有自己的 this，无法调用 call，apply。
没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto_

59 两个数组的交集
哈希表，时间复杂度O(m + n) m为nums1长度，n为nums2长度


const intersect = (nums1, nums2) => {
    const map = {}
    const res = []
    for (let n of nums1) {
      if (map[n]) {
        map[n]++
      } else {
        map[n] = 1
      }
    }
    for (let n of nums2) {
      if (map[n] > 0) {
        res.push(n)
        map[n]--
      }
    }
    return res
  }

60. 
max-width: 300px
transform: scale(0.625,0.625)
padding

61 如何实现token加密
jwt举例

需要一个secret（随机数）
后端利用secret和加密算法(如：HMAC-SHA256)对payload(如账号密码)生成一个字符串(token)，返回前端
前端每次request在header中带上token
后端用同样的算法解密

62 redux 为什么要把 reducer 设计成纯函数
redux的设计思想就是不产生副作用，数据更改的状态可回溯，所以redux中处处都是纯函数
redux三大原则

1. 单一数据流
整个应用state都被储存在一个store里面 构成一个Object tree
2. State是只读的
唯一改变state的方法就是触发action, action是一个用于描述已发生事件的普通对象
3. 使用纯函数来执行修改
为了描述action如何改变state tree， 你需要编写reducers

63 轮播？
简单来说，无缝轮播的核心是制造一个连续的效果。最简单的方法就是复制一个轮播的元素，
当复制元素将要滚到目标位置后，把原来的元素进行归位的操作，以达到无缝的轮播效果。

64.
Promise.prototype.finally = function(cb) {
    let P = this.prototype
    return this.then(
         val => P.reslove(cb()).then(()=>val),
         e => P.resolve(cb()).then(()=> {throw Error(e)})
    )
}


65.  a.b.c.d 和 a['b']['c']['d']，哪个性能更高
后者还要考虑变量情况，且
编译器解析前者要比后者容易些

66。 ES6 代码转成 ES5 代码的实现思路是什么 
将ES6的代码转换为AST语法树，然后再将ES6 AST转为ES5 AST，再将AST转为代码

67. 随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，
将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
}

let obj = {};
initArr = Array.from({ length: 10 }, (v) => { return getRandomIntInclusive(0, 99) });
initArr.map((i) => {
    const intNum = Math.floor(i/10);
    if (!obj[intNum]) obj[intNum] = [];
    obj[intNum].push(i);
})

// 输出结果
const resArr = [];
for(let i in obj) {
    resArr.push(obj[i]);
}

68 如何解决移动端 Retina 屏 1px 像素问题
1. 伪类+ transfrom
2. viewport + rem 实现
3. 使用border-image实现
4. 使用background-image实现
5. 使用box-shadow模拟边框




-----------
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()


var a = {n: 1};
var b = a;
a.x = a = {n: 2};

console.log(a.x) 	
console.log(b.x)