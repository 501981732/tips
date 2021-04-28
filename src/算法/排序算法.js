// 重新 排列时用到的技术是一组嵌套的 for 循环。其中外循环会遍历数组的每一项，内循环则用 于比较元素。这些算法非常逼真地模拟了人类在现实生活中对数据的排序，例如纸牌玩家 在处理手中的牌时对纸牌进行排序，或者教师按照字母顺序或者分数对试卷进行排序

// https://visualgo.net/zh/sorting
// 冒泡
// 比较相邻的数据，当左侧值大于右侧值时将它们进行互换。
function buddleSort (arr) {
    let len = arr.length;
    for (let i = len;  i >= 2;  i-- ) {
        for (let j = 0;  j < i - 1;  j++) {
             if (arr[j] > arr[j+1]) {
                  [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
             }
        }
    }
    return arr;
}
// 选择排序
// 外循环从数组的第一个元素移动到倒数第二个元素;内循环从第 二个数组元素移动到最后一个元素，查找比当前外循环所指向的元素小的元素

function selectionSort(data) {
    let temp;
    for (let outer = 0; outer <= data.length - 2; ++outer) {
        min = outer;
        for (let inner = outer + 1; inner = data.length - 1; ++inner) {
            if (data[inner] < data[min]) {
                min = inner
            }
            swap(data, outer, min);
        }
    }
}

//  插入排序
function insertionSort(data) {
    var temp, inner;
    for (var outer = 1; outer <= data.length - 1; ++outer) {
        temp = data[outer];
        inner = outer;
        while (inner > 0 && (data[inner - 1] >= temp)) {
            data[inner] = data[inner - 1];
            --inner;
        }
        this.dataStore[inner] = temp;
    }
}

// 归并排序
function sort(array) {
  checkArray(array);
  mergeSort(array, 0, array.length - 1);
  return array;
}

function mergeSort(array, left, right) {
  // 左右索引相同说明已经只有一个数
  if (left === right) return;
  // 等同于 `left + (right - left) / 2`
  // 相比 `(left + right) / 2` 来说更加安全，不会溢出
  // 使用位运算是因为位运算比四则运算快
  let mid = parseInt(left + ((right - left) >> 1));
  mergeSort(array, left, mid);
  mergeSort(array, mid + 1, right);

  let help = [];
  let i = 0;
  let p1 = left;
  let p2 = mid + 1;
  while (p1 <= mid && p2 <= right) {
    help[i++] = array[p1] < array[p2] ? array[p1++] : array[p2++];
  }
  while (p1 <= mid) {
    help[i++] = array[p1++];
  }
  while (p2 <= right) {
    help[i++] = array[p2++];
  }
  for (let i = 0; i < help.length; i++) {
    array[left + i] = help[i];
  }
  return array;
}
// ------------------------------------高级算法

// 希尔排序



// 分而治之 快排
// (1) 选择一个基准元素，将列表分隔成两个子序列;
// (2) 对列表重新排序，将所有小于基准值的元素放在基准值的前面，所有大于基准值的元
// 素放在基准值的后面;
// (3) 分别对较小元素的子序列和较大元素的子序列重复步骤 1 和 2
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    var left = [],
        right = [],
        pivot = arr[Math.floor(arr.length/2)];//不能选第一个最后一个 选中间的

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return quickSort(left).concat(pivot, quickSort(right));
}




// 三路快排

const Qsort = arr => arr.length <= 1 ? arr :
    Qsort(arr.filter(x => x < arr[0]))
    .concat(arr.filter(x => x == arr[0]))
    .concat(Qsort(arr.filter(x => x > arr[0])))




//  采用自上而下的递归方法
//  归并排序（Merge sort）是建立在归并操作上的一种有效的排序算法。该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。


// 申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；

// 设定两个指针，最初位置分别为两个已经排序序列的起始位置；

// 比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；

// 重复步骤 3 直到某一指针达到序列尾；

// 将另一序列剩下的所有元素直接复制到合并序列尾。

function mergeSort(arr) {  // 采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    var result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}

