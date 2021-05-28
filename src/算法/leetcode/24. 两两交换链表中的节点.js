/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
 function ListNode(val) {
         this.val = val;
         this.next = null;
    }
    var swapPairs = function(head) {
        // terminal
        if (!head || !head.next) return head
        const rest = head.next.next // 剩下的
        const newHead = head.next // 新的head
        newHead.next = head //新的head指向head
        head.next = swapPairs(rest) // 之前的head指向后续翻转的剩下的链表
        return newHead
    };
