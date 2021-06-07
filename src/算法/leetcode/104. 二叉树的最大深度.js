// 给定一个二叉树，找出其最大深度。

// 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

// 说明: 叶子节点是指没有子节点的节点。
var maxDepth = function(root) {
    if (root === null) return 0
    // return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1
    // 最大深度 = 左子节点 和右子节点中的最大深度 + 1
    // Math.max(MathLeft, Math.Right) + 1
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};

var maxDepth = function(root) {
    if (root === null) return 0
    return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1
};