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
        f3 = f1 + f2;
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

// ---------------------------------------------------
// 每次只能走一步或者两步，但是不能连续走两步
// 用户连续走两步，下次就只能走一步，假如走了一步，下次就能走1步或者两步

function climbStairs(n, status=0) {
    if (n < 0)
      return 0;
    if (n == 1)
      return 1;
    if (n == 2) { 		//当用户的阶梯只剩下2的时候，就需要判断最后一次走的状态（是一步还是两步）
      if (status == 1) {			//当状态是1的话，剩余的走法就还有两种（分别走两步和一次性走两步）
        return 2
      }
      if (status == 2) {			//当状态是2的话，剩余的走法就只有一种（走一步）
        return 1
      }
    }
    if (n > 2) {		//当阶梯大于2的时候
      if (status == 0 || status == 1 ) {		//状态为0的时候，就相当于是如图中的底层，分为两个方向相加f(n-1)和f(n-2)，但是需要将本次走的状态传递过去（需要使用递归，自己调用自己）
        return climbStairs(n - 1, 1) + climbStairs(n - 2, 2)	
      }
      // if (status == 1) {			//状态为1的时候，就相当于是如图中的底层的左边部分，又是分为两个方向相加f(n-1)和f(n-2)，同样需要将本次次走的状态传递过去
      //   return climbStairs(n - 1, 1) + climbStairs(n - 2, 2);
      // }
      if (status == 2) {		//状态为2的时候，就相当于是如图中的底层的右边部分，这里就只能有一种的走法了，所以递归过去的值就只剩下了f(n-1)
        return climbStairs(n - 1, 1);
      }
    }
  }
  console.log(climbStairs(7, 0))

// ---------------------------------------------------
// 每次只能走一步或者两步或者三步
double fun(int n) {
    if (n == 1)
        return 1;
    if (n == 2)
        return 2;
    if (n == 3)
        return 4;
    else
        return fun(n - 1) + fun(n - 2) + fun(n - 3);
}
int main() {
 
    double a[100];
 
    a[0] = 1;
    a[1] = 2;
    a[2] = 4;
 
    for (int x = 3; x < 100; x++) {
        a[x] = a[x - 1] + a[x - 2] + a[x - 3];
    }
 
    for (int i = 0; i < 100; i++) {
        printf("Level Amount--->%d\t", (i + 1));
        printf("Sol:1--->%e\t", fun(i + 1));
        printf("Sol:2--->%e\n", a[i]);
 
    }
 
    return 0;
}



// function test(n) {
//   if ( n <= 2) return n
//   return test(n-1) + test(n-2)
// }

// function test(n) {
//   let arr = new Array(n+1);
//   arr[0] = 1
//   arr[0] = 1
//   for (let i = 2; i < n;i++) {
//     arr[n] = arr[n-1] + arr[n-2]
//   }
//   return arr[n]
// }

// status: 0 1 2
function test(n,status = 0) {
  if (n < 0) return 0
  if (n === 1) return 1
  if (n === 2) {
    if (status === 2) {
      return 1
    }
    return 2
  }
  if (n > 2) {
    if (status === 0 || status === 1) {
      return test(n-1,1) + test(n-2,2)
    }
    if (status === 2) {
      return test(n-1,1)
    }
  }
}