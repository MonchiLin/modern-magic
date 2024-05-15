import {Clock, DoubleSide, Mesh, MeshBasicMaterial, MirroredRepeatWrapping, PerspectiveCamera, PlaneGeometry, RepeatWrapping, Scene, ShaderMaterial, TextureLoader, Uniform, WebGLRenderer} from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

/**
 * Base
 */
// Debug
// const gui = new GUI()

// Scene
const scene = new Scene()

// Loaders
const textureLoader = new TextureLoader()
const gltfLoader = new GLTFLoader()

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 8
camera.position.y = 10
camera.position.z = 12
scene.add(camera)

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  antialias: true
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)
// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.y = 3
controls.enableDamping = true

/**
 * Model
 */
gltfLoader.load(
  '/bakedModel.glb',
  (gltf) => {
    ((gltf.scene.getObjectByName('baked') as Mesh).material as MeshBasicMaterial).map.anisotropy = 8
    scene.add(gltf.scene)
  }
)

/**
 * Smoke
 */
// Geometry
const smokeGeometry = new PlaneGeometry(1, 1, 16, 64);
smokeGeometry.translate(0, 0.5, 0);
smokeGeometry.scale(1.5, 6, 1.5);

// Perlin texture
const perlinTexture = textureLoader.load('/perlin.png');

perlinTexture.wrapS = RepeatWrapping
perlinTexture.wrapT = RepeatWrapping

// Material
// Language=GLSL
const smokeMaterial = new ShaderMaterial({
  vertexShader: `
    uniform float uTime;
    uniform sampler2D uPerlinTexture;

    varying vec2 vUv;

    vec2 rotate2D(vec2 value, float angle)
    {
        float s = sin(angle);
        float c = cos(angle);
        mat2 m = mat2(c, s, -s, c);
        return m * value;
    }

    void main() {
        vec3 newPosition = position;

        float twistPosition = texture(uPerlinTexture, vec2(0.5, uv.y * 0.2 - uTime * 0.005)).r;

        float angle = twistPosition * 10.0;
        newPosition.xz = rotate2D(newPosition.xz, angle);

        vec2 windOffset = vec2(
          texture(uPerlinTexture, vec2(0.25, uTime * 0.01)).r -0.5,
          texture(uPerlinTexture, vec2(0.75, uTime * 0.01)).r -0.5
        );
        windOffset *= pow(uv.y, 3.0) * 10.0;

        newPosition.xz += windOffset;

        // Final position
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

        // Varyings
        vUv = uv;
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform sampler2D uPerlinTexture;

    varying vec2 vUv;

    void main() {
        // 缩放和动画
        vec2 smokeUv = vUv;
        smokeUv.x *= 0.8;
        smokeUv.y *= 0.6;
        smokeUv.y -= uTime * 0.03;

        float smoke = texture(uPerlinTexture, smokeUv).r;
        smoke = smoothstep(0.4, 1.0, smoke);

        // EDGES
        smoke *= smoothstep(0.0, 0.1, vUv.x);
        smoke *= smoothstep(1.0, 0.9, vUv.x);
        smoke *= smoothstep(0.0, 0.1, vUv.y);
        smoke *= smoothstep(1.0, 0.9, vUv.y);

        // Final color
        gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);
        // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
    }
  `,
  uniforms: {
    uTime: new Uniform(0),
    uPerlinTexture: new Uniform(perlinTexture) // replaces the so far used { value: perlinTexture } syntax
  },
  side: DoubleSide,
  transparent: true,
  depthWrite: false, // fixes the transparency occlusion
  // wireframe: true,
})

// Mesh
const smoke = new Mesh(smokeGeometry, smokeMaterial);
smoke.position.y = 1.83;
scene.add(smoke);

/**
 * Animate
 */
const clock = new Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update smoke
  smokeMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
