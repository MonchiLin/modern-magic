# 树结构笔记

## 二叉搜索树笔记

二叉搜索树是一种特殊的二叉树结构, 他的左侧节点总是比右侧节点小.

二叉树的成员方法: 
* insert(key)：向树中插入一个新的键。
* search(key)：在树中查找一个键。如果节点存在，则返回 true；如果不存在，则返回
false。
* inOrderTraverse()：通过中序遍历方式遍历所有节点。
* preOrderTraverse()：通过先序遍历方式遍历所有节点。
* postOrderTraverse()：通过后序遍历方式遍历所有节点。
* min()：返回树中最小的值/键。
* max()：返回树中最大的值/键。
* remove(key)：从树中移除某个键。

### insert

作用: 向树中插入一个键.

伪代码描述:
```javascript
处理根节点不存在的情况.
判断比当前节点大还是小, 小则插左边, 大则插右边
```

### traverse
traverse 指遍历一棵树, 有三种方式可以遍历: 
* 中序遍历: inOrderTraverse - 从小到大遍历所有的节点
* 前序遍历: preOrderTraverse - 从左边最深节点的左节点遍历到右节点, 然后
* 后序遍历: postOrderTraverse

#### inOrderTraverse




