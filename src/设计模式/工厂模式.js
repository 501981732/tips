// 工厂起到的作用就是隐藏了创建实例的复杂度，只需要提供一个接口，简单清晰。


class Man {
    constructor(name) {
        this.name = name
    }
    say() {
        console.log('this.name' + this.name)
    }
}

class Factory() {
    static create(name) {
        return new Man(name)
    }
}

Factory.create('wm').say()


// vue中创建异步组件
// 我们可以看到我们只需要调用 createComponent 传入参数就能创建一个组件实例，但是创建这个实例是很复杂的一个过程，工厂帮助我们隐藏了这个复杂的过程，只需要一句代码调用就能实现功能。
function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
    
    // 逻辑处理...
  
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )

  return vnode
}


// 1.简单工厂模式

function factory(role) {
  function User(opt) {
    this.name = opt.name
    this.viewPage = opt.viewPage
  }

  switch (role) {
    case 'admin':
      return new User({name: '',viewPage: ["首页","发现页","通讯录","应用数据"]}]})
    case "normal":
      return new user({name:"normal",viewPage:["首页","发现页","通讯录"]});
  }
}

// or
class User {
  constructor(name = '', viewPage = []) {
    // 模拟抽象类
    if(new.target === User) {
      throw new Error('抽象类不能实例化!');
    }
    this.name = name;
    this.viewPage = viewPage;
  }
}

class UserFactory extends User {
  constructor(name, viewPage) {
    super(name, viewPage)
  }
  create(role) {
    switch (role) {
      case 'superAdmin': 
        return new UserFactory( '超级管理员', ['首页', '通讯录', '发现页', '应用数据', '权限管理'] );
        break;
      case 'admin':
        return new UserFactory( '普通用户', ['首页', '通讯录', '发现页'] );
        break;
      case 'user':
        return new UserFactory( '普通用户', ['首页', '通讯录', '发现页'] );
        break;
      default:
        throw new Error('参数错误, 可选参数:superAdmin、admin、user')
    }
  }
}

let userFactory = new UserFactory();
let superAdmin = userFactory.create('superAdmin');
let admin = userFactory.create('admin');
let user = userFactory.create('user');