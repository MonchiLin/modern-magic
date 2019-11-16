# 解读 LoDash 的深克隆实现.md

* \[时间\]: 2019/10/15
* \[keyword\]: lodash, 深克隆, cloneDeep, JavaScript



> 本文分析以 [lodash.clonedeep]( https://github.com/lodash/lodash/blob/4.5.0-npm-packages/lodash.clonedeep/index.js ) 为准，因为主分支里面的代码比较分散。



## 前置知识

**Host Object** : 宿主对象,  由宿主提供的对象, 例如 `window`, `setTimeout` [参考]( http://es5.github.io/#x4.3.8 ), 与之对应的还有下面这个。

**Native Object** : 原生对象,  由 ECMAScript 定义的规范从而实现的对象, 例如 `String`, `Math`, `RegExp`。



### 数据结构

在 cloneDeep 的过程中 lodash 会使用一些数据结构来提升性能。

Set：

MapCache：



### 常量

LARGE_ARRAY_SIZE： lodash 在深克隆时会处理循环引用，循环引用被存在栈中的，这也就意味着这个栈往往会很大，为了性能优化。

HASH_UNDEFINED ：未定义的 Hash 值的内部表现。

MAX_SAFE_INTEGER ：Javascript 中的最大整数。

xxTag ：Javascript 变量的真实类型。通过 Object.prototype.toString.call(Variable) 获取。

reRegExpChar ：用于匹配正则表达式

freeGlobal ：尝试获取 NodeJS 中的 global 对象

freeSelf：尝试获取 self 对象

root：尝试从 freeGlobal 和 freeSelf 或者当前的 `this` 中获取 global 对象

freeExports：尝试获取 export 对象

freeModule：尝试获取 module 对象

moduleExports: 检测是否使用的 common.js 模块系统



### 函数

addSetEntry：将一个变量存入 Set 中，类似 Set#add 并返回 Set（方便链式调用）。

arrayEach：参考 [Array#foreach]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach )

arrayPush：将两个数组合并，类似 Array#concat，并返回 Array（方便链式调用）。

arrayReduce：参考 [Array#reduce](  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce )

baseTimes：类似 Python 中的 range，接受一个起始值（数字），然后从 0 开始调用这个起始值本身的次数。

getValue: 从一个对象中获取指定 `key` 若对象不存在则返回 null。

isHostObject：参考`前置知识`开始部分。

mapToArray：将 `Map` 转换为 `Array`，以 `[key,value]`的形式存入数组。

overArg：接受两个变量`func,transform`，返回一个函数，执行该函数时返回将 func(transform()) 的结果。

setToArray：将 `Set`转换为 `Array`。

跳过一部分引用原生方法的变量。

***

Hash：创建一个 hash 对象，





**LoDash 的 Stack 实现**:

```typescript
// 参数为数组, 数组里的值为键值对
function Stack(entries) {
  // 这里看到, 涉及到 ListCache 类, 代码见下  
  this.__data__ = new ListCache(entries);
}

function ListCache(entries) {
  // 初始化 index 为 -1 
  var index = -1,
      // 如果传了 entries, length 则等于 entries 的长度, 否则为 0
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// 其他的成员方法是通过手动挂载在原型链上实现的, 下面只会讲用到的成员方法.
// 有一个重点是, ListCache 实际上也是个有下面成员方法的实现, 只不过被 Stack 的实现覆盖了.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;


// Stack.prototype.set
function stackSet(key, value) {
  // 别名引用 __data__  
  var cache = this.__data__;
  // 如果 cache 是 ListCache 的实例  
  if (cache instanceof ListCache) {
      
    // 储存 cache 的 __data__ 属性
    // 如果记不住 cache 和 pairs 的区别就网上看看 Stack 的构造
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}
```



## cloneDeep

**baseClone的参数 ** : 

	* value: 需要克隆的值
	* isDeep: 指定是否深克隆
	* isFull: 指定是否克隆 Symbol
	* customizer: 自定义的 clone 函数
	* key: value 的 key
	* object: value 的父对象
	* stack



cloneDeep 文件只有几行代码, 主要作用就是间接调用 baseClone.

```javascript
import baseClone from './.internal/baseClone.js'

const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4

function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}
```

这里会涉及到一些位掩码(bitMask)的知识, 不了解的小伙伴, 可以先读读者的这篇文章: [位掩码的使用](https://github.com/MonchiLin/modern-magic/blob/master/blog/%E4%BD%8D%E6%8E%A9%E7%A0%81%E7%9A%84%E4%BD%BF%E7%94%A8.md) 来了解. 如果您看到这里, 笔者默认您已经了解了位掩码的使用, 接下来开始看整个 baseClone.














