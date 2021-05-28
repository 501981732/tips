const Event = (function() {
    let list = {},
        listen,
        trigger,
        once,
        remove;
    listen = function(key,fn) {
        if (!list[key]) {
            list[key] = []
        }
        list[key].push(fn)
    }
    trigger = function(key,...args) {
        let event = list[key]
        if (!event || event.length === 0) {
            return
        }
        for (let i = 0,len = event.length; i<len;i++) {
            typeof(event[i]) === 'function' && event[i].apply(this,args)
        }
    }
    remove = function(key,fn) {
        let event = list[key]
        if (!event || event.length === 0) {
            return
        }
        if (!fn) {
            event.length = 0
        }
        for (let i = 0,len < event.length, i < len;i++) {
            if (event[i] === fn) {
                event.splice(i,1)
            }
        }
    }
    // $('xx').once('click',function() {

    // })
    // 中间函数 ，改函数 调用完之后删除
    once = function(key,fn) {
        let only = function() {
            fn.call(this,arguments);
            remove(key,only)
        }
        listen(key,only)
    }
    return {
        listen,
        trigger,
        once,
        remove,
    }
})()



class User {
    constructor(name = '', viewPage = []) {
        if (new.target === User) {
            throw new Error('抽象类不可实例化')
        }
        this.name = name
        this.page = page
    }
}

class UserFactory extends User {
    constructor(name = '', viewPage = []) {
        super(name,viewPage)
    }
    create(role) {
        switch (role) {
            case 'admin':
                return new UserFactory('admin',['1'])
            case 'super':
                return new UserFactory('super',['1','2'])
        }
    }
}


let UserFactory = new UserFactory()
let admin = UserFactory.create('admin')
let superAdmin = UserFactory.create('super')



// 单例模式

function singleton(fn) {
    let result;
    return function() {
        return result || (result = fn.call(this,arguments))
    }
}



// 策略模式  策略类 环境类
const stra = {
    S: function(base) {
        return base *4
    },
    A: function(base) {
        return base *3
    },
}

// 接受请求 委托给策略类
function context(level,base) {
    return stra[level](base)
}



