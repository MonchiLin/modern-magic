/**
 第 100 题：（京东）请写出如下代码的打印结果

 function Foo() {
    Foo.a = function() {
        console.log(1)
    }
    this.a = function() {
        console.log(2)
    }
 }
 Foo.prototype.a = function() {
    console.log(3)
 }
 Foo.a = function() {
    console.log(4)
 }
 Foo.a();
 let obj = new Foo();
 obj.a();
 Foo.a();
 */


describe("day100", () => {
    it('q&a', function () {
        function Foo() {
            Foo.a = function() {
                console.log(1)
            }
            this.a = function() {
                console.log(2)
            }
        }
        Foo.prototype.a = function() {
            console.log(3)
        }
        Foo.a = function() {
            console.log(4)
        }

        // 结果 4, 因为此时将 Foo 当成了一个对象, a 是 Foo 的属性, 所以 Foo.a 是4
        Foo.a();

        // 这一步会构造一个 Foo 的实例
        // 构造的过程中将 Foo.a  = 打印 1
        // 构造的过程中将 this.a = 打印 2 ( Foo.prototype.a = 2 )
        let obj = new Foo();

        // 结果为 2 ,等价于 Foo.prototype.a
        obj.a();

        // 结果为 1 ,在构造 obj 的时候 Foo.a 被修改为了 打印1
        Foo.a()
    });
})