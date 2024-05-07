import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import GUI from 'lil-gui';

const gui = new GUI({
  width: 500
});

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const parameters = {
  radius: 2,
  angleX: 0,
  angleY: 0,
  angleZ: 0,
  positionX: 0,
  positionY: 0,
  positionZ: 0,
}

let geometry: THREE.BoxGeometry
let material: THREE.MeshBasicMaterial
let cube:THREE.Mesh<THREE.BoxGeometry,THREE.MeshBasicMaterial>

// 一度
const rotationSpeed = Math.PI / 180;

const generateGalaxy = () => {

  if (cube != null) {
    geometry.dispose();
    material.dispose();
    scene.remove(cube)
  }

  // 创建一个立方体
  geometry = new THREE.BoxGeometry();
  material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
  cube = new THREE.Mesh(geometry, material);

  // cube.rotation.x = parameters.angle * rotationSpeed;
  cube.rotation.x = parameters.angleX * rotationSpeed;
  cube.rotation.y = parameters.angleY * rotationSpeed;
  cube.rotation.z = parameters.angleZ * rotationSpeed;
  // cube.rotation.x = parameters.angle * rotationSpeed;
  cube.position.x = parameters.positionX;
  cube.position.y = parameters.positionY;
  cube.position.z = parameters.positionZ;

  scene.add(cube)
}

generateGalaxy()

gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onChange(generateGalaxy)

gui
  .add(parameters, "angleX")
  .min(0)
  .max(360)
  .step(1)
  .onChange(generateGalaxy)

gui
  .add(parameters, "angleY")
  .min(0)
  .max(360)
  .step(1)
  .onChange(generateGalaxy)

gui
  .add(parameters, "angleZ")
  .min(0)
  .max(360)
  .step(1)
  .onChange(generateGalaxy)

gui
  .add(parameters, "positionX")
  .min(-10)
  .max(10)
  .step(0.1)
  .onChange(generateGalaxy)

gui
  .add(parameters, "positionY")
  .min(-10)
  .max(10)
  .step(0.1)
  .onChange(generateGalaxy)

gui
  .add(parameters, "positionZ")
  .min(-10)
  .max(10)
  .step(0.1)
  .onChange(generateGalaxy)


// 渲染场景
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
