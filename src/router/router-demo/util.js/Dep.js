
export class Dep {
	constructor() {
		this.dep = []
	}
	//  收集观察者 watcher
	add() {
		this.dep.push(Dep.target)
	}
	// 通知watcher消息
	notify() {
		this.dep.forEach( target => target.update())
	}
}

Dep.target = null

export function setTarget() {
	Dep.target = null
}

export function clearTarget() {
	Dep.target = null
}
