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


// 节流
// 防抖
// 字符串反转
// 去重
// 实现千位分隔符
// 是否是回文
// 实现一个模板引擎
// 判断是否是素数
// n以内的所有素数