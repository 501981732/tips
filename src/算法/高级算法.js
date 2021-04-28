// 动态规划方案 通常会使用一个数组来建立一张表，用于存放被分解成众多子问题的解。当算法执行完 毕，最终的解将会在这个表中很明显的地方被找到
// 递归
function fib(n) {
    if (n < 2 && n >= 0) return n
    return fib(n - 1) + fib(n - 2)
}

// 动态规划方案 通常会使用一个数组来建立一张表，用于存放被分解成众多子问题的解。当算法执行完 毕，最终的解将会在这个表中很明显的地方被找到，接下来看看斐波那契数列的例子。

function Dynfib(n) {
    let arr = new Array(n + 1).fill(null);
    let arr[0] = 0;
    let arr[1] = 1;
    for (let i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[n]
}

// 动态规划 解决：寻找两个字符串的最长公共子串
// 
// 使用一个二维数组存储两个字符串相同 位置的字符比较结果。初始化时，该数组的每一个元素被设置为 0。每次在这两个数组的 相同位置发现了匹配，就将数组对应行和列的元素加 1，否则保持为 0
// 按照这种方式，一个变量会持续记录下找到了多少个匹配项。当算法执行完毕时，这个变 量会结合一个索引变量来获得最长公共子串

function lcs(word1, word2) {
    var max = 0;
    var index = 0;
    // 创建二维数组
    var lcsarr = new Array(word1.length + 1);
    for (var i = 0; i <= word1.length + 1; ++i) {
        lcsarr[i] = new Array(word2.length + 1);
        for (var j = 0; j <= word2.length + 1; ++j) {
            lcsarr[i][j] = 0;
        }
    }
    for (var i = 0; i <= word1.length; ++i) {
        for (var j = 0; j <= word2.length; ++j) {
            if (i == 0 || j == 0) {
                lcsarr[i][j] = 0;
            } else {
                if (word1[i - 1] == word2[j - 1]) {
                    lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
                } else {
                    lcsarr[i][j] = 0;
                }
            }
            if (max < lcsarr[i][j]) {
                max = lcsarr[i][j];
                index = i;
            }
        }
    }
    var str
    if (max == 0) {
        return "";
    } else {
        for (var i = index - max; i <= max; ++i) {
            str += word2[i];
        }
        return str;
    }
}

// 背包问题:递归解决方案

// 
// 背包问题:动态规划方案
// 

// function max(a, b) {
//     return (a > b) ? a : b;
// }

// function dKnapsack(capacity, size, value, n) {
//     var K = [];
//     for (var i = 0; i <= capacity + 1; i++) {
//         K[i] = [];
//     }
//     for (var i = 0; i <= n; i++) {
//         for (var w = 0; w <= capacity; w++) {
//             if (i == 0 || w == 0) {
//                 K[i][w] = 0;
//             } else if (size[i - 1] <= w) {
//                 K[i][w] = max(value[i - 1] + K[i - 1][w - size[i - 1]],
//                 }
//                 else {
//                     K[i][w] = K[i putstr(K[i][w] +
//                             print();
//                         }
//                         return K[n][capacity];
//                     }


//                     // 最长递增子序列
//                     // 
//                     function lis(n) {
//                         if (n.length === 0) return 0
//                         // 创建一个和参数相同大小的数组，并填充值为 1
//                         let array = new Array(n.length).fill(1)
//                         // 从索引 1 开始遍历，因为数组已经所有都填充为 1 了
//                         for (let i = 1; i < n.length; i++) {
//                             // 从索引 0 遍历到 i
//                             // 判断索引 i 上的值是否大于之前的值
//                             for (let j = 0; j < i; j++) {
//                                 if (n[i] > n[j]) {
//                                     array[i] = Math.max(array[i], 1 + array[j])
//                                 }
//                             }
//                         }
//                         let res = 1
//                         for (let i = 0; i < array.length; i++) {
//                             res = Math.max(res, array[i])
//                         }
//                         return res
//                     }
//                     // 第一个贪心算法案例:找零问题

//                     // 背包问题的贪心算法解决方案
//                     function ksack(values, weights, capacity) {
//                         var load = 0;
//                         var i = 0;
//                         var w = 0;
//                         while (load < capacity && i < 4) {
//                             if (weights[i] <= (capacity - load)) {
//                                 w += values[i];
//                                 load += weights[i];
//                             } else {
//                                 var r = (capacity - load) / weights[i];
//                                 w += r * values[i];
//                                 load += weights[i];
//                             }++i;
//                         }
//                         return w;
//                     }
//                     var items = ["A", "B", "C", "D"];
//                     var values = [50, 140, 60, 60];
//                     var weights = [5, 20, 10, 12];
//                     var capacity = 30;
//                     print(ksack(values, weights, capacity)); // 显示 220

// 贪心算法 找零问题：

function makeChange(origAmt, coins) {
    var remainAmt = 0;
    if (origAmt % .25 < origAmt) {
        coins[3] = parseInt(origAmt / .25);
        remainAmt = origAmt % .25;
        origAmt = remainAmt;
    }
    if (origAmt % .1 < origAmt) {
        coins[2] = parseInt(origAmt / .1)
        remainAmt = origAmt % .1;
        origAmt = remainAmt;
    }
    if (origAmt % .05 < origAmt) {
        coins[1] = parseInt(origAmt / .05)
        remainAmt = origAmt % .05;
        origAmt = remainAmt;
    }
    coins[0] = parseInt(origAmt / .01);
}

    //  背包问题： 贪心算法
    //  贪心算法总是会选择当下的最优解，而不去考虑这一 次的选择会不会对未来的选择造成影响。


// 最长公共前缀
var longestCommonPrefix = function(strs) {
    if (strs === null || strs.length === 0) return "";
    if(strs.length === 1) return strs[0]
    let min = 0, max = 0
    for(let i = 1; i < strs.length; i++) {
        if(strs[min] > strs[i]) min = i
        if(strs[max] < strs[i]) max = i
    }
    for(let j = 0; j < strs[min].length; j++) {
        if(strs[min].charAt(j) !== strs[max].charAt(j)) {
            return strs[min].substring(0, j)
        }
    }
    return strs[min]
};