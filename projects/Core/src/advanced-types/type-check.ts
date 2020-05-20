// export type Compute<A extends any> =
//   {[K in keyof A]: A[K]} extends infer X
//     ? X
//     : never
//
// export type Boolean = True | False
//
// export type True  = 1
// export type False = 0
//
// export type Equals<A1 extends any, A2 extends any> =
//   (<A>() => A extends A1 ? True : False) extends (<A>() => A extends A2 ? True : False)
//     ? True
//     : False
//
// export type Pass = True
// export type Fail = False
//
// // eslint-disable-next-line @typescript-eslint/ban-types
// export declare function check<Type, Expect, Outcome extends Boolean>(debug?: Compute<Type>): Equals<Equals<Type, Expect>, Outcome>
