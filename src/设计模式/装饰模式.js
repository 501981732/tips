// 装饰模式不需要改变已有的接口，作用是给对象添加功能。

function readonly(target, key, descriptor) {
    descriptor.writeable = false
    return descriptor
}

class Test() {
    @readonly
    name = 'wm'
}
let t = new Test()

t.name = '1'



// 应用

import { connect } from 'react-redux'
class MyComponent extends React.Component {
    // ...
}
export default connect(mapStateToProps)(MyComponent)