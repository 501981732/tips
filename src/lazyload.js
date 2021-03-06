var num = document.getElementsByTagName('img').length;
    var img = document.getElementsByTagName("img");
    var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
    lazyload(); //页面载入完毕加载可是区域内的图片
    window.onscroll = throttle(lazyload);
    function lazyload() { //监听页面滚动事件
        var seeHeight = document.documentElement.clientHeight; //可见区域高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
        for (var i = n; i < num; i++) {
            if (img[i].offsetTop < seeHeight + scrollTop) {
                if (img[i].getAttribute("src") == "") {
                    img[i].src = img[i].getAttribute("data-src");
                }
                n = i + 1;
            }
        }


function throttle(fn) {
    let canRun = true;
    return function() {
        if (!canRun) return
           let context = this
            canRun = false
            setTimeout(() => {
            fn.call(context,arguments)
               canRun = true
        },300)
    }
}
function throttle2(fn,time) {
    let activeTime = 0;
    return function() {
        let current = Date.now();
        if (current - activeTime>=time*1000) {
            fn.call(this,arguments)
            activeTime = Date.now();
        }
    }
}

