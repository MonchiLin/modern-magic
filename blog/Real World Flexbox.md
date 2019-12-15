# 真实世界中的 Flexbox

> 本文主要是笔者在真实开发中使用 flex 的经验，并不是文档，想学会所有的 flex 属性，还请看 MDN 的 flex 文档。
>
> 为了让读者更容易理解，笔者为本文写了一些很简洁示例代码，文章中有很多内容都需要手动修改代码才能理解的更深，所以请务必仔细看示例代码。

flex 与 flexbox 的区别 ? -> [[CSS3 Flexbox: display: box vs. flexbox vs. flex](https://stackoverflow.com/questions/16280040/css3-flexbox-display-box-vs-flexbox-vs-flex)]



### 如何居中?

"使用 css 居中元素" 是一个老生常谈的话题，你只要需要将这句话输入到搜索引擎中就可以得到数以万计的文章教授你如何以数十种方法去居中一个元素，在真实场景下我们是否需要了解这么多的居中技巧吗？显然是不需要的，大部分情况下我们仅仅只需要掌握很简单 flex 布局的就可以让 dom 元素乖乖变成我们需要的显示样式。

在此之前，我们需要先花费一点时间来学习一下 flex 布局中的基础知识。



### 五分钟就能学会的基础

在 flex 中有两根轴，x 轴和 y 轴，呸~才不是，是 **主轴** 和 **交叉轴**，主轴与交叉轴的概念与 直角坐标系 中的 x，y 很像，**只不过随着条件不同，主轴有可能是 x 轴也有可能是 y 轴**，下面我们来看一个例子。

[两条轴的代码示例]( https://github.com/MonchiLin/modern-magic/blob/master/projects/Real-World-Flexbox-Exanples/two-axes.html )

参考这个例子，相信聪明的小伙伴们已经领悟到了一些 flex 的基础知识。

让一个容器变成 flex 布局很简单，只需要加上 `display: flex` 即可。

上面我们提到 **只不过随着条件不同，主轴有可能是 x 轴也有可能是 y 轴** ，这句话的意思对应 `flex-direction` 属性，如果 flex 容器指定 `flex-direction: row` 则主轴为 x 轴，如果 flex 容器指定 `flex-direction: column` 则主轴为 y 轴，交叉轴我们只需要记住一句话：**交叉轴是主轴相反的轴线** 。

不仅如此，代码示例中提到了了 ` item1 与 item 2 此时已经神奇的拥有了 inline-block 的效果 `这句话，也是由 的 `flex-direction` 属性产生的效果，当指定 `flex-direction: row` 的时候，子元素会产生类似 `inline-block`， 将块级元素变成拥有宽高的内联块级元素(inline-block)，注意此处不是添加了 `display: inline-block`  而是显示成了这种效果。

上面提到了 `flex-direction: row` 让子元素产生了 `inline-block` 的效果，那么 `flex-direction: column`的结果也不言而喻了，小伙伴们可以在笔者上面发的示例代码中改一改来验证下面几个问题：

1. 在 `flex-direction: column` 的情况下，主轴是什么轴？
2. 在 `flex-direction: column` 的情况下，行级元素(span) 能否占一行？

好，到此处为止，接下来的文章将不会在涉及到上面提到的基础知识，如果你有兴趣继续把本文章看下去，那么笔者希望你已经掌握如下知识点：

1. 如何使用 flex 布局？
2. 什么是主轴，什么是交叉轴？
3. `flex-direction` 设置为 `row` 或者 `column` 产生的效果



### 让它乖乖居中

好，接下来我们回到正题，“如何居中”， 读到这里更贴切的表达是 “如何使用 flex 布局居中一个元素”。

废话不多说，直接看代码：

[元素居中示例代码]( https://github.com/MonchiLin/modern-magic/blob/master/projects/Real-World-Flexbox-Exanples/center.html )

注意看 css 代码， box--2 仅仅添加了一个 justify-content: center 后 item1 和 item2 就乖乖的居中了，这是为什么呢？

先来看下 MDN 给出的解释：

>  [CSS](https://developer.mozilla.org/zh-CN/docs/CSS) **`justify-content`** 属性定义了浏览器如何分配顺着父容器主轴的元素之间及其周围的空间， [^justify-content]



怎么理解上面这段话有两种方式

1. 看现象：[justify-content 示例代码]( https://github.com/MonchiLin/modern-magic/blob/master/projects/Real-World-Flexbox-Exanples/justify-content.html )

2. 逐段理解，然后看现象。

好，代码的话小伙伴们感兴趣就自己去看吧，笔者在这里来逐段解释下这段话的意思。

* 父容器：设置了 display: flex 的容器
* 主轴: 在 `flex-direction: row` 的情况下，主轴为 x 轴，在 `flex-direction: column` 的情况下主轴为 y 轴
* 父容器主轴的元素：设置了 display: flex 的容器的子元素
* 父容器主轴的元素之间及其周围的空间：这句话有些绕，让我们回到示例代码 // 此处应有代码 可以看到上面 box 本身的宽度是远远大于 item1 + item2 的，所有有很多空白的区域，而 `justify-content` 就是用来分配这些空白区域和 item1, item2 所占用的空间的属性。

到这里为止，`justify-content` 就已经讲完了，如果有小伙伴仍旧不明白发生了什么，笔者建议跟随上方的示例代码自己写一些试试。

`justify-content`讲完之后聪明的小伙伴们肯定会发现，笔者只讲了如何 **控制主轴的居中** ，那交叉轴呢？本文并不会深入每个属性讲解，`align-items` 是一个在和 `justfiy-content` 的差不多属性，没错，正如你想的那样，`align-items` 可以理解成 交叉轴的 ``justfiy-content``，至于怎么居中交叉轴，这部分笔者建议读者亲手去试一试，遇到困难可以参考 [align-items]( https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items )。





### 结束了吗？

读到这里的小伙伴肯定已经掌握了如何中 flex 来水平垂直居中一个元素，但是这样就够了吗？











[^justify-content]:  完整版为 -> [CSS](https://developer.mozilla.org/zh-CN/docs/CSS) **`justify-content`** 属性定义了浏览器如何分配顺着父容器主轴的弹性元素之间及其周围的空间。