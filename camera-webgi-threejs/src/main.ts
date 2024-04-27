import {PerspectiveCamera, Scene, WebGLRenderer} from "three";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js";
import gsap from "gsap";

const renderer = new WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const scene = new Scene()

document.body.appendChild(renderer.domElement)


// scene.background = texture;
// scene.environment = texture;

// render();
gsap.to({}, {})

// model

const loader = new GLTFLoader();
loader.dracoLoader = new DRACOLoader();
loader.dracoLoader.setDecoderPath('/draco/');

loader.load('camera.glb', async function (gltf) {
  console.log(gltf)
  const model = gltf.scene;

  // wait until the model can be added to the scene without blocking due to shader compilation

  await renderer.compileAsync(model, camera, scene);

  scene.add(model);

  render();

});

// new RGBELoader()
//   .load('environment.hdr', function (texture) {
//
//     texture.mapping = EquirectangularReflectionMapping;
//
//
//   });

const render = () => {
  requestAnimationFrame(render)
  renderer.render(scene, camera);
}

render()
