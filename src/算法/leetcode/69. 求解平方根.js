var mySqrt = function(x) {
    return Math.sqrt(x)
};
//[1,2,3,...x]
//  >> 1 位运算代替 除2 取整 操作
var mySqrt = function(x) {
    if (x === 0 || x === 1) return x
    let left = 0, right = x;
    let mid;
    while (left <= right) {
        //let mid = left + (right - left) /2;
        //let mid = (left + right + 1) >>> 1;
        mid = (Math.floor(left + (right - left)/2))
        if (mid * mid === x) return mid
        if (mid * mid < x) {
            left = mid + 1
        } else {
            right = mid - 1 
        }
    }
    return right
};
// 牛顿迭代法
var mySqrt = function(x) {
    let r = x;
    while ( r * r > x) {
        r = (r + x /r) /2 | 0
    }
    return r
}