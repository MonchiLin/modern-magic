class TodoList {
    private list = []

    constructor() {

    }

    get length() {
        return this.list.length
    }

    add(todo) {
        const finished = false
        this.list.push({todo, finished})
        return this
    }

    toggleFinish(index) {
        this.list[index].finished = !this.list[index.finished]
        return this
    }

    remove(index) {
        this.list.splice(index, 1)
        return this
    }

    get(index) {
        return this.list[index]
    }


    show() {
        console.table(this.list)
    }
}

const todoList = new TodoList()

todoList.add("上天")
    .add("下地")
    .add("打白骨精")
    .add("打三下")
    .show()

todoList.toggleFinish(0)
    .toggleFinish(1)
    .toggleFinish(2)
    .show()
