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

var merge = function(nums1, m, nums2, n) { 

	let sorted = []

	let curr;
	let i = 0,j = 0
	while (i < m || j < n) {
		if (i === m) {
			curr = nums2[j++]
		} else if ( j === n) {
			curr = nums1[i++]			
		} else if ( nums1[i] < nums2[j]) {
			curr = nums1[i++]
		} else {
			curr = nums2[j++]
		}
		sorted[i + j - 1] = curr
	}
    for (let i = 0; i < m + n; i++) {
        nums1[i] = sorted[i];
    }
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

