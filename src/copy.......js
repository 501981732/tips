if (!Function.prototype.call) {
    Function.prototype.call = function (context = window) {
        if (typeof this !== 'function') {
            throw new Error('Error')
        }
        context.fn = this
        let args = [...arguments].slice(1)
        let result = context.fn(args)
        delete context.fn
        return result
    }
}
if (!Function.prototype.apply) {
    Function.prototype.apply = function(context = window) {
        if (typeof this !== 'function' {
            throw Error('error')
        }
        
    }
}