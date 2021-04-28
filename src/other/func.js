// chainAsync
// 链异步函数。

// 循环遍历包含异步事件的函数数组, 当每个异步事件完成时调用next。

const chainAsync = fns => { let curr = 0; const next = () => fns[curr++](next); next(); };
/*
chainAsync([
  next => { console.log('0 seconds'); setTimeout(next, 1000); },
  next => { console.log('1 second');  setTimeout(next, 1000); },
  next => { console.log('2 seconds'); }
])
*/


// compose
// 执行从右向左的函数组合。
// 使用Array.reduce()执行从右向左的函数组合。最后一个 (最右边) 的函数可以接受一个或多个参数;其余的函数必须是一元的。

const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
/*
const add5 = x => x + 5
const multiply = (x, y) => x * y
const multiplyAndAdd5 = compose(add5, multiply)
multiplyAndAdd5(5, 2) -> 15
*/

const pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));

// curry 
// 函数柯里化

const curry = (fn, arity = fn.length, ...args) =>
arity <= args.length
? fn(...args)
: curry.bind(null, fn, arity, ...args);
// curry(Math.pow)(2)(10) -> 1024
// curry(Math.min, 3)(10)(50)(2) -> 2
// 

// 记录函数的名字

const functionName = fn => (console.debug(fn.name), fn);
// functionName(Math.max) -> max (logged in debug channel of console)
// 


//  转换异步函数以返回一个承诺
const promisify = func =>
(...args) =>
new Promise((resolve, reject) =>
func(...args, (err, result) =>
err ? reject(err) : resolve(result))
);
// const delay = promisify((d, cb) => setTimeout(cb, d))
// delay(2000).then(() => console.log('Hi!')) -> Promise resolves after 2s


//运行一系列的promise。

const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());
// const delay = (d) => new Promise(r => setTimeout(r, d))
// runPromisesInSeries([() => delay(1000), () => delay(2000)]) -> executes each promise sequentially, taking a total of 3 seconds to complete



// 延迟异步函数的执行。
// 延迟执行async函数的一部分, 将其放入休眠状态, 返回Promise.

const sleep = ms => new Promise(resolve => setTimeout(resolve,ms))
// async function sleepyWork() {
//   console.log('I\'m going to sleep for 1 second.');
//   await sleep(1000);
//   console.log('I woke up after 1 second.');
// }