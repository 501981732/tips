// 给定一个 N 叉树，返回其节点值的 后序遍历 。

// N 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。

/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[]}
 */
var postorder = function(root) {
    const res = [];
    function order(root) {
        if (!root) return
        for (let i = 0,len = root.children.length; i < len; i++) {
            order(root.children[i])
        }
        res.push(root.val)
    }
    order(root)
    return res
};
