/**
 * cleanObj
 * 移除从 JSON 对象指定的属性之外的任何特性。
 * @param {object} 操作的对象
 * @param {array} 要保留的数组
 * @param {string} 深入的 key
 */

const cleanObj = (obj,keyToKeep=[],childIndicator) => {
	Object.keys(obj).forEach(key =>{
		if (key === childIndicator) {
			cleanObj(obj[key],keyToKeep,childIndicator)
		} else if (!keyToKeep.includes(key)) {
			delete obj[key];
		}
	})
}
/**
 * objectFromPairs 从给定的键值对创建对象
 * @param {array} 
 */

const objectFromPairs = arr => arr.reduce((a, v) => (a[v[0]] = v[1], a), {});

// objectFromPairs([['a',1],['b',2]]) -> {a: 1, b: 2}


/**
 * objectToPairs 从对象创建键值对数组的数组。
 */
const objectToPairs = obj => Object.keys(obj).map(i => [i,obj[i]])

 // objectToPairs({a: 1, b: 2}) -> [['a',1],['b',2]])


 /**
  * shallowClone 浅复制
  */

 const shallowClone = obj => Object.assign({},obj)


 /**
  * truthCheckCollection
  * 检查每个传递的对象是否具有指定的属性, 以及是否返回 truthy 值
  */
 const truthCheckCollection = (collection,pre) => (collection.every(obj=>pbj[pre]))
 // truthCheckCollection([{"user": "Tinky-Winky", "sex": "male"}, {"user": "Dipsy", "sex": "male"}], "sex") -> true














