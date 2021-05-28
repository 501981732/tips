/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = {}
    for(let i = 0,len = nums.length; i<len; i++) {
        let item = nums[i]
        if (map[target - item] === undefined) {
            map[item] = i
        } else {
            return [i, map[target-item]]
        }
    }

};

var twoSum = function(nums, target) {
    let map = new Map();
    let i = 0;
    while (i<nums.length) {
        let dis = target - nums[i];
        if (map.get(dis) !== undefined) {
            return [i,map.get(dis)]
        }
        map.set(nums[i],i)
        i++
    }
}