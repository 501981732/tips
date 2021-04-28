// 求和

const arraySum = arr => arr.reduce((acc,val) => acc + val, 0)

// 求平均数
const arrayAverage = arr => arr.reduce((acc,val) => acc + val,0) /arr.length

// 返回两点之间的距离。

const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)

// 计算数字的阶乘。

const factorial = n => n < 0 ? (_ => { throw new Error('要大于0哦')}) : n <= 1 ? 1 : n * factorial(n-1)

// 返回指定范围内的随机数。

const randomNumberInRange = (min,max) => Math.random(max-min) + min 

//round 四舍五入到指定位数

const round = (n, decimals=0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

//返回数字数组的标准偏差。

const standardDeviation = (arr, usePopulation = false) => {
const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
return Math.sqrt(
arr.reduce((acc, val) => acc.concat(Math.pow(val - mean, 2)), [])
.reduce((acc, val) => acc + val, 0) / (arr.length - (usePopulation ? 0 : 1))
);
};
// standardDeviation([10,2,38,23,38,23,21]) -> 13.284434142114991 (sample) 
// 

