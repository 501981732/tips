// Array

// 1. 返回数组最大值
const arrayMax = arr => Math.max(...arr)
const arrayMax2 = arr => Math.max.apply(null, arr)
const arrayMax3 = arr => arr.reduce((n1, n2) => n1 > n2 ? n1 : n2)
const arrayMax4 = arr =>  Reflect.apply(Math.max, Math, arr);

// 2. 返回数组最小值
const arrayMin = arr => Math.min(...arr)
const arrayMin2 = arr => Math.min.apply(null, arr)
const arrayMin3 = arr => arr.reduce((n1, n2) => n1 < n2 ? n1 : n2)

//3. chunk 将数组块分成指定大小的数组
const chunk = (arr, size) => Array.from({
	length: Math.ceil(arr.length / size)
}, (v, i) => arr.slice(i * size, i * size + size))


// 4. 从数组中移除falsey的值
const compact = arr => arr.filter(Boolean)

// 5. 数组中值出现的次数
const countOccurrences = (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)

// 6. 深拼合数组  [1,2,[3],[4,[5]],6] => [1,2,3,4,5,6]
const deepFlatten = arr => [].concat(...arr.map(item => Array.isArray(item) ? deepFlatten(item) : item))

// 拼合数组
const flatten = arr.reduce((a, v) => a.concat(v), [])

// 12. flattenDepth 将数组向上拼合到指定深度
const flattenDepth = (arr, depth = 1) => depth != 1 ? arr.reduce((a, v) => a.concat(Array.isArray(v) ? flattenDepth(v, depth - 1) : v), []) :
	arr.reduce((a, v) => a.concat(v), []);

// 7. difference 返回两个数组之间的差异 （a有b没有）
const defference = (a, b) => {
	const s = new Set(b);
	return a.filter(x => !s.has(x))
}

// 8.去重
// 弊端没法去重数组项中的function
// 因为JSON.stringify(函数)为undifined
const unique = arr => {
	let hash = {}
	arr.forEach(item => {
		hash[JSON.stringify(item)] = item
	})
	return Object.keys(hash).map(item => {
		return JSON.parse(item)
	})
}
const unique2 = arr => {
	var json = {};
	return arr.filter(function(item, index, arr) {
		let key = typeof item + item
		if (!json[key]) {
			json[key] = 1;
			return item
		}
	})
}
const unique3 = arr => Array.from(new Set(arr))
const unique4 = arr => [...(new Set(arr)]
const unique5 = arr => {
	const seen = new Map();
	return arr.filter((a) => !seen.has(a) && seen.set(a, 1))
}

// 9. 移除数组中的元素, 直到传递的函数返回true。返回数组中的其余元素。dropElements([1, 2, 3, 4], n => n >= 3) -> [3,4]
const dropElements = (arr, func) => {
	while (arr.length > 0 && !func(arr[0])) arr.shift();
	return arr
}

//  10. 返回数组中每个第n个元素
const everyNth = (arr, n) => arr.filter((item, index) => index % n == 0)

//  11. filterNonUnique 筛选出非唯一的值
const filterNonUnique = arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i))


// 12根据给定函数对数组元素进行分组。
const groupBy = (arr, func) =>
	arr.map(typeof func === 'function' ? func : val => val[func])
	.reduce((acc, val, i) => {
		acc[val] = (acc[val] || []).concat(arr[i]);
		return acc;
	}, {});
// groupBy([6.1, 4.2, 6.3], Math.floor) -> {4: [4.2], 6: [6.1, 6.3]}
// groupBy(['one', 'two', 'three'], 'length') -> {3: ['one', 'two'], 5: ['three']}

// 13 返回头部 
const head = arr => arr[0]

// 14 返回除最后一个数组之外所有值
const initial = arr = arr.slice(0, -1)

// 15 初始化包含指定范围内的数字的数组 
// initializeArrayWithRange(5) -> [0,1,2,3,4]
const initializeArrayWithRange = (end, start = 0) => Array.from({
	length: end - start
}).map((v, i) => i + start)

// 16初始化并填充具有指定值的数组。 
// initializeArrayWithValues(5, 2) -> [2,2,2,2,2]
const initializeArrayWithValues = (n, value) => Array(n).fill(value)

// 17 返回两个数组中存在的元素的列表  
// intersection([1,2,3], [4,3,2]) -> [2,3]
const intersection = (a, b) => {
	const s = new Set(b);
	return a.filter(v => s.has(v))
}
const intersection = (a, b) => {
	a.filter(v => b.includes(v))
}


// 18 返回数组中最后一个
// last([1,2,3]) -> 3
const last = arr => arr[arr.length - 1]

// 19 nthElement 返回数组的第几个元素
//  nthElement(['a','b','c'],1) -> 'b'
const nthElement = (arr, n) => (n > 0 ? arr.slice(n, n + 1) : arr.slice(n))[0]

// 20 从对象中选取对应于给定键的键值对  
// pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']) -> { 'a': 1, 'c': 3 }
const pick = (obj, arr) => arr.reduce((acc, curr) => (acc in obj && (acc[curr] = obj[curr]), acc), {})

// 21 筛选出数组中具有指定值之一的元素
const without = (arr, ...args) => arr.filter(v => !args.includes(v));
// without([2, 1, 2, 3], 1, 2) -> [3]

// 21 从数组中移除给定函数返回false的元素. 
// remove([1, 2, 3, 4], n => n % 2 == 0) -> [2, 4]
const remove = (arr, func) =>
	Array.isArray(arr) ? arr.filter(func).reduce((acc, val) => {
		arr.splice(arr.indexOf(val), 1);
		return acc.concat(val);
	}, []) :
	[];

// 21 返回随机数
const sample = arr => arr[Math.floor(Math.random() * arr.length)]

// 22 随机数组值的位置
const shuffle = arr => arr.sort(_ => Math.random() - 0.5)

// 23 返回在两个数组中的任意一个中存在的每个元素。union([1,2,3], [4,3,2]) -> [1,2,3,4
const union = (a, b) => Array.from(new Set(...a, ...b))

// 24 创建基于原始数组中的位置分组的元素数组。
//zip(['a', 'b'], [1, 2], [true, false]); -> [['a', 1, true], ['b', 2, false]]
//zip(['a'], [1, 2], [true, false]); -> [['a', 1, true], [undefined, 2, false]]

const zip = (...arrays) => {
	const maxLength = Math.max(...arrays.map(x => x.length));
	return Array.from({
		length: maxLength
	}).map((_, i) => {
		return Array.from({
			length: arrays.length
		}, (_, k) => arrays[k][i]);
	})
}

// 25 使用函数将数组的值映射到对象, 其中键值对由原始值作为键和映射值组成。
const mapObject = (arr, fn) =>
	(a => (a = [arr, arr.map(fn)], a[0].reduce((acc, val, ind) => (acc[val] = a[1][ind], acc), {})))();
	
/*
const squareIt = arr => mapObject(arr, a => a*a)
squareIt([1,2,3]) // { 1: 1, 2: 4, 3: 9 }


*/