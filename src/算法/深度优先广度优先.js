// 深度优先



let root = {
  id: 1,
  name: 'wangmeng',
  children: [{
    id: 2,
    name: 'w',
    children: [{
      id: 4,
      name: 'k'
    }]
  }, {
    id: 3,
    name: 'm'
  }]
}

function DFS(root, id) {
  if (root !== null) {
    console.log(root.id)
    if (root.id == id) {
      alert(root.name)
      return root.name
    }
    let children = root.children
    if (children && !!children.length) {
      for (let i = 0, len = children.length; i < len; i++) {
        DFS(children[i], id)
      }
    }
  }
}

// export function DFS < T extends {
//   children: T[]
// } > (node: T, res: any[] = []): T[] {
//   if (node !== null) {
//     const {
//       children
//     } = node;
//     if (children) {
//       res.push(children);
//       for (let i = 0, len = children.length; i < len; i++) {
//         const item = children[i];
//         DFS(item, res);
//       }
//     }
//   }
//   return res;
// }

function DFS(node,res) {
  if (node) {
    const {children} = node
    res.push(children)
    if (children && children.length) {
      for (let i = 0, len = children.length; i < len; i++) {
        DFS(children[i],res)
      }
    }
  }
  return res
}
function DFS(node) {
  let res = [];
  let stack = [node]
    while (stack.length > 0) {
      let item = stack.pop()
      res.push(item);
      let children = item.children
      if (children) {
        for (let i = 0, len = children.length; i < len; i++) {
          stack.push(children[i])
        }
    }
    }
  return res
}


let BFS = (node) => {
  let res = []
  let queue = [node]
    while (queue.length > 0) {
      let item = queue.shift()
      res.push(item)
      let children = item.children
      // 队列，先进先出
      if (children) {
        for (let i = 0; i < children.length; i++) {
          queue.push(children[i])
        }
      }
    }
  return res
}


// ---------------------------
function DFS(node,map={}) {
  if (node.nodeType === 1) {
      var tagName = node.tagName
      map[tagName] =  map[tagName] ?  map[tagName] + 1 : 1
      let children = node.children;
      for (let i = 0,len = children.length; i < len; i++) {
          DFS(children[i],map)
      }
  }
  return map
}
DFS(document.body);
