// 给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。

// 返回滑动窗口中的最大值。
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 * 双端队列解决 0(n)
 * 数组中的数要从大到小排序。如果当前遍历的数比队尾的值大，则需要弹出队尾值，直到队列重新满足从大到小的要求。
 * 刚开始遍历时，L 和 R 都为 0，有一个形成窗口的过程，此过程没有最大值，L 不动，R 向右移。
 * 当窗口大小形成时，L 和 R 一起向右移，每次移动时，判断队首的值的数组下标是否在 [L,R] 中，如果不在则需要弹出队首的值，
 * 当前窗口的最大值即为队首的数
 */
var maxSlidingWindow = function(nums, k) {
    const res = [];
    const q = [];// 从大到小排列的双端队列
  
    for (let i = 0; i < nums.length; i++) {
      //   假如当前元素比窗口元素大的时候 弹出
      while (q.length - 1 >= 0 && nums[i] > q[q.length - 1]) q.pop();
      q.push(nums[i]);
  
      // When i + 1 - k >= 0, the window is fully overlapping nums
      // 当窗口长度为k时 保存当前窗口中最大值
      const j = i + 1 - k; // 窗口的左边界
      // 此时形成窗口
      if (j >= 0) {
          //队首元素即为最大值
        res.push(q[0]);
        //如果队列的最大值即队首，刚好是要移出窗口的
        if (nums[j] === q[0]) q.shift(); // If the biggest element in q is about to exit window, remove it from q
      }
    }
    return res;
  };