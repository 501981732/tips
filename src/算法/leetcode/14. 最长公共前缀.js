/**
 * @param {string[]} strs
 * @return {string}
 */
// 1 暴力破解
var longestCommonPrefix = function(strs) {
    let res = ''
    if (strs === undefined || strs.length === 0) { return ''; }
    for (let j = 0, len = strs[0].length; j < len; j++) { //第j位
        for (let i= 0, len = strs.length; i < len; i++) { //第i个
           if (strs[0][j] !== strs[i][j]) return res 
        }
        res += strs[0][j]
    }
};

var longestCommonPrefix = function(strs) {
    if (strs === null || strs.length === 0) return ''
    if (strs.length === 1) return strs[0]
    let min = 0,max = 0;
    for (let i = 0,len = strs.length; i < len ; i++) {
        if (strs[min] > strs[i]) min = i
        if (strs[max] < strs[i]) max = i
    }
    let maxStr = strs[max]
    let minStr = strs[min]
    for (let i = 0, len = minStr.length; i < len; i++) {
        if (minStr[i] !== maxStr[i]) return minStr.substring(0,i)
    }
    return minStr
};
