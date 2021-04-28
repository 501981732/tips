分享一个来自 Vuex 的 deepCopy
解决了循环引用，cache 存储所有嵌套 obj 及其 copy 副本，以 cache 中是否有某个嵌套 obj 来判断是否循环引用，有则返回 引用的 copy

export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

不考虑正则、函数等奇怪类型的拷贝，满足大多数深度拷贝需求
定制需求如下：
1、循环引用
2、Symbol 类型拷贝

function deepClone(val,map = new WeakMap()){
    if(val === null || typeof val !=='object') return val;
    //循环引用
    if(map.has(val)) return map.get(val);
    let clone = Array.isArray(val) ? [] : {};
    map.set(val,clone);
    // 获取对象中所有的属性名（包含Symbol值）
    let keys = Reflect.ownKeys(val);（可换为：Object.keys(val).concat(Object.ownPropertySymbols(val))）
    let len = keys.length;
    while(len--){
        clone[keys[len]] = deepClone(val[keys[len]],map);
    }
    return clone;
}