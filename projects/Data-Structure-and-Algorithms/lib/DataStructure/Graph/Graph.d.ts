/**
 *
 *
 */
declare class Graph {
    isDirected: boolean;
    /**
     * 储存图中顶点名字
     */
    vertices: any[];
    /**
     * 储存图中顶点名字
     * 顶点姓名为键, 邻接顶点的列表为值
     */
    adjList: Map<any, any[]>;
    constructor(isDirected?: boolean);
    addVertex(v: any): void;
    /**
     * 添加边
     * 接受两个点, 如果两个点不在图中, 则先添加到图里
     *
     * @param v
     * @param w
     */
    addEdge(v: any, w: any): void;
    getVertices(): any[];
    getAdjList(): Map<any, any[]>;
}
export default Graph;
//# sourceMappingURL=Graph.d.ts.map