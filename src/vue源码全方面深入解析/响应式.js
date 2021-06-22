// 触发更新视图
function updateView() {
    console.log('视图更新')
}

// 重新定义数组原型
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {
    arrProto[methodName] = function () {
        // updateView()
        // notify()// 触发视图更新
        oldArrayProperty[methodName].call(this, ...arguments)
        // Array.prototype.push.call(this, ...arguments)
    }
})

function definedReactive(obj,key,val) {
    let dep = new Dep()
    observe(obj)
    Object.defineProperty(obj,key,{
        get(){
                 if (Dep.target) {
                     // 依赖收集
                     dep.add()
                 }
            // 依赖收集
            return val
        },
        set(newValue) {
            if (newValue !==value) {
                // 深度监听
                observer(newValue)
                // 设置新值
                // 注意，value 一直在闭包中，此处设置完之后，再 get 时也是会获取最新的值
                value = newValue
                 dep.notify()

                // notify() 通知 更新视图
                // updateView()
            }
        }
    })
}
function observer(target) {
    if (typeof target !== 'object') {
        return target
    }
    if (Array.isArray(target)) {
        target.__proto__ = arrProto
    }
    for (let key in target) {
        defineReactive(target,key,target[key])
    }
}



// patch(dom,vnode) --> patch(vnode,newVnode) 第一个参数如果是elem创建一个空的vnode关联到elem(emptyNodeAt),
// 对比sameVnode 如果不同，直接删掉重建 removeVnodes
// 如果相同 sameVnode=true(key sel), 则进行patchVnode
//  如果 vnode.children有值， 1 旧有新没有 removeVnodes 2 旧没有新有，addVnodes 3 旧有新有 updateChildren
//  updateChildren ，四个指针
//  开始和开始 结束和结束 开始和结束 结束和开始。
//  都不匹配 则用key对应旧的所有其他对比
//  不同 则插入
//  key相同 则比较tag等其他。tag相等 则patchVnode 。tag不同则插入insertBefore