/**
 * @param {number[]} height
 * @return {number}
 */
// * 方法1暴力破解 O(n2)
var maxArea = function(height) {
    let max = 0
    for (let i = 0; i < height.length -1; i++) {
        for (let j = i + 1; j < height.length; j++) {
            max = Math.max(max,getArea(j - i,Math.min(height[i],height[j])))
        }
    }
    function getArea(x,y) {
        return x * y
    }
    return max
};
// * 方法2 双指针
var maxArea = function(height) {
    let i = 0,
    j = height.length - 1,
    max = 0;
    while ( i < j ) {
        let minHeight = height[i] > height[j] ? height[j--] : height[i++]
        max = Math.max(max, minHeight * (j - i + 1) )
    }
    return max;
};
