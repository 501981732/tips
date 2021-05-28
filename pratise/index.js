function deepCopy(obj) {
    function isObject(k) {
    return (typeof k === 'object' || typeof k === 'function') && typeof k !== null
    }
    let isArray = Array.isArray(obj)
    let newObj = isArray ? [...obj] : {...obj}

    Reflect.ownKeys(newObj).forEach(item => {
        newObj[item] = isObject(newObj[item]) ? deepCopy(newObj[item]) : newObj[item]
    })
    return newObj
}

let s = {
    a: 1,
    b: {
        c:1
    }
}
let s2 = deepCopy(s)

// list 转tree


function toTree(list,link='parentId') {
    let res = [];
    // 以id 为key
    let map = list.reduce((total,curr) => (total[curr.id] = curr,total),{});

    for(let item of Object.values(map)) {
        if (!item.parentId) {
            res.push(item)
        } else {
            let parent = map[item.parentId]
            parent.children = parent.children ? parent.children.push(item) : [item]
        }
    }
    return res
}




// 两个日期间的有效期
function rangeDay (day1, day2) {
   const result = []
    const dayTimes = 24*60*60*1000
    const startTime = day1.getTime()
    const range = day2.getTime() - startTime
    let total = 0

    while (total <= range && range > 0) {
        result.push(new Date(startTime + total).toLocaleDateString().replace(/\//g, '-'))
        total += dayTimes
    }
   return result
};
rangeDay(new Date("2015-02-08"), new Date("2015-03-03"))