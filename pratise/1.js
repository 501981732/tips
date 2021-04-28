function myCall(context = window) {
    if (typeof this !== 'function') {
        throw new Error('error')
    }
    context.fn = this
    const args = [...arguments].slice(0);
    const result = context.fn(...args)
    delete context.fn
    return result
}


function myApply(context = window) {
    if (typeof this !== 'function') {
        throw new Error('error')
    }
    context.fn = this
    const result
    if (arguments[1]) {
        result = context.fn(arguments[1])
    } else {
        result = context.fn(arguments[1])
    }
    delete context.fn
    return result
}

function myBind(context = window) {
    if (typeof this !== 'function') {
        throw new Error('error')
    }
    let _this = this
    // 返回一个函数
    return function F() {
        if (_this instanceof F) {
            return new _this(...args, ...arguments)
        } else {
            return _this.apply(context, args.concat(arguments))
        }
    }
}

function _new(fn, ...args) {
    const obj = Object.create(fn.prototype)
    const ret = obj.apply(fn, args);

    return ret instanceof Object ? ret : obj

}

// jsonp('url', 'callback', function(val) {
//     console.log(val)
// })
function jsonp(url, callbackName, cb) {
    let script = document.createElement('script');
    script.url = url;
    script.type = 'text/javascript'
    script.async = true
    window[callbackName] = function(data) {
        cb && cb(data)
    }
    document.body.appendChild(script)
}

// 节流

function throttle(func, time) {
    let canRun = true;
    return function() {
        if (!canRun) return
        canRun = false;
        let that = this
        setTimeout(function() {
            canRun = true
            func.call(that, arguments)
        }, timer)
    }
}

// 防抖 debounce

function debounce(fn) {
    let timer = null
    return function() {
        clearTimeout(timer)
        let that = this;

        timer = setTimeout(function() {
            fn.call(that, arguments)
        }, timer)
    }
}

// arr.flat(Infinity)
// 
function flat(arr) {
    let result = []
    arr.map(item => {
        if (Array.isArray(item)) {
            result = result.concat(flat(item))
        } else {
            result.push(item)
        }
    })
    return result
}

function deepFlatten2(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? deepFlatten2(cur) : cur)
    }, [])
}

function curry(fn, ...args1) {
    let length = fn.length
    let args = args1
    return function curring(...args2) {
        args = args.concat(args2)
        return (args.length >= length) ? fn.apply(this, args) : curring
    }
}

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

function convert(arr) {
    let result = [];
    let map = {}
    list.forEach(item => {
        if (!map[item.id]) {
            map[item.id] = item
        }
    })

    for (let item in Object.values(map)) {
        if (!item.parentId) {
            result.push(item)
        } else {
            let parent = map[item.parentId]
            parent.children = parent.children ? parent.children.push(item) : [item]
        }
    }
    return result
}
function convert(list, link = 'parentId') {
    let res = [];
    // 以id 为key
    // 去重 ，建hash表 后面的写法相当于返回total
    // {"1":{"id":1},"2":{"id":2,"pId":1},"3":{"id":3,"pId":2},"4":{"id":4},"5":{"id":5,"pId":4}}
    let map = list.reduce((total, curr) => (total[curr.id] = curr, total), {});

    for (let item of Object.values(map)) {
        if (!item[link]) {
            res.push(item)
        } else {
            //当这个元素没有时指向一个数组并将该孩子元素增加进去含有有自己孩子时采用本来的child数组，
            let parent = map[item[link]]
            parent.children = parent.children ? parent.children.push(item) : [item]
        }
    }
    return res
}
// 递归
function nest(list, id = 0) {
    let result = [];

    for (let k in list) {
        if (k.parentId === k.id) {
            result.push({
                ...v,
                children: nest(list, k.id)
            })
        }
    }
}

// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。 原数组上操作
// list = [0,2,1,0,9,3]
function moveZero(list) {
    let j = 0; // 0的个数
    let len = list.length
    for (let i = 0; i < len - j; i++) {
        if (list[i] === 0) {
            list.push(0)
            list.splice(i, 1)
            i--; //下次循环还从这个位置
            j++
        }
    }
    return list.concat(new Array(j).fill(0))
}

let str = '[[}'

function isValidate(str) {
    let map = {
        "{": "}",
        "[": ']',
        "(": ')'
    }
    let stack = []
    for (let k of str) {
        if (k in map) {
            stack.push(i)
        } else {
            // 如果遇到右括号，和栈顶的匹配 
            //             如果相等则 出栈 ，不等 则返回false (当然也出栈，不过无所谓了)
            if (k !== map[stack.pop()]) {
                return false
            }
        }
    }
    return !stack.length
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}


function flatObj(obj, prefix, res = {}) {
    function isObject(obj) {
        Object.prototype.toString.call(obj) === '[object Object]'
    }
    for (let i in obj) {
        let key = prefix ? prefix + '.' + i : i;
        let val = obj[i]
        if (isObject(obj[i])) {
            flatObj(val, key, res)
        } else {
            res[key] = val
        }
    }
    return res
}


const compose = (fns) => fns.reduce((f, g) => (...args) => f(g(args)))







cache = {
    a: ['click', 'double']
}


function F(n, ac1 = 1, ac2 = 1) {
    if (n <= 1) return ac1
    return F(n - 1, ac2, ac1 + ac2)
}




function convert(list) {
    let map = {}
    let result = []
    list.forEach(item => {
        if (!item.id) {
            map[item.id] = item
        }
    })
    for (let item in Object.values(map)) {
        if (!item.parentId) {
            result.push(item)
        } else {
            let parent = map[parentId]
            parent.children = parent.children ? parent.children.push(item) : [item]
        }
    }
}



function curry(fn, ...args1) {
    let length = fn.length
    let arg = args1
    return function curring(...arg2) {
        let arg = args1.concat(args2)
        if (length <= arg.length) {
            curring
        } else {
            fn.call(this, arg)
        }
    }
}








// -----------------------------------------------------

function call(context = window) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    context.fn = this
    let args = [...arguments].slice(1)
    let result = context.fn(...args)
    delete context.fn
    return result
}


function apply(context) {
    if (typeof this !== 'function') {
        throw new TypeError('error')
    }
    context.fn = this
    let result
    let args = arguments[1]
    if (args) {
        result = context.fn(...args)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

function bind(context) {
  const _this = this
  const args = [...arguments].slice(1)
    return function F() {
        if (typeof this !== 'function') {
            throw new TypeError('Error')
        }
        if (this instanceof F) {
             // 因为返回了一个函数，我们可以 new F()，所以需要判断
            return new _this(...args, ...arguments)
        } else {
            return _this.apply(context,args.concat(arguments))
        }
    }
}

// 新生成了一个对象
// 链接到原型
// 绑定 this  执行
// 返回新对象
function new () {
    let o = {}
    let constructor = [].prototype.shift.call(arguments);
    o.__proto__ = constructor.prototype
    let result = constructor.apply(obj, arguments)
    return  result instanceof Object ? result : obj
}


// 过判断对象的原型链中是不是能找到类型的 prototype
function instanceof(l,r) {
    let prototype = r.prototype; 
    let left = l.__proto__
    while(true) {
        if (left === null || prototype === undefined) {
            return false
        }
        if (left === prototype) {
            return true
        }
        left = left.__proto__
    }
}


// 统计标签个数
function dfs(node,map) {
    if(node.nodeType === 1) {
        let tagName = node.tagName;
        map[tagName] = map.hasOwnProperty(tagName) ? map[tagName] + 1 : 1;
        let children = node.childNodes;
        if (children.length) {
            for(let i = 0, len = children.length; i < len; i++) {
                dfs(children[i],map)
            }
        }
    }
}
let s = {}
dfs(document.body,s);//仅body标签内的元素


function dfs(node,map) {
    if (node.nodeType === 1) {
        let tagName = node.tagName;
         map[tagName] = map.hasOwnProperty(tagName) ? map[tagName]++ : 1
         let children = node.childNodes
         if (children) {
             for (let i=0.len=children.length;i++) {
                 dfs(children[i],map)
             }
         }
    }
}


















































