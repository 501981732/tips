// 深度优先



let root = {
    id: 1,
    name: 'wangmeng',
    children: [{
        id:2,
        name: 'w',
        children: [{
            id:4,
            name: 'k'
        }]
    },{
        id:3,
        name: 'm'
    }]
}

function DFS(root,id) {
    if (root !==null) {
        console.log(root.id)
        if (root.id == id) {
            alert(root.name)
            return root.name
        }
        let children = root.children
        if (children && !!children.length) {
        for (let i=0,len=children.length;i<len;i++) {
            DFS(children[i],id)
        }
        }
    }
}




let BFS = (node) => {
  let nodes = []
  let queue = []
  if (node) {
    queue.push(node)
    while (queue.length) {
      let item = queue.shift()
      nodes.push(item)
      let children = item.children
        // 队列，先进先出
        // nodes = [] queue = [parent]
        // nodes = [parent] queue = [child1,child2,child3]
        // nodes = [parent, child1] queue = [child2,child3,child1-1,child1-2]
        // nodes = [parent,child1,child2]
       if (children) {
      for (let i = 0; i < children.length; i++) {
        queue.push(children[i])
      }
       }
    }
  }
  return nodes
}

let BFS = function(node) {
  let res = []
  let queue = [node]
  while(queue.length) {
    let item = queue.shift()
    res.push(item)
    let children = item.children
    if (children && children.length) {
      for (let i = 0,len = children.length; i < len; i++) {
          queue.push(children[i])
      }
    }
  }
}
