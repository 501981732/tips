// 最大值

function findMax(arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; ++i) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
// Math.max.apply(null,arr)
// 二分查找算法

function binSearch(arr, data) {
    var upperBound = arr.length - 1;
    var lowerBound = 0;
    while (lowerBound <= upperBound) {
        var mid = Math.floor((upperBound + lowerBound) / 2);
        if (arr[mid] < data) {
            lowerBound = mid + 1;
        } else if (arr[mid] > data) {
            upperBound = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}


function binSearch(arr,data) {
    let upperBound = arr.length - 1;
    let lowerBound = 0
    while(lowerBound <= upperBound) {
        let mid = Math.floor((upperBound - lowerBound) / 2);
        if (data < arr[mid]) {
            upperBound = mid + 1
        } else if (data > arr[mid]) {
            lowerBound = mid - 1
        } else {
            return mid
        }
    }
    return -1
}
