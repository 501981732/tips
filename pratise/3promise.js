 




// 1
function promiseAll(promiseList) {
    if (!Array.isArray(PromiseList)) {
        return new Error('arguments should be array')
    }
    let count = 0,len = promiseList.length,returnArr = []
    return new Promise((reslove,reject) => {
        promiseList.forEach(item => {
            Promise.reslove(item).then(res => {
                count++;
                returnArr[i] = res
                if (count === len) {
                    reslove(returnArr)
                }
            }).catch(e => {
                reject(e)
            })
        })
    })
}

// 2

function promise_race(promiseList) {
    if (!Array.isArray(PromiseList)) {
        return new Error('arguments should be array')
    }
    return new Promise((reslove,reject) => {
        promiseList.forEach(item => item.then(reslove,reject))
    })
}

// 3.按顺序执行异步操作
// 3.1 async /await

async function fetchInOrder(urls) {
    for (let url of urls) {
        let response = await fetch(url);
    }
}
// 题目要求：实现一个Queue类，要求调用task可以实现定时任务。比如Queue().task(1， 1000)是一秒输出数字，Queue().task(2， 2000)两秒之后输出数字2，Queue().task(3， 3000)3秒之后输出3。当调用run()方法之后再开始执行输出。

let list = [[3,3000],[2,2000],[1,1000]]

function createPromise(id,time) {
    return () => {
        return new Promise((reslove) => {
            setTimeout(()=> {
                console.log(id)
            },time)
        })
    }
}
// 3.2
function run(promiseList) {
    promiseList.reduce((prev,curr) => prev.then(res=> curr()),Promise.reslove())
}


class Queue{
  queue = [];

  task(timeout, fn){
    this.queue.push(
        ()=>{
          return new Promise((res, rej)=>{
            setTimeout(()=>{
              fn();
              res();
            }, timeout);
          })
        }
    );
    return this;
  }

  async start(){
    // queue.reduce((prev,curr) => prev.then(res=> curr()),Promise.reslove())

      for (let i = 0; i < this.queue.length; i++){
        var ayncfn = async ()=>{
          var fn = this.queue[i];
          await fn();
        };
        await ayncfn();
      }
   }
}

// 4.控制最大并发数

function promiseLimit(urls, limit, cb) {
    let count = 0;
    let total = urls.length
    let data = []
    for (let i = 0; i < limit; i++) {
        handler()
    }

    function handler() {
        if (urls.length) {
        let currentUrl = urls.shift()

            fetch(currentUrl).then(res => {
                count++;
                data.push(res)
                handler()
            }).catch(res => {
                count++;
                throw Error()
            })
        }
        if (count >= total) {
            cb(data)
        }
    }
}



async function fetchInOrder(urls) {
    let textPromises = urls.map(async (item) => {
        let response = await fetch(url);
        return response
    })

    for (let i of textPromises) {
        console.log(await textPromise)
    }
}




let PENDING = 'PENDING'
let REJECTED = 'REJECTED'
let RESLOVED = 'RESLOVED'
function Promsie(fn) {
    let that = this;
    that.value = null
    that.state = PENDING
    that.onfulfilledCallBack = [] //存储then中的回调 
    that.onrejectedCallBack = []

// then仅仅是注册了后续要执行的代码，真正执行是在reslove里面执行的
// 只有pending状态可以改变,改变对应状态 传入值赋值给value 遍历对应回调数组并执行 只执行一次
    function reslove(val) {
        if (that.state === PENDING) {
            that.state = RESLOVED
            that.value = val
            // 加入延时 确保reslove执行前，then方法都已经注册
            that.onfulfilledCallBack.map(cb => cb(val))
        }
    }

    function reject(val) {
        if (that.state === PENDING) {
            that.state = REJECTED
            that.value = val
            that.onRejectedCallback.map(cb => cb(val))
        }
    }
    try {
        fn(reslove,reject)
    } catch (e) {
          reject(e)
    }
}

Promsie.prototype.then = function (onFulfilled,onRejected) {
  const that = this
    if (that.state === PENDING) {
        that.onFulfilledCallback.push(onFulfilled)
        that.onRejectedCallback.push(onRejected)
    }
    if (that.state === REJECTED) {
        onFulfilled(that.value)
        return that
    }
    if (that.state === REJECTED) {
        onRejected(that.value)
        return that
    }
}



window.Promise && !(finally in Promise) && ~function() {
    Promise.prototype.finally = function(cb) {
        let Fn = this.constructor
        // callback如果是个异步操作，返回promise呢.希望等callback执行完再接着执行
        function onFulfilled(data) {
            return Fn.reslove(cb()).then(function(){
                return data
            })
        }
        function onRejected(err) {
            return Fn.reslove(cb()).then(function() {
                return err
            })
        }

        this.then(onFulfilled,onRejected)
    }
}






const PENDING = 'PENDING'
const RESLOVED = 'RESLOVED'
const REJECTED = 'RESLOVED'
function Promise(fn) {
  this.state = PENDING
  this.value = null;
  this.onFulfilledCallback = []
  this.onRejectedCallback = []

  function reslove(val) {
    if (this.state === PENDING) {
      this.value = val
      that.state = RESLOVED
      this.onFulfilledCallback.map(cb => cb(val))
    }
  }

  function reject(val) {
    if (this.state === PENDING) {
      this.value = val
      that.state = REJECTED
      this.onRejectedCallbacks.map(cb => cb(val))
    }
  }

  try{
    fn(reslove,reject)
  } catch(e) {
    reject(e)
  }
}

Promise.prototype.then = function(onFulfilled,onRejected) {
  if (this.state === PENDING) {
    this.onFulfilledCallback.push(onFulfilled)
    this.onRejectedCallback.push(onRejected)
  }
  if (this.state === reslove) {
    onFulfilled(this.value)
    return this
  }

  if (this.state === REJECTED) {
    onRejected(this.value)
    return this
  }
}

// Promise.then(function(){},function(){})

// new Promise((reslove,reject) => {
//    reslove('11')
// }).then()

