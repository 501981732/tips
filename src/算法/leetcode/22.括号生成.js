// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

/**
 * @param {number} n
 * @return {string[]}
 */
// - 自顶向下编程
// 长度为 n 的序列就是在长度为 n-1 的序列前加一个 '(' 或 ')'
// - left括号随时可以加，只要不超标
// - right括号 左括号个数> 右括号

// 这一类问题是在一棵隐式的树上求解，可以用深度优先遍历，也可以用广度优先遍历。

// 假如先不验证有效性的解法
var generateParenthesis = function(n) {
    const res = []
    function DFS(i,max,str='') {
        // termnature
        if (i === max) {
            res.push(str)
            return
        }
        // drill down
        DFS(i+1,max,str+'(');
        DFS(i+1,max,str+')');
    }
    DFS(0,2*n,'');
    return res
};

var generateParenthesis = function(n) {
    const res = []
/**
 * @param left 左括号用了几个
 * @param right 右括号用了几个
 * @param n 括号对数
 * @param str 当前递归得到的结果
 * @param res 结果集
 */
    function DFS(left,right,n,str='',res) {
        // terminator
        if (left === n && right === n) {
            res.push(str)
            return
        }
        // 剪枝
        if (left < right) {
            return;
        }
        // drill down
        if (left < n) {
            DFS(left+1,right,n,str+'(',res);
        } 
        if (right < left) {
            DFS(left,right+1, n,str+')',res);
        }
    }
    DFS(0,0,n,'',res);
    return res
};

