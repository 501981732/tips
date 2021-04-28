/**
 * @param {string} s
 * @return {number}
 * 滑动串口
 */
var lengthOfLongestSubstring = function(s) {
    let longest = 0;
    let map = new Map();
    let l = 0
    for (let r = 0,len = s.length; r < len; r++) {
        while (map.has(s[r])) {
            map.delete(s[l])
            l ++;
        }
        map.set(s[r])
        longest = Math.max(longest, r - l +1)
    }
    return longest
};