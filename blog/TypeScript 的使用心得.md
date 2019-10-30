# TypeScript 的使用心得

[时间]: 2018/3/20
[keyword]: Typescript, 心得, 最佳实践

## 如何将一个 实体( Entity ) 的所有 property 作为另一个对象的 key

```typescript
{ [k in keyof IObject]: any }
```

## TS 3.4 增强了对 Compose 的支持 

```typescript
function compose<P1, P2, P3>(f: (x: P2) => P1, g: (x: P3) => P2) {
    return function (x: P3): P1 {
        return f(g(x))
    }
}
```

## TSError

> 这里主要记录一些 typescript 编译器爆出的错误

### TS2367

Full: `Error:(18, 12) TS2367: This condition will always return 'false' since the types 'F' and 'S' have no overlap.`

错误示例:
```typescript
function defaultCompare<F, S>(v1: F, v2: S): boolean {
    return v1 === v2
}
```

这份问题的主要原因是因为 TS 认为 F 和 S 两个类型之间没有关系，所以结果必然是 false

如何解决:
```typescript
// 使两种类型产生管理， 例如 S 继承于 F
function defaultCompare<F, S extends F>(v1: F, v2: S): boolean {
    return v1 === v2
}
```

