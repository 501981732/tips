/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 * 时间复杂度最坏0(n) 空间O(1)
 */
// 快慢指针
var hasCycle = function(head) {
    if (!head || !head.next) return false
    let fast = head.next.next
    let slow = head.next
    // 快慢指针不相遇  相遇的话就是环
    while (fast !== slow) {
        if (fast === null || fast.next === null) {
            return false
        }
        fast = fast.next.next
        slow = slow.next
    }
    return true
};

// // hash表
// var hasCycle = function(head) {
//     let map = new Map();
//     while (head) {
//         if (map.has(head)) return true
//         map.set(head,head)
//         // 下次循环
//         head = head.next
//     }
//     return false
// };

var hasCycle = function(head) {
    if (!head || !head.next) return false
    let fast = head.next.next
    let slow = head.next
    while (fast !== slow) {
        if (fast === null || fast.next === null) {
            return false
        }
        fast = fast.next.next
        slow = slow.next
    }
    return true
};
