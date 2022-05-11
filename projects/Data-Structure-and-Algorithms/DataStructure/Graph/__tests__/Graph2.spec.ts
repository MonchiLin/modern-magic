import {Graph} from '../Graph2'

describe("测试 Graph", function () {
    it('runner', function () {
        const graph = new Graph();
        const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        myVertices.forEach((v) => {
            graph.addVertex(v);
        });
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('A', 'D');
        graph.addEdge('C', 'D');
        graph.addEdge('C', 'G');
        graph.addEdge('D', 'G');
        graph.addEdge('D', 'H');
        graph.addEdge('B', 'E');
        graph.addEdge('B', 'F');
        graph.addEdge('E', 'I');

        console.log(graph.toString());
    });

    it('runner1', function () {
        const graph = new Graph();
        const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        myVertices.forEach((v) => {
            graph.addVertex(v);
        });
        graph.addEdge('A', 'B');
        graph.addEdge('A', 'C');
        graph.addEdge('A', 'D');
        graph.addEdge('C', 'D');
        graph.addEdge('C', 'G');
        graph.addEdge('D', 'G');
        graph.addEdge('D', 'H');
        graph.addEdge('B', 'E');
        graph.addEdge('B', 'F');
        graph.addEdge('E', 'I');

        graph.breadthFirstSearch("A", console.log)
    });

});
