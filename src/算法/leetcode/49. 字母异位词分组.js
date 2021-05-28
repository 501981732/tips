// 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。

// 示例:

// 输入: ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出:
// [
//   ["ate","eat","tea"],
//   ["nat","tan"],
//   ["bat"]
// ]

// O(NKlogK)，其中 N 是 strs 的长度，而 K 是 strs 中字符串的最大长度
// 。当我们遍历每个字符串时，外部循环具有的复杂度为 O(N)

var groupAnagrams = function(strs) {
    let map = new Map()
    for (let i = 0,len = strs.length; i< len; i++) {
        let item = strs[i].split().sort().join();
        if (map.get(item)) {
            map.set(item, [...map.get(item), strs[i]])
        } else {
            map.set(item, [strs[i]])
        }
    }
    return map.values()
};