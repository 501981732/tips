=============js高级==================
1、数组的常用操作 pop、push、shift、unshift、splice

push 推入一个
unshift 头部插入一个
Shift 头部移出第一个

2、浏览器的进程和线程
进程：GPU、Browser、插件、渲染
渲染进程线程：GUI、JS引擎、事件触发、时间触发、Http、webwork

重绘和回流
https://blog.csdn.net/weixin_45820444/article/details/109013996

3、js的异步处理，宏任务、微任务
宏任务队列 setTimeout
微任务队列 promise、async、await

4、webpack常用的配置 
常用的配置：
mode
entry 
output
plugins
loader
optimization
external
devServer

loader 和 plugin的区别
loader帮助webpack加载和处理js之外的文件
plugin 增强webpack处理 文件的能力，比方说文件替换，css抽取、压缩

5、webpack 生命周期、webpack插件
基于 tapable (源码)

5、webpack的tree-shaking  
需要配置side-effect 去区分，文件是否有副作用（全局定义的未使用的变量）

6、webpack-dev-server 热更新的原理 
watchContentBase 是否只观测内容，内容变化则直接刷新浏览器
webpack-dev-server / webpack-dev-middleware
webpack-dev-client
webpack / hot / dev-server
HotModuleReplace(Runtime) 
JSONP MainTemplate 获取文件
更新应用

7、webpack5新特性
模块打包缓存
chunkid
tree shaking
联邦模块 微前端


联邦模块实现的微前端
https://www.bilibili.com/video/BV18y4y1i7sT

8、React核心原理
createElement 转换虚拟dom
dom diff
生命周期触发
Fiber结构
react16的concurrent 并发模式

手写React
https://www.bilibili.com/video/BV1dK411N7gp?p=6
https://github.com/Sunny-lucking/howToBuildMyReact/tree/master/src

核心源码
https://xiaochen1024.com/series/600a9a104bf83f002edaf53f

react-hooks
解决问题：Component非UI逻辑复用困难，复用不好组合
setState 是全量更新，所以要合理设置state区分

React16的任务调度
https://developer.51cto.com/art/202102/643992.htm


9、Vue核心原理，手写Vue
响应式数据：Object.defineProperty 重写属性的 get 和 set
依赖收集 get依赖收集、set的时候执行依赖
dom diff 基于 snabbdom

Vue-router和vuex核心实现，也是基于Vue的数据响应式数据

10、node的核心架构
I/O密集型
多进程编程
child_process、cluster、进程守护，多进程不是为了解决高并发，主要解决CPU不能充分应用的问题，CPU 核心数
进程之间的通信，IPC，通道文件描述符
进程守护
Libuv包含Event Loop、文件、操作系统、线程池，可以配置 线程池的个数，默认是4
中间件
热更新 node的file模块的watch方法

event loop介绍 与 浏览器的event loop的区别
https://segmentfault.com/a/1190000013861128

11、svelte框架
没有虚拟dom
体积极精简

12、函数式编程 函数柯里化 将多个参数变为一个参数
function add(y){
 return function(x){
  return x + y
 }
}

add(1)(2)