import {AdditiveBlending, AmbientLight, BufferGeometry, Clock, Color, Float32BufferAttribute, Mesh, MeshStandardMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, TextureLoader, Vector3, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";
import TWEEN from '@tweenjs/tween.js';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {isMesh} from "./utils.ts";
import {MeshSurfaceSampler} from "three/examples/jsm/math/MeshSurfaceSampler";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

let camera: PerspectiveCamera, renderer: WebGLRenderer, controls: OrbitControls;
let ready = false;
const scene = new Scene();

async function main() {
  let textPoints = await renderText();
  scene.add(textPoints);
  const modelPoints = await renderModel()
  modelPoints.visible = false;
  scene.add(modelPoints)

  scene.background = new Color(0xdddddd);

  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;

  renderer = new WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.clearColor()

  const hlight = new AmbientLight(0x404040, 100);
  scene.add(hlight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  transitionParticles(textPoints, modelPoints)
  listenResize();
  animate();
}

const clock = new Clock();

function animate() {
  TWEEN.update()

  // console.log(`position: ${camera.position.x.toFixed(4)}, ${camera.position.y.toFixed(4)}, ${camera.position.z.toFixed(4)}`);
  // console.log(`rotation: ${camera.rotation.x.toFixed(4)}, ${camera.rotation.y.toFixed(4)}, ${camera.rotation.z.toFixed(4)}`);

  if (ready) {
    scene.rotation.y = clock.getElapsedTime() * 0.5
    scene.rotation.x = clock.getElapsedTime() * 0.5
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function listenResize() {
  window.addEventListener('resize', onWindowResize);

  function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

}

function transitionParticles(textPoints: Points, modelPoints: Points) {
  let textPositions = textPoints.geometry.attributes.position.array;
  let modelPositions = modelPoints.geometry.attributes.position.array;

  // 创建一个临时的 Vector3 对象
  const tempVector = new Vector3();
  for (let i = 0; i < modelPositions.length; i += 3) {
    // 从 modelPoints 中获取点的位置
    tempVector.set(
      modelPositions[i],
      modelPositions[i + 1],
      modelPositions[i + 2]
    );

    // 对点的位置应用 modelPoints 的缩放和旋转
    tempVector.multiply(modelPoints.scale);
    tempVector.applyEuler(modelPoints.rotation);

    let from = {
      x: textPositions[i],
      y: textPositions[i + 1],
      z: textPositions[i + 2]
    };
    let to = {
      x: tempVector.x,
      y: tempVector.y,
      z: tempVector.z
    };

    new TWEEN.Tween(from)
      .to(to, 1200)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(() => {
        textPoints.geometry.attributes.position.array[i] = from.x;
        textPoints.geometry.attributes.position.array[i + 1] = from.y;
        textPoints.geometry.attributes.position.array[i + 2] = from.z;
        textPoints.geometry.attributes.position.needsUpdate = true;
      })
      .start();
  }

  setTimeout(() => {
    textPoints.visible = false;
    modelPoints.visible = true;
    ready = true;
  }, 1200);
}

async function renderText() {
  const fontLoader = new FontLoader();

  const font = await fontLoader.loadAsync('/Noto Sans_Bold.json');

  const textGeo = new TextGeometry('illumin-art', {
    font: font,
    size: 20,
    curveSegments: 12,
    bevelEnabled: false,
    depth: 1,
    bevelThickness: 1,
    bevelSize: 0.5,
    bevelSegments: 5
  });

  textGeo.center();
  const textMaterial = new MeshStandardMaterial()
  const text = new Mesh(textGeo, textMaterial)
  text.castShadow = true

  let sampler = new MeshSurfaceSampler(text).build();
  let textVertices = [];
  for (let i = 0; i < 90000; i++) {
    let tempPosition = new Vector3();
    sampler.sample(tempPosition);
    textVertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
  }

  let pointsGeometry = new BufferGeometry();
  pointsGeometry.setAttribute('position', new Float32BufferAttribute(textVertices, 3));
  let pointsMaterial = new PointsMaterial({
    color: 0x5c0b17,
    opacity: 0.8,
    alphaMap: new TextureLoader().load('particle-texture.jpg'),
    sizeAttenuation: true,
    size: 0.1,

    // uniforms: {...Ss, uProgress: {value: 0}},
    // vertexColors: true,
    depthWrite: false,
    depthTest: true,
    blending: AdditiveBlending,
    // vertexShader: vertexShader,
    // fragmentShader: fragmentShader,
    transparent: true,
  });
  let textPoints = new Points(pointsGeometry, pointsMaterial);

  return Promise.resolve(textPoints)
}

function renderModel(): Promise<Points> {
  const loader = new GLTFLoader();
  return new Promise(resolve => {

    loader.load('/rocket_v2.gltf', (gltf) => {
      const tempPosition = new Vector3();//三维向量
      const sum = 10000;

      const verticeses = [];

      gltf.scene.position.set(0, 0, 0);

      gltf.scene.traverse(mesh => {
        if (!isMesh(mesh)) {
          return
        }

        const sampler = new MeshSurfaceSampler(mesh).build();//为模型添加采样器

        for (let i = 0; i < sum; i++) {
          sampler.sample(tempPosition);//通过采样器随机位置采样--(x,y,z)
          verticeses.push(tempPosition.x, tempPosition.y, tempPosition.z)
        }
      })

      const pointsGeometry = new BufferGeometry();
      pointsGeometry.setAttribute('position', new Float32BufferAttribute(verticeses, 3));
      //将几何体和材质组合成一个 Points 对象
      const pointsMaterial = new PointsMaterial({
        color: 0x5c0b17,
        opacity: 0.8,
        alphaMap: new TextureLoader().load('particle-texture.jpg'),
        sizeAttenuation: true,
        size: 0.1,

        // uniforms: {...Ss, uProgress: {value: 0}},
        // vertexColors: true,
        depthWrite: false,
        depthTest: true,
        blending: AdditiveBlending,
        // vertexShader: vertexShader,
        // fragmentShader: fragmentShader,
        transparent: true,
      });

      const points = new Points(pointsGeometry, pointsMaterial);
      points.scale.set(0.05, 0.05, 0.05);

      // 设置mesh对象的rotation.y属性为90度对应的弧度值
      points.rotation.y = -1.308;
      points.rotation.x = -1.029;
      points.rotation.z = -2.496;

      resolve(points)
    })
  })
}

main();
