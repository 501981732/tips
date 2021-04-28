function throttles(limit = 1) {
    let queue = []; wip = 0; //在制品
    function toAdd(fn) {
        queue.push(fn) > 1 || run(); //initializes if 1st
    }
    function isDone() {
        wip--; //make room for next
        run()
    }
    function run() {
        if (wip < limit && queue.length > 0) {
            queue.shift()();wip++ //is now WIP
        }
    }
    return [toAdd,isDone]
}


const API = 'https://pokeapi.co/api/v2/pokemon';
const getPokemon = id => fetch(`${API}/${id}`).then(r => r.json());

// Limit concurrency to 3
const [toAdd, isDone] = throttles(2);
const pokemon = ['bulbasaur', 'ivysaur', 'venusaur', 'charmander', 'charmeleon', 'charizard'];

pokemon.forEach(name => {
    toAdd(() => {
        getPokemon(name).then(isDone);
    });
});


// const list = [1, 2, 3,4]
// const square = num => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(num * num)
//     }, 1000)
//   })
// }

// const [toAdd, isDone] = throttles(1);

// function test() {
//     list.forEach(item => {
//         toAdd(() => {
//             square(item).then(res => console.log(res)).then(isDone)
//         })
//     })
// }
// test()



function throttles(limit =1) {
    let queue = [],
        wip = 0;
        const run = function() {
            if (wip < limit &&  queue.length > 0) {
                queue.shift()() && wip++
            }
        }
        const toAdd = function(fn) {
            queue.push(fn) > 1 || run()
        }
}


let PENDING = 'PENDING', RESLOVED = 'RESLOVED',REJECTED = 'REJECTED'
function Promise(execute) {
    const that = this;
    that.value = null;
    that.state = PENDING
    that.onFulfilledCallback = []
    that.onRejectedCallback = []
    function reslove(val) {
        setTimeout(()=>{
        if (that.state === PENDING) {
            that.value = value
            that.state = RESLOVED
            that.onFulfilledCallback.map(cb => cb(val))
        }
        })
    }

    function reject(val) {
        setTimeout(()=>{
        if (that.state === PENDING) {
            that.value = value
            that.state = REJECTED
            that.onRejectedCallback.map(cb => cb(val))
        }
        })
    }

    try{
        execute(resolve,reject)
    } catch(e) {
        reject(e)
    }
}

Promise.prototype.then = function (onfulfilled,onrejected) {
    const that = this;
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : v => v
    onrejected = typeof onrejected === 'function' ? onrejected : v => {throw v}
    if (that.state === PENDING) {
        that.onFulfilledCallback.push(onfulfilled)
        that.onFulfilledCallback.push(onrejected)
    }
    if (this.state === RESLOVED) {
        onfulfilled(that.value)

    }

    if (this.state === REJECTED) {
        onrejected(that.value)
    }


    return this
}


new Promise(function(){}).then(fn1,fn2)


function fetchLimit(urls,limit=3,cb) {
    let count = 0;
    let length = urls.length;
    let result = []
    for (let i = 0; i < limit;i++) {
        handle()
    }
    function handle() {
        if (urls.length) {
            let current = urls.shift()
            fetch(current).then(res => {
                count++;
                result[i] = res
                handle()
            }).catch(e) {
                count++;
                handle()
            }
        }
        if (count === length) {
            cb(result)
        }
    }
}


if (!Promise.prototype.all) {
    Promise.prototype.all = function(promiseList) {
        let count = 0;
        let result =[]
        return new Promise((resolve,reject) => {
            promiseList.forEach(item => {
                Promise.resolve(item).then(res => {
                    count++;
                    result.push(res)
                    if (count === promiseList.length) {
                        reslove(result)
                    }
                }).catch(e => reject(e))
            })
        })
    }
}










