/**
 * @param {number[]} nums
 * @return {number}
 */
// 取巧
var majorityElement = function(nums) {
    return nums.sort()[Math.floor(nums.length/2)]
};

// hashmap
var majorityElement = function(nums) {
    let map = {};
    let harflen = nums.length/2;
    for (let i = 0, len = nums.length; i < len; i++) {
        let item = nums[i]
        if (!map[item]) {
            map[item] = 1
        } else {
            map[item]++
        }
        if (map[item] > harflen) {
            return item
        }
    }   
};


