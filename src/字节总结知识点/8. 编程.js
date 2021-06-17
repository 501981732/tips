String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '');
}
//  /^\s+/  /\s+$/ 

function deepCopy(obj,map=new WeakMap()) {
  if (typeof obj !== 'object' || obj === null) return obj
  if (map.has(obj)) return map.get(obj)
  let clone = Array.isArray(obj) ? [] : {}
  Reflect.ownKeys(obj).forEach(item => {
    clone[item] = deepCopy(obj[item],map)
  })
  map.set(obj,clone);
  return clone
}
function curry (fn) {
  let args = []
  return function curring (...newArgs) {
      if (newArgs.length) {
          args = [...args,...newArgs]
          return curring
      } else {
          return fn.apply(this, args)
      }
  }
}

// let addCurry = curry(add)
// let total = addCurry(1)(2)(3)(4);
// total()

function add(a ,b){
  //取两个数字的最大长度
  let maxLength = Math.max(a.length, b.length);
  //用0去补齐长度
  a = a.padStart(maxLength , 0);//"0009007199254740991"
  b = b.padStart(maxLength , 0);//"1234567899999999999"
  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0;   //"进位"
  let sum = "";
  for(let i=maxLength-1 ; i>=0 ; i--){
     t = parseInt(a[i]) + parseInt(b[i]) + f;
     f = Math.floor(t/10);
     sum = t%10 + sum;
  }
  if(f == 1){
     sum = "1" + sum;
  }
  return sum;
}

// 大数相加
// 拍平数组
ary = arr.toString().split(',').map(Number)
function flat(arr, num = 1) {
  return num > 0
    ? arr.reduce(
        (pre, cur) =>
          pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),
        []
      )
    : arr.slice();
}   
function flat(arr,n) {
  while(n--) {
      arr = [].concat(...arr)
  }
  return arr
}


function throttle(fn) {
  let timer = null
  return function() {
    if (timer) clearTimeout(timer)
    timer = setTimeout(()=>{
      fn.call(this,arguments)
    })
  }
}
// 节流： throttle 稀释执行效率  思路：每次触发前判断当前是否有等待执行的延时函数

function throttle(fn,time) {
    let canRun = true
    return function() {
        if (!canRun) return
        canRun = false
        let context = this
        setTimeout(()=>{
            fn.call(context,arguments)
            canRun = true
        },time)
    }
}
// 防抖
function debounce(fn,time) {
  let timer = null
  return function() {
      let context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(function(){
          fn.call(context,arguments)
          timer = null
      },time)
  }
}
// 字符串反转
// 去重
// 实现千位分隔符
// 是否是回文
// 实现一个模板引擎
// 判断是否是素数
// n以内的所有素数