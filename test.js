function compose(middlewareList) {
    return function(ctx) {
        function dispatch(i) {
            let fn = middlewareList[i]
            try{
                Promise.reslove(fn(ctx,dispatch.bind(null,i+1)))
            } catch(e) {

            }
        }
        return dispatch(1)
    }
}


function compose(fns) {
    return function(args) {
        fns.reduce((a,fn) => fn(a),args)
    }
}

// 隐式转换

let s = {
    i:1,
    valueOf() {
        return s.i++
    }
}

if (s == 1 && s == 2 && s == 3) {
    console.log(1)
}

Function.prototype.call = function(context = window) {
    if (typeof this !== 'function') {
        return new Error('')
    }
    context.fn = this
    let args = [...arguments].slice(1);
    let result = context.fn(args)
    delete context.fn
    return result
}

Function.prototype.apply = function(context = window) {
    if (typeof this !== 'function') {
        return new Error('')
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

Function.prototype.bind = function(context) {
    let that = this
    let args = [...arguments].slice(1)
    return function () {
        return that.apply(context,arguments.concat(args))
    }
}

if (!Function.prototype.bind) (function() {
    context.__fn__ = this
    let args = [...arguments].slice(1);
    return context.__result = function() {
        return context.__fn__(args.concat(arguments))
    }
})()

// 创建一个空的简单JavaScript对象（即{}）；
// 链接该对象（即设置该对象的构造函数）到另一个对象 ；
// 将步骤1新创建的对象作为this的上下文 ；执行构造函数
// 如果该函数没有返回对象，则返回this

function mynew() {
    let o = {};
    let Cons = [].shift.call(arguments);
    o.__proto__ = Cons.prototype
    Cons.apply(o,arguments)
    return o
}


function myInstance(l,r) {
    let prototype = r.prototype
    let left = l.__proto__
    while(left) {
        if (left === null || left === undefined) {
            return false
        }
        if (left === prototype) {
            return true
        }
        left = left.__proto__
    }
}

// 继承
// 组合式继承 
// 组合式继承：借用构造函数实现对实例属性的继承，使用原型链实现对原型属性和方法的继承

function SubType(name,age) {
    superType.call(this,name)
    this.age = age
}

SubType.prototype = new superType()
SubType.prototype.constructor = SubType



function SubType(age) {
    SuperType.call(this,name)
    this.age = age
}
inherit(SubType,SuperType)
superType.prototype.asyAge = function() {

}
function inherit (SubType,SuperType) {
    let proto = Object.create(SuperType.prototype,{
        constructor: {
            configurable: true,
            writable: true,
            enumerable: false,
            constructor: superType,
        }
    })
    SubType.prototype = proto
}

function jsonp(url,callbackName,success) {
    let script = document.createElement('script')
    script.async = true
    script.url = url
    window[callbackName] = function(data) {
        success(data)
    }
    document.body.appendChild(script)
}

// 防抖
const debounce = function(fn,timer) {
    let timer = null;
    return function() {
        let context = this
        clearTimeout(timer)
        timer = setTimeout(()=> {
            fn.call(context,arguments)
        },timer)
    }
}

const throttle = function(fn,timer) {
    let activeTime = 0;
    return function() {
        let context = this;
        let now = Date.now()
        if (now - activeTime >= time) {
            fn.call(context,arguments)
            activeTime = Date.now()
        }
    }
}

function deepCopy(dest) {
    if (typeof dest === 'object') {
        if (!dest) return null
            let obj = dest.constructor()
            for(let i in dest) {
                if (dest.hasOwnProperty(i)) {
                    if (typeof dest[i] === 'Object') {
                        obj[i] = deepCopy(dest[i])
                    } else {
                        obj[i] = dest[i]
                    }
                }
            }
    } else {
        return dest
    }
}


// 在原数组上操作 把0放到末尾
//
function moveZero(arr) {
    let len =arr.length
    let j = 0;
    for (let i = 0; i < length - j;i++) {
        if (arr[i] === 0) {
            arr.push(0)
            arr.splice(i,1)
            i--;
            j++
        }
    }
    return arr;
}

function moveZero(arr) {
    let len = arr.length
    let j = 0;
    for (let i = 0; i < len) {
        if (arr[i] === 0) {
            [arr[i],arr[len-1-j]] = [arr[len-i-j],arr[i]]
            j++
        }
        i++
    }
    return arr
}
// 给定 nums = [2, 7, 11, 15], target = 9 找出数组中和为目标值的两个数。两数之和

function twnNum(arr,target) {
    let map = {}
    for (let i = 0,length = arr.length;i<length;i++) {
        let diff = target - arr[i]
        if (!map[diff]) {
            map[diff] = i
        } else {
            return [arr[i], map[diff]]
        }
    }
}

// list 转tree 

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

// map={
//     1: { id: 1, name: '部门A', parentId: 0 }
// }
function convert(arr) {
    let map = arr.reduce((prev,curr) => {
        prev[curr.id] = curr
        return prev
    },{})
    let res = []
    Object.values(map).forEach(item => {
        if (!item.parentId) {
            res.push(item)
        }
        let children = map[item.parentId].children || []
        children.push(item)
    })
}


function convert(list) {
    // let map = {
    //     1: {},
    //     2:{}
    // }
    let result = []
    let map = list.reduce((prev,curr) => {
        prev[curr.id] = curr;
        return prev
    },{});
    for(let k of Object.values(map)) {
        if (!k.parentId) {
            result.push(k)
        } else {
            let parent = map[item[link]]
            parent.children = parent.children || []
            parent.children.push(item)
        }

    }
    return result
}
convert(list) 


// 洗牌 
// 从一个巨大的数组中随机选取多少数组
// 随机0-arr.length的数字
// 将这个位置的数字和最后一个数字交换，把他存下来
// 重复 随机从 0-arr.length-1

function shuffle(arr,size) {
    let result = []
    let length = arr.length
    for (let i=0;i < size;i++) {
        let random = Math.floor((Math.random()*(length - i)));
        result.push(arr[random])
        [arr[random],arr[length-i-1]] = [arr[length-i-1],arr[random]]
    }
}


function shuffle(arr,size) {
    let result = []
    let len = arr.length
    for (let i = 0;i > size;i++) {
        let randomIndex = Math.floor(Math.random() * (len-1-i))
        [arr[i],arr[randomIndex]] = [arr[randomIndex],arr[i]]
        result.push(arr[i])
    }
}

// var entry = {
// a: {
//  b: {
//    c: {
//      dd: 'abcdd'
//    }
//  },
//  d: {
//    xx: 'adxx'
//  },
//  e: 'ae'
// }
// }

// // 要求转换成如下对象
// var output = {
// 'a.b.c.dd': 'abcdd',
// 'a.d.xx': 'adxx',
// 'a.e': 'ae'
// }

function flatObj(obj,prefix='',res) {
    let result = {}
    let isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
    for ( let i in obj) {
        let key = prefix ? prefix + '.' + i : i;
        if (isObject(obj[i])) {
            flatObj(obj[i],key,res)
        } else {
            res[i] = obj[i]
        }
    }
}


// 有.就是一个对象嵌套
// split()函数将其划分为一个array，所以array的length - 1下标所对应的元素就是entry的一个key的具体值
// 利用对象为地址引用的原理 进行增加元素

function changeObj(obj) {
    let keys = Object.keys(obj);
    let res = {};
    for (let item of keys) {
        let key = item.split('.');
        key.reduce((prev,curr,index,array) => {
            if (index === array.length-1) {
                prev[curr] = obj[item]
                return
            }
            prev[curr] = prev[curr] || {}
            return prev[curr]
        },res)
    }
    return res
}


function myInterval() {
    myInterval.timer = setTimeout(()=>{
        arguments[0]()
        myInterval(arguments)
    },arguments[1])
}


// 有效的括号 '{()}'
function isValidate(str) {
    let map = {
        '[': ']',
        '{': '}',
        '(': ')'
    }
    let stack = []
    for (let key of str) {
        if (key in map) {
            stack.push(key)
        } else {
            if (key !== map[stack.pop()]) {
                return false
            }
        }
        return !stack.length
    }
}


// 合并两个有序数组 [1,2,3] [4,5,6]

function merge(a,b) {
    let i = 0;
    let j = 0;
    let result = []
    if (a.length === 0) return b;
    if (b.length === 0) return a;
    while(a[i] || b[j]) {
        // a有 b没有 或者 a小于b
        if ((a[i] && !b[j]) || a[i] < b[j]) {
            result.push(a[i])
            i++
        } else {
            result.push(b[j])
            j++
        }
    }
    return result
}


// 翻转字符串

function reverseString(str) {
    let i = 0;
    let j = str.length - 1;
    while( i < j) {
        [str[i],str[j]] = [arr[j],arr[i]]
        i++;
        j--;
    }
}

// 两个数组的交集合

const intersect = (nums1,nums2) => {
    const map = {}
    const res = []
    for (let n of nums1) {
        if(map[n]) {
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

// 多个数组的交集 [[1,2],[2,1,3]]
function handle(arr) {
    if (arr.length === 0) return []
    if (arr.length === 1) return arr
    arr.reduce((prev,curr) => {
        return prev.filter(item => curr.includes(item))
    })
}


// 去重


function test(arr) {
    let map = {}
    arr.forEach((item) => {
        map[JSON.stringify(item)] = item
    })
    return Object.keys(map).map(item => JSON.parse)
}

// 对key排序
function parseObj(obj) {
    function isObject(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]'
    }
    let keys = Object.keys(obj).sort()
    let newObj = {}
    for (let key of keys) {
        obj[key] = isObject(obj[key]) ? parseObj(obj[key]) : obj[key]
        newObj[key] = obj[key]
    }
    return newObj
}

function passArr(arr) {
        return [...new Set(arr.map(item=>
        isObj(item)? JSON.stringify(parseObj(item)) : JSON.stringify(item)
    ))].map(item=>JSON.parse(item))
}



function curry(fn,...args1) {
    let length = fn.length;
    return function curring(...args2) {
        let args = args2.concat(args1);
        if (args.length >=length) {
            fn.apply(this,args)
        } else {
            curring
        }
    }
}


function deepFlatten(arr) {
    return arr.reduce((prev,curr) => prev.concat(Array.isArray(curr) ? deepFlatten(curr) : curr) ,[])
}

JSON.stringify(arr).replace(/(\[|\])/g,'').split(',')


function deepFlatten(arr) {
    let result = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            result.push(...deepFlatten(item))
        } else {
            result.push(item)
        }
    })
    return result
}




let PENDING = 'PENDING';
RESLOVED = 'RESLOVED';
REJECTED = 'REJECTED';
function Promise(execute) {
    const that = this
    that.state = PENDING
    this.value = null
    that.onFulfilledCallback = []; //用于保存 then 中的回调
    that.onRejectedCallback = [];
    
    function reslove(val) {
        setTimeout(()=>{
            if (that.state === PENDING) {
                that.value = val
                that.state = RESLOVED
                that.onFulfilledCallback.map(cb => cb(that.value))
            }
        })
    }
    function reject(val) {
        setTimeout(()=>{
        if (that.state === RESLOVED) {
            that.value = val
            that.state = REJECTED
            that.onRejectedCallback.map(cb => cb(that.value))
        }
    }
    }
    try {
        execute(reslove,reject)
    } catch (e) {
        reject(e)
    }
}


Promise.prototype.then = function(onfulfilled,onrejected) {
    const that = this
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v => v;
    onrejected = typeof onrejected === 'function' ? onrejected : r => {
        throw r
    };
    if (that.state === PENDING) {
        that.onFulfilledCallback.push(onfulfilled);
        that.onRejectedCallback.push(onrejected)
    }
    if (that.state === RESLOVED) {
        onfulfilled(that.value)
    }
    if (that.state === REJECTED) {
        onrejected(that.value)
    }
}


// promise
// new Queue().task(1000,()=>console.log(1)).task(3000,()=>console.log(2)).task(2000,()=>console.log(3)).start()

class Queue {
    constructor() {
        this.queue = []
    }
    task(time,fn) {
        this.queue.push(() => {
            return new Promise((reslove) => {
                setTimeout(()=>{
                    fn()
                    reslove()
                },time)
            })
        })
    }
    createPromise(time,fn) {
        return function() {
            return new Promise((reslove) => {
                setTimeout(()=>{
                       fn()
                       reslove()
                },time)
            })
        }
    }
    start() {
        this.queue.reduce((prev,curr) => prev.then(curr),Promise.reslove())
    }
}

Promise.prototype.all = function(promiseArr) {
    if (!Array.isArray(promiseArr)) {
        return new Error('')
    }
    let i = 0;
    let result = []
    return new Promise((reslove,reject) =>{
        promiseArr.forEach((item,index) => {
            Promise.reslove(item).then(res => {
                result[i] = res;
                i++
                if (i === promiseArr.length) {
                    reslove(result)
                }
            })
        })
    })
}
window.Promise && !('finally' in Promise) &&(function(){
    Promise.prototype.finally = function(cb) {
        let Cons = this.constructor;
        function onFulfilled() {
            return Cons.reslove(cb()).then(res => {
                return res
            })
        }

        function onRejected() {
            return Cons.reslove(cb()).then(err => {
                return err
            })
        }

        this.then(onFulfilled,onRejected)

    }
})()

function promiseLimit(url,limit,callback) {
    let count = 0;
    let length = 0;
    let result = []
    for (let i = 0; i< limit; i++) {
        handle()
    }
    function handle() {
        if (url.length) {
            let current = url.shift()
            fetch(current).then(res => {
                result[count] = res
                count++;
                handle()
            }).catch(err => {
                count++;
                handle()
            })
        }
        if (count === length) {
            callback()
        }
    }
}

function retry(fn,limit = 3) {
    return new Promise(async (reslove,reject) => {
        while(limit) {
            try{
                let res = await fn();
                return reslove(res)
            } catch (e) {
                limit--;
                if (!limit) reject(e)
            }
        }
    })
}

LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');


class LazyManClass {
    constructor(name) {
        this.name = name
        this.tasklist = []
        console.log(`I am ${this.name}`)
        setTimeout(()=>{
            this.next()
        },0)
    }
    next() {
        let fn = this.tasklist.shift()
        fn && fn()
    }
    eat(something) {
        let fn = function () {
            console.log(something);
            this.next()
        }
        this.tasklist.push(fn)
        return this
    }
    sleep(time) {
        let fn = function() {
            setTimeout(()=>{
                console.log(`等了${time}s`);
                this.next()
            },time*1000)
        }
        this.tasklist.push(fn)
        return this
    }

}

function LazyMan (name) {
    return new LazyManClass(name)
}


function isType(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`
    }
}


const isArray = isType('Array')
isArray([])
// 实现一个add方法，使计算结果能够满足如下预期：
// add(1)(2)(3) = 6;
// add(1, 2, 3)(4) = 10;
// add(1)(2)(3)(4)(5) = 15;


// function add (a,b,c) {
//     return a + b + c
// }

// function curry(fn,...args1) {
//     let length = fn.length
//     let args = args1
//     return function curring (...args2) {
//         args = args.concat(args2)
//         if (args.length >=length) {
//             return fn.apply(this,args)
//         } else {
//             return curring
//             // return curry.call(fn,arg2)
//         }
//     }
// }
// curry(add)(1,2,3)
// curry(add,1)(2,3)

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


// 去重
function test(arr) {
    let res = [];
    let map = {}
    for (i = 0,len = arr.length; i<len;i++) {
        let item = arr[i]
        let key = (typeof item) + item
        if (map[key] !==1) {
            map[key] = 1;
            res.push(item)
        }
    }
    return res
}


Function.prototype.myCall = function(context) {
    if (typeof this !== 'function') throw new Error('')
    context.fn = this
    let args = [...arguments].slice(1)
    let result = context.fn(args)
    delete result
    return fn
}

if (!Function.prototype.bind) {
    Function.prototype.bind = function(context) {
        context.fn = this
        let args = [...arguments].slice(1)
        return context.__result = function() {
            args.concat(arguments)
            return context.fn(args)
        }
    }
}

function myNew() {
    let o = {}
    let Cons = [].shift.call(arguments)
    o.__proto__ = Cons.prototype
    Cons.call(o,arguments)
    return o
}

function jsonp(url,callbackName,success) {
    let script = document.createElement('script')
    script.async = true
    script.src = url
    window[callbackName] = function(data){
        success(data)
    }
    document.body.appendChild(script)
}

function debounce(fn,time) {
    let timer = null
    return function() {
        let context = this
        if (timer) clearTimeout(timer)
            timer = setTimeout(()=> {
                fn.call(context,arguments)
                timer = null
            },time)
    }
}

function throttle(fn,time) {
    let activeTime = 0
    return function() {
        let context = this
        if (Date.now() - activeTime > time*1000) {
            fn.call(context,arguments)
            activeTime = Date.now()
        }
    }
}


function inOrderTraversal(root) {
    const res = [];
    function inorder(root) {
        if (!root) return
        inorder(root.left);
        result.push(root.value);
        inordr(root.right);
    };
    inorder(root)
    return res
}

function inOrderTraversal(root) {
    let res = []
    let stack = []
    while (root !== null || stack.length) {
        while(root) {
            stack.push(root);
            root = root.left
        }
        root = root.pop();
        res.push(root.value);
        root = root.right
    }
    return res
}




function debounce(fn,time) {
    let timer = null
    return function() {
        let context = this
        if (timer) clearTimeout(timer)
        timer = setTimeout(function(){
            timer = null
            fn.call(context,arguments);
        },time) 
    }
}

function throttle(fn,time) {
    let active = 0
    return function() {
        let current = Date.now()
        if (current - active >= time) {
            active = current
            fn.call(this, arguments)
        }
    }
}

function _new(fn,...args) {
    let obj = Object.create(fn.prototype)
    let result = obj.apply(obj,args)
    return result instanceof Object ? result : obj
}

function throttle(limit) {
    let wip = 0,
        queue = []
    function toAdd(fn) {
        queue.push(fn) > 1 || run()
    }

    function run() {
        if (queue.length || wip < limit) {
            queue.shift()();
            wip++
        }
    }

    function isDone() {
        wip--
        run();
    }
    return [toAdd,isDone]
}
let [toAdd,isDone] = throttle(3)
let urls = ['http://zp.58.cpm/1','http://zp.58.cpm/1','http://zp.58.cpm/1','http://zp.58.cpm/1']
urls.forEach(item => {
    toAdd(()=>{
        fetch(urls).then(isDone)
    })
})

function handleFetchQueue(urls, max, cb) {
    let count = 0,
    result = [],
    queue = urls,
    len = urls.length

    for (let i = 0; i < max; i++) {
        handle()
    }

    function handle() {
        if (queue.length) {
            let item = queue.shift()
            fetch(item).then(res => {
                count++
                result.push(res)
                handle()
                if (count >= len) {
                    cb(result)
                }
            }).catch(e =>{
                count++
                handle()
            })
        }
    }
}

function DFS(node,res) {
    const {children} = node
    if (children && children.length) {
        res.push(children)
        children.forEach(item =>{
            DFS(item,res)
        })
    }
}

function BFS(node) {
    let queue = [node]
    let res = []
    while(queue.length) {
        let item = queue.shift()
        res.push(item)
        let {children} = item;
        for(let i = 0,len = children.length; i < len; i++) {
            queue.push(children[i])
        }
    }
}
function deepCopy(obj, map = new WeakMap()) {
    if (obj === null || typeof obj === 'object') return obj;
    if (map.has(obj)) return map.get(obj);
    let clone = Array.isArray(obj) ? [] : {};
    map.set(obj,clone)
    Reflect.ownKeys(obj).forEach(item=>{
        clone[item] = deepCopy(obj, map)
    })
}