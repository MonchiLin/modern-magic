import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DoubleSide, Mesh, MeshPhongMaterial, PerspectiveCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer} from "three";
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {TextGeometry} from "three/examples/jsm/geometries/TextGeometry";

// language=GLSL
const patterns = [
  // pattern1
  {
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        gl_FragColor = vec4(vUv, 0.0, 1.0);
      }
    `
  },
  // pattern2
  {
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);
      }
    `
  },
  // pattern3
  {
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        gl_FragColor = vec4(vUv.x, vUv.x, vUv.x, 1.0);
      }
    `
  },
  // pattern6
  {
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        float strength = vUv.y * 10.0;
        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern7
  {
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    /**
     * 首先 y 的取值范围为 0~1, 将其放大十倍后就变成了 0~10, 然后取模 1
     * 1.1 % 1 = 0.1
     * 1.2 % 1 = 0.2
     * ....
     * 1.9 % 1 = 0.9
     * 2.0 % 1 = 0.0
     *
     * 重复到 10 就变成了100(方便描述)次 0~1 的循环
     */
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        float strength = mod((vUv.y * 10.0), 1.0);
        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },

  // pattern8
  {
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;

      void main() {
        float strength = mod((vUv.y * 10.0), 1.0);
        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },

]

function createShader(item: { vertexShader: string, fragmentShader: string, index: number, font: Font },) {
  let w = window.innerWidth / 2
  let h = window.innerHeight / 2

  // 创建场景、相机和渲染器
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, w / h, 0.1, 1000);
  camera.position.z = 5;
  const renderer = new WebGLRenderer();
  renderer.setSize(w, h);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const geometry = new PlaneGeometry(4, 4, 32, 32)

  const material = new ShaderMaterial({
    vertexShader: item.vertexShader,
    fragmentShader: item.fragmentShader,
    side: DoubleSide
  })

  const mesh = new Mesh(geometry, material)
  scene.add(mesh)

  // 动画循环
  function animate() {
    controls.update()
    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    // Update sizes
    w = window.innerWidth / 2
    h = window.innerHeight / 2

    // Update camera
    camera.aspect = w / h
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  renderer.setAnimationLoop(animate)

  return {
    scene,
    camera,
    renderer,
  }
}

new FontLoader().load('/Roboto_Bold.json', font => {
  patterns.forEach((item, index) => {
    createShader({
      vertexShader: item.vertexShader,
      fragmentShader: item.fragmentShader,
      index,
      font
    })
  })

})
