class LazyMan {
    constructor(name) {
        this.name = name
        console.log(`hi ${name}`)
        this.taskList = []
        setTimeout(()=>{
            this.next()
        },0)
    }

    eat(str) {
        let task = ()=>{
            console.log(str)
            this.next()
        }
        this.taskList.push(task)
        return this
    }

    sleep(time) {
        let task = ()=>{
            setTimeout(()=>{
                this.next()
            },time)
        }
        this.taskList.push(task)
        return this
    }
    next() {
        let fn = this.taskList.shift()
        fn && fn()
    }
}

68. 如何解决移动端 Retina 屏 1px 像素问题
viewport  + rem
伪类+ scale
background-image
border-image

69.  如何把一个字符串的大小写取反（大写变小写小写变大写），例如 ’AbC' 变成 'aBc' 。
function processString (s) {
    var arr = s.split('');
    var new_arr = arr.map((item) => {
        return item === item.toUpperCase() ? item.toLowerCase() : item.toUpperCase();
    });
    return new_arr.join('');
}

70.  介绍下 webpack 热更新原理，是如何做到在不刷新浏览器的前提下更新页面的

WDS 启动本地服务 （new webpack --> 启动 server --> 启动 websocket{将 websocket 的代码注入到浏览器代码中}
--> webpack 开始监听文件变动{变动了就重新编译构建} --> HMR-Plugin 将热更新代码注入到 浏览器运行代码中，也就是 HRM runtime）
--> HRM runtime 删除过期的模块，替换为新的模块，然后开始执行相关代码

71.  实现一个字符串匹配算法，从长度为 n 的字符串 S 中，查找是否存在字符串 T，T 的长度是 m，若存在返回所在位置。

const find = (S, T) => {
    if (S.length < T.length) return -1;
    for (let i = 0; i < S.length - T.length ; i++) {
        if (S.substr(i, T.length) === T) return i ;
    };
    return -1;
  };
72.  为什么普通 for 循环的性能远远高于 forEach 的性能，请解释其中的原因
在10万这个级别下， forEach 的性能是 for的十倍
在100万这个量级下， forEach 的性能是和for的一致
在1000万级以上的量级上 ， forEach 的性能远远低于for的性能

forEach它不是普通的 for 循环的语法糖，还有诸多参数和上下文需要在执行的时候考虑进来，这里可能拖慢性能；

73 介绍下 BFC、IFC、GFC 和 FFC

74 使用 JavaScript Proxy 实现简单的数据绑定
new Proxy(obj, {
    get: function(target, key, receiver) {
        return Reflect.get(target, key, receiver)
    },
    set:function(target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver);
    }
})
const model = document.getElementById("model")
const word = document.getElementById("word")
const newObj = new Proxy(obj, {
    get: function(target, key, receiver) {
      console.log(`getting ${key}!`);
      return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
      console.log('setting',target, key, value, receiver);
      if (key === "text") {
        model.value = value;
        word.innerHTML = value;
      }
      return Reflect.set(target, key, value, receiver);
    }
  });
  model.addEventListener("keyup",function(e){
    newObj.text = e.target.value
  })

  75. 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少
  数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)


  76. 
  // example 1
var a={}, b='123', c=123;  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
a[b]='b';
a[c]='c';  
console.log(a[b]);

---------------------
// example 3
var a={}, b={key:'123'}, c={key:'456'};  
a[b]='b';
a[c]='c';  
console.log(a[b]);

77. 算法题「旋转数组」
给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

for (let i = 0; i < k; i++) {
	let val = arr.pop();
	arr.unshift(val);
}

78. Vue 的父组件和子组件生命周期钩子执行顺序是什么
加载渲染过程 父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
子组件更新过程 父beforeUpdate->子beforeUpdate->子updated->父updated
父组件更新过程 父beforeUpdate->父updated
销毁过程 父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

79. input 搜索如何防抖，如何处理中文输入
参考vue源码对v-model的实现中，对输入中文的处理
onCompositionStart 
onCompositionEnd

80. 介绍下 Promise.all 使用、原理实现及错误处理
if (!Promise.prototype.all) {
    Promise.prototype.all = function(list) {
        if (Array.isArray(list)) return
        return new Promise((resolve,reject) => {
            let count = 0,
            result = [],
            len = list.length
            for (let i = 0; i < len; i++) {
                Promise.resolve(list[i]).then((res) => {
                    count++
                    result[i] = res
                    if (count === len) {
                        resolve(result)
                    }
                }).catch(e => {
                    reject(e)
                })
            }
        ])

    }
}

81
function moveZero(arr){
    let i = 0,// 不为0的个数
        j = arr.length;
        for (let j = 0, len = arr.length; i < len - 1; i++) {
            if (arr[j] === 0 ) {
                arr.splice(i,1)
                arr.push(0)
                i++;
                j--
            }
        }
        return arr
}
function moveZero(arr){
    let i = 0,
        j = arr.length;
        for (let j = 0, len = arr.length; i < len ; i++) {
            if (arr[j] !== 0 ) {
                [arr[i],arr[j]] = [arr[j], arr[i]]
                i++
            }
        }
        return arr

}

83 var、let 和 const 区别的实现原理是什么
块级作用域 暂时性死区 常量

84 请实现一个 add 函数，满足以下功能。
add(1); 			// 1
add(1)(2);  	// 3
add(1)(2)(3)；// 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6

function add() {
    let newargs = [...arguments]
    function fn(){
        newargs = [...newargs,...arguments]
        return fn
    }

    fn.toString = function() {
        return newargs.reduce((a,b) => a + b,0)
    }
    return fn
}

function curry(fn) {
    const len = fn.length
    let arglist = []
    return function _c(){
        arglist = [...arglist, ...arguments]
        if (arglist.length >= len) {
            return fn.apply(null, arglist)
        }
        return _c
    }
}

85 react-router 里的 <Link> 标签和 <a> 标签有什么区别 || 如何禁掉 <a> 标签默认事件，禁掉之后如何实现跳转
Link做了3件事情：

有onclick那就执行onclick
click的时候阻止a标签默认事件（这样子点击<a href="/abc">123</a>就不会跳转和刷新页面）
再取得跳转href（即是to），用history（前端路由两种方式之一，history & hash）跳转，此时只是链接变了，并没有刷新页面

86. 周一算法题之「两数之和」
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

var twoSum = function(nums, target) {
    let map = {}
    for(let i = 0,len = nums.length; i<len; i++) {
        let item = nums[i]
        if (map[target - item] === undefined) {
            map[item] = i
        } else {
            return [i, map[target-item]]
        }
    }
};

87. 在输入框中如何判断输入的是一个正确的网址

function isUrl(url) {
    try {
        new URL(url)
        return true
    } catch(e) {
        return false
    }
}
function isUrl(url) {
	const a = document.createElement('a')
	a.href = url
	return [
		/^(http|https):$/.test(a.protocol),
		a.host,
		a.pathname !== url,
		a.pathname !== `/${url}`,
	].find(x => !x) === undefined
}

88. listtotree

let list =[
    {id:1,name:'部门A',parentId:0},
    {id:2,name:'部门B',parentId:0},
    {id:3,name:'部门C',parentId:1},
    {id:4,name:'部门D',parentId:1},
    {id:5,name:'部门E',parentId:2},
    {id:6,name:'部门F',parentId:3},
    {id:7,name:'部门G',parentId:2},
    {id:8,name:'部门H',parentId:4}
];
// 基于dfs
function listToTree(list,id) {
    let result = []

    list.forEach(item => {
        if (item.parentId === id) {
            result.push({
                ...result,
                children: listToTree(item,item.parentId)
            })
        }
    })

    return result
}
空间换时间
function listToTree(list) {
    let res = []
    let map = list.reduce((acc,curr) =>{
        acc[curr.id] = curr
        return acc
    },{})
    for (let v of Object.values(list)) {
        if (!v.parentId) {
            res.push(v)
        } else {
            map[v.parentId].children = map[v.parentId].children || []
            map[v.parentId].children.push(v)
        }
    }
    return res
}

89. 设计并实现 Promise.race()
if (!Promise.prototype.race) {
    Promise.prototype.race = function(list) {
        return new Promise((resolve,reject) =>{
            list.forEach(item =>{
                Promise.resolve(item).then(resolve, reject)
            })
        })
    }
}

90. 实现模糊搜索结果的关键词高亮显示
let panter = new RegExp('关键词', 'g')
该行字符串.replace(panter, '<b style="color: #2D7BFF">' + '关键词' + '</b>')

91. 介绍下 HTTPS 中间人攻击

https本就有CA认证过程，这个就是用来防止劫持，退一万步讲，就算你伪造CA成功
，你也拿不到我的对称密钥，除非客户端主动泄漏，我实在不理解HTTPS如何能进行中间人攻击。我觉得这个问题应该改成http的中间人攻击？

防御措施：
服务端在发送浏览器的公钥中加入CA证书，浏览器可以验证CA证书的有效性

92. 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

function getParentNodes(tree,id) {
    let node = []

    function _getParentNodes(tree,id,res = []) {
        tree.some((item) =>{
            if (item.id === id) {
                node = res
                return true
            } 
            if (item.children) {
                const history = [...res,item]
                _getParentNodes(item,id,history)
            }
        })
    }
    _getAllParentNodes(tree,id,[])
    return node
}

93. 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。请找出这两个有序数组的中位数
var findMedianSortedArrays = function (nums1, nums2) {
    // 先合并两个有序数组
    let newArr = [];
    let i = 0,j = 0,len1 = nums1.length; len2 = nums2.length,
        curr;
    while( i < len1 || j < len2) {
        if ( i === len1) {
            curr = nums2[j++]
        } else if ( j === len2) {
            curr = nums1[i++]
        } else if (nums1[i] < nums2[j]) {
            curr = nums1[i++]
        } else {
            curr = nums2[j++]
        }
        newArr[i+j-1] = curr
    }
    if (newArr.length % 2 !== 0) {
        return newArr[Math.floor(newArr.length/2)]
    } else {
        return (newArr[newArr.length/2] + newArr[newArr.length/2-1]) /2
    }
};



105. 匹配url

https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33

new URLSearchParams('https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33').get('elective')

106
String('11') == new String('11'); // true
String('11') === new String('11'); //false

107.  题：考虑到性能问题，如何快速从一个巨大的数组中随机获取部分元素 随机数
//洗牌算法
function shuffle(arr) {
    for (let i = 0,len = arr.length; i < len; i++) {
        let randomIndex = Math.floor(Math.random()*(i+1))
        [arr[randomIndex],arr[i]] = [arr[i],arr[randomIndex]]
    }
    return arr
}
function shuffle(arr,size) {
    let result = []
    let len = arr.length
    for (let i = 0,;i < size;i++) {
        let randomIndex = Math.floor(Math.random()*(len - i))
        result.push(arr[randomIndex])
        [arr[len - i - i],arr[randomIndex]] =  [arr[randomIndex],arr[len - i - i]]
    }
}

108.
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
  var name = 'Jack';
  console.log('Goodbye ' + name);
} else {
  console.log('Hello ' + name);
}
})();

109.
var name = 'Tom';
(function() {
if (typeof name == 'undefined') {
  name = 'Jack';
  console.log('Goodbye ' + name);
} else {
  console.log('Hello ' + name);
}
})();

110.输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'
// [1, 2, 3, 5, 7, 8, 10];
function transStr(arr) {
    let result = []
    let start = arr[0]
    arr.forEach((item,index) =>{
        if (item !== arr[index + 1]) {
            if (start !== item) {
                result.push(`${temp}~${item}`)
            } else {
                result.push(item);
            }
            start = arr[index + 1]
        }
    })
    return result.join()
}

111. 
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
  var output = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
  }

  function flatObj(obj,prefix,res = {}) {
    let isType = (type) => (obj) => Object.prototype.toString.call(obj) === `[object ${type}]`
    let isObject = isType('Object');
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            let key = prefix ? prefix + '.' + i : i
            let val = obj[i]
            if (isObject(val)) {
                flatObj(val,key,res) 
            } else {
                res[key] = val
            }
        }
    }
    return res
  }
112.

function  changeObj(obj) {
    let newObj = {}
    for (let i in obj) {
        let val = obj[i]
        let keys = i.split('.')
        keys.reduce((prev,curr,index) =>{
            if (index === keys.length -1) {
                prev[curr] = val
                return prev
            }
            prev[curr] = prev[curr] || {}
            return prev[acc]
        },newObj)
    }
    return newObj
}

113. 去重
// 没有考虑到数据类型为null,undefind等类型 包括数据为对象时key顺序不同的问题
// [...new Set(arr.map(JSON.stringify))].map(JSON.parse) 

[...new Set(arr)]

function parseObj(obj){
	let keys = Object.keys(obj).sort()
	let newObj = {}
	for(let key of keys){
               // 不晓得有没有有必要，反正把value为obj的情况也处理一下 - -
                obj[key]=isObj(obj[key])?parseObj(obj[key]):obj[key]
		newObj[key] = obj[key]
	}
	return newObj
}

// 最后
const arr = [1,'1',{a:1,b:"1"},{b:'1',a:1},{a:1,b:2},[1,2,3],null,undefined,undefined]
function passArr(arr){
	return [...new Set(arr.map(item=>
		isObj(item)? JSON.stringify(parseObj(item)) : ( !item ? item : JSON.stringify(item))
    ))].map(item=>!item?item : JSON.parse(item))
}
114. 编程题，找出字符串中连续出现最多的字符和个数（蘑菇街）
// 'abbkejsbcccwqaa' => {'c':3}
function  findLongest(str) {
    let count = 0;
    let res = {};
    let temp = str[0];
    let maxCount = 0;
    for (let key in str) {
        let val = str[key]
        if (temp === val) {
            count++
            if (count >= maxCount) {
                maxCount = count
                // res[val] = maxCount
                res = {[val]: maxCount}
            }
        } else {
            count = 1
            temp = val
        }
    }
    return res
}

115 写一个单向链数据结构的 js 实现并标注复杂度（水滴筹）
class linkNode {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

116
1 + "1"
// 11

2 * "2"
// 4

[1, 2] + [2, 1]
// "1,22,1"

"a" + + "b"
// aNaN

117. http协议

118. vue 渲染大量数据时应该怎么优化？
1.先打死提供数据的人 ^ v ^~ （推荐）
2.如果打不过自己架设中间层
3.SPA + SSR处理 bigpipe （服务器渲染组件总比浏览器强，毕竟那么多核的CPU也不是花瓶）
4.可以考虑stream（我还没看用过...）
4.增加加载动画提升用户体验
5.同时避免浏览器处理大量的dom（具体看下面）  异步渲染组件 虚拟列表 分页
6.尽量不要再用vue的双向数据绑定了 或者只用部分页面中处理的数据

119 vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？

支出骨架屏  
低分辨率的img
SSR
loading
prefetch
Quicklink 
cdn
优化 webpack 减少模块打包体积，code-split 按需加载

120 为什么 for 循环嵌套顺序会影响性能？

121. 统计 1 ~ n 整数中出现 1 的次数
// 暴力
function findOne(n) {
    let count = 0;
    for(let i = 0,i <=n; i++) {
        count = String(i).split('').filter(item => item === '1').length
    }
}
122. webpack 打包 vue 速度太慢怎么办？
 webpack-bundle-analyzer 生成报告 看那块体积大
 另一个plugin查看各个loader等哪个耗时再去处理
 externals
 loader 缩小范围 happypack多进程 dll loader加cache
123. vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法
ack方式很简单，如果加入新对象，对新对象进行响应式化，
缺陷：导致如果直接改变数组下标是无法hack的，由于此点，vue提供了$set方法，

124 永久性重定向（301）和临时性重定向（302）对 SEO 有什么影响
301 对seo友好 汇报老的信息待到新的地址，同时在搜索引擎索引库中彻底废弃掉原先的老地址。旧网址的排名等完全清零
302代表暂时性转移 seo不友好  只有Google会把其它域名的链接成绩计入主域，而其它搜索引擎只会把链接成绩向多个域名分摊

125. 数组去重 listtotree

function listToTree(list,id=0) {
    let result = []
    list.forEach(item =>{
        if (item.parentId === id) {
            result.push({
                ...result,
                children: listToTree(item,item.parentId)
            })
        }
    })
}

function listToTree(list) {
    let map = list.reduce((prev,curr) =>( prev[curr.id] = curr,curr),{})
    let res = []
    // {
    //     id: {
    //         id:'',
    //         parentId:'',
    //     }
    // }
    // 构建以id为key的map
    for(let key of Object.values(map)) {
        let parent = map[key.parentId]
        parent.children = parent.children || []
        parent.children.push(key)
        if (!key.id) {
            res.push(map)
        }
        return res
    }

}

126. 扑克牌问题
function sort(arr) {
    let res = []
    while(arr.length > 0) {
        res.push(arr.pop())
        res.push(arr.shift())
    }
    res.push(arr.pop())

    return res
}

127. 多行文本溢出
// overflow: hidden; text-overflow:ellipsis; white-space: nowrap; 
// 多行： display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; //行数 overflow: hidden
// line-height:  height  p::after{content: "..."
// 使用split + 正则表达式将单词与单个文字切割出来存入words
// 加上 '...'
// 判断scrollHeight与clientHeight，超出的话就从words中pop一个出来

128. 301 302场景
301应用场景: 域名到期不想继续用这个,换了地址
302应用场景: 做活动时候,从首页跳到活动页面,

129
function wait() {
    return new Promise(resolve =>
      setTimeout(resolve, 10 * 1000)
    )
  }
  
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

  137.
  白屏时间= 页面开始展示时间-开始请求时间
  首屏时间=  首屏内容渲染结束时间点-开始请求时间点

  138 翻转链表

  139 谈一谈 nextTick 的原理
  触发某个数据的setter之后，把watcher对象放到queue中，过滤合并->一个watcher对象在一个tick只执行一遍
  等到下一个tick取出来，flushcallbacks跑一遍
  vue实现nextTick 通过 promise setTimeout setImmediate来实现的


  140. 为什么 HTTP1.1 不能实现多路复用
  HTTP/1.1 不是二进制传输，而是通过文本进行传输。由于没有流的概念，

  141 Vue 中的 computed 是如何实现的
  computed内部实现了一个惰性的watcher，在实例化的时候不会去求值，其内部通过dirty属性标记计算属性是否需要重新求值
  当computed依赖的任一状态（不一定是return中的）发生变化，都会通知这个惰性watcher，让它把dirty属性设置为true。

  142. 求多个数组之间的交集
  [
      [],
      []
  ]
  function handle(...args) {
      if (args.length === 1) {
          return args
      }
      args.reduce((acc,curr) => {
          acc.filter(item => curr.include(item))
      })
  }

143. 将 '10000000000' 形式的字符串，以每 3 位进行分隔展示 '10.000.000.000'
10000000000..toLocaleString('de-DE') 

144. 
var str= '10000000000'; new Intl.NumberFormat().format(str); // "10,000,000,000"

145.手写二进制转 Base64
浏览器
btoa('123')

node
Buffer.from('123').toString('base64')


