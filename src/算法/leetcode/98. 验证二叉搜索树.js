// 给定一个二叉树，判断其是否是一个有效的二叉搜索树。

// 假设一个二叉搜索树具有如下特征：

// 节点的左子树只包含小于当前节点的数。
// 节点的右子树只包含大于当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。

// 方法一 递归
var isValidBST = function (root) {
    const helper = function (root, min, max) {
        if (root === null) return true
        if (root.val <= min || root.val >= max) return false
        return helper(root.left, min, root.val) && helper(root.right, root.val, max);
    }
    return helper(root, -Infinity, Infinity);
};

const isValidBST = function (root) {
    const stack = [];
    let inorder = -Infinity;
    while (root !== null || stack.length) {
        while (root !== null) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        if (inorder >= root.val) return false
        inorder = root.val
        root = root.right
    }
    return true
}