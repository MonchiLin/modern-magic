/**
 * curry 函数
 * TODO 缺少测试用例
 * @param fn
 */
const curry = (fn:Function) => {
  let argumentLength = fn.length;
  return (...c1:any[]) => {
    let a1 = c1.length;
    if (a1 >= argumentLength) {
      return fn(...c1);
    } else {
      return (...c2:any[]) => {
        return fn(...[...c1, ...c2]);
      };
    }
  };
};

export default curry;
