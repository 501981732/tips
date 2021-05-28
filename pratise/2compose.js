// function compose(middlewareList) {
//     return function(ctx) {
//         function dispatch(i) {
//             let fn = middlewareList[i]
//             try {
//                 Promise.reslove(
//                     fn(ctx,dispatch.bind(null,i+1))
//                     )
//             } catch(e) {
//                 Promise.reject(e)
//             }
//         }

//         return dispatch(0)
//     }
// }


// function compose(...fns) {
//     return function(n) {
//         return fns.reduce((args,curr) => curr(args),n)
//     }
// }



function compose(middlewareList) {
    return function(ctx) {
        function dispatch(i) {
            let fn = middlewarelist[i]
            try{
                Promise.resolve(fn(ctx,dispatch.bind(null,i+1)))
            } catch(e) {
                Promise.reject(e)
            }
        }

        dispatch(0)
    }
}




function compose(fns) {
    return function(arg) {
        fns.reduce((a,fn) => fn(a),arg)
    }
}

