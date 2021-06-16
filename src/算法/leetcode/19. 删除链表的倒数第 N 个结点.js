/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
// 方法1： 两次遍历
//  方法2 双指针
// 时间复杂度：O(n)
// 空间复杂度：O(1)
// 思路
// 设快慢两个指针
// 1、快指针先移n个节点
// 2、快、慢指针一起移动，使得两指针之间一直保持n个节点
// 2.1、当指针到达链表底了，将慢指针的指针指向它的下下一个指针
// 2.2、慢指针的下一个指针即为要删除的节点
// 边界
// 当要删除的节点是head时，需要设置哨兵节点，即增设一个位于当前头部节点的前一个值为null的哨兵节点
// 最后返回哨兵节点的next即为所求

var removeNthFromEnd = function(head, n) {
    let prevHead = {next:head}
    let fast = prevHead;slow = prevHead;
    while (n--) {
        fast = fast.next
    }
    //?
    //if (!fast) return fast.next
    while (fast && fast.next) {
        fast = fast.next
        slow = slow.next
    }
    slow.next = slow.next.next
    return prevHead.next
};


var removeNthFromEnd = function(head, n) {
    let dummy = new LinkNode();
    dummy.next = head
    let fast = dummy,
        slow = dummy
    while (n--) fast = fast.next
    while (fast && fast.next) {
        fast = fast.next;
        slow = slow.next
    }
    slow.next = slow.next.next;
    return dummy.next
};


