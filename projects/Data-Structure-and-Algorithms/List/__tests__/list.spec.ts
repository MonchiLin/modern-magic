import List from '../List'


describe('List 列表 实现测试', function () {

    it('listSize 值应为 List 中的元素数量之和', function () {
        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)

        expect(list.listSize).toBe(3)
    });

    it('length 值应为 List 中的元素数量之和', function () {
        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)

        expect(list.length).toBe(3)
    });

    it('clear 清空列表中的所有的元素', function () {
        expect.assertions(3);

        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)
        list.insert(10, 2)

        expect(list.toString()).toBe("11023")

        list.clear()
        expect(list.listSize).toBe(0)
        expect(list.dataStore).toStrictEqual([])
    });

    it('toString 返回列表的字符串形式', function () {
        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)

        expect(list.toString()).toBe("123")
    });

    it('getElement 返回当前位置的元素', function () {

    });

    it('insert 在现有的元素后插入新的元素', function () {
        expect.assertions(2);

        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)
        list.insert(10, 2)

        expect(list.toString()).toBe("11023")
        expect(list.listSize).toBe(4)
    });

    it('append 在列表的末尾添加新的元素', function () {
        const list = new List()
        list.append(5)
        list.append(6)

        expect(list.toString()).toBe("56")
    });

    it('remove 从列表中删除元素', function () {
        expect.assertions(2);

        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)

        list.remove(1)

        expect(list.toString()).toBe("23")
        expect(list.listSize).toBe(2)
    });

    it('contains 将列表当前位置移动到第一个元素', function () {
        expect.assertions(2);

        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)

        expect(list.contains(2)).toBe(true)
        expect(list.contains(5)).toBe(false)
    });

    it('front 将列表当前位置移动到第一个元素', function () {
        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)
        list.front()

        expect(list.pos).toBe(0)
    });

    it('end 将列表当前位置移动到最后一个元素', function () {
        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)
        list.end()

        expect(list.pos).toBe(2)
    });

    it('prev 将当前位置后移一位', function () {
        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)

        list.prev()

        expect(list.pos).toBe(0)
    });

    it('next 将当前位置前移一位', function () {
        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)

        list.next()

        expect(list.pos).toBe(1)
    });

    it('currPos 返回列表的当前位置', function () {
        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)

        expect(list.currPos()).toBe(0)
    });

    it('moveTo 将当前位置移动到指定位置', function () {
        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)
        list.moveTo(10)

        expect(list.currPos()).toBe(10)
    });

    it('迭代器模式访问 List', function () {

        const list = new List()
        list.append(1)
        list.append(2)
        list.append(3)

        let acc = ""
        for (list.front(); list.currPos() < list.length; list.next()) {
            acc += list.getElement()
        }

        expect(acc).toBe("123")
    });


});