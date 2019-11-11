import {deepTraversal, deepTraversalLoop} from "../TreeTraversal";


const tree = {
    tag: "div",
    id: "root",
    children: [
        {
            tag: "span",
            content: "123",
            children: [
                {
                    tag: "a",
                    content: "sdsd",
                    children: []
                }, {
                    tag: "div",
                    id: "root",
                    children: [
                        {
                            tag: "a",
                            content: "这是一个 a 标签",
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            tag: "span",
            content: "456",
            children: [
                {
                    tag: "p",
                    content: "这是一个 p 标签",
                    children: []
                }
            ]
        },
    ]
}

describe('TreeTraversal', function () {

    it('deepTraversal', function () {

        const res = deepTraversal(tree)

        console.log(res)
    });

    it('deepTraversalLoop', function () {

        const res = deepTraversalLoop(tree)

        console.log(res)
    });

});
