import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import GUI from 'lil-gui';
import {BufferAttribute} from "three";

const gui = new GUI();

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const parameters = {
  count: 10000,
  size: 0.02,
  radius: 5,
  branches: 3,
  spin: 1,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: "#ff6038",
  outsideColor: "#1b3984",
}

let geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> = null;
let material: THREE.PointsMaterial = null;
let points: THREE.Points<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.PointsMaterial, THREE.Object3DEventMap> = null

const generateGalaxy = () => {
  geometry = new THREE.BufferGeometry();
  const position = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)


  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points)
  }

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3
    const radius = Math.random() * parameters.radius;
    const spinAngle = radius * parameters.spin;

    // i % parameters.branches: 将值限定在 0 - branches-1， 假如 branches 为 4， 则为 0,1,2,3
    // (i % parameters.branches) / parameters.branches: 将值限定为 0~1 之间，取值为 1 / branches
    // 例如 branches 为 3， 则值为 0 0.3333 0.66666666
    // 例如 branches 为 4， 则值为 0 0.25 0.5 0.75
    // Math.PI: 将范围映射到 [0, 2PI)
    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1: -1)
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1: -1)
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1: -1)

    /**
     * 在单位圆上,角度与坐标之间有以下关系:
     *
     * 对于角度 θ,其在 x 轴上的投影长度(即 x 坐标)总是等于 cos(θ)。
     * 同样,角度 θ 在 y 轴上的投影长度(即 y 坐标)总是等于 sin(θ)。
     */
    position[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
    position[i3 + 1] = 0 + randomY
    position[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    const mixedColor = colorInside.clone()
    mixedColor.lerp(colorOutside, radius / parameters.radius)

    colors[i3 + 0] = mixedColor.r
    colors[i3 + 1] = mixedColor.g
    colors[i3 + 2] = mixedColor.b
  }

  geometry.setAttribute("position", new BufferAttribute(position, 3))
  geometry.setAttribute("color", new BufferAttribute(colors, 3))

  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })

  points = new THREE.Points(geometry, material)

  scene.add(points)
}

generateGalaxy()

gui
  .add(parameters, "count")
  .min(100)
  .max(10000000)
  .step(100)
  .onFinishChange(generateGalaxy)

gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy)

gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, "spin")
  .min(-5)
  .max(5)
  .step(0.001)
  .onFinishChange(generateGalaxy)
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy)
gui
  .addColor(parameters, "insideColor")
  .onFinishChange(generateGalaxy)
gui
  .addColor(parameters, "outsideColor")
  .onFinishChange(generateGalaxy)


// 渲染场景
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
