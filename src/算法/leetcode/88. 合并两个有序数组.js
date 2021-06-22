/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

// 方法二：双指针
 // 时间复杂度：O(m+n)。
 // 空间复杂度：O(m+n)。

// var merge = function(nums1, m, nums2, n) { 
// 	let sorted = []
// 	let curr;
// 	let i = 0,j = 0
// 	while (i < m || j < n) {
// 		if (i === m) {
// 			curr = nums2[j++]
// 		} else if ( j === n) {
// 			curr = nums1[i++]			
// 		} else if ( nums1[i] < nums2[j]) {
// 			curr = nums1[i++]
// 		} else {
// 			curr = nums2[j++]
// 		}
// 		sorted[i + j - 1] = curr
// 	}
//     for (let i = 0; i < m + n; i++) {
//         nums1[i] = sorted[i];
//     }
// 	return nums1
// }

var merge = function(nums1, nums2) { 
	let newArr = [],
		i = 0,
		j = 0,
		m = nums1.length;
		n = nums2.length;
	
	while (i < m && j < n) {
		if (nums1[i] <= nums2[j]) {
			newArr.push(nums1[i++])
		} else {
			newArr.push(nums2[j++])
		}
	}
	while (i < m) {
		newArr.push(nums1[i++])
	} 
	while ( j < n) {
		newArr.push(nums2[j++])
	}
	for (let i = 0,len = newArr.length; i < len; i++) {
		nums1[i] = newArr[i]
	}
	return nums1
}



 // 逆向双指针
  // 时间复杂度：O(m+n)
 // 空间复杂度：O(1)
var merge = function(nums1, m, nums2, n) {
    let insertPos = m + n -1;
    m--; n--;
    while (n >= 0) {
        nums1[insertPos--] = (nums1[m] > nums2[n]) ? nums1[m--] : nums2[n--]
    }
};



