// 发布-订阅模式也叫做观察者模式。通过一对一或者一对多的依赖关系
var createEventSys = function(){
    return {
        // 通过on接口监听事件eventName
        // 如果事件eventName被触发，则执行callback回调函数
        on: function (eventName, callback) {
            //如果Event对象没有handles属性，则给Event对象定义属性handles，初始值为{}
            //handles属性是用来存储事件和回调执行函数的（即存储订阅的事件和触发事件后执行的相应函数方法）
            if(!this.handles){
                this.handles={};
            }
            //如果handles中不存在事件eventName，则将事件存储在handles中，同时初始化该事件对应的回调逻辑函数集合
            if(!this.handles[eventName]){
                this.handles[eventName]=[];
            }
            //往handles中的eventName对应的回调逻辑函数集合push回调函数callback
            this.handles[eventName].push(callback);
        },
        // 触发事件 eventName
        emit: function (eventName) {
            //如果事件eventName有订阅者，则依次执行事件eventName的订阅者相应的回调方法
           if(this.handles[arguments[0]]){
               for(var i=0;i<this.handles[arguments[0]].length;i++){
                   this.handles[arguments[0]][i](arguments[1]);
               }
           }
        },
        //移除事件 eventName
        remove: function (eventName, fn) {
            //判断事件eventName是否存在fn这个观察者，如果有，则移除事件eventName的fn观察者
            if(this.handles[eventName]){
                for(var i=0; i<this.handles[eventName].length; i++){
                    if(this.handles[eventName][i] === fn){
                        this.handles[eventName].splice(i,1);
                        break;
                    }
                }
            }
        }
    };
}
var Event = createEventSys();
Event.on('test', function (result) {
    console.log(result);
});
Event.on('test', function () {
    console.log('test');
});
Event.emit('test', 'hello world'); // 输出 'hello world' 和 'test'



// 观察者模式
const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}