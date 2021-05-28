/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 1. loop 
2. 开新数组 2次循环
3. 双指针 O(n2)
4. 交换 0(n)
 */

var moveZeroes = function(nums) {
    let j = 0;// 0出现的个数
    for (i = 0; i< nums.length -j; i++) {
        if (nums[i] === 0) {
            nums.splice(i,1);
            nums.push(0)
            j++
            i--
        }
    }
    return nums
};

// var moveZeroes = function(nums) {
//     if (nums == null || nums.length == 0) return;        

//     let insertPos = 0;
//     for (i = 0; i< nums.length; i++) {
//         if (nums[i] != 0) nums[insertPos++] = nums[i];
//     }        

//     while (insertPos < nums.length) {
//         nums[insertPos++] = 0;
//     }
// }

// 交换 
var moveZeroes = function (nums) {
    let j = 0 //不为0 的位置
    for (let i = 0, len = nums.length; i < len; i++) {
        if (nums[i] !== 0) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            j++
        }
    }
        return nums

}