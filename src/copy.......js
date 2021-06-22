// fn.call(k,)
if (!Function.prototype.call) {
    Function.prototype.call = function (context = window) {
        if (typeof this !== 'function') return new Error('error')
        context.fn = this
        let args = [...arguments].slice(1)
        let result = context.fn(...args)
        delete context.fn
        return result
    }
}

if (!Function.prototype.apply) {
    Function.prototype.apply = function (context) {
        if (typeof this !== 'function') throw new Error('error')
        context.fn = this
        let res
        if (arguments[1]) {
            res = context.fn(arguments[1])
        } else {
            res = context.fn()
        }
        return res
    }
}

if (!Function.prototype.bind) {
    Function.prototype.bind = function (context) {
        if (typeof this !== 'function') throw new Error('error')
        context.__fn = this
        let args = arguments.slice(1)
        context.__result = function () {
            let newargs = [...args, ...arguments]
            if (this instanceof F) {
                return new context.__fn(newargs)
            } else {
                return context.__fn(newargs)
            }
        }
        return context.__result
    }

// 节流
function throttle(fn) {
    let canRun = true
    return function() {
        if (!canRun) return
        let context = this
        canRun = false
        setTimeout(()=>{
            fn.call(context,arguments)
            canRun = true
        },time)
    }

}
// 防抖
function debounce(fn,time) {
    let timer = null
    return function() {
        if (timer) clearTimeout(timer)
        let context = this
        timer = setTimeout(()=>{
            fn.call(context,arguments)
            timer = null
        },time)
    }
}
function myNew(fn, ...args) {
    let obj = {}
    obj.__proto__ = fn.prototype
    let res = fn.apply(obj,args)
    return res instanceof Object ? res : obj
}

function jsonp(url,callbackName,cb) {
    let script = document.createElement('script')
    script.url = url
    script.async = true
    window[callbackName] = function(data) {
        cb && cb(data)
    }
    document.body.appendChild(script)
}

function flat(arr,n) {
    while(n--) {
        arr = [].concat(...arr)
    }
    return arr
}
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

function flat(arr) {
    return arr.reduce((prev,curr) => {
        prev.concat(Array.isArray(curr) ? flat(curr): curr)
    },[])
}
function flat(arr,n) {
    return  n > 0 ? arr.reduce((prev,curr) => {
        prev.concat(Array.isArray(curr) ? flat(curr,n-1): curr)
    },[]) : arr.slice()
}
function flat(arr) {
    arr.toString().split(',').map(Number)
}

function myInstance(l,r) {
    let left = l.__proto__,right = r.prototype
    while (true) {
        if (left == null) {
            return false
        }
        if (left === right) {
            return true
        }
        left = left.__proto__
    }
}
function deepClone(obj,map = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) return obj
    if (map.has(obj)) return map.get(obj)
    let clone = Array.isArray(obj) ? [] : {}
    Reflect.ownKeys(obj).forEach(item =>{
        clone[item] = deepClone(obj[item],map)
    })
    map.set(obj,clone)
    return clone
}
let arr = [0, 1, 0, 0, 3, 12];
function moveZero(arr) {
    let len = arr.length,
        i = 0;// 0出现的个数
        if (!arr || !len) return
        for(let j = 0;j < len - i;j++) {
            if (arr[j] === 0) {
                arr.splice(i,1)
                arr.push(0)
                i++;
                j--
            }
        }
        return arr
}

var moveZeroes = function (nums) {
    let j = 0 //不为0 的位置
    for (let i = 0, len = nums.length; i < len; i++) {
        if (null[i] !== 0) {
            [nums[i],nums[j]] = [nums[j],[nums[i]]]
            j++
        }
    }
    return nums
}

// listtotree
function listtoTree(list,id = 0) {
    let result = []
    list.forEach(item =>{
        if (item.parentId === id) {
            result.push({
                ...item,
                children: listtoTree(item,item.id)
            })
        }
    })
}
// 1. 去重以id为key建hash表
// hash表后面加children
function convert(list,id = 0) {
    let res = []
    let map = list.reduce((prev,curr) => {
        prev[curr.id] = curr
        return prev
    },{})
    Object.keys(map).forEach(item => {
        if (item.parentId === id) {
            res.push(item)
        } else {
            let parent = map[item.parentId]
            parent.children = parent.children || []
            parent.children.push(item)
        }
    })
}
// 洗牌算法

function shuffle(arr) {
    for (let i = arr.length - 1,i > 0;i--) {
        let j = Math.floor(Math.random()*(i+1))
        [arr[i],arr[j]] = [arr[j],arr[i]]
    }
    return arr
}

function shuffle(arr,size) {
    let result = []
    for (let i = 0; i < size;i++) {
        const randomIndex = Math.floor(Math.random()*(arr.length - i))
        result.push(arr[randomIndex])
        [arr[randomIndex],arr[arr.length - i - 1]] = [arr[arr.length - i - 1], arr[randomIndex]]
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
// 要求转换成如下对象
// var output = {
// 'a.b.c.dd': 'abcdd',
// 'a.d.xx': 'adxx',
// 'a.e': 'ae'
// }

function flatObj(obj,prefix = '',res={}) {
    let isObject = (o) => Object.prototype.toString.call(o) === '[object Object]'
    for (let i in obj) {
        let key = prefix ? prefix + '.' + i : i
        let val = obj[i]
        if (isObject(obj[i])) {
            flatObj(obj[i],key,res)
        } else {
            res[key] = val
        }
    }
}

function changeObj(obj) {
    let res = {}
    Object.keys(obj).forEach(item => {
        let keyarr = item.split('.')
        keyarr.reduce((prev,curr,index) => {
            if (index === keyarr.length) {
                prev[curr] = obj[item]
            } else {
                prev[curr] = prev[curr] || {}
            }
            return prev
        },res)
    })
    return res
}

function myInterval(fn,time) {
    myInterval.timer = setTimeout(()=>{
        fn()
        myInterval(fn,time)
    },time)
  }
  myInterval.clear = function() {
    clearTimeout(myInterval.timer)
  }

  var isValid = function(s) {
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    let stack = []
    for (let i of s) {
        // if (map.hasOwnProperty(k))
        if (i in map) {
            stack.push(i)
        } else {
            let pop = stack.pop()
            if (map[i] !== pop)  return false
        }
    }
    return !stack.length
};
// 合并两个有序数组
function merge(arr1,arr2) {
    let len1 = arr1.length,
        len2 = arr2.length,
        i = 0,
        j = 0;
        newarr = []
        while(i < len1 && j < len2) {
            if (arr1[i] < arr[j]) {
                newarr.push(arr1[i++])
            } else {
                newargs.push(arr2[j++])
            }
        }
        while(i < len1) {
            newarr.push(arr1[i++])
        }
        while(j < len2) {
            newarr.push(arr1[j++])
        }
        return newargs
}
function merge(arr1,arr2) {
    let m = arr1.length,
        n = arr2.length,
        insertPos = m + n -1;
        m--;n--
        while(n > 0) {
            arr1[insertPos--] = arr1[m] > arr2[n] ?  arr1[m--] : arr2[n--]
        }
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

function compose(...fns) {
    if (fns.length === 0) return args => args
    if (fns.length === 1) return fns[0]
    return fns.reduce((prev,curr) => {
        return (args) => {
            return prev(curr(args))
        }
    })
}













    // --------promise

    // let s = new Promise(function (reslove, reject) {
    //     setTimeout(() => {
    //         resolve('')
    //     }, 100)
    // })
    // s.then(res => console.log(res))

    const PENDING = 'PENDING';
    const RESLOVED = 'RESLOVED';
    const REJECTED = 'REJECTED';

    function MyPromise(fn) {
        const that = this
        let state = PENDING;
        that.value = null
        that.reslovedCallback = []
        that.rejectedCallback = []

        function reslove(value) {
            if (value instanceof MyPromise) {
                return value.then(reslove, reject)
            }
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = RESLOVED
                    this.value = value
                    this.reslovedCallback.map(cb => cb(that.value))
                }
            })
        }

        function reject() {
            setTimeout(() => {
                if (this.state === PENDING) {
                    this.state = RESLOVED
                    this.rejectedCallback.map(cb => cb())
                }
            })

        }
        try {
            fn(reslove, reject)
        } catch (e) {
            reject(e)
        }
    }

    MyPromise.prototype.then = function (onFulfilled, onRejected) {
        const that = this;
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : () => {}
        onRejected = typeof onRejected === 'function' ? onRejected : r => {
            throw r
        }
        if (this.state === PENDING) {
            this.reslovedCallback.push(onFulfilled)
            that.rejectedCallback.push(onFulfilled)
            // return (promise2 = new Promise(function(resolve, reject){

            // }))
        }
        if (this.state === RESLOVED) {
            onFulfilled(this.value)
        }
        if (this.state === REJECTED) {
            onRejected(this.value)
        }

    }

    Promise.prototype.finally = function (cb) {
        let p = this.constructor;
        this.then(val => {
            p.reslove(cb()).then(() => value)
        }, r => {
            p.reslove(cb()).then(() => {
                throw r
            })
        })
    }
    // 并行请求，返回最快的
    Promise.prototype.race = function (promiseList) {
        return new Promise((reslove, reject) => {
            promiseList.forEach(promise => {
                promise.then(reslove, reject)
            });
        })
    }
    // 并行请求
    Promise.prototype.all = function (promiseList) {
        if (!Array.isArray(promiseLimit)) return
        return new Promise((reslove, reject) => {
            let reslut = []
            let count = 0
            promiseList.forEach((promise, index) => {
                promise.then(val => {
                    count++
                    reslut[index] = val
                    if (count === promiseList.length) {
                        reslove(reslut)
                    }
                })
            })
        })
    }
    // 成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject
    Promise.prototype.retry = async function (fn, limit = 3, delay = 1000) {
        // return new Promise((reslove,reject) =>{
        //     while (limit) {
        //         try {
        //           let res = await fn()
        //           reslove(res)  
        //         } catch (e) {
        //             if (!limit) reject(e)
        //             limit--
        //         }
        //     }
        // })
        return new Promise((reslove, reject) => {
            function f() {
                fn.then(reslove).catch(r => {
                    if (!limit) {
                        reject(r)
                    } else {
                        limit--
                        setTimeout(f, delay)
                    }
                })
            }
            fn()
        })
    }
    // 使用Promise实现每隔1秒输出1,2,3 (如何让异步操作顺序执行)
    // [1,2,3]

    function runPromiseByQueue(list) {
        list.reduce(
            (prev, curr) => prev.then(() => curr()),
            Promise.resolve()
        );
    }

    const createPromise = (time, id) => () =>
        new Promise(solve =>
            setTimeout(() => {
                console.log("promise", id);
                solve();
            }, time)
        );

    runPromiseByQueue([
        createPromise(3000, 1),
        createPromise(2000, 2),
        createPromise(1000, 3)
    ]);

    // 这个思路与 reduce 思路不同之处在于，利用 reduce 的函数整体是个同步函数，
    // 自己先执行完毕构造 Promise 队列，然后在内存异步执行；而利用 async/await 的函数是利用将自己改造为一个异步函数，等待每一个 Promise 执行完毕。
    async function runPromiseByQueue(myPromises) {
        for (let value of myPromises) {
            await value();
        }
    }


    // 红3s亮一次 绿2s 黄1s

    function sleep(time) {
        return new promise((reslove) => {
            setTimeout(() => {
                reslove()
            }, time)
        })
    }
    async function step() {
        await sleep(3000)
        console.log('red')
        await sleep(2000)
        console.log('blue')
        await sleep(1000)
        console.log('yellow')
        await step()
    }

    // 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中
    // 循环遍历数组，在promise后面添加执行ajax任务，同时要将添加的结果重新赋值到promise上
    // 并发执行 按顺序输出

    // async function fetchInOrder(urls) {
    //     let textPromises = urls.map(async url => {
    //         let response = await fetch(url);
    //         return response.json()
    //         })
    //     for (let textPromise in textPromises) {
    //         console.log(await textPromise)
    //     }
    // }

    function mergePromsie(arr) {
        let result = [] // 存放数据
        let promise = Promise.resolve()
        arr.forEach(item => {
            promise(item).then(res => {
                result.push(res)
                return result
            })
        })
        return promise
    }
    // mergePromise([ajax1, ajax2, ajax3]).then(data => {
    //     console.log("done");
    //     console.log(data); // data 为 [1, 2, 3]
    //   });