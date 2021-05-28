// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。


/**
 * @param {number[]} nums
 * @return {number}
 * 
 */

var maxSubArray = function(nums) {
    let currentMax = 0,max = -Infinity;
    for (let i = 0,len = nums.length; i < len; i++) {
        currentMax = Math.max(currentMax + nums[i], nums[i]);
        max = Math.max(currentMax,max)
    }
    return max
}