/**
 * @param {number[]} digits
 * @return {number[]}
 */
// 1.遇到9的时候进位，然后循环
// 2.只要不是9，立刻return出去
// 3.位数改变的时候，肯定全部都是9，直接首位变成一，末尾加0
// （原理还是重新开辟一块内存用来添加最后一位的0）


var plusOne = function(digits) {
    const len = digits.length;
    for(let i = len - 1; i > -1;i--) {
        digits[i]++;
        digits[i] = digits[i] % 10;
        if(digits[i] !== 0) return digits;
    }
    digits[0] = 1;
    digits.push(0);
    return digits;
};
