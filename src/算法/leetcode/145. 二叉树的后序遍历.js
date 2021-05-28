
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
