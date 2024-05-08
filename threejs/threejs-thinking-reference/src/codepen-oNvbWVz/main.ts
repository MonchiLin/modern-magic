import {BufferAttribute, Clock, Color, Fog, PerspectiveCamera, Points, Scene, ShaderMaterial, TorusKnotGeometry, WebGLRenderer} from "three";

let scene: Scene, camera: PerspectiveCamera;
let aspectRatio = window.innerWidth / window.innerHeight,
  fov = 55;
let geometry: TorusKnotGeometry, material: ShaderMaterial, particles: Points;
let renderer: WebGLRenderer;
let clock: Clock;
let mouseX: number, mouseY: number;
let random: Float32Array;
let screenWidth = window.innerWidth,
  screenHeight = window.innerHeight;
let uniforms: {
  fogColor: { type: "c", value: Color },
  fogNear: { type: "f", value: number },
  fogFar: { type: "f", value: number },
  time: { type: "f", value: number },
  screenWidth: { type: "f", value: number },
  screenHeight: { type: "f", value: number },
  fog: { value: boolean }
};

document.addEventListener('mousemove', function (e) {
  mouseX = e.screenX;
  mouseY = e.screenY;
});

function createParticleSystem(scene) {
  uniforms = {
    fogColor: {type: "c", value: scene.fog.color},
    fogNear: {type: "f", value: scene.fog.near},
    fogFar: {type: "f", value: scene.fog.far},
    time: {type: "f", value: 1},
    screenWidth: {type: "f", value: screenWidth},
    screenHeight: {type: "f", value: screenHeight},
    fog: {value: true}
  };

  geometry = new TorusKnotGeometry(10, 3, 100, 64);
  random = new Float32Array(geometry.attributes.position.count);
  for (let g = 0; g < random.length; g++) {
    random[g] = Math.random() * 1 + 0.1;
  }

  geometry.setAttribute('random', new BufferAttribute(random, 1));
  material = new ShaderMaterial({
    uniforms: uniforms,
    fog: true,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  });

  particles = new Points(geometry, material);
  scene.add(particles);

}

document.addEventListener('click', function () {
  // uniforms.time.value = 0;
});

function main() {
  clock = new Clock();
  scene = new Scene();
  camera = new PerspectiveCamera(fov, aspectRatio, 1, 1000);
  camera.position.z = 50;

  renderer = new WebGLRenderer({antialias: true, alpha: true});
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene.fog = new Fog(0x000000, 25, 60);
  createParticleSystem(scene);

  document.body.appendChild(renderer.domElement);

  animate();
}

function animate() {
  particles.rotation.y += .001;
  // if (mouseX) {
  //   gsap.to(particles.rotation, 5, {x: ((mouseY - 700) / 200), y: ((mouseX - 200) / 200), ease: Strong.easeOut});
  // }

  uniforms.time.value += 0.1;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

/**
 * -----------------------------------
 * uniform 变量由用户自己注入, 这里主要看 time
 * -----------------------------------
 */
const vertexShader = `
uniform float screenWidth;
uniform float screenHeight;
uniform float time;
attribute float random;

void main() {
  float timeLarge = time * 100.0;
  vec3 newPosition = vec3(
    position.x,
    position.y
    - inversesqrt(timeLarge -(random*2000.0))
    * 700.0
    + (inversesqrt(time) * 65.0)
    + (inversesqrt(time) * 10.0),
    position.z
  );
  gl_PointSize = 1.8;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
`

const fragmentShader = `

void main() {
  gl_FragColor = vec4(0.35, 0.36, 0.37, 1.0);
}
`

main();
