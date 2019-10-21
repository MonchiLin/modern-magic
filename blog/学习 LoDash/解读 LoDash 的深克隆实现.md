# 解读 LoDash 的深克隆实现.md

* \[时间\]: 2019/10/15
* \[keyword\]: lodash, 深克隆, cloneDeep, JavaScript



## 相关文件

[cloneDeep 源码](https://github.com/lodash/lodash/blob/master/cloneDeep.js)

[baseDeep 源码](https://github.com/lodash/lodash/blob/master/.internal/baseClone.js)

上面两个文件都可以在 github 的 lodash 仓库里找到, 下面会以流程图的形式来解读, 请对应源码观看图片.



## 前置知识

**Host Object** : 宿主对象,  由宿主提供的对象, 例如 `window`, `setTimeout` [参考]( http://es5.github.io/#x4.3.8 ), 与之对应的还有下面这个.

**Native Object** : 原生对象,  由 ECMAScript 定义的规范从而实现的对象, 例如 `String`, `Math`, `RegExp`.



**baseClone的参数 ** : 

	* value: 需要克隆的值
	* isDeep: 指定是否深克隆
	* isFull: 指定是否克隆 Symbol
	* customizer: 自定义的 clone 函数
	* key: value 的 key
	* object: value 的父对象
	* stack



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














