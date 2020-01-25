import List from '../List';
class onlyGreaterThanAllInsertList extends List {
    onlyGreaterThanAllInsert(element) {
        const foundGreaterThanElement = this.findByPredicate(e => element <= e);
        if (foundGreaterThanElement === -1) {
            this.append(element);
            return true;
        }
        return false;
    }
}
describe('List 列表 实现测试', function () {
    it('onlyGreaterThanAllInsert 方法只有在传入的参数大于所有值的时候才会插入', function () {
        expect.assertions(2);
        const list = new onlyGreaterThanAllInsertList();
        list.append(1);
        list.append(5);
        list.append(10);
        expect(list.onlyGreaterThanAllInsert(10)).toBe(false);
        expect(list.onlyGreaterThanAllInsert(20)).toBe(true);
    });
});
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
    Gender[Gender["Other"] = 2] = "Other";
})(Gender || (Gender = {}));
class Person {
    constructor(name, gender) {
        this.name = name;
        this.gender = gender;
    }
}
describe('测试筛选同性别', function () {
    it('case 1', function () {
        const list = new List();
        const p1 = new Person("张三", Gender.Male);
        const p2 = new Person("小红", Gender.Female);
        const p3 = new Person("小王", Gender.Male);
        const p4 = new Person("小刘", Gender.Other);
        const p5 = new Person("张张", Gender.Male);
        const p6 = new Person("笋笋", Gender.Female);
        const p7 = new Person("黑狐", Gender.Female);
        list.append(p1);
        list.append(p2);
        list.append(p3);
        list.append(p4);
        list.append(p5);
        list.append(p6);
        list.append(p7);
        const femaleList = list.filter(e => e.gender === Gender.Female);
        expect(femaleList.length).toBe(3);
    });
});
//# sourceMappingURL=exercises.spec.js.map