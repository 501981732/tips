// 求和

const arraySum = arr => arr.reduce((acc,val) => acc + val, 0)

// 求平均数
const arrayAverage = arr => arr.reduce((acc,val) => acc + val,0) /arr.length

// 返回两点之间的距离。

const distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)

// 计算数字的阶乘。

const factorial = n => n < 0 ? (_ => { throw new Error('要大于0哦')}) : n <= 1 ? 1 : n * factorial(n-1)