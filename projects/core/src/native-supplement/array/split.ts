import { range } from 'fp-ts/lib/Array';

export default function spilt<C, A> (count: number, arr: A[]): A[][] {
  return range(0, Math.ceil(arr.length / count) - 1)
    .map(x => {
      return arr.slice(x * count, x * count + count);
    });
}
