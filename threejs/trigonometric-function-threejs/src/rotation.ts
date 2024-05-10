import * as THREE from 'three';

// 创建场景、相机和渲染器
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建一个球体
const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// 设置相机位置
camera.position.z = 5;

// 创建一个时钟对象
const clock = new THREE.Clock();

// 动画循环
function animate() {
  requestAnimationFrame(animate);

  // 获取自启动以来的秒数
  const t = clock.getElapsedTime();

  // 使用三角函数来更新球体的位置
  sphere.position.x = Math.cos(t);
  sphere.position.y = Math.sin(t);

  renderer.render(scene, camera);
}

animate();
