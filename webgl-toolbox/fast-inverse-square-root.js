const buf = new ArrayBuffer(4)
const f32 = new Float32Array(buf)
const u32 = new Uint32Array(buf)

function FastInverseSquareRoot(x) {
  const x2 = 0.5 * (f32[0] = x)
  u32[0] = (0x5f3759df - (u32[0] >> 1))
  let y = f32[0]
  y = y * (1.5 - (x2 * y * y))
  return y
}
