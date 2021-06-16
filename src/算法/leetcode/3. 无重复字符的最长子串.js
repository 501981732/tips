/**
 * @param {string} s
 * @return {number}
 * 滑动串口
 */
var lengthOfLongestSubstring = function(s) {
    let longest = 0;
    let set = new set();
    let l = 0
    for (let r = 0,len = s.length; r < len; r++) {
        while (set.has(s[r])) {
            set.delete(s[l])
            l++;
        }
        set.add(s[r])
        longest = Math.max(longest, r - l +1)
        // longest = Math.max(longest, set.size)
    }
    return longest
};