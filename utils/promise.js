
const PENDING = 'pending'
const RESLOVED = 'resloved'
const REJECTED = 'rejected'

// 简易版 promise
function MyPromise(fn) {
    const that = this
    that.state = PENDING //默认pending状态
    that.value = null //resolve 或者 reject 中传入的值
    that.reslovedCallbacks = [] //then中回调，  当执行完promise时，状态可能还在等待中，吧then中的回调保存下来用于状态改变的时候调用
    that.rejectedCallbacks = [] //

    // 只有pending状态可以改变,改变对应状态 传入值赋值给value 遍历对应回调数组并执行
    function reslove(value) {
        if (that.state === PENDING) {
            that.state = RESLOVED
            that.value = value
            that.reslovedCallbacks.map(cb => cb(that.value))
        }
    }

    function reject(value) {
        if (that.state === PENDING) {
            that.state = REJECTED
            that.value = value
            that.rejectedCallbacks(cb => cb(that.value))
        }
    }


    // 如何执行 Promise 中传入的函数了

    try{
        fn(reslove,reject)
    } catch (e) {
        reject(e)
    }

}

// 实现then
// then仅仅是注册了后续要执行的代码，真正执行是在reslove里面执行的
MyPromise.prototype.then = function(onFulfilled,onRejected) {
    const that = this
    // Promise().then() // 判断参数是否为函数，不是则包一层函数 实现透传
    // Promise.resolve(4).then().then((value) => console.log(value))
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => {
        throw r
    }

    // 判断状态 当 不是pending状态就去执行，否则 往相应回调push
    // new MyPromise((resolve, reject) => {
    //     setTimeout(() => {
    //       resolve(1)
    //     }, 0)
    //   }).then(value => {console.log(value)})

    if (this.state === PENDING) {
        that.reslovedCallbacks.push(onFulfilled)
        that.rejectedCallbacks.push(onRejected)
    }

    if (this.state === RESLOVED) {
        onFulfilled(this.value)
    }

    if (this.state === REJECTED) {
        onRejected(this.value)
    }
}


// 符合 Promise/A+ 规范的 Promise

// 对于 resolve 函数来说，首先需要判断传入的值是否为 Promise 类型
// 为了保证函数执行顺序，需要将两个函数体代码使用 setTimeout 包裹起来
function reslove(value) {
    if (value instanceof MyPromise) {
        return value.then(reslove,reject)
    }
    setTimeout(()=>{
        if (that.state === PENDING) {
            that.state = RESLOVED
            that.value = value
            that.reslovedCallbacks.map(cb => cb(that.value))
        }
    },0)
}

function reject(value) {
    setTimeout(()=>{
        if (that.value === PENDING) {
            that.state = REJECTED
            that.rejectedCallbacks.map(cb => cb(that.value))
        }
    },0)
}



MyPromise.prototype.then = function(onFulfilled,onRejected) {
    const that = this
    // Promise().then() // 判断参数是否为函数，不是则包一层函数 实现透传
    // Promise.resolve(4).then().then((value) => console.log(value))
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : r => {
        throw r
    }

    // if (this.state === PENDING) {
    //     that.reslovedCallbacks.push(onFulfilled)
    //     that.rejectedCallbacks.push(onRejected)
    // }
    if (that.state === PENDING) {
        return (promise2 = new MyPromise((resolve, reject) => {
          that.resolvedCallbacks.push(() => {
            try {
              const x = onFulfilled(that.value)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (r) {
              reject(r)
            }
          })
      
          that.rejectedCallbacks.push(() => {
            try {
              const x = onRejected(that.value)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (r) {
              reject(r)
            }
          })
        }))
      }

    // if (this.state === RESLOVED) {
    //     onFulfilled(this.value)
    // }
    if (that.state === RESOLVED) {
        return (promise2 = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(that.value)
              resolutionProcedure(promise2, x, resolve, reject)
            } catch (reason) {
              reject(reason)
            }
          })
        }))
      }      

    if (this.state === REJECTED) {
        onRejected(this.value)
    }
}
// 当然也是最难的一部分，也就是实现兼容多种 Promise 的 resolutionProcedure 函数
// 首先规范规定了 x 不能与 promise2 相等，这样会发生循环引用的问题
function resolutionProcedure(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Error'))
    }
  }

  let called = false
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolutionProcedure(promise2, y, resolve, reject)
          },
          e => {
            if (called) return
            called = true
            reject(e)
          }
        )
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }