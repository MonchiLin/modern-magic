import * as box2d from '@flyover/box2d'
import {scaleToWorld, scaleToPixels} from '../../box2d-helper';

class Box {
  private w: number;
  private h: number;
  private body: box2d.b2Body;

  constructor(x, y) {
    this.w = 16;
    this.h = 16;

    // 创建一个物体之前需要先创建一个物体的定义（definition）
    // 物体分三种 物体(body)，形状(shape)，关节(joint)
    // Define a body
    let bd = new box2d.b2BodyDef();
    // 设置物体类型为动态物体
    bd.type = box2d.b2BodyType.b2_dynamicBody;

    // 将坐标转换到 box2d 中的坐标
    const worldPosition = scaleToWorld(x, y)
    // 设置物体定义的坐标
    bd.position.Set(worldPosition.x, worldPosition.y)
    bd.bullet = true

    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();

    // @ts-ignore 实际是有的
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

    // 密度
    fd.density = 1;
    // 摩擦力
    fd.friction = 0.5;
    // 弹性
    fd.restitution = 0.2

    // Create the body
    // @ts-ignore
    this.body = world.CreateBody(bd);
    // Attach the fixture
    this.body.CreateFixture(fd);
  }

  // Drawing the box
  display() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = radians(this.body.GetAngle());

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
}

export default Box
