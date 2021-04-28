/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let map = {}
    for(let i = 0,len = nums.length; i<len; i++) {
        let item = nums[i]
        if (map[target - item] === undefined) {
            map[item] = i
        } else {
            return [i, map[target-item]]
        }
    }

};

var twoSum = function(nums, target) {
    let map = new Map();
    let i = 0;
    while (i<nums.length) {
        let dis = target - nums[i];
        if (map.get(dis) !== undefined) {
            return [i,map.get(dis)]
        }
        map.set(nums[i],i)
        i++
    }
}

function inorder(root) {
    if (!root) return []
    const stack = []
    const res = []
    while (stack.length || root) {
        if (root) {
            stack.push(root.left)
            root = root.left
        } else {
            root = stack.pop()
            res.push(root.val)
            root = root.right
        }
    }
}
function preorder(root) {
    const stack = []
    const res = []
    
}

function inorder(root) {
    if (!root) return []
    const res = []
    function in(root) {
        if (!root) return
        in(root.left)
        res.push(root.val)  
        in(root.right)
    }
    in(root)
    return res
}

