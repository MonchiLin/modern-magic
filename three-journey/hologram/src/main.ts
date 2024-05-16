import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import GUI from "lil-gui";
import {Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, TorusKnotGeometry, WebGLRenderer} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


/**
 * Base
 */
// Debug
const gui = new GUI()
gui.domElement.style.position = 'fixed'
gui.domElement.style.top = '0px'
gui.domElement.style.right = '0px'


// Scene
const scene = new Scene()

// Loaders
const gltfLoader = new GLTFLoader()

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.set(7, 7, 7)
scene.add(camera)

/**
 * Renderer
 */
const rendererParameters = {
  clearColor: '#1d1f2a'
}

const renderer = new WebGLRenderer({
  antialias: true
})
renderer.setClearColor(rendererParameters.clearColor)
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

document.body.appendChild(renderer.domElement)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

gui
  .addColor(rendererParameters, 'clearColor')
  .onChange(() =>
  {
    renderer.setClearColor(rendererParameters.clearColor)
  })

/**
 * Material
 */
const material = new MeshBasicMaterial()

/**
 * Objects
 */
// Torus knot
const torusKnot = new Mesh(
  new TorusKnotGeometry(0.6, 0.25, 128, 32),
  material
)
torusKnot.position.x = 3
scene.add(torusKnot)

// Sphere
const sphere = new Mesh(
  new SphereGeometry(),
  material
)
sphere.position.x = - 3
scene.add(sphere)

// Suzanne
let suzanne: Scene | null = null
gltfLoader.load(
  '/suzanne.glb',
  (gltf) =>
  {
    suzanne = gltf.scene as unknown as Scene
    suzanne.traverse((child) =>
    {
      if(child instanceof Mesh) {
        child.material = material
      }
    })
    scene.add(suzanne)
  }
)

/**
 * Animate
 */
const clock = new Clock()

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()

  // Rotate objects
  if(suzanne)
  {
    suzanne.rotation.x = - elapsedTime * 0.1
    suzanne.rotation.y = elapsedTime * 0.2
  }

  sphere.rotation.x = - elapsedTime * 0.1
  sphere.rotation.y = elapsedTime * 0.2

  torusKnot.rotation.x = - elapsedTime * 0.1
  torusKnot.rotation.y = elapsedTime * 0.2

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
