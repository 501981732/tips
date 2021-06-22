// 版本1
let Event = {
    list = {},
    listen: function (key, fn) {
        if (this.list[key]) {
            this.list[key] = []
        }
        this.list[key].push(fn)
    },
    trigger: function () {
        let key = Array.prototype.shift.call(arguments);
        let fns = this.list[key]
        // 没有绑定对应的信息
        if (!fns || fns.length === 0) {
            return false
        }
        // for ( let i = 0,len = fns.length; i <len; i++) {
        for (let i = 0, fn; fn = fns[i++];) {
            // trigger带上的参数
            fn.apply(this, arguments)
        }

    },
    remove: function (key, fn) {
        let fns = this.list[key]
        if (!fns || fns.length === 0) {
            return false
        }
        if (!fn) {
            // 没有传入具体的回调 则清空所有
            fns && (fns.length = 0)
        } else {
            // 删除指定的回调
            for (let i = fns.length; i >= 0; i--) {
                if (fn === fns[i]) {
                    fns.splice(i, 1)
                }
            }
        }

    }
}
// 动态安装发布--订阅模式

let installEvent = function (obj) {
    for (let i in Event) {
        obj[i] = Event[i]
    }
}
let demo = {}
installEvent(demo)

// 上面的问题
// 1 给每个发布者对象都要添加listen trigger list 资源浪费
// 2 发布者订阅者还是有一些耦合性 必须知道发布者的名字
// 3 once

// 全局的发布--订阅模式

let Event = (function () {
    let list = {},
        listen,
        trigger,
        once,
        remove;
    listen = function (key, fn) {
        if (!list[key]) {
            list[key] = []
        }
        list[key].push(fn)
    };

    trigger = function () {
        let key = Array.prototype.shift.call(arguments),
            fns = list[key];
        if (!list[key] || list[key].length === 0) {
            return false
        }
        for (let i = 0,len = fns.length; i < len; i++) {
            fns[i].apply(this, arguments)
        }
    };
    // 参考jQuery once用法
    // $("p").one("click",function(){
    // alert('1')
    // });
    // 其实改的是listen的用法
    once = function (key, fn) {
        // 中间函数 调用完之后删除订阅
        let only = function (...args) {
            fn.apply(this, args);
            remove(key)
        }
        // only.origin = fn;
        listen(key, only)
    }

    remove = function (key, fn) {
        let fns = list[key];
        if (!fns) {
            return false
        }
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            for (let i = fns.length; i <= 0; i--) {
                if (fn === fns[i]) {
                    fns.splice(i, 1)
                }
            }
        }
    };
    return {
        listen,
        trigger,
        remove,
        once,
    }
})()

// useage
// Event.listen('hello',function(name) {
//     console.log('hello' + name)
// })
// Event.trigger('hello', 'wangmeng')
Event.once('click', (s) => alert(s));
Event.trigger('click', 1);
Event.trigger('click', 2);



// 继续完善 目前问题是
// 1. 只能先订阅 再发布,假如某些情况先trigger的话，会导致listen不到
// 我们需要简历一个存放离线事件的堆栈，当时间发布的时候，如果还没有订阅者订阅这个时间，就发布的动作抱在一个函数里面，放入离线堆栈中，当有人来订阅次时间的时候，再遍历离线堆栈，重新发布里面的事件。注意离线堆栈只能触发一次

let Event = (function () {
    let cache = {},
        offlineStack = [],
        listen,
        _listen,
        trigger,
        _trigger,
        // once,
        remove,
        _shift = Array.prototype.shift,
        each = function (data, fn) {
            let ret;
            for (let i = 0, l = data.length; i < l; i++) {
                let item = data[i]
                ret = fn.call(item, i, item)
            }
            return ret;
        }
    _trigger = function () {
        let key = _shift.call(arguments),
            fns = cache[key];
        if (!cache[key] || cache[key].length === 0) {
            return false
        }
        for (let i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
    _listen = function (key, fn) {
        if (!cache[key]) {
            cache[key] = []
        }
        cache[key].push(fn)
    };
    listen = function (key, fn) {
        _listen(key, fn);
        // 第一次listen的时候看离线事件里面有没有发布的。有的话重新触发一次发布
        if (offlineStack === null) {
            return
        }
        for (let i = 0, len = offlineStack.length; i < len; i++) {
            offlineStack[i].call(this, ...arguments)
        }
        offlineStack = null
    }
    once = function (key, fn) {
        // 中间函数 调用完之后删除订阅
        let only = function (...args) {
            fn.apply(this, args);
            remove(key)
        }
        // only.origin = fn;
        listen(key, only)

    }
    trigger = function () {
        let _self = this,
            args = arguments
        // 把发布的动作包在函数里面
        let fn = function () {
            return _trigger.apply(_self, args)
        }
        // 第一次放到离线事件中
        if (offlineStack) {
            return offlineStack.push(fn)
        }
        return fn()
    }
    remove = function (key, fn) {
        let fns = list[key];
        if (!fns) {
            return false
        }
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            for (let i = fns.length; i <= 0; i--) {
                if (fn === fns[i]) {
                    fns.splice(i, 1)
                }
            }
        }
    };

    return {
        listen,
        trigger,
        once,
        remove,
        offlineStack,
        cache
    }
})()

Event.trigger('click', 1)
Event.listen('click', function (s) {
    alert(s)
})

// 命名冲突

var Event = (function () {
    var global = this,
        Event, _default = 'default';

    Event = function () {
        var _listen,
            _trigger,
            _remove,
            _slice = Array.prototype.slice,
            _shift = Array.prototype.shift,
            _unshift = Array.prototype.unshift,
            namespaceCache = {},
            _create,
            find,
            // each方法绑定函数作用域为当前数组项
            each = function (ary, fn) {
                var ret;
                for (var i = 0, l = ary.length; i < l; i++) {
                    var n = ary[i];
                    ret = fn.call(n, i, n);
                }
                return ret;
            };

        _listen = function (key, fn, cache) {
            if (!cache[key]) {
                cache[key] = [];
            }
            cache[key].push(fn);
        };

        _remove = function (key, cache, fn) {
            if (cache[key]) {
                if (fn) {
                    for (var i = cache[key].length; i >= 0; i--) {
                        if (cache[key][i] === fn) {
                            cache[key].splice(i, 1);
                        }
                    }
                } else {
                    cache[key] = [];
                }
            }
        };

        _trigger = function () {
            var cache = _shift.call(arguments),
                key = _shift.call(arguments),
                args = arguments,
                _self = this,
                ret,
                stack = cache[key];

            if (!stack || !stack.length) {
                return;
            }

            return each(stack, function () {
                return this.apply(_self, args);
            });
        };

        _create = function (namespace) {
            var namespace = namespace || _default;
            var cache = {},
                offlineStack = [],
                ret = {
                    listen: function (key, fn, last) {
                        _listen(key, fn, cache);
                        if (offlineStack === null) {
                            return;
                        }
                        if (last === 'last') {
                            offlineStack.length && offlineStack.pop()();
                        } else {
                            each(offlineStack, function () {
                                this();
                                console.log(this)
                            });
                        }
                        offlineStack = null;
                    },
                    one: function (key, fn, last) {
                        _remove(key, cache);
                        this.listen(key, fn, last);
                    },
                    remove: function (key, fn) {
                        _remove(key, cache, fn);
                    },
                    cache,
                    offlineStack,
                    trigger: function () {
                        var fn, args, _self = this;

                        _unshift.call(arguments, cache);
                        args = arguments;

                        fn = function () {
                            return _trigger.apply(_self, args);
                        };

                        if (offlineStack) {
                            return offlineStack.push(fn);
                        }

                        return fn();
                    }
                };

            return namespace ?
                (namespaceCache[namespace] ? namespaceCache[namespace] : namespaceCache[namespace] = ret) :
                ret;
        };

        return {
            create: _create,
            one: function (key, fn, last) {
                var event = this.create();
                event.one(key, fn, last);
            },
            remove: function (key, fn) {
                var event = this.create();
                event.remove(key, fn);
            },
            listen: function (key, fn, last) {
                var event = this.create();
                event.listen(key, fn, last);
            },
            trigger: function () {
                var event = this.create();
                event.trigger.apply(this, arguments);
            }
        };
    }();

    return Event;
})();




// ---------------------------------------------
let Event = (function () {
    let list = {},
        listen,
        trigger,
        once,
        remove;
    listen = function (key, fn) {
        list[key] = list[key] || []
        list[key].push(fn)
    };

    trigger = function (key,...args) {
        // let key = Array.prototype.shift.call(arguments),
            fns = list[key];
        if (!list[key] || !list[key].length) {
            return false
        }
        for (let i = 0,len = fns.length; i < len; i++) {
            fns[i].apply(this, args)
        }
    };
    // 参考jQuery once用法
    // $("p").one("click",function(){
    // alert('1')
    // });
    // 其实改的是listen的用法
    once = function (key, fn) {
        // 中间函数 调用完之后删除订阅
        let only = function (...args) {
            fn.apply(this, args);
            remove(key)
        }
        // only.origin = fn;
        listen(key, only)
    }

    remove = function (key, fn) {
        let fns = list[key];
        if (!fns) {
            return false
        }
        if (!fn) {
            fns && (fns.length = 0)
        } else {
            for (let i = fns.length; i <= 0; i--) {
                if (fn === fns[i]) {
                    fns.splice(i, 1)
                }
            }
        }
    };
    return {
        listen,
        trigger,
        remove,
        once,
    }
})()

// -----------------------

Event.trigger('click',111)

var Event = (function(){
    let list = {},
    listen,
    trigger,
    once,
    remove;

    listen = function(name,fn) {
        list[name] = list[name] || []
        list[name].push(fn)
    }

    trigger = function(name,...args) {
        if (!list[name] || list[name].length === 0) return
        for (let i = 0;i < list[name].length;i++) {
            list[name].apply(this,args)
        }
    }

    remove = function(name,fn) {
        let fns = list[name]
        if (!fns || fns.length === 0) return
        if (!fn) fns.length = 0
        for (let i = 0, len = fns.length; i < len; i++) {
            if (fns[i] === fn) {
                fns.splice(i,1)
            }
        }
    }
    once = function(name,fn) {
        let only = function(...args) {
            fn.apply(this,args)
            remove(name)
        }
        listen(name,only)
    }
    return {
        listen,
        trigger,
        once,
        remove
    }

})();



// Event.listen('hello',function(name) {
//     console.log('hello' + name)
// })
// Event.trigger('hello', 'wangmeng')


const Event = (function(){
    let list = {},
        trigger,
        listen,
        remove,
        once;

        listen = function (key,fn) {
            list[key] = list[key] || []
            list[key].push(fn)
        }
        trigger = function (key,...args) {
            let fns = list[key]
            if (!fns || !fns.length) return
            for(let i = 0,len = fns.length; i < len; i++) {
                let fn = fns[i]
                fn.apply(this,args)
            }
        }
        remove = function (key,fn) {
            let fns = list[key]
            if (!fns || !fns.length) return
            if (!fn) fns.length = 0
            for (let i = 0,len = fns.length; i < len; i++) {
                if (fns[i] === fn) {
                    fns.splice(i,1)
                }
            }
        }
        once = function(key,fn) {
            let only = function(){
                fn.call(this,arguments)
                remove(key)
            }
            listen(key,only)
        }
        
        return {
            listen,
            trigger,
            remove,
            once
        }
})()

Event.listen('click',function(){

})
Event.trigger('click','x')
