/**
 *
 * 由于队列经常被应用在计算机领域和我们的现实生活中，就出现了一些队列的修改版本，我
 * 们会在本章实现它们。这其中的一种叫作循环队列。循环队列的一个例子就是击鼓传花游戏（hot
 * potato）。在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，
 * 这个时候花在谁手里，谁就退出圆圈、结束游戏。重复这个过程，直到只剩一个孩子（胜者）。
 *
 */
import {Queue} from "../Queue";

/**
 * 计算过程
 * 初始人员: 小赵, 小钱, 小孙, 小李, 小周, 小王
 * 次数为 3
 * 1. 第一次 for: 小赵, 小钱, 小孙, 小李, 小周, 小王
 *      1. 小钱, 小孙, 小李, 小周, 小王, 小赵
 *      2. 小孙, 小李, 小周, 小王, 小赵, 小钱
 *      3. 小李, 小周, 小王, 小赵, 小钱, 小孙
 *      去除 小李
 *
 * 2. 第二次 for: 小周, 小王, 小赵, 小钱, 小孙
 *      1. 小王, 小赵, 小钱, 小孙, 小周
 *      2. 小赵, 小钱, 小孙, 小周, 小王
 *      3. 小钱, 小孙, 小周, 小王, 小赵
 *      去除 小钱
 *
 * 3. 第三次 for: 小孙, 小周, 小王, 小赵
 *      1. 小周, 小王, 小赵, 小孙
 *      2. 小王, 小赵, 小孙, 小周
 *      3. 小赵, 小孙, 小周, 小王
 *      去除 小赵
 *
 * 4. 第四次 for: 小孙, 小周, 小王
 *      1. 小周, 小王, 小孙
 *      2. 小王, 小孙, 小周
 *      3. 小孙, 小周, 小王
 *      去除 小孙
 * 5. 第五次 for: 小周, 小王
 *      1. 小王, 小周
 *      2. 小周, 小王
 *      3. 小王, 小周
 *      去除 小王
 *  循环结束, 胜者小周
 *
 * @param elements
 * @param num
 */
function hotPotato(elements, num) {
    const queue = new Queue();
    const elimitatedList = [];

    for (let i = 0; i < elements.length; i++) {
        queue.enqueue(elements[i])
    }

    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue())
        }
        elimitatedList.push(queue.dequeue())
    }

    return {
        eliminated: elimitatedList,
        winner: queue.dequeue()
    }

}

describe('击鼓传花', function () {
    it('should ', function () {
        const names = ["小赵", "小钱", "小孙", "小李", "小周", "小王"];
        const result = hotPotato(names, 3);
        expect(result.winner).toBe("小周")
    });
});