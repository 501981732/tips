### 执行栈 call Stack
    执行栈认为是一个存储函数调用的栈结构，遵循先进后出的原则。

当我们执行 JS 代码的时候其实就是往执行栈中放入函数，那么遇到异步代码的时候该怎么办？其实当遇到异步的代码时，会被挂起并在需要执行的时候加入到 Task（有多种 Task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为

    当我们使用递归的时候，因为栈可存放的函数是有限制的，一旦存放了过多的函数且没有得到释放的话，就会出现爆栈的问题

### 任务队列 task queue

#### microtask 微任务包括 process.nextTick ，promise ，MutationObserver
#### macrotask 宏任务包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，鼠标事件 dom解析等

### event loop执行顺序

在当前宏任务中的 JavaScript 快执行完成时，也就在 JavaScript 引擎准备退出全局执行上下文并清空调用栈的时候，JavaScript 引擎会检查全局执行上下文中的微任务队列，然后按照顺序执行队列中的微任务。WHATWG 把执行微任务的时间点称为**检查点**


## node中 event loop

    Node 中的 Event Loop 和浏览器中的是完全不相同的东西。

Node 的 Event Loop 分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段

- timers

timers 阶段会执行 setTimeout 和 setInterval 回调，并且是由 poll 阶段控制的。

同样，在 Node 中定时器指定的时间也不是准确时间，只能是尽快执行

- I/O

 I/O 阶段会处理一些上一轮循环中的少数未执行的 I/O 回调


- idle,prepare

- poll 



- check

check 阶段执行 setImmediate

- close callbacks

  close callbacks 阶段执行 close 事件


### process.nextTick

这个函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 nextTick 队列，就会清空队列中的所有回调函数，并且优先于其他 microtask 执行。

### 微任务和宏任务在Node的执行顺序

Node 10以前：

执行完一个阶段的所有任务
执行完nextTick队列里面的内容
然后执行完微任务队列的内容
Node 11以后： 和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。