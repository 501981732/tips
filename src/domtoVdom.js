
class Vnode {
    constructor(tag, attrs, value, type) {
        this.tag = tag && tag.toLowerCase(); // 标签名
        this.attrs = attrs // 属性
        this.value = value //文本
        this.type = type // 元素类型
        this.children = [] // 子节点
    }
    appendChild(vnode) {
        this.children.push(vnode)
    }
}
// 遍历一棵n叉树，使用递归就很容易实现，只是在递归的时候，
// 判断一个node是文本节点还是元素结点时，可以用node.nodeType == 1和node.nodeType == 3

// 加入node.nodeType == 1和node.nodeType == 3这两个判断，然后遇到文本情况跳出递归栈就可以了
function getVirtualDom(node) {
    let nodeType = node.nodeType
    let vnode = null
    if (nodeType === 1) {
        let nodeName = node.nodeName;
        let attrs = node.attributes;
        let _propObj = {}
        for(let i=0;i<attrs.length;i++){
            _attrObj[ attrs[ i ].nodeName ] = attrs[ i ].nodeValue;
        }
        vnode = new Vnode(nodeName, _propObj, undefined, nodeType);
        let childNodes = node.childNodes
        for (let i = 0, len = childNodes.length; i < len; i++) {
            vnode.appendChild(getVirtualDom(childNodes[i]))
        }

    } else if (nodeType === 3) {
        let text = node.nodeValue
        vnode = new Vnode(undefined,undefined,text,nodeType)
    }
    return vnode
}


// 将vNode转化为真正的DOM
// 递归+栈 数据类型

let vnode = {
    tag: '',
    attrs:'',
    type: '',
    children:[]
}

function parseNode(vnode) {
    let type = vnode.type;
    let node = null
    // 文本节点
    if (type === 3) {
        return document.createTextNode(vnode.value)
    } else if (type === 1) {
        node = document.createElement(vnode.tag);
        Object.keys(attrs).forEach(key => {
            let attrName = key;//属性名
            let attrValue = data[key];//属性值
            node.setAttrbute(attrName,attrValue)
        })
        let children = vnode.children;
        children.forEach(item => {
            node.appendChild(parseNode(item))
        })
    }
    return node
}