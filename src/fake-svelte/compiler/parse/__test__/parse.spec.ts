import parse from '../index'

describe('parse', function () {
    /**
     * case 1 计算过程                                  <span>test</span> 为 '<'
     * 当前 char -> '<'
     *      进入 fragment 遇到 '<'
     *          进入 tag
     * 创建一个临时变量 start, 值为 '<' 下一个的索引       <span>test</span> 为 's'
     * 此时有两种情况:
     *              1. 下一个为 '/'        -> 表示这个 tag 是一个闭合 tag -> 跳过 '/' 赋值下一个给 char
     *              2. 下一个为 'a-zA-Z'   -> 表示这是一个开始的 tag
     * 因为 char === 's', 那就是进入第二种情况
     * 这是我们进行一次 while, 获取到本次的 tag name
     * 这时有两种情况:                                  <span>test</span> 为 '>'
     *              1. 下一个为 ""
     *              2. 上一个为 '/' 下一个为 ">"
     *              2. 上一个为 'a-zA-Z' 下一个为 ">"
     * 因为 char === '>' 我们进入第二种情况
     * 这时我们创建一个节点 element, 记下开始行, 结束行为 null , 因为这个 tag 还没有结束
     * type 为 'Element', name 为 tag name, attributes 为空, children 为空
     * 将这个节点推入当前节点的子节点, 并且推入栈里
     * 当然把这个节点设置为当前节点
     * 进入 fragment 函数                             <span>test</span> 为 '>'
     * 此时有三种情况:
     *              1. 下一个为 ""
     *              2. 下一个为 "/" -> 参考 <img /> 这种 - 当前程序未做处理
     *              3. 下一个为 ">" -> 也就是 tag start 闭合了 <span></span> 的 <span> 部分
     * 当前是第三种情况, 这是我们跳过 '>', 进入 text    <span>test</span> 为 't'
     * 此时有三种情况:
     *              1. 下一个为 ""    -> 跳过本次
     *              2. 下一个为 "<"   -> 为 tag 开始
     *              3. 下一个为 "{{"  -> 为插值表达式, 当前程序未作处理 -> 使用 match 函数判断,
     *              4. 下一个为 ""    -> 为普通文本
     * 因为当前是 't' 我们进入 text 函数
     * 取出不是 '{{' 开头 也不是 '<' 开头的文本, 并且创建一个新的节点存在当前阶段的 children 里面
     *
     * 进入 fragment                                   <span>test</span> 为 '<'
     * 这里因为我们当前为 '<', 所以进入 tag 函数
     * 给 i ++                                         <span>test</span> 为 '/'
     * 在正确情况下此时只有一种情况:
     *               下一个为 "a-zA-Z"
     * 我们跳过 '/'                                     <span>test</span> 为 's'
     * 记录标签名 === 'span'
     * 判断是否是闭合了, 如果闭合则为当前节点对象设置 end, 并且弹出当前栈, 将当前节点设为栈里的上一个
     *
     */


    it('case 1', function () {

        const template = `<span>test</span>`;

        expect(parse(template)).toStrictEqual({
            start: 0,
            end: 17,
            type: 'Fragment',
            children: [
                {
                    start: 0,
                    end: 17,
                    type: 'Element',
                    name: 'span',
                    attributes: {},
                    children: [
                        {
                            start: 6,
                            end: 10,
                            type: 'Text',
                            data: 'test'
                        }
                    ]
                }
            ]
        })
    });
});