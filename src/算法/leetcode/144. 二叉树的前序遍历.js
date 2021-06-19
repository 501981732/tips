// 根-左-右
function preorderTraveral(root) {
    let res = []
    function preorder(root) {
        if (!root) {
            return
        }
        res.push(root.val)
        preorder(root.left)
        preorder(root.right)
    }
    preorder(root)
    return res
}

var preorderTraversal = function(root) {
    if (!root) return [];
    var result = [];
    var stack = [root];
    
    while(stack.length) {
      var node = stack.pop();
      result.push(node.val);
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }
    return result;
  };

//   var preorderTraversal = function(root) {
//     if (!root) return [];
//     var res = [];
//     var stack = [root];
//     while (stack.left) {
//         let node = stack.pop()
//         res.push(node.val)
//         if (node.right) stack.push(node.right)
//         if (node.left) stack.push(node.left)
//     }
//     return res
//   };

  
//   function preorderTraversal(root) {
//       let res = []
//       ~function preorder(root) {
//           if (!root) return 
//           res.push(root.val)
//           preorder(root.left)
//           preorder(root.right)
//       }(root)
//       return res
//   }