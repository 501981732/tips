// Array

// 1. 返回数组最大值
const arrayMax = arr => Math.max(...arr)
const arrayMax2 = arr => Math.max.apply(null, arr)
const arrayMax3 = arr => arr.reduce((n1, n2) => n1 > n2 ? n1 : n2)

// 2. 返回数组最小值
const arrayMin = arr => Math.min(...arr)
const arrayMin2 = arr => Math.min.apply(null, arr)
const arrayMin3 = arr => arr.reduce((n1, n2) => n1 < n2 ? n1 : n2)

//3. chunk 将数组块分成指定大小的数组
const chunk = (arr, size) => Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))


// 4. 从数组中移除falsey的值
const compact = arr => arr.filter(Boolean)

// 5. 数组中值出现的次数
const countOccurrences = (arr,value) => arr.reduce((a,v) => v ===value ? a + 1 : a + 0, 0 )