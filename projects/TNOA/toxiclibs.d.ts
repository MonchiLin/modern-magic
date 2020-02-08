declare module "toxiclibsjs" {
  const color: {
    accessCriteria
    AccessCriteria
    AlphaAccessor
    CMYKAccessor
    CMYKDDistanceProxy
    ColorGradient
    ColorList
    ColorRange
    ColorTheme
    createListUsingStrategy
    HistEntry
    Histogram
    HSVAccessor
    HSVDistanceProxy
    Hue
    LuminanceAccessor
    namedColor
    NamedColor
    ProximityComparator
    RGBAccessor
    RGBDistanceProxy
    TColor
    theory
    ToneMap
  }
  const geom: {
    AABB
    mesh
    BernsteinPolynomial
    Circle
    CircleIntersector
    Cone
    ConvexPolygonClipper
    Ellipse
    IsectData2D
    IsectData3D
    Line2D
    Line3D
    LineStrip3D
    Matrix4x4
    Plane
    Polygon2D
    Quaternion
    Ray2D
    Ray3D
    Ray3DIntersector
    Rect
    Sphere
    Spline2D
    Spline3D
    SutherlandHodgemanClipper
    Triangle2D
    Triangle3D
    Vec2D
    Vec3D
    XAxisCylinder
    YAxisCylinder
    ZAxisCylinder
  }
  const internals: {
    is
    has
    extend
    each
    bind
    keys
    values
    filter
    mixin
    Iterator
    LinkedMap
    numberComparator
    removeItemFrom
  }
  const math: {
    BezierInterpolation
    CircularInterpolation
    CosineInterpolation
    DecimatedInterpolation
    ExponentialInterpolation
    Interpolation2D: {
      bilinear
    }
    LinearInterpolation
    mathUtils: {
      SQRT2: 1.4142135623730951
      SQRT3: 1.7320508075688772
      LOG2: 0.6931471805599453
      PI: 3.141592653589793
      INV_PI: 0.3183098861837907
      HALF_PI: 1.5707963267948966
      THIRD_PI: 1.0471975511965976
      QUARTER_PI: 0.7853981633974483
      TWO_PI: 6.283185307179586
      THREE_HALVES_PI: 4.71238898038469
      PI_SQUARED: 9.869604401089358
      EPS: 1.1920928955078125e-7
      DEG2RAD: 0.017453292519943295
      RAD2DEG: 57.29577951308232
      SHIFT23: 8388608
      INV_SHIFT23: 1.1920928955078125e-7
      SIN_A: -0.4052847345693511
      SIN_B: 1.2732395447351628
      SIN_P: 0.225
      abs
      ceilPowerOf2
      clip
      clipNormalized
      cos
      degrees
      fastCos
      fastSin
      flipCoin
      floor
      floorPowerOf2
      max
      min
      normalizedRandom
      radians
      random
      reduceAngle
      sign
      sin
    }
    MathUtils: {
      SQRT2: 1.4142135623730951
      SQRT3: 1.7320508075688772
      LOG2: 0.6931471805599453
      PI: 3.141592653589793
      INV_PI: 0.3183098861837907
      HALF_PI: 1.5707963267948966
      THIRD_PI: 1.0471975511965976
      QUARTER_PI: 0.7853981633974483
      TWO_PI: 6.283185307179586
      THREE_HALVES_PI: 4.71238898038469
      PI_SQUARED: 9.869604401089358
      EPS: 1.1920928955078125e-7
      DEG2RAD: 0.017453292519943295
      RAD2DEG: 57.29577951308232
      SHIFT23: 8388608
      INV_SHIFT23: 1.1920928955078125e-7
      SIN_A: -0.4052847345693511
      SIN_B: 1.2732395447351628
      SIN_P: 0.225
      abs
      ceilPowerOf2
      clip
      clipNormalized
      cos
      degrees
      fastCos
      fastSin
      flipCoin
      floor
      floorPowerOf2
      max
      min
      normalizedRandom
      radians
      random
      reduceAngle
      sign
      sin
    }
    ScaleMap
    SigmoidInterpolation
    SinCosLUT
    ThresholdInterpolation
    ZoomLensInterpolation
    noise
    waves

  }
  const physics2d: {
    ParticlePath2D
    ParticleString2D
    PullBackString2D
    VerletConstrainedSpring2D
    VerletMinDistanceSpring2D
    VerletParticle2D
    VerletPhysics2D
    VerletSpring2D
    behaviors: {
      AttractionBehavior
      ConstantForceBehavior
      GravityBehavior
    }
    constraints: {
      AngularConstraint
      AxisConstraint
      CircularConstraint
      MaxConstraint
      MinConstraint
      RectConstraint
    }

  }
  const processing: {
    ToxiclibsSupport
  }
  const THREE: {
    ToxiclibsSupport: {
      createLineGeometry
      createMeshGeometry
      createMesh
      createParticle
    }
  }
  const util: {
    datatypes: {
      ArraySet
      FloatRange
      UndirectedGraph
    }
  }

  export {
    color,
    geom,
    internals,
    math,
    physics2d,
    processing,
    THREE,
    util
  }
}

