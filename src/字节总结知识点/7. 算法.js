// 1. 斐波那契数列
var fib = function(n) {
    if (n < 2) return n
    return fib(n-1) + fib(n-2)
};
var fob = function(n) {
    const arr = Array(n).fill(0)
    if (n < 2) return n
    arr[0] = 1
    arr[1] = 1
    for (let i = 2; i < n; i++) {
        arr[i] = arr[i-1] + arr[i-2]
    }
    return arr[n]
}
// 2. 合并二维有序数组成一维

// 2. 合并两个排序的链表
function mergeTwoLists(l1,l2) {
    if (l1 === null) return l2
    if (l2 === null) return l1
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next,l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1,l2.next)
        return l2
    }
}
function mergeTwoLists(l1,l2) {
    let dummy = new ListNode()
    let curr = dummy
    while (l1 && l2) {
        if (l1.val < l2.val) {
            curr.next = l1
            l1 = l1.next
        } else {
            curr.next = l2
            l2 = l2.next
        } 
        curr = curr.next
    }
    if (l1) curr.next = l1
    if (l2) curr.next = l2
    return dummy.next
}
// 3. 翻转链表
function revert(head) {
    if (!head || !head.next) return null
    const revertHead = revert(head.next)
    head.next.next = revertHead
    head.next = null
    return revertHead
}
function revert(head) {
    if (!head || !head.next) return null
    const prev = null
    while (head.next) {
        let next = head.next //存储下一个节点
        head.next = prev //当前节点的next指向指向前驱
        prev = head //当前节点作为下一个节点的前驱
        head = next //迭代下一个
    }
    return prev

}
// 4. 链表有环
// 或者hash
function hasSycle(head) {
    if (!head || head.next) return null
    let fast = head.next.next
    let slow = head.next
    while (fast !== slow) {
        if (fast === null || fast.next === null) return false
        fast = fast.next.next
        slow = slow.next
    }
    return true
}
// 5. 有效的括号
var checkValidString = function(s) {
    let left = [], star = [];
    for(let i=0;i<s.length;i++){
        if(s[i] == "(") left.push(i);
        if(s[i] == "*") star.push(i);
        if(s[i] == ")") {
            if(left.length == 0){
                if(star.length == 0) return false;
                star.pop();
            }else {
                left.pop();
            }
        }
    }
    if(left.length > star.length) return false;
    while(left.length && star.length){
        if(left.pop() > star.pop()) return false;
    }
    return true;
};

// 6. 返回数组中第K个最大数
// 快排
var findKthLargest = function(nums, k) {
    // 没考虑重复
    [...new Set(nums)].sort((a, b) => parseInt(b) - parseInt(a));
    return nums[k - 1];
};
// 7. 找出数组中和为sum的n个数
// 8. 具有给定数值的最小字符串

// 9. 二叉树最大深度
var maxDepth = function(root) {
    if (!root) return 0
    return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1
}
var mixDepth = function(root) {
    if (!root) return 0
    let leftDep = minDepth(root.left)
    let rightDep = minDepth(root.right)
    if (root.left === null || root.right === null) return leftDep + rightDep + 1
    return max.min(leftDep,rightDep) + 1
}
// 10. 二叉树层序遍历
var levelOrder = function(root) {
    let res = []

    function BFS(node, depth) {
        if (!node) return
        res[depth] = res[depth] || []
        res[depth].push(node.val)
        node.left && BFS(node.left, depth + 1);
        node.right && BFS(node.right, depth + 1);
    }
    BFS(root, 0)
    return res
};

var levelOrder = function(root) {
    let res = []

    function BFS(node, depth) {
        if (!node) return
        res[depth] = res[depth] || []
        res[depth].push(node.val)
        BFS(node.left, depth + 1);
        BFS(node.right, depth + 1);
        for (child of node.children) {
            BFS(child, depth + 1);
        }
    }
    BFS(root, 0)
    return res
};

// 11. 判断数独是否有效
// 12. 求解平方跟
var mySqrt = function(x) {
    if (x === 0 || x === 1) return x
    let left = 0,right = x;
    while( left <= right) {
        let mid = left + (right - left) / 2
        if (mid * mid === x) {
            return mid
        } else if (mid * mid < x) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return right
}
// 13. 实现一个字典树
// 14. 爬楼梯问题
function climbStairs(n) {
    if ( n < 2) return n
    return climbStairs(n-1) + climbStairs(n-2)
}
var climbStairs = (n) => {
  const dp = new Array(n + 1).fill(0) // 构建dp数组 长度为n+1
  dp[0] = 1                           // 爬0阶楼梯的方式只有1种
  dp[1] = 1                           // 爬1级楼梯的方式只有1种
  for (let i = 2; i < dp.length; i++){// 遍历 进行填表
    dp[i] = dp[i - 2] + dp[i - 1]     // 状态转移方程
  }
  return dp[n]                        // 返回 爬n阶楼梯的方式数
}
// 15. 最短距离
// 16. LRU缓存
// 17. 翻转二叉树
function revert(node) {
    if (!node) return null
    const left = revert(node.left)
    const right = revert(node.right)
    node.right = left
    node.left = right
    return node
}