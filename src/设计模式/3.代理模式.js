// 保护代理 小明通过B给A送花， B帮A拦截长得丑的
// 虚拟代理 小明通过B给A送花，（花贵不能直接给） A接受的话B帮买话
// 缓存代理 缓存算法等


const proxyFactory = function(fn) {
    let cache = {}
    return function() {
        let args = Array.prototype.join.call(arguments,',');
        if (cache[args]) {
            return cache[args]
        }
        cache[args] = fn.apply(this,arguments);
        return cache[args]
    }
}

const calc = function() {
    let ret =  1;
    for (let i in arguments) {
        ret= ret * arguments[i]
    }
    return  ret
}

let result = proxyFactory(calc)(1,2,3,4,5)