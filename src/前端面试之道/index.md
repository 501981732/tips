### typeof instanceof

- typeof 对于原始类型来说，除了 null 都可以显示正确的类型
- typeof 对于对象来说，除了函数（显示function）都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型
- instanceof 内部机制是通过原型链来判断的

#### 3

我们可以通过__proto__ 找到他的原型，原型中有个constructor属性，指向的是构造函数。constructor属性中有个prototype。又指回原型
但是并不是所有函数都具有这个属性，Function.prototype.bind() 就没有这个属性。
let a = {}
a.__proto__ === a.__proto__.constructor.prototype


- Object 是所有对象的爸爸，所有对象都可以通过 __proto__ 找到它
- Function 是所有函数的爸爸，所有函数都可以通过 __proto__ 找到它
- 函数的 prototype 是一个对象
- 对象的 __proto__ 属性指向原型， __proto__ 将对象和原型连接起来组成了原型链

#### 4
- 函数提升优先于变量提升，函数提升会把整个函数挪到作用域顶部，变量提升只会把声明挪到作用域顶部
- var 存在提升，我们能在声明之前使用。let、const 因为暂时性死区的原因，不能在声明前使用
- var 在全局作用域下声明变量会导致变量挂载在 window 上，其他两者不会
- let 和 const 作用基本一致，但是后者声明的变量不能再次赋值

##### 原型如何实现继承？Class 如何实现继承？Class 本质是什么？
class 只是语法糖，本质还是函数。

class Person {}
Person instanceof Function // true

##### __proto__和prototype区别
这只是浏览器在早期为了让我们访问到内部属性 [[prototype]] 来实现的一个东西。
1. 每个对象都会有__proto,prototype只有函数有
2. __proto__指向当前对象的原型对象，prototype是指向以当前函数为构造函数构造出来的原型对象。


#### 5JS 异步编程及常考面试题
```js
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
首先函数 b 先执行，在执行到 await 10 之前变量 a 还是 0，因为 await 内部实现了 generator ，generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来
因为 await 是异步操作，后来的表达式不返回 Promise 的话，就会包装成 Promise.reslove(返回值)，然后会去执行函数外的同步代码
同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 a = 0 + 10 
```

```js
// 函数传参是传递对象指针的副本
function test(person) {
  person.age = 26
  person = {
    name: 'yyy',
    age: 30
  }

  return person
}
const p1 = {
  name: 'yck',
  age: 25
}
const p2 = test(p1)
console.log(p1) // -> ?
console.log(p2) // -> ?
```

#### eventloop

####8
##### 0.1 + 0.2 != 0.3
- 计算机是通过二进制来存储东西的，0.1 在二进制中是无限循环的一些数字，这样其实没什么问题，但是 JS 采用的浮点数标准却会裁剪掉我们的数字,就会出现精度丢失的问题
-  JS 采用 IEEE 754 双精度版本（64位）
- console.log(1)正常？ 二进制被转换为了十进制，十进制又被转换为了字符串

#### 9 思考题
1. js分哪两大类型，什么特点
基本类型 number string boolean undefined null 
引用类型 object array function 正则等。。。
说出对象深浅拷贝的问题 
null 和 number 存在的一些问题 
垃圾回收的角度分析两种类型
null是个bug null 
typeof(null) // "object"
null instanceof Object // false

### 继承

```
将父类的原型赋值给了子类，并且将构造函数设置为子类
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value)
}
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})

const child = new Child(1)
```


### 模块

- CommonJS 支持动态导入，也就是 require(${path}/xx.js)，后者是静态的目前不支持但是已有提案
- CommonJS 是同步导入，因为用于服务端，文件都在本地，同步导入即使卡住主线程影响也不大。而后者是异步导入，因为用于浏览器，需要下载文件，如果也采用同步导入会对渲染有很大影响
- CommonJS 在导出时都是值拷贝，就算导出的值变了，导入的值也不会改变，所以如果想更新值，必须重新导入一次。但是 ES Module 是值的动态映射 。并且映射是只读的。像镜子一样。
- ES Module 会编译成 require/exports 来执行的

### eventloop

 先执行调用栈--> 再执行process.nextTick 在执行6阶段

Node 的 Event Loop 分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段

- timer  setTimeout setInterval 
- I/O 处理一些上一轮循环中的少数未执行的 I/O 回调
- idle, prepare    process.nextTick
- poll
- check setImmediate
- close callbacks


  事件循环对观察者的检查是有先后顺序的：*idle观察者*先与*I/O观察者*先于*check观察者*，process.nextTick属于idle观察者，setImmediate属于check观察者。

#### 跨域
同域名 协议 端口号 跨域为了方式SCRF
- jsonp 兼容性不错 但是只限于 get 请求。 
- CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。
  - 服务端设置Access-Control-Allow-Origin可以开启CORS 通过这中设置会在请求时有两种情况
    - 简单请求
    - 复杂请求
      - 首先会发起一个预检请求，该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。
      - 需要在回调中过滤 option 方法即可
- document.domain 只能用在二级域名相同的 a.test.com 和 b.test.com 只需要加上 document.domain = 'test.com'
- postMessage 获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息

#### 浏览器原理

##### 为什么操作 DOM 慢

DOM属于渲染进程中的东西，js属于JS引擎的东西。js操作dom涉及到进程之间的通信
操作 DOM 次数一多，也就等同于一直在进行线程之间的通信，并且操作 DOM 可能还会带来重绘回流的情况，所以也就导致了性能上的问题。


##### 插入几万条DOM如何不卡顿
- requestAnimationFrame循环插入
- 虚拟滚动，原理： 只渲染可视区域内的内容，非可视区完全不渲染，用户滚动时实时替换渲染的内容

##### 什么时候阻塞渲染
- 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始

##### 如何加快渲染页面？关键路径渲染
- 如何测量
浏览器中DOMContentLoaded事件提前
- 从文件大小考虑
- 从 script 标签使用上来考虑
- 从 CSS、HTML 的代码书写上来考虑
- 从需要下载的内容是否需要在首屏使用上来考虑

#### 安全
什么是 XSS 攻击？如何防范 XSS 攻击？什么是 CSP？

#### XSS  跨站脚本攻击
攻击这想尽一切办法把执行代码注入页面中
- 持久性 /非持久型
预防
- 对于引号、尖括号、斜杠进行转义 const xss = require('xss') 对于富文本采用 假如白名单
- CSP 明确告诉浏览器哪些外部资源可以加载和执行 

#### CSRF 跨站请求伪造
原理： 攻击者构造出一个后端请求地址，诱导用户点击或者通过某些途径自动发起请求。如果用户是在登录状态下的话，后端就以为是用户在操作，从而进行相应的逻辑。
Get 请求不对数据进行修改
不让第三方网站访问到用户 Cookie
阻止第三方网站请求接口
请求时附带验证信息，比如验证码或者 Token
-  SameSite  Cookie 不随着跨域请求发送
- 验证验证 Referer 判断是否是跨域请求
- Token

#### 点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击
- X-FRAME-OPTIONS 是一个 HTTP 响应头 为了防御用 iframe 嵌套的点击劫持攻击
- js
#### 中间人攻击是攻击方同时与服务端和客户端建立起了连接，并让对方认为连接是安全的 
- WIFI
- 接入https 如果没有完全关掉http，还是会降级打击

### UDP
- UDP 相比 TCP
- UDP 协议是面向无连接的，也就是说不需要在正式传递数据之前先连接起双方。然后 UDP 协议只是数据报文的搬运工，不保证有序且不丢失的传递到对端，并且UDP 协议也没有任何控制流量的算法，总的来说 UDP 相较于 TCP 更加的轻便。
- 虽然 UDP 并没有 TCP 传输来的准确，但是也能在很多实时性要求高的地方有所作为

### Post 和 Get 的区别？
- 在规范的应用场景上说，Get 多用于无副作用，幂等的场景，例如搜索关键字。Post 多用于副作用，不幂等的场景，例如注册。
- 在技术上说：

- Get 请求能缓存，Post 不能
- Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里（当然你想写到 body 里也是可以的），且会被浏览器保存历史纪录。Post 不会，但是在抓包的情况下都是一样的。
URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的
- Post 支持更多的编码类型且不对数据类型限制

