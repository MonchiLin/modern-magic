/**
 * 生成随机数, 根据传入的 min max 决定范围
 * @param min
 * @param max
 */
export function getRandomInt (min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
