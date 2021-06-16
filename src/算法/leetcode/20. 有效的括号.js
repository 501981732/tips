/**
 * @param {string} s
 * @return {boolean}
 * 栈结构
 */
var isValid = function(s) {
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    let stack = []
    for (let k of s) {
        // 左括号入栈
        if (map.hasOwnProperty(k)) {
            stack.push(k)
        } else {
            // 如果遇到右括号，和栈顶的匹配 相同则 出栈，不同则false
            let top = stack.pop();
            if (map[top] !== k) return false
        }
        
    }
    return !stack.length
};
var isValid = function(s) {
    const map = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    let stack = []
    for (let i of s) {
        // if (map.hasOwnProperty(k))
        if (i in map) {
            stack.push(i)
        } else {
            let pop = stack.pop()
            if (map[i] !== pop)  return false
        }
    }
    return !stack.length
};
