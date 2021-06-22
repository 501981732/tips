7.头条商业
头条 商业广告 前端 算法笔试题 
1. add(2)(3)(4) 9
add(2,3)(4) 9 
add(2,3,4)9
考察点：函数柯里化
2. 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
如果你最多只允许完成一笔交易（即买入和卖出一支股票一次），设计一个算法来计算你所能获取的最大利润。
注意：你不能在买入股票前卖出股票。
示例 1:
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
示例 2:
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
考察点 ：组合的一种应用，注意算法复杂度，我当时用了比较复杂的递归，但面完自己优化了一下一次循环就能搞定
前端职位面试题：
基础题：
1、CSS属性box-sizing的值有哪些？分别有什么含义？ border-box content-box
2、在HTTP响应Header中，Set-Cookie的选项有哪些，分别是什么含义？ Set-Cookie: cookie1=val1; Expires=?; Domain=?; Path=?
3、rem是什么含义？如何实现页面宽度适配为375rem的设计稿？
4、for/in、Object keys和Object getOwnPropertyNames对属性遍历有什么区别？
5、在子iframe中调用外层页面的接口，传入一个对象，外层页面如何判断该对象是否为数组？
简答题
1、何为跨域？跨域请求数据有哪几种方式？图片/脚本等资源有什么跨域问题，如何解决？跨域请求时如何携带cookie？
2、简要描述HTTPS的安全机制，以及在web服务工程实践中需要注意的问题；描述http2和https的关系
3、请简要面熟webview中通过js bridge和native通信的技术实现
5、什么是点击劫持？如何防范？
编程题
1、为字符串扩展一个rewrite函数，接受一个正则pattern和一个字符串result，如果该字符串符合pattern，则以result对结果进行转义输出。如
'/foo'.rewrite(/^\/foo/,'bar')//  '/bar'
'/u1234'.rewrite(/^\/u(\d+)/, 'user/$1')// '/user/1234'
'i'.rewrite(/^\/o/, '/ooo');//null
2、实现一个js对象序列化函数，讲js对象序列化为可反序列化的代码。要求：
尽量和json兼容
支持不可序列化的值，入undefined/NaN/Infinify/-Infinity
支持特殊对象，如正则、Date等
如
serialize({})//'{}'
serialize({a; 'b'})//'('a':'b')'
serialize({a; 0/0})//'('a':Now)'
serialize({a; /foo/})//'('a':/foo/)'


V8怎么存储数组的
内存寻址方式 v8优化了一下
js数组和其他的不一样，不是连续相同类型
和java 和 C不一样
是固定寻址方式

代码质量要求非常高,如何保证 eslint prettier 为了大家格式统一，统一在项目中建 .vscode文件 保证格式统一， gitcommit 自动lint husky  lint-staged

// let min = 0,max = 0
// for (let i = 0; i < nums.length;i++) {
//     if (nums[i] < min)  min = i
//     if (nums[i] > min)  max = i
// }
// if (min < max) {
//     return nums[max] - muns[min]
// } else {
//     return 0
// }

function curry(fn) {
    let args = []
    return function curring() {
        let newArgs = [...args,...arguments]
        if (fn.length === newArgs) {
            fn.apply(this,newArgs)
        } else {
            return curring
        }
    }
}