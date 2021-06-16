// 各种源码实现：https://mp.weixin.qq.com/s/9xvI37cKpSRFRMhQ2yc_zg
Function.prototype.mycall = function(context = window) {
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

Function.prototype.myApply = function(context = window) {
    if (typeof this !== 'fsunction') {
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

// Function.prototype.bind = function(context = window) {
//     context.__fn__ = this
//     let args = [...arguments].slice(1);
//     context.__result__ = function F() {
//         let resultArgs = [...args,...arguments];
//         if (this instanceof F) {
//             return new context.__fn__(resultArgs);
//         }
//         return context.__fn__(resultArgs);
//     }
//     return context.__result__
// }

// bind 需要返回一个函数
//一种直接调用 一种通过new来调用
// 直接调用的话 通过apply实现  因为 bind 可以实现类似这样的代码 f.bind(obj, 1)(2)，所以我们需要将两边的参数拼接起来，于是就有了这样的实现 args.concat(...arguments)
if (!Function.prototype.bind) {
    Function.prototype.bind = function (context = window) {
        if (typeof this !== 'function') {
            throw new Error('Error')
        }
        let restArg = [...arguments].slice(1)
        context.__fn__ = this

        context.__result = function F() {
            const args = [...arguments,...restArg]
            if (this instanceof F) {
                return new context.__fn__(...args)
            } else {
                return context.__fn__(...args);
            }
        }
        return context.__result
    }
}

// test
var people = {
    name: "people",
    sayHello: function(age, sex) {
        console.log("hello, i am ", this.name + " " + age + " years old" + sex);
    }
};

var wang = {
    name: "wang",
};

people.sayHello(18)
people.sayHello.mycall(wang, 20, 'boy')
people.sayHello.mycall(wang, [20, 'boy'])

let counter = 10;
export default counter;



// new 的原理是什么？通过 new 的方式创建对象和通过字面量创建有什么区别

// （1）创建一个新对象；
// （2）将构造函数的作用域赋给新对象（因此this就指向了这个对象）；
// （3）执行构造函数中的代码（为这个新对象添加属性）；
// （4）如果该函数没有返回对象，则返回this。

function myNew(fn, ...args) {
    var o = {};
    o.__proto__ = fn.prototype;
    Cons.apply(o, args);
    return o;
}
function _new(fn, ...args) {
    const obj = Object.create(fn.prototype);
    const result = fn.apply(obj, args);
    return result instanceof Object ? result : obj;
}

var person1 = myNew(Person, 'MeloGuo', 21)

// jsonp

function jsonp(url, callbackName, success) {
    let script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    script.async = true
    window[callbackName] = function(data) {
        success && success(data)
    }
    document.body.appendChild(script)
}
// jsonp('url', 'callback', function(val) {
//     console.log(val)
// })
// 节流
// const throttle = (func, wait = 50) => {
//     let lastDate = 0;
//     return function(...args) {
//         let now = +new Date()
//         const that = this
//         if (now - lastDate >= wait) {
//             lastDate = now
//             func.apply(that, args)
//         }
//     }
// }


// const throttle2 = (func, wait) => {
//     let timer = null
//     return function(...args) {
//         const that = this
//         if (timer) return;
//         timer = setTimeout(function() {
//             func.call(this, args)
//             timer = null
//         }, wait)
//     }
// }

// 防抖 指触发事件后，在 n 秒内函数只能执行一次，如果触发事件后在 n 秒内又触发了事件，则会重新计算函数延执行时间

function debounce(fn,time) {
    let timer = null
    return function() {
        let context  = this
        if (timer)  clearTimeout(timer);
            timer = setTimeout(()=> {
                fn.call(context,arguments)
                timer = null
            },time)
    }
}
// 节流
// const throttle = function(fn, time) {
//     let canRun = true;
//     return function() {
//         if (!canRun) return;
//         canRun = false
//         let context = this
//         setTimeout(function() {
//             fn.call(context, arguments)
//             canRun = true;
//         }, time)
//     }
// }

function throttle2(fn,time) {
    let activeTime = 0;
    return function() {
        let current = Date.now();
        if (current - activeTime>=time*1000) {
            fn.call(this,arguments)
            activeTime = Date.now();
        }
    }
}



const debounce2 = (func, wait, immediate) => {
    let timer = null,
        result;
    return function(args) {
        const context = this
        if (timer) {
            clearTimeout(timer)
        }
        if (immediate) {
            // 如果已经执行过 不再执行
            let callNow = !timer
            timer = setTimeout(function() {
                timer = null
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timer = setTimeout(function() {
                result = func.apply(context, args)
            }, wait)
        }
    }
}


// 二维数组
// var result = Array.prototype.concat.apply([], arr);

// 多维数组降维
// 正则 1.
ary = JSON.stringify(arr).replace(/(\[|\])/g, '').split(',')
ary = arr.toString().split(',').map(Number)


// es6 arr.flat(Infinity)
// 递归
function deepFlatten(arr,n) {
    let result = []
    arr.forEach(item => {
        if (Array.isArray(item) && n > 0) {
            // result = result.concat(deepFlatten(item))
            result.push(...deepFlatten(item,--n))
        } else {
            result.push(item)
        }
    })
    return result
}
// reduce
function deepFlatten2(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? deepFlatten2(cur) : cur)
    }, [])
}
function deepFlatten(arr) {
    while(arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
    }
    return arr
}

function deepFlatten(arr,n) {
    while(n--) {
        arr = [].concat(...arr)
    }
    return arr
}


function myInstance(l, r) {
    let prototype = r.prototype;
    let left = l.__proto__;
    while (true) {
        // 两个条件都能终结while
        if (left === null || left === undefined) {
            return false
        }
        if (left === prototype) {
            return true
        }
        left = left.__proto__
    }
}


// typeof检测数据类型 可以是基本类型也可以是复杂类型
// instanceof 是检测两者之间的关联性 左边是否是右边的实例 ，不能是基本类型





function copy(dist) {
    function isObject(o) {
        return typeof o === 'object'
    }
    let target = Array.isArray(dist) ? [...dist] : { ...dist }
    Reflect.ownKeys(target).forEach(item => {
        target[item] = isObject(target(item)) ? copy(target[item]) : target[key]
    })
}


// 82 移动0
// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

// 必须在原数组上操作，不能拷贝额外的数组。
// 尽量减少操作次数。
let arr = [0, 1, 0, 0, 3, 12];

// 这个需要创建额外空间
function moveZero(arr) {
    let length = arr.length;
    let newArr = arr.filter(i => !!i)
    newArr.concat(new Array(length - newArr.length).fill(0))
}


function moveZero(arr) {
    let len = arr.length;
    let j = 0;
    for (let i = 0; i < len - j; i++) {
        if (arr[i] === 0) {
            // arr.push(0);
            // arr.splice(i, 1); //至此数组长度不变
             [arr[i],arr[len-j-1]] = [arr[len-j-1],arr[i]]

            i--; //保证下次还是从当前index开始  //这样会有bug 万一第一个就是0的时候 
            j++;
        }
    }
    return arr
    // return arr.concat(new Array(j).fill(0))
}

function moveZero(arr) {
    let len = arr.length;
    let j = 0;
    for (let i = 0; i < len - j;) {
        if (arr[i] === 0) {
             [arr[i],arr[len-j-1]] = [arr[len-j-1],arr[i]]
            j++;
        }
        i++
    }
    return arr
}





//86 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。两数之和
// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
// 利用空间换时间：
const twoNum = (arr, target) => {
    let map = {};
    for (let i = 0, len = arr.length; i < len; i++) {
        let diff = target - arr[i]
        if (map[diff]) {
            return [arr[i], map[diff]]
        }
        map[arr[i]] = i
    }
}

// 88 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度
//
// 原始 list 如下
let list = [
    { id: 1, name: '部门A', parentId: 0 },
    { id: 2, name: '部门B', parentId: 0 },
    { id: 3, name: '部门C', parentId: 1 },
    { id: 4, name: '部门D', parentId: 1 },
    { id: 5, name: '部门E', parentId: 2 },
    { id: 6, name: '部门F', parentId: 3 },
    { id: 7, name: '部门G', parentId: 2 },
    { id: 8, name: '部门H', parentId: 4 }
];
// 1 filter+map
function nest(items, id = 0, link = 'parentId') {
    return items.filter(item => item[link] === id)
        .map(item => ({ ...item, children: nest(items, item.id) }))
}
nest(list)

//  2 for 加递归
function nest(items, id = 0, link = 'parentId') {
    let result = []
    for (let v of items) {
        // 遍历items  假如item.parent和当前传入的id相等
        if (v[link] === id) {
            result.push({
                ...v,
                children: nest(items, v.id)
            })
        }
    }
    return result
}
// 3 空间换时间 ?????

function convert(list) {
    const res = []
    const map = {}
    list.forEach(item => {
        map[item.id] = item
    })
    for (const item of list) {
        if (item.parentId === 0) {
            res.push(item)
            continue
        }
        if (item.parentId in map) {
            const parent = map[item.parentId]
            parent.children = parent.children || []
        }
    }
    return res
}
// 125 如何将重复数组转成树形结构的数组

const arr = [{ id: 1 }, { id: 2, pId: 1 }, { id: 3, pId: 2 }, { id: 4 }, { id: 3, pId: 2 }, { id: 5, pId: 4 }]

function convert(list, link = 'parentId') {
    let res = [];
    // 以id 为key
    // 去重 ，建hash表 后面的写法相当于返回total
    // {"1":{"id":1},"2":{"id":2,"pId":1},"3":{"id":3,"pId":2},"4":{"id":4},"5":{"id":5,"pId":4}}
    let map = list.reduce((total, curr) => (total[curr.id] = curr, total), {});
    // list.forEach(item => {
    //     map[item.id] = item
    // })
    for (let item of Object.values(map)) {
        if (!item[link]) {
            res.push(item)
        } else {
            //当这个元素没有时指向一个数组并将该孩子元素增加进去含有有自己孩子时采用本来的child数组，
            let parent = map[item[link]]
            parent.children = parent.children || []
            parent.children.push(item)
        }
    }
    return res
}

// 洗牌
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

// 考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素
// 比如有个数组有100K个元素，从中不重复随机选取10K个元素。

/* 洗牌算法：
    1.生成一个0 - arr.length 的随机数
    2.交换该随机数位置元素和数组的最后一个元素，并把该随机位置的元素放入结果数组
    3.生成一个0 - arr.length - 1 的随机数
    4.交换该随机数位置元素和数组的倒数第二个元素，并把该随机位置的元素放入结果数组
    依次类推，直至取完所需的10k个元素
*/

function shuffle(arr, size) {
    let result = []
    for (let i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * (arr.length - i))
        const item = arr[randomIndex]
        result.push(item)
        arr[randomIndex] = arr[arr.length - 1 - i]
        arr[arr.length - 1 - i] = item
    }
    return result
}

var entry = {
a: {
 b: {
   c: {
     dd: 'abcdd'
   }
 },
 d: {
   xx: 'adxx'
 },
 e: 'ae'
}
}

// // 要求转换成如下对象
// var output = {
// 'a.b.c.dd': 'abcdd',
// 'a.d.xx': 'adxx',
// 'a.e': 'ae'
// }

function flatObj(obj, prefix = '', res = {}) {
    function isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]'
    }
    for (let i in obj) {
        let key = prefix ? prefix + '.' + i : i;
        let val = obj[i]
        if (isObject(val)) {
            flatObj(val, key, res)
        } else {
            res[key] = val
        }

    }
    return res
}

// 112 反向
// 对象entry的key中含有的.就是一个对象嵌套，所以可以用split()函数将其划分为一个array，所以array的length - 1下标所对应的元素就是entry的一个key的具体值。
// 利用对象为地址引用原理，进行增加元素。
// 采用reduce函数，将每一次的引用返回

function changeObj(obj) {
    let keys = Object.keys(obj)
    let res = {}
    for (let item of keys) {
        let everyKeys = item.split('.');
        everyKeys.reduce((prev,curr,index,array) => {
            if (index === array.length -1) {
                // 最后一个
                prev[curr] = obj[item]
                return
            }
            prev[curr] = prev[curr] || {}
            return prev[curr]
        },res)
    }
    return res
}

// setTimeout模拟setInterval

function myInterval(fn) {
    myInterval.timer = setTimeout(function() {
        arguments[0]();
        myInterval(arguments)
    }, arguments[1])
}
// 126 扑克牌问题
function reverse(arr) {

    let i = 0;
    let outer = [];
    while (arr.length) {
        if (i % 2) {
            outer.unshift(arr.pop())
        } else {
            outer.unshift(outer.pop())
        }
        i++
    }
}

// 有效的括号

function isValidate(str) {
    let map = {
        "{": "}",
        "[": ']',
        "(": ')'
    }
    let stack = []
    for (let k of str) {
        if (k in map) {
            stack.push(i);
        } else {
            // 如果遇到右括号，和栈顶的匹配
            //             如果相等则 出栈 ，不等 则返回false (当然也出栈，不过无所谓了)
            if (k !== map[stack.pop()]) {
                return false;
            }
        }
    }
    return !stack.length
}




// 合并2个有序数组

function merge(a, b) {
    let i = j = 0;
    let newArr = []
    if (a.length === 0) return b
    if (b.length === 0) return a

    while (a[i] !==undefined || b[j] !==undefined) {
        if ((a[i]!==undefined && b[j]===undefined) || a[i] < b[j]) {
            newArr.push(a[i])
            i++
        } else {
            newArr.push(b[j])
            j++
        }
    }
    return newArr
}

//反转字符串
function reverseString(str) {
    let i = 0;
    let j = str.length - 1;
    while (i < j) {
        [str[i], str[j]] = [str[j], str[i]];
        i++;
        j--;
    }
}



// compose.js

function compose(...fns) {
    if (fns.length === 0) {
        return args => args
    }
    if (fns.length === 1) {
        return fns[0]
    }
    return function(x) {
        return fns.reduce((args, curr) => {
            return curr(args)
        }, x)
    }

    return fns.reduce((prev, curr) => (...args) => prev(curr(...args)))
    
}
// function compose(...fns) {
//     return fns.reduce((f, g) => (...args) => f(g(...args)))
// }

// }

// 函数提升优先级高于变量提升，变量提升只提升变量，赋值不提升
console.log(a);
var a = 1;

function a() {
}


// 59 两个数组的交集合

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

// 142 多个数组之间的交集
 // 如果没有提供初始值，则将使用数组中的第一个元素。 在没有初始值的空数组上调用 reduce 将报错
function handle(arr) {
    if (arr.length === 0) {
        return []
    }
    if (arr.length === 1) {
        return arr[0]
    }
    return arr.reduce((prev,curr) => {
        return prev.filter(item => curr.includes(item))
    })
}


// 数组去重
//如传入的数组元素为[123, "meili", "123", "mogu", 123]，则输出：[123, "meili", "123", "mogu"]

//如传入的数组元素为[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]，则输出：[123, [1, 2, 3], [1, "2", 3], "meili"]

//如传入的数组元素为[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]，则输出：[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]

// 1.简单版 判断基本量类型

function test(arr) {
    let hash = {}
    arr.forEach(item => {
        hash[JSON.stringify(item)] = item //去重
    })
    return Object.keys(hash).map(item => JSON.parse(item))
}


// function parseArr(arr){
// return [...new Set(arr.map(JSON.stringify))].map(JSON.parse)
// }
// 没有考虑到数据类型为null,undefind等类型 包括数据为对象时key顺序不同的问题
// 这里再更正一下
// 判断对象
function isObj(obj){
 return Object.prototype.toString.call(obj) === '[object Object]'
}
// 对象重整 对key进行排序
function parseObj(obj){
    let keys = Object.keys(obj).sort()
    let newObj = {}
    for(let key of keys){
               // 不晓得有没有有必要，反正把value为obj的情况也处理一下 - -
                obj[key]=isObj(obj[key])?parseObj(obj[key]):obj[key]
        newObj[key] = obj[key]
    }
    return newObj
}

// 最后
const arr = [1,'1',{a:1,b:"1"},{b:'1',a:1},{a:1,b:2},[1,2,3],null,undefined,undefined]
function passArr(arr){
    return [...new Set(arr.map(item=>
        isObj(item)? JSON.stringify(parseObj(item)) : ( !item ? item : JSON.stringify(item))
    ))].map(item=>!item?item : JSON.parse(item))

// 连续出现最多的字符
'aaasdofjaopfjopaiiisjssfopiasdfffff'.match(/(.)\1+/g)



 class LazyManClass {
     constructor(name) {
         this.name = name
         this.taskList = [];
        console.log(`I am ${this.name}`)

        setTimeout(() => {
            this.next();
        }, 0);
        // Promise.reslove().then(this.next())
     }

     eat(food) {
         const fn = () => {
             console.log(`I am eating${food}`)
             this.next()
         }
         this.taskList.push(fn)
         return this
     }
     sleep(time) {
         const fn = () => {
             setTimeout(() => {
                 console.log(`等待了${time}秒`)
                 this.next()
             },time*1000)
         }
        this.taskList.push(fn)
        return this
     }
  sleepFirst(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time*1000)
    }
    this.taskList.unshift(fn)
    return this
  }
     next() {
         let fn = this.taskList.shift()
         fn && fn()
     }

 }

 function LazyMan(name) {
     return new LazyManClass(name)
 }



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



function Foo(){
    Foo.a = function(){
        console.log(1)
    }
    this.a = function(){
        console.log(2)
    }
}
Foo.prototype.a = function(){
    console.log(3)
}
Foo.a = function(){
    console.log(4)
}

Foo.a();
let obj = new Foo();
obj.a();
Foo.a();


(function(){var x = y = 1})()
console.log(x)
console.log(y)


// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;

function add() {
    let _args = [...arguments];
    // 在内部声明一个函数，利用闭包的特性保存_args并收集所有的参数值
    function __adder() {
        _args.push(...arguments);
        return __adder
    }
    // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
    __adder.toString = function() {
        return _args.reduce((a,b) => a + b,0)
    }
    return __adder
}


// 用于创建已经设置好了一个或多个的函数。和函数绑定一样，使用闭包返回一个函数。
// 动态创建步骤：调用另一个函数，并为它传入要柯里化的函数和必要的参数。

// 84 通用的科里化函数
function add(a, b, c) {
    return a + b + c
}
const curryAdd = curry(add)
console.log(curryAdd(1, 2)(3))

// 形参定长

function curry(fn) {
    // 闭包内设置实参总长及实参列表
    const len = fn.length
    let arglist = []
    return function _c(...args) {
        let newArgs = [...arglist,...args]
        if (newArgs >= len) {
            return fn.apply(null,newArgs)
        }
        // 闭包记录参数列表
        arglist = newArgs
        return _c
    }
}


// 形参不定长
function add (...args) {
    return args.reduce((a, b) => a + b)
}

function curry (fn) {
    let args = []
    return function curring (...newArgs) {
        if (newArgs.length) {
            args = [
                ...args,
                ...newArgs
            ]
            return curring
        } else {
            return fn.apply(this, args)
        }
    }
}

let addCurry = curry(add)
let total = addCurry(1)(2)(3)(4);

jsBridge原理：
APP与h5通讯

根据约定 将全局方法绑定到webview上的windows对象上，
native通过webview回去window上的方法直接调用

h5与native主动通讯：
h5调用native注册到webview上window上的postMessage方法，
native拦截postmessage发出的自定义协议，调用对应路由的callback
