## 游戏类素材比较多的应用，打开页面的时候我们想与预先加载所有的资源后再初始化。

promise.all([]).then()

## 使用Promise实现每隔1秒输出1,2,3 (如何让异步操作顺序执行)

Promise配合着reduce不停的在promise后面叠加.then
https://segmentfault.com/a/1190000016832285?utm_source=tag-newest
```
const arr = [1,2,3]

arr.reduce((total,curr) => {
  return total.then(()=> {
    return new Promise(reslove=> {
        setTimeout(() => reslove(console.log(x)), 1000)
        })
    })
},Promise.reslove())

<!-- urls.reduce(async(total,curr)=>{ -->
    <!-- let s = await total() -->
    <!-- return axios.get(curr,s) -->
    <!-- },Promise.reslove()) -->

function runPromiseByQueue(myPromises) {
  return myPromises.reduce(
    (previousPromise, nextPromise) => previousPromise.then(() => nextPromise()),
    Promise.resolve()
  );
}

const createPromise = (time, id) => () =>
  new Promise(solve =>
    setTimeout(() => {
      console.log("promise", id);
      solve();
    }, time)
  );

runPromiseByQueue([
  createPromise(3000, 1),
  createPromise(2000, 2),
  createPromise(1000, 3)
]).then(res => conosle.log(ss))

```



## 按顺序完成异步操作
```
async function fetchInOrder(urls) {
    for (let url of urls) {
        let response = await fetch(url);
    }
}
```

## 并发执行 再按顺序输出

```

async function fetchInOrder(urls) {
    let textPromises = urls.map(async url => {
        let response = await fetch(url);
        return response.json()
        })
    for (let textPromise in textPromises) {
        console.log(await textPromise)
    }
}
```


## 红绿黄等交替

```
// 红3s亮一次 绿2s 黄1s
function red() {
  console.log('red')
}

function yellow() {
  console.log('yellow')
}

function blue() {
  console.log('blue')
}

function sleep(ms) {
  return new Promise((resolve)=>setTimeout(resolve,ms));
}

async function step () {
  await sleep(3000)
  red()
  await sleep(2000)
  blue()
  await sleep(1000)
  yellow()
  await step()
}
<!-- ----------------------------- -->
const light = function (timer, cb) {
  return new Promise(resolve => {
    setTimeout(() => {
      cb()
      resolve()
    }, timer)
  })
}

const step = function () {
  Promise.resolve().then(() => {
    return light(3000, red)
  }).then(() => {
    return light(2000, green)
  }).then(() => {
    return light(1000, yellow)
  }).then(() => {
    return step()
  })
}

```


## 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中


循环遍历数组，在promise后面添加执行ajax任务，同时要将添加的结果重新赋值到promise上
```
const ajax1 = () => sleep(2000).then(() => {
  console.log(1);
  return 1
})
const ajax2 = () => sleep(1000).then(() => {
  console.log(2);
  return 2
})
const ajax3 = () => sleep(1000).then(() => {
  console.log(3);
  return 3
})

function mergePromise () {
  // 在这里写代码
}

mergePromise([ajax1, ajax2, ajax3]).then(data => {
  console.log("done");
  console.log(data); // data 为 [1, 2, 3]
});

<!-- 串行 -->
function mergePromise(arr) {
    let data = []//存放数据
    let promise = Promise.reslove()
    arr.forEach(ajax => {
        promise.then(ajax).then(res => {
            data.push(res)
            return data
            })
        })
    return promise
}


```

## 封装一个异步加载图片的方法

```
function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = function() {
            reslove(img)
        }
        img.onerror = function() {
            reject(new Error('Could not load image at' + url));
        }
        img.src = src
        })
}
```

##  限制异步操作的并发个数并尽可能快的完成全部
所谓promise并发限制，其实根源上就是控制promise的实例化
```
function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls); // 复制urls
  // 这一步是为了初始化 promises 这个"容器"
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 返回下标是为了知道数组中是哪一项最先完成
      return index;
    });
  });
  // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
  return sequence
    .reduce((pCollect, url) => {
      return pCollect
        .then(() => {
          return Promise.race(promises); // 返回已经完成的下标
        })
        .then(fastestIndex => { // 获取到已经完成的下标
            // 将"容器"内已经完成的那一项替换
          promises[fastestIndex] = handler(url).then(
            () => {
              return fastestIndex; // 要继续将这个下标返回，以便下一次变量
            }
          );
        })
        .catch(err => {
          console.error(err);
        });
    }, Promise.resolve()) // 初始化传入
    .then(() => { // 最后三个用.all来调用
      return Promise.all(promises);
    });
}
limitLoad(urls, loadImg, 3)
  .then(res => {
    console.log("图片全部加载完毕");
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  });
  
```



```

// 控制最大并发数量

function handleFetchQueue(urls,max,callback) {
    let count = 0;
    let len = urls.length
    for(let i = 0;i<max;i++) {
        handle()
    }
    function handle() {
        if (urls.length) {
            let url = urls.shift()
            fetch(url).then(res => {
                count++
                handle()
            }).catch(e => {
                throw Error()
            })
            if (count >=len ) {
                callback()
            }
        }
    }
}


const fetch = function (idx) {
  return new Promise(resolve => {
    console.log(`start request ${idx}`);
    const timeout = parseInt(Math.random() * 1e4);
    setTimeout(() => {
      console.log(`end request ${idx}`);
      resolve(idx)
    }, timeout)
  })
};

const urls = Array.from({length: 10}, (v, k) => k);

const callback = () => {
  console.log('run callback');
};

handleFetchQueue(urls, 3, callback);
```



### 实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject

function retry(fn,limit=3) {
  return new Promise(async(reslove,reject) => {
    while(limit){
      try {
       let res = await fn()
       reslove(res)
       return
      } catch(e) {
        if (!limit) reject(e)
        limit --
      }
  })
}



