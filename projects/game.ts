type Point = [number, number]

function slopeBetweenPoints(p1: Point, p2: Point) {
  return (p2[1] - p1[1]) / (p2[0] - p1[0])
}

