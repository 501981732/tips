https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/submissions/
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
// var findNumberIn2DArray = function(matrix, target) {
//     return matrix.flat(Infinity).includes(target)
// };

var findNumberIn2DArray = function(matrix, target) {
    if(!matrix.length) return false;
    let x = matrix.length -1; let y = 0
    while( y < matrix[0].length && x >=0) {
        if (matrix[x][y] === target) return true
        if (matrix[x][y] > target) {
            x--
        } else {
            y++
        }
    }
    return false
};

// 右下角建立坐标
function findNumberIn2DArray(matrix,target) {
    // matrix[x][y]
    if (!matrix.length) return false;
    let x = matrix.length,
        y = 0;
        while ( x > 0 && y < matrix[0].length) {
            if (matrix[x][y] === target) {
                return true
            } if (matrix[x][y] < target) {
                y++
            } else {
                x--
            }
        }
        return false
}
