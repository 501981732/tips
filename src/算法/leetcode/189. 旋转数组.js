/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function(nums, k) {
    while (k--) {
        const last = nums.pop()
        nums.unshift(last)
    }
    return nums
};
var rotate = function(nums, k) {
    let s = nums.splice(nums.length-k)
    nums.unshift(...s)
};
var rotate = function(nums, k) {
    let s = nums.splice(nums.length-k)
    nums.splice(0,0,...s)
};
