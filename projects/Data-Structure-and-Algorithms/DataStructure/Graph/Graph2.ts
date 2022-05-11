import Stack from "../Stack/Stack";
import { Queue } from "../Queue/Queue";

enum Flags {
  UnVisited,
  Visited,
  Processed,
}

export class Graph<T> {
  // 顶点集
  vertices = []
  // 顶点到相邻顶点的关系列表
  adjList = new Map<T, T[]>()

  addVertex(vertex: T) {
    if (this.vertices.includes(vertex)) {
      return
    }
    this.vertices.push(vertex)
    this.adjList.set(vertex, [])
  }

  addEdge(a: T, b: T) {
    if (!this.adjList.has(a)) {
      this.addVertex(a)
    }
    if (!this.adjList.has(b)) {
      this.addVertex(b)
    }

    const vertexA = this.adjList.get(a)
    if (!vertexA.includes(b) || true) {
      vertexA.push(b)
    }
    const vertexB = this.adjList.get(b)
    if (!vertexB.includes(a) || true) {
      vertexB.push(a)
    }
  }

  toString() {
    let s = '';
    this.vertices.forEach((v) => {
      s += `${v} -> `;
      this.adjList.get(v).forEach((n) => {
        s += `${n} `;
      });
      s += '\n';
    });
    return s;
  }

  protected vertexToString(vertex: T) {
    return vertex.toString()
  }

}