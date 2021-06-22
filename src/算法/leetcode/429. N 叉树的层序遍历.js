/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    let res = []

    function BFS(node, depth) {
        if (!node) return
        res[depth] = res[depth] || []
        res[depth].push(node.val)
        for (child of node.children) {
            BFS(child, depth + 1);
        }
    }
    BFS(root, 0)
    return res
};


/**
 * @param {Node} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    const res = [], queue = [root];
    let depth = 0, num = 0;
    // if (root) queue.push(root);
    while (queue.length) {
        res.push([]);
        num = queue.length;
        for (let i = 0; i < num; i++) {
            const curr = queue.shift();
            if (!curr) continue;
            res[depth].push(curr.val);
            queue.push(...curr.children);
        }
        depth++;
    }
    return res;
};


var levelOrder = function(root) {
    let res = []
    function DFS(root,depth) {
        if (!root) return
        res[depth] = res[depth] || []
        res[depth].push(root.val)
        for (let child of root.children) {
            DFS(child,depth+1)
        }
    }
    DFS(root,0)
    return res;
};


var levelOrder = function(root) {
    let res = [],
        depth = 0,
        queue = [root];
    while (queue.length) {
        res[depth] = res[depth] || []
        let num = queue.length
        for (let i = 0; i < num; i++) {
            const curr = queue.shift()
            if (curr) {
                res[depth].push(curr.val)
                queue.push(...curr.children)
            }
        }
        depth++
    }
}