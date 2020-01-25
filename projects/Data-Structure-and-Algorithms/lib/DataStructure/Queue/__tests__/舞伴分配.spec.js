/**
 *
 * 前面我们提到过，经常用队列模拟排队的人。下面我们使用队列来模拟跳方块舞的人。当
 * 男男女女来到舞池，他们按照自己的性别排成两队。当舞池中有地方空出来时，选两个队
 * 列中的第一个人组成舞伴。他们身后的人各自向前移动一位，变成新的队首。当一对舞伴
 * 迈入舞池时，主持人会大声喊出他们的名字。当一对舞伴走出舞池，且两排队伍中有任意
 * 一队没人时，主持人也会把这个情况告诉大家。
 *
 */
import { Queue } from "../Queue";
class Dancer {
    constructor(name, sex) {
        this.name = name;
        this.sex = sex;
    }
}
const females = new Queue();
females.enqueue(new Dancer("赵刚", "F"));
females.enqueue(new Dancer("钱刚", "F"));
females.enqueue(new Dancer("孙刚", "F"));
females.enqueue(new Dancer("李刚", "F"));
females.enqueue(new Dancer("周刚", "F"));
females.enqueue(new Dancer("吴刚", "F"));
const males = new Queue();
males.enqueue(new Dancer("赵红", "M"));
males.enqueue(new Dancer("钱红", "M"));
males.enqueue(new Dancer("孙红", "M"));
males.enqueue(new Dancer("李红", "M"));
males.enqueue(new Dancer("周红", "M"));
males.enqueue(new Dancer("吴红", "M"));
describe('舞伴分配问题', function () {
    it('should ', function () {
        while (!males.isEmpty()
            && !females.isEmpty()) {
            console.log(`男舞者 => ${females.dequeue().name}, 女舞者 => ${males.dequeue().name}`);
        }
    });
});
//# sourceMappingURL=舞伴分配.spec.js.map