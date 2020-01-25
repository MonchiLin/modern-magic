// function deepTraversal(node, nodeList = []) {
//
//     if (!node) {
//         return
//     }
//
//     nodeList.push(node)
//
//     node.children.forEach(node => {
//         deepTraversal(node, nodeList)
//     })
//
//     return nodeList
// }
function deepTraversal(node, nodeList = []) {
    if (node) {
        nodeList.push(node);
        let children = node.children;
        for (let i = 0; i < children.length; i++)
            // 每次递归的时候将  需要遍历的节点  和 节点所存储的数组传下去
            deepTraversal(children[i], nodeList);
    }
    return nodeList;
}
function deepTraversalLoop(node) {
    let nodeList = [];
    if (node) {
        // 初始化栈
        let stack = [];
        // 储存当前节点
        stack.push(node);
        // 如果当前栈里有值
        while (stack.length !== 0) {
            // 取出栈顶节点
            let childrenItem = stack.pop();
            // 将子元素存起来
            nodeList.push(childrenItem);
            let childrenList = childrenItem.children;
            // 遍历子元素
            for (let i = childrenList.length - 1; i >= 0; i--)
                // 并且将子元素也存入栈中
                stack.push(childrenList[i]);
        }
    }
    return nodeList;
}
export { deepTraversal, deepTraversalLoop };
//# sourceMappingURL=TreeTraversal.js.map