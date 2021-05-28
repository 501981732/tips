/**
 * @param {number[]} nums
 * @return {number}
 * 双指针
 */
// 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。
// '122234'
// 假如相同 对比指针向后移 left不变
// 假如不同 left向前一位 把当前right的值放到后移之后的left上，j后移一位
var removeDuplicates = function(nums) {
    let left = 0, right = 0,len = nums.length;
    while(right < len) {
        if (nums[left] === nums[right]) {
            right++
        } else {
            left++
            nums[left] = nums[right]
            right++
        }
    }
    return left +1
};