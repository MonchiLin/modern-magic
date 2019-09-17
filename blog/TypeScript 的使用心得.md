# TypeScript 的使用心得

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

