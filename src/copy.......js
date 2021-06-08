if (!Function.prototype.call) {
    Function.prototype.call = function (context = window) {
        if (typeof this !== 'function') {
            throw new Error('Error')
        }
        context.fn = this
        let args = [...arguments].slice(1)
        let result = context.fn(args)
        delete context.fn
        return result
    }
}
if (!Function.prototype.apply) {
    Function.prototype.apply = function (context = window) {
        if (typeof this !== 'function' {
                throw Error('error')
            }

        }
    }








    // --------promise

    let s = new Promise(function (reslove, reject) {
        setTimeout(() => {
            resolve('')
        }, 100)
    })
    s.then(res => console.log(res))

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
                return value.then(reslove,reject)
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

    Promise.prototype.finally = function(cb) {
        let p = this.constructor;
        this.then(val => {
            p.reslove(cb()).then(() => value)
        },r => {
            p.reslove(cb()).then(() => {throw r})
        })
    }
    // 并行请求，返回最快的
    Promise.prototype.race = function(promiseList) {
        return new Promise((reslove,reject) =>{
            promiseList.forEach(promise => {
                promise.then(reslove,reject)
            });
        })
    }
    // 并行请求
    Promise.prototype.all = function(promiseList) {
        if (!Array.isArray(promiseLimit)) return
        return new Promise((reslove,reject) =>{
            let reslut = []
            let count = 0
            promiseList.forEach((promise,index) => {
                promise.then(val =>{
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
    Promise.prototype.retry = async function(fn,limit = 3,delay=1000) {
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
        return new Promise((reslove,reject) =>{
            function f() {
                fn.then(reslove).catch(r =>{
                    if (!limit) {
                        reject(r)
                    } else {
                        limit--
                        setTimeout(f,delay)
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
    return new promise((reslove)=>{
        setTimeout(()=>{
            reslove()
        },time)
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
        arr.forEach(item =>{
            promise(item).then(res =>{
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
