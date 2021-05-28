function Foo(){
    Foo.a = function(){
        console.log(1)
    }
    this.a = function(){
        console.log(2)
    }
}
Foo.prototype.a = function(){
    console.log(3)
}

Foo.a = function(){
    console.log(4)
}

Foo.a();
let obj = new Foo();
obj.a();
Foo.a();


(function(){var x = y = 1})()
console.log(x)
console.log(y)


//快手
let a = 1;
function foo(a){
  return a = a+1
}

var b = foo(a)

function foo(a) {
  return a = a + 2
}
const c = foo(a)
console.log(a,b,c)







// 作用域链 outer是代码结构确定的
function foo() {
    console.log(length)
}

function bar() {
    var length = 'hello'
    foo()
}


// ---------

let str = '1234567890'
function formatNumber(str) {
    return Number(str).toLocaleString('en-US')
}

function formatNumber(str) {
    let arr = str.split('').reverse(); //[0,9,8,7]
    let newval = arr.reduce((prev,curr,index) => {
        if (index % 3) {
            return prev + curr
        } else {
            return prev + ',' + curr
        }
        // if (index % 3) {
        //     return curr + prev
        // } else {
        //     return curr + ',' + prev
        // }
    })
    return newval
}

// --------


function foo(n,o) {
    console.log(o)
    return {
        foo: function(m,n) {
            // 闭包了外面的n
            return foo(m,n)
        }
    }
}

let a = foo(0); a.foo(1);a.foo(2);a.foo(3); undefined 0 0 0 
let b = foo(0).foo(1).foo(2).foo(3); undefined 0 1 2
let c = foo(0).foo(1); c.foo(2);c.foo(3) undefined 0 1 1

// 快手
// 1
Function.prototype.a = () => alert(1);
Object.prototype.b = () => alert(2);
function A() {}
const a = new A();
a.a();
a.b();
A.a();
A.b();
// 2
let a;
const b = new Promise((resolve, reject) => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
}).then(() => {
  console.log('promise3');
}).then(() => {
  console.log('promise4');
});

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log('after1');
  await a
  resolve(true);
  console.log('after2');
});

console.log('end');

// 3

// 一个链表，删除链表的倒数第N个节点
function removeNode(head, n) {

}

function LinkNode (value){
this.value = value;
this.next = null; // new LinkNode
}

// head: 5->4->3->2->1
// n: 2
// 得到
// 5->4->3->1



