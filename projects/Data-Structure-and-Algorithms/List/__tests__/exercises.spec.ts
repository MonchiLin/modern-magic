import List from '../List'

class onlyGreaterThanAllInsertList extends List {

    onlyGreaterThanAllInsert (element) {
        const foundGreaterThanElement = this.findByPredicate(e => element <= e)

        if (foundGreaterThanElement === -1) {
            this.append(element)
            return true
        }

        return false
    }
}

describe('List 列表 实现测试', function () {

    it('onlyGreaterThanAllInsert 方法只有在传入的参数大于所有值的时候才会插入', function () {
        expect.assertions(2)

        const list = new onlyGreaterThanAllInsertList()

        list.append(1)
        list.append(5)
        list.append(10)


        expect(list.onlyGreaterThanAllInsert(10)).toBe(false)
        expect(list.onlyGreaterThanAllInsert(20)).toBe(true)

    });

})