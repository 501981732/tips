function Node(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.show = show;
}

function show() {
    return this.data;
}
// 二叉查找树
function BST() {
    this.root = null;
    this.insert = insert;
    this.inOrder = inOrder;
}

function insert(data) {
    var n = new Node(data, null, null);
    if (this.root == null) {
        this.root = n;
    } else {
        var current = this.root;
        var parent;
        while (true) {
            parent = current;
            if (data < current.data) { 
                current = current.left;
                if (current == null) {
                    parent.left = n;
                    break;
                }
            } else {
                current = current.right;
                if (current == null) {
                    parent.right = n;
                    break;
                }
            }
        }
    }
}

// 中序
function inOrder(node) {
    if (!(node == null)) {
        inOrder(node.left);
        // putstr(node.show() + " ");
        console.log(node.show() + " ");
        inOrder(node.right);
    }
}

// var nums = new BST();
// nums.insert(23);
// nums.insert(45);
// nums.insert(16);
// nums.insert(37);
// nums.insert(3);
// nums.insert(99);
// nums.insert(22);
// inOrder(nums.root);

// 最小值

function getMin() {
    let current = this.root;
    while (current !== null) {
        current = current.left
    }
    return current.data
}
// 最大
function getMax() {
    let current = this.root;
    while (current !== null) {
        current.right = current
    }
    return current.data
}

// 查找给定值

function find(data) {
    let current = this.root;
    while (current !== null) {
        if (current.data = data) {
            return current
        } else if (current.data > data) {
            current = current.left;
        } else if (current.data < data) {
            current = current.right
        }
        return null
    }
}

// 删除
// todo
function remove(data) {
    root = removeNode(this.root, data);
}

function removeNode(node, data) {
    if (node == null) {
        return null;
    }
    if (data == node.data) {
        // 没有子节点的节点
        if (node.left == null && node.right == null) {
            return null;
        }
        // 没有左子节点的节点
        if (node.left == null) {
            return node.right;
        }
        // 没有右子节点的节点
        if (node.right == null) {
            return node.left;
        }
        // 有两个子节点的节点
        var tempNode = getSmallest(node.right);
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
    } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
    } else {
        node.right = removeNode(node.right, data);
        return node;
    }
}












/**
 * 二分查找，递归实现。
 * @param target
 * @param arr
 * @param start
 * @param end
 * @returns {*}
 */
function binarySearch(target,arr,start,end) {
    if( start > end){return -1}
    var start   = start || 0;
    var end     = end || arr.length-1;

    var mid = parseInt(start+(end-start)/2);
    if(target==arr[mid]){
        return mid;
    }else if(target>arr[mid]){
        return binarySearch(target,arr,mid+1,end);
    }else{
        return binarySearch(target,arr,start,mid-1);
    }
    return -1;
}


/**
 * 有序的二分查找，返回-1或存在的数组下标。不使用递归实现。
 * @param target
 * @param arr
 * @returns {*}
 */
function binarySearch(target,arr) {
    var start   = 0;
    var end     = arr.length-1;

    while (start<=end){
        var mid = parseInt(start+(end-start)/2);
        if(target==arr[mid]){
            return mid;
        }else if(target>arr[mid]){
            start   = mid+1;
        }else{
            end     = mid-1;
        }
    }
    return -1;
}

