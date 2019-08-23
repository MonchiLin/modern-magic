import {locate} from 'locate-character'

const validNameChar = /[a-zA-Z0-9_$]/

function parse(template: string) {
    let i = 0
    const root = {
        start: 0,
        end: template.length,
        type: "Fragment",
        children: []
    }

    const stack = [root]
    let current = root

    function error(message) {
        const {line, column} = locate(template, i)
        throw new Error(`${message} (${line}:${column})`)
    }

    function match(str) {
        return template.slice(i, i + str.length) === str
    }

    function fragment() {
        const char = template[i]

        while (char === ' ') {
            i += 1
        }

        if (char === "<") {
            return tag
        }

        if (match("{{")) {
            return mustache
        }

        return text
    }

    function mustache() {
        return text
    }

    function tag() {
        const start = i++;
        let char = template[i];

        const isClosingTag = char === '/';

        if (isClosingTag) {
            i += 1
            char = template[i]
        }

        let name = ""
        while (validNameChar.test(char)) {
            name += char
            i += 1
            char = template[i]
        }


        if (isClosingTag) {
            if (char !== ">") {
                error("期望得到的是 >")
            }

            i += 1
            current.end = i
            stack.pop()
            current = stack[stack.length - 1]

            return fragment
        }


        const element = {
            start: start,
            end: null,
            type: "Element",
            name: name,
            attributes: {},
            children: []
        }

        current.children.push(element)
        stack.push(element)
        current = element

        if (char === '>') {
            i += 1;
            return fragment;
        }

        return attributes;
    }

    function text() {
        const start = i;

        let data = '';

        while (i < template.length && template[i] !== '<' && !match('{{')) {
            data += template[i++];
        }

        current.children.push({
            start,
            end: i,
            type: 'Text',
            data
        });

        return fragment;
    }

    function attributes() {
        const char = template[i];
        if (char === '>') {
            i += 1;
            return fragment;
        }
    }

    let state = fragment;

    while (i < template.length) {
        state = state();
    }

    return root;
}

export default parse
