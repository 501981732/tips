// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

//1. 暴力破解 o(n3)
//2. 先排序o(nlogn) 再循环双指针o(n2) 注意各种边界情况
var threeSum = function(nums) {
    let ans = [];
    const len = nums.length;
    if (nums === null || nums.length < 3) return ans
    nums.sort((a, b) => a - b);
    for (let i = 0; i < len; i++) {
         // 边界
        if (nums[i] > 0) break;
        if (i > 0 && nums[i] === nums[i-1]) continue;

        let L = i + 1;
        let R = len - 1;
        while (L < R) {
            // 边界
            let sum = nums[i] + nums[L] + nums[R];
            if (sum === 0) {
                ans.push([nums[i] + nums[L] + nums[R]]);
                // 去重
                while (L < R && nums[L] === nums[L+1]) {
                    L++
                }
                while (L < R && nums[R] === nums[R-1]) {
                    R--
                }
                L++;
                R--;
            } else if (sum > 0) {
                R--;
            } else if (sum < 0) {
                L++
            }
        }
    }
};