/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number[]}
 */

//  方法一 递归 方法二迭代
function inorderTraversal(root) {
    let res = [];
    let stack = [];
    while(root || stack.length) {
        while (root) {
            stack.push(root);
            root = root.left
        }
        root = stack.pop();
        res.push(root.val);
        root = root.right
    }
    return res;
}

function inorderTraversal(root) {
    let res = []
    function inorder(root) {
        if (!root) {
            return 
        }
        inorder(root.left)
        res.push(root.val)
        inorder(root.right)
    }
    inorder(root)
    return res
}