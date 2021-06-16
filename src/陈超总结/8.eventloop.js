8.eventloop.js
1、下面代码在浏览器 服务器端 分别输出什么？为什么
setTimeout(()=>{
    console.log('timer1')

    Promise.resolve().then(function() {
        console.log('promise1')
    })
}, 0)

setTimeout(()=>{
    console.log('timer2')

    Promise.resolve().then(function() {
        console.log('promise2')
    })
}, 0)



浏览器输出：
time1
promise1
time2
promise2

Node输出：
time1
time2
promise1
promise2
2、这个在node中输出什么，为什么
setTimeout(() => console.log(1));
setImmediate(() => console.log(2));

Promise.resolve().then(() => console.log(3));
process.nextTick(() => console.log(4));


输出结果：4 3 1 2或者4 3 2 1

3、下面的代码，在node中输出什么？
   setTimeout(function () {
       console.log(1);
   },0);
   console.log(2);
   process.nextTick(() => {
       console.log(3);
   });
   new Promise(function (resolve, rejected) {
       console.log(4);
       resolve()
   }).then(res=>{
       console.log(5);
   })
   setImmediate(function () {
       console.log(6)
   })
   console.log('end');

Node输出：
2 4 end 3 5 1 6