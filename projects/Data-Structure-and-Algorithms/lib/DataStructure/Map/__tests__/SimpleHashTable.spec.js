import SimpleHashTable from "../SimpleHashTable";
describe('SimpleHashTable', function () {
    it('should put', function () {
        const sht = new SimpleHashTable();
        sht.put("张三", "1@qq.com");
        sht.put("李四", "2@qq.com");
        sht.put("王五", "3@qq.com");
    });
});
//# sourceMappingURL=SimpleHashTable.spec.js.map