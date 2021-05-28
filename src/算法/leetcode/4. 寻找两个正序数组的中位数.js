// 给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的中位数。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    // 先合并两个有序数组
    let i = 0, j = 0;
    let newArr = []
    if (nums1.length === 0) {
        newArr = nums2
    } else if ( nums2.length === 0) {
        newArr = nums1
    } else {
        while (nums1[i] !== undefined || nums2[j] !== undefined) {
            if ((nums1[i] !==undefined && nums2[j] === undefined) || (nums1[i] < nums2[j])) {
                newArr.push(nums1[i])
                i++
            } else {
                newArr.push(nums2[j])
                j++
            }
        }
    }
    if (newArr.length % 2 !== 0) {
        return newArr[Math.floor(newArr.length/2)]
    } else {
        return (newArr[newArr.length/2] + newArr[newArr.length/2-1]) /2
    }
};