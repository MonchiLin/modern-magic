"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dictionary = Map;
/**
 *
 *
 */
class Graph {
    constructor(isDirected = false) {
        this.isDirected = false;
        /**
         * 储存图中顶点名字
         */
        this.vertices = [];
        /**
         * 储存图中顶点名字
         * 顶点姓名为键, 邻接顶点的列表为值
         */
        this.adjList = new Dictionary();
        this.isDirected = isDirected;
    }
    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }
    /**
     * 添加边
     * 接受两个点, 如果两个点不在图中, 则先添加到图里
     *
     * @param v
     * @param w
     */
    addEdge(v, w) {
        if (!this.adjList.get(v)) {
            this.addVertex(v);
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w);
        }
        this.adjList.get(v).push(w);
        if (!this.isDirected) {
            this.adjList.get(w).push(v);
        }
    }
    getVertices() {
        return this.vertices;
    }
    getAdjList() {
        return this.adjList;
    }
}
exports.default = Graph;
//# sourceMappingURL=Graph.js.map