import toxi from 'toxiclibsjs'

const VerletPhysics2D = toxi.physics2d.VerletPhysics2D;
const GravityBehavior = toxi.physics2d.behaviors.GravityBehavior;
const AttractionBehavior = toxi.physics2d.behaviors.AttractionBehavior;
const VerletParticle2D = toxi.physics2d.VerletParticle2D;
const VerletSpring2D = toxi.physics2d.VerletSpring2D;
const VerletConstrainedSpring2D = toxi.physics2d.VerletConstrainedSpring2D;
const VerletMinDistanceSpring2D = toxi.physics2d.VerletMinDistanceSpring2D;
const PullBackString2D = toxi.physics2d.PullBackString2D;
const Vec2D = toxi.geom.Vec2D;
const Rect = toxi.geom.Rect;

export {
  VerletPhysics2D,
  GravityBehavior,
  AttractionBehavior,
  VerletParticle2D,
  VerletSpring2D,
  PullBackString2D,
  VerletConstrainedSpring2D,
  VerletMinDistanceSpring2D,
  Vec2D,
  Rect,
}
