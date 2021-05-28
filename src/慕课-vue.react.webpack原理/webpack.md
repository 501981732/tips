
## webpack

	成熟的工具 重点在于配置和应用 原理并不高优
### 原理？

### 总览

- 基本配置
- 高级配置
- 优化打包效率
- 优化产出代码
- 构建流程概述
- babel
	- polyfill
	- runtime


#### 1. 前端代码为何构建打包
- 代码方面 
	- 体积更小（Tree-Shaking 压缩 合并） 加载更快
	- 编辑高级语言或语法 TS ES6+ 模块化 scss
	- 兼容性 错误提示 polyfill postcss eslint
- 研发流程方面
	- 统一高效的开发环境
	- 统一的构建流程 和产出标准
	- 集成公司构建规范（提测，上线）
#### 2. module chunk bundle分别什么意思，有何区别
- module 各个源码文件
- chunk 多模块合并而成 entry import() splitChunk
- bundle 最终产出的文件
#### 3. hash chunkhash contenthash等区别
- 文件粒度不同
- hash 针对项目，hash是项目级别的，他的缺点是假如我只改了其中一个文件，但是所有文件的文件名里面的hash都是一样的
- chunkhash 针对entry的每一个入口文件
- contentHash: 针对每个文件计算的hash
#### 4. babel和plugin区别
- loader模块转换器 less -> css
- plugin 扩展插件 htmlWebpackPlugin

#### 5. webpack 如何实现懒加载
- import()
#### 6. webpack常见性能优化

#### 7. babel-runtime和babel-polyfill的区别
- babel-polyfill 会污染全局
- babel-runtime 不会污染，传出lib需要babel-runtime
#### 8. 产出lib
```js
output:{
	filename:'lodash.js',
	path: distPath,
	library:'loadsh'//全局变量名
}
```
#### 为啥proxy不可以Polyfill
- class可以通过function模拟
- promise可以通过callback来模拟
- 但是proxy无法用Object.defineProperty模拟，无法用任何一个东西可以模拟

## webpack基本配置
- 拆分配置和merge
	- path.js 
	- webpack.common.js
	- webpack.dev.js
	- webpack.prod.js
	- webpack-merge  
- 启动本地服务
	- webpack-dev-server
	- proxy代理
- 处理ES6 babel
	- @babel/preset-env
- 处理样式
	- 开发环境style-loader (插入到html中)
	- 生成环境 MiniCssExtractPlugin
	- css-loader 
	- sass-loader/less-loader
	- postcss-loader postcss-preset-env postcss-px-to-viewport cssnano等
	- style-resource-loader
	- loader处理顺序从后往前
- 处理图片
	- url-loader 
		- 小于5k base64
		- outputPath
		- publicPath(第一次配npm上没看到依赖性，后来看源码发现  有file-loader)
- 模块化


## webpack 高级配置
- 关于开启多进程
	- 项目较大，打包满，开启多进程能提速
	- 项目较小，打包快，开启多进程会降低速度（进程开销）
	- 按需使用
- 多入口 用`glob `遍历

```
    entry: {
        index: path.join(srcPath, 'index.js'),
        other: path.join(srcPath, 'other.js')
    },    output: {
        filename: '[name].[contentHash:8].js', // name 即多入口时 entry 的 key
        path: distPath,
        // publicPath: 'http://cdn.abc.com'  
    },
    plugins: [        
    	new HtmlWebpackPlugin({
            template: path.join(srcPath, 'index.html'),
            filename: 'index.html',
            // chunks 表示该页面要引用哪些 chunk （即上面的 index 和 other），默认全部引用
            chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
        }),
        // 多入口 - 生成 other.html
        new HtmlWebpackPlugin({
            template: path.join(srcPath, 'other.html'),
            filename: 'other.html',
            chunks: ['index', 'vendor', 'common']  // 要考虑代码分割
        })
    ]
 
```

- css抽离压缩
	- 从js中抽离
	- dev `style-loader`  `css-loader` `postcss-loader`

	- prod  `mini-css-extract-plugin` `css-loader` `less-loader` `postcss-loader`
	- 在plugins 抽离css
	```
		extract-text-webpack-plugin
		new MiniCssExtractPlugin({
			filename: 'css/main.[contentHash].css'
		})
	```
	- 压缩css 或者使用 cssnano
	
	```
      optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
	  }	
	```
- 抽离公共代码和第三方代码
	- chunk生成的代码块个数：
		- splitChunks 2个 
		- 入口的2个
		- 动态加载的js

	```
    optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],

        // 分割代码块
        splitChunks: {
            chunks: 'all',
            /**
             * initial 入口chunk，对于异步导入的文件不处理
                async 异步chunk，只对异步导入的文件处理
                all 全部chunk
             */

            // 缓存分组
            cacheGroups: {
                // 第三方模块
                vendor: {
                    name: 'vendor', // chunk 名称
                    priority: 1, // 权限更高，优先抽离，重要！！！
                    test: /node_modules/,
                    minSize: 0,  // 大小限制
                    minChunks: 1  // 最少复用过几次
                },

                // 公共的模块
                common: {
                    name: 'common', // chunk 名称
                    priority: 0, // 优先级
                    minSize: 0,  // 公共模块的大小限制
                    minChunks: 2  // 公共模块最少复用过几次
                }
            }
        }
    }
	```
- 懒加载 异步加载

	```
	import('./somedata.js').then(res => console.log(res))
	```
- 处理JSX
	- @babel/preset-react
	
	```
	//.babelrc
	{
		preset: ['@babel/preset-react']
	}
	
	//webpack
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                include: srcPath,
                exclude: /node_modules/
            }
        ]
    },
	```
- 处理Vue
	- vue-loader
	```
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: ['vue-loader'],
                include: srcPath,
            }
        ]
    },
	```

- module chunk bundle区别
	- `module` 各个源文件， webpack中一切皆模块
	- `chunk` 多模块合并而成 如 `entry` `import` `splitChunk`
	- `bundle` 最终的输出文件 一个chunk对应一个bundle
	
### webpack 性能优化
- **优化打包构建速度 - 开发体验和效率**
- **优化产出代码 - 产品性能**

- 优化babel-loader
	- 开启缓存(代码没有改的不会再次编译)
	- 明确范围/排除范围
	```
    {
        test: /\.js$/,
        loader: ['babel-loader?cacheDirectory'],
        include: srcPath,
        exclude: /node_modules/
    }
	```
- IgnorePlugin 避免那些
	```
	  // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	```
- noParse 不去解析属性值代表的库的依赖 
	
	- 我们对类似jq这类依赖库，一般会认为不会引用其他的包(特殊除外,自行判断)。所以，对于这类不引用其他的包的库，我们在打包的时候就没有必要去解析
- happyPack 多进程打包
	- js单线程，开启多进程打包
	- 提高构建速度（特别是多核CPU）
	
	```
	
	  {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ['happypack/loader?id=babel'],
        include: srcPath,
        // exclude: /node_modules/
    },
    //plugins
   // happyPack 开启多进程打包
    new HappyPack({
        // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
        id: 'babel',
        // 如何处理 .js 文件，用法和 Loader 配置中一样
        loaders: ['babel-loader?cacheDirectory']
    }),
	```
- ParallelUglifyPlugin 多进程压缩
	- webpack内置Uglify工具压缩js
	- js单线程，开启多进程压缩更快
	
	```
	const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// 使用 ParallelUglifyPlugin 并行压缩输出的 JS 代码
new ParallelUglifyPlugin({
    // 传递给 UglifyJS 的参数
    // （还是使用 UglifyJS 压缩，只不过帮助开启了多进程）
    uglifyJS: {
        output: {
            beautify: false, // 最紧凑的输出
            comments: false, // 删除所有的注释
        },
        compress: {
            // 删除所有的 `console` 语句，可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true,
        }
    }
})
	```
- 自动刷新
	- 代码保存之后自动刷新 整个网页全部刷新 速度较满
	- 状态丢失
	
	```
	<!--一般不需要配，开启devServer就会带上-->
	watch: true,//开启监听，默认false,
	<!--监听配置-->
	watchOptions: {
		igonred: /node_modules/,
		<!--监听到变化后等300再执行，防止更新过快导致编译频率太高-->
		aggregateTimeout: 300, //默认300ms
		<!--判断文件是否变化时通过不断去询问系统指定文件有没有变化实现的-->
		pool: 1000 ,//默认没1000ms询问一次
	}
	```
	
- HRM热更新 HotModuleReplacementPlugin
	- 新代码生效 网页不刷新，状态不丢失
	- 原理是当一个源码发生变化时，只重新编译发生变化的模块，再用新输出的模块替换掉浏览器中对应的老模块
	- 模块热替换的原理和自动刷新原理类似，都需要往要开发的网页中注入一个代理客户端用于连接 DevServer 和网页， 不同在于模块热替换独特的模块替换机制。
	
	```
      entry:{
		    // 为每个入口都注入代理客户端
		    main:['webpack-dev-server/client?http://localhost:8080/', 'webpack/hot/dev-server','./src/main.js'],
		  },
		  plugins: [
		    // 该插件的作用就是实现模块热替换，实际上当启动时带上 `--hot` 参数，会注入该插件，生成 .hot-update.json 文件。
		    new HotModuleReplacementPlugin(),
		  ],
		  devServer:{
		    // 告诉 DevServer 要开启模块热替换模式
		    hot: true,      
		  } 
	```
	- 但是 --hot等开启之后只css会触发，js还是会刷新
	- css会更新时因为 style-loader 会注入用于接受 CSS 的代码。
	
	```
	// 只有当开启了模块热替换时 module.hot 才存在
	if (module.hot) {
	  // accept 函数的第一个参数指出当前文件接受哪些子模块的替换，这里表示只接受 ./App 这个子模块
	  // 第2个参数用于在新的子模块加载完毕后需要执行的逻辑
	  module.hot.accept(['./App'], () => {
	    // 新的 AppComponent 加载成功后重新执行下组建渲染逻辑
	    render(<App/>, window.document.getElementById('app'));
	  });
	}
	```
- DllPlugin 动态链接库
	- vue同一版本只构建一次，不用每次都重新构建 
	- DllPlugin 打包出dll文件
	- webpack.dll.js
	- DllReferencePlugin使用dll文件
	- dll vs external
		- DLL 符合前端模块化的要求 
		- DLL一般不需要发生变更 
		- external 不太符合前端的模块化思想，所需要的外部库需要在浏览器全局环境下可访问
		- external 外部库升级的话，如果兼容之前的API，不需要项目重新构建 
		
#### 总结

##### 优化打包构建速度 - 开发体验和效率
- 优化babel-loader 
- IgnorePlugin
- noParse
- happyPack
- ParallelUglifyPlugin
- 自动刷新(dev)
- 热更新（dev）
- DllPlugin（dev?） 生产环境下可以使用splitChunks

##### 开发体验和效率
- 小图 base64
- bundle加contentHash
- 懒加载
- 提取公共代码
- 使用cdn加速
- ingorePlugin 
- Prepack
- tree-shaking 
	- 必须用ES6 Module才可以
		- commonjs不行
		- **es6Module commonjs区别**
			- es6静态引用，编译时引用，而webpack打包的时候没有执行，只是编译
			- commonjs动态引用  执行时引用
	- 为了把采用 ES6 模块化的代码交给 Webpack，需要配置 Babel 让其保留 ES6 模块化语句
	
	```
     "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3,
                "modules": false//关闭 Babel 的模块转换功能，保留原本的 ES6 模块化语法
            }
        ]
    ],
	```
	- 一般库会有两份代码
	```
	{
	  "main": "lib/index.js", // 指明采用 CommonJS 模块化的代码入口
	  "jsnext:main": "es/index.js" // 指明采用 ES6 模块化的代码入口
	}
	```
	- webpack文件查找规则
	```
  resolve: {
    // 针对 Npm 中的第三方模块优先采用 jsnext:main 中指向的 ES6 模块化语法的文件
    	mainFields: ['jsnext:main', 'browser', 'main']
  	},
  	plugins: [
  	new webpack.optimize.ModuleConcatenationPlugin();
]
	```
- 使用production
	- 自动压缩代码
	- vue react等自动删掉调试代码（如开发环境的warning）
	- 自动开启  tree-shaking 
- Scope Hosting作用域提升
	- 代码体积更小
	- 创建函数作用域更少
	- 代码可读性更好

### babel

### 环境搭建 & 基本搭建
- 环境搭建
- .babelrc
- 预设presets plugins
- devDependencies @babel/cli @babel/core @babel/preset-env @babel/plugin-transform-runtime
- dependencies @babel/polyfill @babel/runtime

### babel-polyfill

- 什么是polyfill 补丁
- core-js 和 regenerator的集合
- babel7.4之后弃用 babel-polyfill 推荐
```
import "core-js/stable";
import "regenerator-runtime/runtime";
```

- **按需引入**

```
 <!--corejs@3-->
     "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
```
- **babel-polyfill问题**
	- 污染全局变量
	- 做自己独立的web系统没问题，但是如果做第三方lib会有问题
	- 解决方案 babel-runtime
### babel-runtime
	- dev @babel/plugin-transform-runtime
	- @babel/runtime
	```
	"plugins": [
	    [
	        "@babel/plugin-transform-runtime",
	        {
	            "absoluteRuntime": false,
	            "corejs": 3,
	            "helpers": true,
	            "regenerator": true,
	            "useESModules": false
	        }
	    ]
	]
	```
	- 使用前 require('corejs/xx/_promise')
	- 时候用 var _promise = _interopRequireDefault('@babel/runtime-corejs3/core-js-stable/promise.js')

## 总结
- 拆分配置 merge
- 启动本地服务
- 处理es6
- 处理样式
- 处理图片
- 多入口
- 抽离css
- 抽离公共代码 common vendor
- 懒加载
- 处理JSX
- 处理vue
- 优化babel-loader
- IgnorePlugin
- noParse
- happyPack
- parallelUglifyPlugin
- prepack 优化代码在运行时的效率  编译代码时提前将计算结果放到编译后的代码中，而不是在代码运行时才去求值 编译时执行原本在运行时的计算过程，并通过重写JavaScript代码来提高其执行效率
- purecss
- 自动刷新
- 热更新
- dll
- base64图片
- bundle 加hash
- 懒加载
- 提取公共代码
- cdn加速
- ignorePlugin 忽略某些内容
- 使用production
- scope Hosting
- tree-shaking
- babel 
- babel-polyfill
- babel-runtime