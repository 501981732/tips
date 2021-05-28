/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * hash map
 */
var intersect = function(nums1, nums2) {
    let map = {};
    let arr = [];
    for (let i = 0,len = nums1.length; i < len; i++) {
        let item = nums1[i]
        if (!map[item]) {
            map[item] = 1
        } else {
            map[item]++
        }
    }
    for (let i = 0,len = nums2.length; i < len; i++) {
        let item = nums2[i]
        if (map[item] > 0) {
            arr.push(item)
            map[item]--;
        }
    }
    return arr
};