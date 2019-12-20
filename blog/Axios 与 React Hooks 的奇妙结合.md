## 前言

自 React 16.8 正式发布，至今为止已经将近一年了，在这一年里，笔者认为整个 React 生态中最令人震惊的就是 React Hooks，它为**复用组件(逻辑)**提供了一种新的方式，社区也非常积极的为其生态贡献，Hooks 写法与 类风格（Class Style）组件区别还是蛮大的，抛弃类组件后我们需要面对的一个重要问题就是如何从服务器请求数据。

为避免歧义，下面解释下部分名词在上下文中的含义：







## 何时请求数据

在类风格的组件中我们请求数据一般是 `componentDidMount` 生命周期中，代码如下：

```typescript
class InClassComponentRequest extends React.Component {
  componentDidMount(): void {
    axios({url: ""})
      .then(res => {
        console.log("result", res)
      })
      .catch(err => {
        console.warn("error", err)
      })
  }
}
```

将其翻译至 Hooks 中写法如下：

```
const InHooksRequest = () => {
  useEffect(() => {
    axios({url: ""})
      .then(res => {
        console.log("result", res)
      })
      .catch(err => {
        console.warn("error", err)
      })
  }, [])
}
```

这样就够了吗？

我相信但凡是经历过开发的小伙伴都知道我们为了更好的用户体验往往还会做更多的操作：

1. 激活 loading 状态状态，在请求结束后关闭 loading 状态。
2. catch 错误，处理异常。
3. 刷新数据（以相同的配置重新请求）。

4. 在错误的情况下重试（以相同的配置重新请求）。

在 Hooks 的写法中我们再来思考一个问题，数据应该放在哪里？

设想一下，如果我们将数据放在一个专门用来处理请求的 Hooks 中，那么上面提到的四点，是否同样可以交由这个 Hooks 来处理？按照这个思路下去我们发现又会遇到一个新的问题：

交由 Hooks 处理数据状态组件又如何主动修改 Hooks 的状态？









































