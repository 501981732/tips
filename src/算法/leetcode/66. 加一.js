/**
 * @param {number[]} digits
 * @return {number[]}
 */
// 1.遇到9的时候进位，然后循环
// 2.只要不是9，立刻return出去
// 3.位数改变的时候，肯定全部都是9，直接首位变成一，末尾加0
// （原理还是重新开辟一块内存用来添加最后一位的0）


function plusOne (digits) {
	let i = digits.length
	while(i--) {
		digits[i]++
		digits[i] = digits[i] % 10
		if (digits[i]!==0) return digits
	}
	digits[0] = 1
	digits.push(0)
	return digits
}


function plusOne(nums) {
	let i = nums.length;
	while(i--) {
		nums[i]++
		nums[i] = nums[i] % 10
		if (nums[i] !== 0) return nums 
	}
	nums[0] = 1
	nums.push(0)
	return nums
}
