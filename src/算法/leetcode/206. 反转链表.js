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
// 思路
// 关键是反转操作
// 当前节点 head，下一个节点 head.next
// head.next.next = head
// 此处将原 head.next 指向head，即是反转
// head.next = null
// 此处将原 head 指向head.next的指针断开
// 递归
// 由编译器函数调用执行栈原理可知
// 最先调用的函数会在递归过程中最后被执行，而最后调用的会最先执行
// 因此此题，最先返回最后两个节点开始反转操作
// 依次从后面两两节点开始反转

var reverseList = function(head) {
    // terminal
    if (!head || !head.next) return head;
    // drill down
    const reverseHead = reverseList(head.next);
    head.next.next = head //下一个next节点的next指向当前节点
    head.next = null // 当前节点的next指向null
    return reverseHead
};

// 迭代 将单链表中的每个节点的后继指针指向它的前驱节点即可
var reverseList = function(head) {
    let prev = null
    while (head) {
        let next = head.next //存储下一个节点
        head.next = prev //当前节点的next指向指向前驱
        prev = head //当前节点作为下一个节点的前驱
        head = next //迭代下一个
    }
    return prev
};

// ---------------------
var reverseList = function(head) {
    let prev = null // 前驱
    while (head) {
        let rest = head.next
        head.next = prev;
        prev = head
        head = rest
    }
    return prev;
}



//  1, 2, 3, 4
function reverseList (head) {
    if (!head) return
    let reverseHead = reverseList(head.next)
    head.next.next = head
    head.next = null
    return reverseHead
}

function reverseList (head) {
    let prev = null;
    while (head) {
        let rest = head.next
        head.next = prev
        prev = head
        head = rest
    }
    return prev
}