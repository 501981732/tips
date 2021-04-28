/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
// 右下左上以及四个方向 定义边界 left <= right top <= left执行while
    let top = 0,
        left = 0,
        right = matrix[0].length -1,
        bottom = matrix.length -1,
        direction = 'right',
        result = [];
        while(top <= bottom && left <= right) {
            if (direction === 'right') {
                for (let i = left; i <= right; i++) {
                    result.push(matrix[top][i])
                }
                top++
                direction = 'down'
            } else if (direction === 'down') {
                for (let i = top; i <= bottom; i++) {
                    result.push(matrix[i][right])
                }
                right--
                direction = 'left'
            } else if (direction === 'left') {
                for (let i = right; i >= left; i--) {
                    result.push(matrix[bottom][i])
                }
                bottom--
                direction = 'up'
            } else if (direction === 'up') {
                for (let i = bottom; i >= top; i--) {
                    result.push(matrix[i][left])
                }
                left++
                direction = 'right'
            }
        }
        return result
};