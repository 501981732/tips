/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
 var minDepth = function(root) {
    if (root === null) return 0
    let leftDep = minDepth(root.left);
    let rightDep = minDepth(root.right);
    // 这时候肯定有一个为0，
    if (root.left === null || root.right === null) return leftDep + rightDep + 1

    return Math.min(leftDep,rightDep) +1
};

var minDepth = function(root) {
    if (root === null) return 0
    let leftDep = minDepth(root.left);
    let rightDep = minDepth(root.right);
    // 这时候肯定有一个为0，
    if (root.left === null || root.right === null) return leftDep + rightDep + 1

    return Math.min(leftDep,rightDep) + 1
};

