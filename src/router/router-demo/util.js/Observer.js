class Observer {
    constructor(val) {
        this.run(val)
    }

    run(obj) {
        Object.keys(obj).forEach(key => {
        	// 递归便利 保证每个都被defineReactive
            if (typeof obj[key] === 'object') {
                this.run(key)
            }
            this.defineReactive(obj,key,obj[key])
        })
    }
 	defineReactive(obj,key,val) {
 		let dep = new Dep()
 		Object.defineProperty(obj,key,{
 			set: () => {
 				if (Dep.target) {
 					// 依赖收集
 					dep.add()
 				}
 				return val
 			}

 			get: (newVal) =>{
 				// 通知更新对应的视图
 				val = newVal
 				dep.notify()
 			}
 		})
 	}
}

export function observer(val) {
	return new Observer(val)
}
