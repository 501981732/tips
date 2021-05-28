/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    return x.toString().split('').reverse().join('') === x.toString()
};

var isPalindrome = function(x) {
    if (x < 0) return false
    let xToString = x.toString();
    let len = xToString.length;
    let reverse = ''
    while(len > 0) {
        reverse += xToString[len-1]
        len--
    }
    return reverse === xToString
}