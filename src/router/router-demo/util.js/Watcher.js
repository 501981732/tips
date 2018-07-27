import {setTarget, clearTarget} from './Dep.js'

export class Watcher {
  constructor (vm, expression, callback) {
    this.vm = vm
    this.callbacks = []
    this.expression = expression
    this.callbacks.push(callback)
    this.value = this.getVal()

  }
  getVal () {
    setTarget(this)
    let val = this.vm
    this.expression.split('.').forEach((key) => {
      val = val[key]
    })
    cleanTarget()
    return val
  }


  update () {
    this.callbacks.forEach((cb) => {
      cb()
    })
  }
}


  // 对 current.route 对象进行依赖收集，变化时通过 render 来更新
  // new Watcher(this.current, 'route', this.render.bind(this))