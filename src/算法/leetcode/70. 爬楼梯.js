// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 注意：给定 n 是一个正整数。

// 1. 找最简单情况 第一阶1种 第二阶2种第三阶3种
// 2. 找最近重复单元 到第3阶的情况只有2种：到第2阶的所有情况一步走过去+到第一阶的所有情况2步走过去 f(n) + f(n-1) + f(n-2)
/**
 * 方法1：递归 复杂度 0(2N方) 找结束条件 ->找等价关系
 * 方法2：缓存 0(N)
 * 方法3：迭代只保存最后三个变量
 */

// 1. 递归
// var climbStairs = function(n) {

//     // 结束条件
//     // f(2) = f(1) + f(0)
//     //经过分析，f(2)=2也是一个临界条件。
//     if(n <= 2) return n;
    
//     // 等价关系 f(n) = f(n-1) + f(n-2)
//     return climbStairs(n-1) + climbStairs(n-2)
// };

// 2 缓存 
// var climbStairs = (n) => {
//   const dp = new Array(n + 1).fill(0) // 构建dp数组 长度为n+1
//   dp[0] = 1                           // 爬0阶楼梯的方式只有1种
//   dp[1] = 1                           // 爬1级楼梯的方式只有1种
//   for (let i = 2; i < dp.length; i++){// 遍历 进行填表
//     dp[i] = dp[i - 2] + dp[i - 1]     // 状态转移方程
//   }
//   return dp[n]                        // 返回 爬n阶楼梯的方式数
// }

// 优化 压缩空间 保留三个变量
var climbStairs = (n) => {
    let f1 = 1,f2 = 2,f3 = 3;
    if (n <=2) return n
    for (let i = 3; i < n; i++) {
        f3 = f1 + f3;
        f1 = f2;
        f2 = f3
    }
    return f3
}

// 尾递归
// function F(n,ac1 = 1,ac2 = 1){
// if( n <=1 ){ return ac2}
// return F(n - 1,ac2,ac1 +ac2)
// }
