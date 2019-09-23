const Dictionary = Map;


/**
 *
 *
 */

class Graph {
    isDirected = false;
    /**
     * 储存图中顶点名字
     */
    vertices = [];
    /**
     * 储存图中顶点名字
     * 顶点姓名为键, 邻接顶点的列表为值
     */
    adjList = new Dictionary<any, any[]>();

    constructor(isDirected = false) {
        this.isDirected = isDirected
    }

    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, [])
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
            this.addVertex(v)
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w)
        }
        this.adjList.get(v).push(w);

        if (!this.isDirected) {
            this.adjList.get(w).push(v)
        }
    }

    getVertices() {
        return this.vertices;
    }
    getAdjList() {
        return this.adjList;
    }

}

export {
    Graph
}



