
function postorderTraveral(root) {
    let res = []
    function postorder(root) {
        if (!root) {
            return
        }
        postorder(root.left)
        postorder(root.right)
        res.push(root.val)
    }
    postorder(root)
    return res
}

var postorderTraversal = function(root) {
    if(!root) return [];

    const stack = [root];
    const result = [];
    while(stack.length > 0) {
        const node = stack.pop();
        result.unshift(node.val);
        if(node.left) stack.push(node.left);
        if(node.right) stack.push(node.right);
    }
    
    return result
};