/**
 *如果页的底部可见, 则返回true, 否则为false。
 *document.documentElement.clientHeight  可见区域高度
 *document.documentElement.scrollTop  window.scrollY 滚动条高度
 */

const bottomVisible = () =>
    document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight
// || document.documentElement.clientHeight;
// bottomVisible() -> true


/**
 *2. 返回当前url
 */
const currentURL = () => window.location.href;

/**
 *3. 如果指定的元素在视区中可见, 则返回true, 否则为false。
 * @param {Object} element 节点 
 * @param {Boolean=false} (可选) true：全部可见 false 部分可见 
 * @return {Boolean} 
 */
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    return partiallyVisible ?
        ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) :
        top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};


/**
 *4. 返回当前页的滚动位置。
 * @param {Object=window} 
 * @return {Object} 
 */
const getScrollPosition = (el = window) =>
    ({
        x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
        y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop
    });
// getScrollPosition() -> {x: 0, y: 200}


/**
 *6. 返回一个包含当前 URL 参数的对象。
 * @param {String} url 
 * @return {Object} 
 */

const getURLParameters = url =>
    url.match(/([^?=&]+)(=([^&]*))/g).reduce(
        (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
    );
// getURLParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}



/**
 *7.使用window.location.href或window.location.replace()重定向到url。传递第二个参数以模拟链接单击 (true-默认值) 或 HTTP 重定向 (false).
 * @param {String} url 
 * @param {Boolean=true} 
 */

const redirect = (url, asLink = true) => asLink ? window.location.href = url : window.location.replace(url);

/**
 *7.平滑滑动到顶部
 *使用document.documentElement.scrollTop或document.body.scrollTop从顶部获取距离。
 *从顶部的距离的一小部分滚动。使用window.requestAnimationFrame()对滚动进行动画处理。
 * 或者scrollintoview()
 *dom.scrollIntoView({
    behavior: 'smooth'
})
 */

const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
};
