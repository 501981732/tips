// 定义一系列算法 把他们封装成策略类，算法被封装在策略类内部的方法内，在客户对context发请求的时候，context总能把请求委托给这些策略对象中的某一个
// 目的是将算法的使用和算法的实现分离，
// 至少有两部分组成，一个是策略类，封装具体算法，一个环境类context,接受算法的请求并委托给某一个策略类
// 替换各种if-else的判断 典型的是表单的验证
// 在js语言中，策略类往往被函数替代，这时策略类就是一种隐身模式


// 策略类
let strategies = {
    S: function(salary) {
        return salary * 4
    }
    A: function(salary) {
        return salary * 3
    }
    B: function(salary) {
        return salary * 2
    }
}

// 环境类 接受请求 委托给策略类
var calcuateBons = function(level,salary) {
    return strategies[level](salary)
}


// 表单验证规则

// 验证策略类
let strategies = {
    isNonEmpty: function(value,errorMsg) {
        if (value === '') {
            return errorMsg
        }
    },
    minLength: function(value,length,errorMsg) {
        if ( value.length < length) {
            return errorMsg
        }
    }
}

// 环境类

let Validator = function() {
    this.cache = []
}
Validator.prototype.add = function() {
// 添加规则
}
Validator.prototype.start = function() {
// 验证todo
}

// 使用

let validator = new Validator()
validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
validator.add(registerForm.password, 'minLength:6', '密码不能少于6位');
let errorMsg = validator.start();
if(errorMsg) {
    alert(errorMsg);
    return
}


