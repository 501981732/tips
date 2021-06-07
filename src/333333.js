// 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

function findParents(tree, id) {
    let nodes = []
    function _findParents(tree,id,res =[]) {
        tree.some(item =>{
            if (item.id === id) {
                nodes = res
                return tree
            }
            if (item.children) {
                _findParents(item.children,id,[...res,...item])
            }
        })
    }
    _findParents(tree,id,[])
    return nodes
}
// 第 93 题：给定两个大小为 m 和 n 的有序数组 nums1 和 nums2

function findMid(num1,num2) {
    // 合并两个有序数组
    let i = 0,
        j = 0,
        len1 = num1.length;
        len2 = num2.length
    let newarr = []
    let curr
    while( i < len1 || j < len2) {
        if (i === len1) {
            curr = num2[j++]
        } else if (j === len2) {
            curr = num1[i++]
        } else if (num1[i] < num2[j]) {
            curr = num1[i++]
        } else {
            curr = num2[j++]
        }
        newarr.push(curr)
    }
    if (newarr.length % 2 !== 0) {
        return newarr[Math.floor(newarr.length/2)]
    } else {
        return (newarr[newarr.length/2] + newarr[newarr.length/2 + 1])/2
    }
}

94. vue 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？
源码没有做事件代理
No, Vue doesn’t do any delegation, and its generally not needed.

95. 模拟实现一个深拷贝，并考虑对象相互引用以及 Symbol 拷贝的情况
function deepClone(obj,map= new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) return obj
    if (map.get(obj)) return map.set(obj)
    let clone = Array.isArray(obj) ? [] : {}
    map.set(clone,obj)
    Reflect.ownKeys(obj).forEach(item => {
        clone[item] = deepClone(item,map)
    })
}

96. 介绍下前端加密的常见场景和方法
字体加密

场景-密码传输

前端密码传输过程中如果不加密，在日志中就可以拿到用户的明文密码，对用户安全不太负责。
这种加密其实相对比较简单，可以使用 PlanA-前端加密、后端解密后计算密码字符串的MD5/MD6存入数据库；
也可以 PlanB-直接前端使用一种稳定算法加密成唯一值、后端直接将加密结果进行MD5/MD6，全程密码明文不出现在程序中。

PlanA
使用 Base64 / Unicode+1 等方式加密成非明文，后端解开之后再存它的 MD5/MD6 。

PlanB
直接使用 MD5/MD6 之类的方式取 Hash ，让后端存 Hash 的 Hash 。

数据包加密
https加密方式

97.  React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？ 
React 和 Vue 做优化的前提是“放弃了最优解“，本质上是一种权衡，有利有弊。
只会检测同级，又依赖于key
和dom比较起来 和 DOM 操作比起来，js 计算是极其便宜的。

98. 打印结果
 function changeObjProperty(o) {
    o.siteUrl = "http://www.baidu.com" 
    o = new Object()
    o.siteUrl = "http://www.google.com"
  } 
  let webSite = new Object();
  changeObjProperty(webSite);
  console.log(webSite.siteUrl);

//   对象作为参数，传递过去的是对象的引用，
// o = new Object()断开了引用

99. 修改以下 print 函数，使之输出 0 到 99，或者 99 到 0

function print(n){
    setTimeout(() => {
        console.log(n);
    }, Math.floor(Math.random() * 1000));
    }
    for(var i = 0; i < 100; i++){
        print(i);
    }


100. 
function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
}
// 以上只是 Foo 的构建方法，没有产生实例，此刻也没有执行

Foo.prototype.a = function() {
    console.log(3)
}
// 现在在 Foo 上挂载了原型方法 a ，方法输出值为 3

Foo.a = function() {
    console.log(4)
}
// 现在在 Foo 上挂载了直接方法 a ，输出值为 4

Foo.a(); //4
// 立刻执行了 Foo 上的 a 方法，也就是刚刚定义的，所以
// # 输出 4
let obj = new Foo();
// 这里调用了 Foo 的构建方法。Foo 的构建方法主要做了两件事：
// 1. 将全局的 Foo 上的直接方法 a 替换为一个输出 1 的方法。
// 2. 在新对象上挂载直接方法 a ，输出值为 2。
obj.a();  //2
// 因为有直接方法 a ，不需要去访问原型链，所以使用的是构建方法里所定义的 this.a，

Foo.a()  //1
// 构建方法里已经替换了全局 Foo 上的 a 方法，所以 1


101. 用 JavaScript 写一个函数，输入 int 型，返回整数逆序后的字符串。
如：输入整型 1234，返回字符串“4321”。要求必须使用递归函数调用，不能用全局变量，输入函数必须只有一个参数传入，必须返回字符串。

function revert(num) {
    let str = num.toString()
    return str.length === 1 ? str ? revert(num.substring(1)) + num.substring(0,1)
}

102. 不用加减乘除运算符，求整数的7倍
// 位运算
// 轉乘 7 進位向左位移， 再轉回 10 進位
function fn(num) {
    var d = (num).toString(7)
    return parseInt(`${d}0` , 7)
  }
  fn(123) => 861


103. 模拟实现一个 localStorage

const localStorageMock = (function() {
    let store = {}
    return {
        getItem: function(key) { return store[key] || null },
        setItem: function(key, value) { store[key] = value.toString() },
        removeItem: function(key) { delete store[key] },
        clear: function() { store = {} },
    }
})()

104. 

// ??存储的时候加个存储时间戳和有效期时长就好了啊。取的时候判断一下不就行了

const localStroageMock = (function(){
    let store = {}
    return {
        getItem: function(key) {
            return store[key] || null
        },
        setItem: function(key,value,time) {
            store[key + '_expires'] = {
                
            }
            store[key] = value.toString()
        }
    }
})()


129. 
// new Promise是同步任务 立即执行
// 如果在业务中，两个异步没有依赖关系。应该是后面这种写法。

async function main() {
    console.time();
    const x = wait();
    const y = wait();
    const z = wait();
    await x;
    await y;
    await z;
    console.timeEnd();
  }
  main();
  
130
function wait() {
    return new Promise(resolve =>
      setTimeout(resolve, 10 * 1000)
    )
  }
  
  async function main() {
    console.time();
    await wait();
    await wait();
    await wait();
    console.timeEnd();
  }
  main();

  131. 接口如何防刷
1. 网关控制流量峰值，对一个时间段出现流量异常，可以拒绝请求
2. ip请求个数限制
3. 接入风控 对用户唯一身份uid进行限制和校验。
4. 人机验证，验证码，短信验证码，滑动图片形式
  token

  132. 实现一个 Dialog 类，Dialog可以创建 dialog 对话框，对话框支持可拖拽（腾讯）

  class Dialog {
    constructor(text) {
        this.text = text;
        this.x
        this.y
        thid.dialog
    }
    open() {
        const model = document.createElement('div');
        document.body.appendChild(model)
        this.dialog = document.createElement('div')
        this.dialog.innerText = this.text
        this.dialog.addEventListener('click', e => {e.stopPropagation()})
        this.dialog.addEventListener('mousedown', this.handleMousedown.bind(this))
        model.appendChild(this.dialog)
    }
    close() {
        this.dialog.removeEventListener('mousedown',this.handleMousedown)
        document.removeEventListener('mousemove', this.handleMousemove)
        document.removeEventListener('mouseup',this.handleMouseup)
        document.body.removeChild(document.querySelector('#model')) 
    }
    handleMousedown(e) {
        this.isMoving = true
        this.x = e.clientX
        this.y = e.clientY
      }
      handleMousemove(e) {
        if (this.isMoving) {
          this.dialog.style.transform = `translate(${e.clientX - this.x + this.lastX}px,${e.clientY - this.y + this.lastY}px)`
        }
      }
      handleMouseup(e) {
        this.lastX = e.clientX - this.x + this.lastX
        this.lastY = e.clientY - this.y + this.lastY
        this.isMoving = false
      }
    
  }

  133. 用 setTimeout 实现 setInterval，阐述实现的效果与 setInterval 的差异

  function mySetInterval(fn,time) {
    mySetInterval.timer = setTimeout(()=>{
        fn()
        mySetInterval(fn,time)
    },time)
  }
  mySetInterval.clear = function() {
    clearTimeout(mySetInterval.timer)
  }

// 134. 两个日期中间的有效日期

function rangeDate(day1,day2) {
    let res = [];
    let total = []
    let dayTime = 24*60*60*1000
    let startTime = new Date(day1)
    let range = startTime - new Date(day2);
    while(total < range && range > 0) {
        res.push(new Date(startTime + dayTime).toLocaleDateString())
        total+=dayTime
    }
}

135.
在一个字符串数组中有红、黄、蓝三种颜色的球，且个数不相等、顺序不一致，请为该数组排序。使得排序后数组中球的顺序为:黄、红、蓝。

例如：红蓝蓝黄红黄蓝红红黄红，排序后为：黄黄黄红红红红红蓝蓝蓝。

function trans(str) {
    switch(str) {
        case '黄':
            return 1;
        case '红':
            return 2;
        case '蓝':
            return 3;
    }
}
str.split('').sort((a,b) => trans(a) - trans(b)).join()

136. 骨架屏原理

我之前研究过饿了么的骨架屏。 核心思想就是：
1.puppeteer 当 Puppeteer 连接到一个 Chromium 实例的时候会通过 puppeteer.launch 或 puppeteer.connect 创建一个 Browser 对象。这个时候你就会获得当前页面的dom结构。 
2.获取你需要做骨架屏的dom元素的宽高，你还可以排除一些你不想做骨架屏的元素。 
3.已知了宽高，你就可以去改她的背景颜色变成一个灰色的方框，看起来就会像一个骨架屏了

137. 如何在 H5 和小程序项目中计算白屏时间和首屏时间，说说你的思路


142.

[
    [1,2,3],
    [2,3,4]
]
function  haldle(...args) {
    args.reduce((a,b) => {
        return a.filter(item => b.includes(item))
    })
}

143. 将 '10000000000' 形式的字符串，以每 3 位进行分隔展示 '10.000.000.000'

num.toLocalString('');
new Intl.NumberFormat().format()

145. 前端项目如何找出性能瓶颈
perfermance
146. Vue 中的 computed 和 watch 的区别在哪里
watch: 一个数据影响多个数据
computed: 一个数据受多个数据影响
147. v-if、v-show、v-html 的原理是什么，它是如何封装的？
v-if 生成vnode的时候会忽略对应节点，render的时候就不会渲染
v-show还是会渲染节点，只是修改css属性

148.  webpack 中 loader 和 plugin 的区别是什么
loader: 转换器，将A文件编译成B
plugin 扩展器，对webpack进行扩展 不直接操作文件，基于事件机制监听webpack的某些节点

149. babel 怎么把字符串解析成 AST，是怎么进行词法/语法分析
1. tokens 分词 2. 语法分析，3. 转换AST，4. newAST => codeGenerator => output，最后根据新生成的 AST 输出目标代码。

150 ：二分查找如何定位左边界和右边界

151. 实现indexOf

function indexOf(str,from) {
    let data = this;
    let len = data.length;
    let strLen = str.length
    for (let i = from;i < len; i++) {
        if (data.substr(i,i+strLen) === str) {
            return i
        }
    }
}


152. '[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}
function  normalize(str) {
    str.split(/[\[/]]/g)
    str.match(/w+/g).reduce((acc,curr,index,a) =>{
        acc.value = curr
        if (index !== a.length -1) {
            return (acc.children={})
        }
    })
}

153. 实现一个批量请求函数 multiRequest(urls, maxNum)

function multiRequest(urls,maxNum,cb) {
    let count = 0
    let len = urls.length
    for (let i = 0; i <= maxNum; i++) {
        handle()
    }
    function handle() {
        if (urls.length > 0) {
            let curr = urls.shift();
            let res = []
            fetch(curr).then(res => {
                res[count++] = res;
                if (count === len) {
                    cb(res)
                } else {
                    handle()
                }
            })
        }
    }
}

function throttle(time) {
    let queue = [];
    let wip = 0;//在制品
    function toAdd(item) {
        queue.push(item) && run()
    }

    function done() {
        wip--;
        run()
    }

    function run() {
        if (queue.length > 0 && wip < time)
            wip++
            queue.shift()()
    }
    return [toAdd,done]
}

