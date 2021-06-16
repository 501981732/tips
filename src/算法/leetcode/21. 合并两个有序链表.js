// 两个链表头部值较小的一个节点与剩下元素的 merge 操作结果合并
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var mergeTwoLists = function(l1, l2) {
    if (l1 === null) return l2
    if (l2 === null) return l1
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next,l2)
        return l1
    } else {
        l2.next = mergeTwoLists(l1,l2.next)
        return l2
    }
};


var mergeTwoLists = function(l1,l2) {
    let dummy = new ListNode();
    let curr = dummy
    while(l1 && l2) {
        if (l1.val < l2) {
            curr.next = l1;
            l1 = l1.next
        } else {
            curr.next = l2;
            l2 = l2.next
        }
        curr = curr.next
    }
    l1 && (curr.next = l1);
    l2 && (curr.next = l2);
    return dummy.next
}
