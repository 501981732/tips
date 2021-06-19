// 1. 排序 对比
// 2. hashmap

var isAnagram = function(s, t) {
    // 方法1 排序
    if (s.length !== t.length) return false
    return s.split('').sort().join('') === t.split('').sort().join();

    };
var isAnagram = function(s, t) {
    let map = {}
    if (s.length !== t.length) return false
    for (let i = 0,len = s.length; i < len; i++) {
        map[s[i]] = map[s[i]] ? map[s[i]] + 1 : 1
        map[t[i]] = map[t[i]] ? map[s[i]] - 1 : -1
    }
    return Object.keys(map).every(item => item === 0)
}