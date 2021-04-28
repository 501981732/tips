### 1. dll原理

为什么给 Web 项目构建接入动态链接库的思想后，会大大提升构建速度呢？ 原因在于包含大量复用模块的动态链接库只需要编译一次，在之后的构建过程中被动态链接库包含的模块将不会在重新编译，而是直接使用动态链接库中的代码。

### 2. treeshaking作用原理

Tree Shaking 可以用来剔除 JavaScript 中用不上的死代码。
它依赖静态的 ES6 模块化语法，例如通过 import 和 export 导入导出
因为 ES6 模块化语法是静态的,因此整个依赖树可以被静态地推导出解析语法树。这让 Webpack 可以简单的分析出哪些 export 的被 import 过了。

<!-- 之前的 -->
 Webpack 只是指出了哪些函数用上了哪些没用上，要剔除用不上的代码还得经过 UglifyJS 去处理一遍

当你的项目使用了大量第三方库时，你会发现 Tree Shaking 似乎不生效了，原因是大部分 Npm 中的代码都是采用的 CommonJS 语法， 这导致 Tree Shaking 无法正常工作而降级处理。 但幸运的时有些库考虑到了这点，这些库在发布到 Npm 上时会同时提供两份代码，一份采用 CommonJS 模块化语法，一份采用 ES6 模块化语法。
```
module.exports = {
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    mainFields: ['jsnext:main', 'browser', 'main']
  },
};
```

side effects是指那些当import的时候会执行一些动作，但是不一定会有任何export。比如ployfill,ployfills不对外暴露方法给主程序使用

tree shaking 不能自动的识别哪些代码属于side effects，因此手动指定这些代码显得非常重要，如果不指定可能会出现一些意想不到的问题。
如果所有代码都不包含副作用，我们就可以简单地将该属性标记为false，来告知 webpack，它可以安全地删除未用到的export导出

### 3. webpack构建产物
自执行函数，参数是个数组，里面是对应的模块

浏览器不能像 Node.js 那样快速地去本地加载一个个模块文件，而必须通过网络请求去加载还未得到的文件。 如果模块数量很多，加载时间会很长，因此把所有模块都存放在了数组中，执行一次网络加载

__webpack_require__ // 去数组中加载一个模块，moduleId 为要加载模块在数组中的 index 作用和 Node.js 中 require 语句相似


```
 <!-- modules 即为存放所有模块的数组，数组中的每一个元素都是一个函数 -->
(function(modules) {

  // 模拟 require 语句 当某个模块第二次被访问时会直接去内存中读取被缓存的返回值。
  function __webpack_require__() {
  }

  // 执行存放所有模块数组中的第0个模块
  __webpack_require__(0);

})([/*存放所有模块的数组*/])
```

#### 分割代码时的输出

```
0.bundle.js
// 加载在本文件(0.bundle.js)中包含的模块
(window.webpackJsonp = window.webpackJsonp || []).push([
    <!-- 在其它文件中存放着的模块的 ID -->
    [1],
    <!-- 本文件所包含的模块 -->
    [, function (n, o, c) {
        "use strict";

        function u() {
            console.log("I get called from print.js!")
        }

        function t() {
            console.log("funca")
        }

        function f() {
            console.log("funcb")
        }
        c.r(o), c.d(o, "default", function () {
            return u
        }), c.d(o, "funcA", function () {
            return t
        }), c.d(o, "funB", function () {
            return f
        }), c.d(o, "a", function () {
            return e
        });
        const e = "a"
    }]
]);
```


bundle.js
```
<!-- 用于从异步加载的文件中安装模块。 -->
  window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {

  /**
   * 用于加载被分割出去的，需要异步加载的 Chunk 对应的文件
   * @param chunkId 需要异步加载的 Chunk 对应的 ID
   * @returns {Promise}
   */
  __webpack_require__.e = function requireEnsure(chunkId) {
    // 从上面定义的 installedChunks 中获取 chunkId 对应的 Chunk 的加载状态
    var installedChunkData = installedChunks[chunkId];
    // 如果加载状态为0表示该 Chunk 已经加载成功了，直接返回 resolve Promise
    if (installedChunkData === 0) {
      return new Promise(function (resolve) {
        resolve();
      });
    }
```

```

