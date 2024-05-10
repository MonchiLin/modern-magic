import {AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, LoadingManager, Mesh, MeshBasicMaterial, NormalBufferAttributes, Object3DEventMap, PerspectiveCamera, PlaneGeometry, Points, Raycaster, Scene, ShaderMaterial, ShapeGeometry, Texture, TextureLoader, Vector2, Vector3, WebGLRenderer} from "three";
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader";
import * as dat from "lil-gui";

let manager: LoadingManager
const gui = new dat.GUI()
const globalParameters = {
  animationSpeed: 12,
}

gui.add(globalParameters, 'animationSpeed', 0, 100)


function main3() {
  manager = new LoadingManager()

  let fontType: Font

  manager.onProgress = (url, loaded, total) => {
    console.log(url, loaded, total)
  }

  manager.onLoad = () => {
    const environment = new Environment(fontType, particleTexture)
  }

  const fontLoaders = new FontLoader(manager)
  fontLoaders.load("/codepen-XWNjBdb/font_zsd4dr.json", font => {
    fontType = font
  })
  const particleTexture = new TextureLoader(manager).load("/codepen-XWNjBdb/particle_a64uzf.png")
}

class Environment {
  private particle: Texture;
  private font: Font;
  private scene: Scene;
  private renderer: WebGLRenderer;
  private camera: PerspectiveCamera;
  private createParticles: CreateParticles;

  constructor(font: Font, particle: Texture) {
    this.font = font
    this.particle = particle
    this.scene = new Scene()

    this.createCamera();
    this.createRenderer();
    this.setup();
    this.bindEvents();

    // const controls = new OrbitControls(this.camera, this.renderer.domElement);
    // controls.enableDamping = true;
  }

  createCamera() {
    this.camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(0, 0, 100);
  }

  createRenderer() {
    this.renderer = new WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.body.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(() => {
      this.render()
    })
  }

  bindEvents() {
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    this.createParticles.render()
    this.renderer.render(this.scene, this.camera)
  }

  setup() {
    this.createParticles = new CreateParticles(
      this.scene,
      this.font,
      this.particle,
      this.camera,
      this.renderer
    )
  }
}

class CreateParticles {
  private scene: Scene;
  private font: Font;
  private particleImg: Texture;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private colorChange: Color;
  private mouse: Vector2;
  private raycaster: Raycaster;
  // 是否按下鼠标
  private buttom: boolean;
  private data: { area: number; ease: number; amount: number; textSize: number; particleColor: number; particleSize: number; text: string };
  private planeArea: Mesh<PlaneGeometry, MeshBasicMaterial, Object3DEventMap>;
  private particles: Points<BufferGeometry<NormalBufferAttributes>, ShaderMaterial, Object3DEventMap>;
  private currenPosition: Vector3;

  constructor(scene: Scene, font: Font, particle: Texture, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.scene = scene;
    this.font = font;
    this.particleImg = particle;
    this.camera = camera;
    this.renderer = renderer;


    this.raycaster = new Raycaster();
    this.mouse = new Vector2(-200, 200);
    this.colorChange = new Color();

    const colorChangeGui = gui.addFolder('colorChange')
    colorChangeGui.add(this.colorChange, "r", 0, 1)
    colorChangeGui.add(this.colorChange, "g", 0, 1)
    colorChangeGui.add(this.colorChange, "b", 0,1)

    this.buttom = false;

    this.data = {
      text: 'FUTURE\nIS NOW',
      amount: 1500,
      particleSize: 1,
      particleColor: 0xffffff,
      textSize: 16,
      area: 250,
      ease: .05,
    }

    const dataGUI = gui.addFolder('data')
    dataGUI.add(this.data, 'text')
    dataGUI.add(this.data, 'amount')
    dataGUI.add(this.data, 'particleSize')
    dataGUI.add(this.data, 'particleColor')
    dataGUI.add(this.data, 'textSize')
    dataGUI.add(this.data, 'area', 0, 10000, 1)
    dataGUI.add(this.data, 'ease', 0, 1)

    this.setup();
    this.bindEvents();
  }


  setup() {
    const geometry = new PlaneGeometry(
      this.visibleWidthAtZDepth(100, this.camera),
      this.visibleHeightAtZDepth(100, this.camera),
    );
    const material = new MeshBasicMaterial({color: 0x00ff00, transparent: true});
    this.planeArea = new Mesh(geometry, material);
    this.planeArea.visible = false;
    this.createText();

    // this.scene.add(this.planeArea)
  }

  bindEvents() {
    document.addEventListener('mousedown', this.onMouseDown.bind(this));
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  render() {
    /**
     * 1. performance.now() 是一个高精度的时间戳,表示从页面加载开始到当前时刻经过的毫秒数。它提供了比 Date.now() 更高的精度和更稳定的性能。
     * 2. .001 * performance.now() 将时间戳转换为秒,因为 performance.now() 返回的是毫秒数。1 秒 = 1 毫秒 / 1000
     * 3. (.001 * performance.now()) % 12 对转换后的秒数进行取模运算,得到一个在 0 到 12 之间循环的值。
     * 4. ((.001 * performance.now()) % 12) / 12 将结果除以 12,将范围缩小到 0 到 1 之间。
     * 这样就完成了归一化, 12 可以理解成是动画周期的速度
     */
    const time = ((.001 * performance.now()) % globalParameters.animationSpeed) / globalParameters.animationSpeed;

    /**
     * https://en.wikipedia.org/wiki/Zigzag
     * 函数图像 https://www.desmos.com/calculator/ki8eefkxbx
     * (1 + (Math.sin(time * 2 * Math.PI))) / 6
     *
     * 1. time 变量是一个在 0 到 1 之间循环的值,代表了动画的进度。
     * 2. Math.sin(time * 2 * Math.PI) 计算了一个正弦函数的值:
     *  2.1 time * 2 * Math.PI 将 time 的范围从 0 到 1 映射到 0 到 2π。
     *  2.2 Math.sin() 函数接受一个弧度值,并返回对应的正弦值,范围在 -1 到 1 之间。
     *  2.3 这样,Math.sin(time * 2 * Math.PI) 的结果就是一个在 -1 到 1 之间平滑变化的值,随着 time 的变化而呈现出正弦波的形状。
     * 3. (1 + (Math.sin(time * 2 * Math.PI))) 将正弦函数的结果从 -1 到 1 的范围偏移到 0 到 2 的范围。
     * 4. 最后,(1 + (Math.sin(time * 2 * Math.PI))) / 6 将结果除以 6,将范围缩小到 0 到 1/3。
     */
    const zigzagTime = (1 + (Math.sin(time * 2 * Math.PI))) / 6;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObject(this.planeArea);

    if (intersects.length > 0) {

      // mx my mz 就是三维空间中鼠标的位置
      const mx = intersects[0].point.x;
      const my = intersects[0].point.y;
      const mz = intersects[0].point.z;

      this.particles.material.uniforms.time.value = time;
      this.particles.material.uniforms.mouseIn3d.value = new Vector3(mx, my, mz);
      this.particles.material.uniforms.defaultEase.value = this.data.ease;
      this.particles.material.uniforms.defaultSize.value = this.data.particleSize;

      return
    }
  }

  createText() {
    let thePoints = [];
    // 获取所有文字的 Shape 对象
    // generateShapes 生成轮廓形状
    let shapes = this.font.generateShapes(this.data.text, this.data.textSize);
    shapes = [shapes[0]]

    // 将 Shape 对象转换为 Mesh 对象
    let geometry = new ShapeGeometry(shapes);
    // 手动计算 BoundingBox, 不然 BoundingBox 为 null
    geometry.computeBoundingBox();
    // 计算中心点, 2.85 大概是个特殊值
    const xMid = (geometry.boundingBox.max.x - geometry.boundingBox.min.x) * -0.5;
    const yMid = (geometry.boundingBox.max.y - geometry.boundingBox.min.y) / 2.85;

    // 解除这里的注释可以看到 mesh 的目前位置是居中的
    // const mesh = new Mesh(geometry, new MeshBasicMaterial({color: this.data.particleColor}));
    // mesh.position.set(xMid, yMid, 0);
    // this.scene.add(mesh)

    // 将几何体的位置修改为原点
    geometry.center();

    // 记录所有的 path
    let holeShapes = [];

    for (let q = 0; q < shapes.length; q++) {
      let shape = shapes[q];
      if (shape.holes && shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          let hole = shape.holes[j];
          holeShapes.push(hole);
        }
      }
    }
    // 原来 shapes 里都是 shape 对象, 现在还多了 path(hole) 对象
    shapes.push(...holeShapes)
    let colors = []
    let sizes = [];

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      // 根据 shape 类型决定生成粒子的数量, 这里如果是 bole 就只生成一半的粒子
      const amountPoints = (shape.type === 'Path') ? this.data.amount / 2 : this.data.amount;
      // 这个代码的意义是在 shape 里生成指定数量的粒子, 并且保持均匀分配
      const points = shape.getSpacedPoints(amountPoints);
      points.forEach(point => {
        // 转为 vec3 并且存起来
        const vector3 = new Vector3(point.x, point.y, 0);
        thePoints.push(vector3);
        // 每个颜色也存一份
        colors.push(this.colorChange.r, this.colorChange.g, this.colorChange.b);
        // sizes 存个 1
        sizes.push(1)
      })
    }

    const geoParticles = new BufferGeometry()
      .setFromPoints(thePoints)
      .translate(xMid, yMid, 0)

    geoParticles.setAttribute('size', new Float32BufferAttribute(sizes, 1));
    geoParticles.setAttribute('initPosition', new Float32BufferAttribute(sizes, 3));

    const material = new ShaderMaterial({
      uniforms: {
        color: {value: new Color(0xffffff)},
        pointTexture: {value: this.particleImg},
        time: { value: 0.0 },
        mouseIn3d: { value: new Vector3() },
        defaultSize: { value: this.data.particleSize },
        defaultEase: { value: this.data.ease },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      blending: AdditiveBlending,
      depthTest: false,
      transparent: true,
    })

    this.particles = new Points(geoParticles, material);
    this.scene.add(this.particles);
  }


  onMouseDown(event) {
    // 归一化 x y, 并且更新
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const vector = new Vector3(this.mouse.x, this.mouse.y, 0.5);
    // 将 vector 从屏幕空间转换为三维空间中的点。这个转换考虑了相机的投影矩阵和视口的大小
    vector.unproject(this.camera);
    // 计算 vector 和相机的距离并且归一化
    const dir = vector.sub(this.camera.position).normalize();
    // 计算从相机位置沿着 dir 方向到达 vector 所表示的点的距离。这里假设相机是沿着Z轴负方向观察的。
    const distance = -this.camera.position.z / dir.z;
    // 根据计算出的距离和方向，创建一个新的位置向量 this.currenPosition，它代表了鼠标点击在世界空间中的确切位置。
    this.currenPosition = this.camera.position.clone().add(dir.multiplyScalar(distance));

    const pos = this.particles.geometry.attributes.position;
    this.buttom = true;
    this.data.ease = .01;
  }

  onMouseUp() {
    this.buttom = false;
    this.data.ease = .05;
  }

  onMouseMove(event) {
    // 归一化 x y, 并且更新
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  visibleWidthAtZDepth(depth: number, camera: PerspectiveCamera) {
    const height = this.visibleHeightAtZDepth(depth, camera);
    return height * camera.aspect;
  }

  visibleHeightAtZDepth(depth: number, camera: PerspectiveCamera) {
    const cameraOffset = camera.position.z;
    if (depth < cameraOffset) depth -= cameraOffset;
    else depth += cameraOffset;

    const vFOV = camera.fov * Math.PI / 180;

    return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
  }

  distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
  }

}

main3()

/**
 * 1. 声明了两个attribute变量size和customColor,分别表示点的大小和自定义颜色。
 * 2. 声明了一个varying变量vColor用于将颜色传递给片段着色器。
 * 3. 在main函数中:
 *  3.1 将customColor赋值给vColor
 *  3.2 计算顶点的模型视图坐标mvPosition
 *  3.3 根据mvPosition的z值计算点的大小gl_PointSize
 *  3.4 计算最终的裁剪空间坐标gl_Position
 */
const vertexShader = `
  #define PI 3.1415926535897932384626433832795

  uniform float time;
  uniform vec3 initPosition;
  uniform float defaultEase;

  attribute float size;
  attribute float defaultSize;
  attribute vec3 mouseIn3d;

  varying vec3 vColor;
  varying float vTime;

  float distanceTo(float x1, float y1, float x2, float y2) {
    return sqrt(pow(x1 - x2, 2.0) + pow(y1 - y2, 2.0));
  }

  float atan2(in float y, in float x) {
    bool s = (abs(x) > abs(y));
    return mix(PI/2.0 - atan(x,y), atan(y,x), s);
  }

  void main() {
    vTime = time;

    float initX = initPosition.x;
    float initY = initPosition.y;
    float initZ = initPosition.z;

    float px = position.x;
    float py = position.y;
    float pz = position.z;

    float vSize = defaultSize;

    float dx = mouseIn3d.x - px;
    float dy = mouseIn3d.y - py;

    float mouseDistance = distanceTo(mouseIn3d.x, mouseIn3d.y, px, py);

    float area = 250.0;
    float d = dx * dx + dy * dy;
    float f = -area / d;

    if (mouseDistance < area) {
      float t = atan2(dy, dx);

      float random = fract(sin(time) * 43758.5453);
      if (random < 0.25) {
        px -= .03 * cos(t);
        py -= .03 * sin(t);

        vColor = vec3(0.15, 1.0, 0.5);
        vSize = defaultSize / 1.2;
      } else {
        px += f * cos(t);
        py += f * sin(t);

        vSize = defaultSize * 1.3;

        if ((px > initX + 10.0 || px < initX - 10.0) || (py > initY + 10.0 || py < initY - 10.0)) {
          vColor = vec3(0.15, 1.0, 0.5);
          vSize = defaultSize * 1.8;
        }
      }

      px += (initX - px) * defaultEase;
      py += (initY - py) * defaultEase;
      pz += (initZ - pz) * defaultEase;

      vec4 mvPosition = modelViewMatrix * vec4(px, py, pz, 1.0);

      gl_PointSize = vSize * ( 300.0 / -mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;
    }
  }
`

/**
 * 1. 声明了两个uniform变量color和pointTexture,分别表示颜色和点的纹理。
 * 2. 接收顶点着色器传来的vColor。
 * 3. 在main函数中:
 *  3.1 将color和vColor相乘作为初始片元颜色
 *  3.2 用pointTexture采样当前片元坐标gl_PointCoord得到纹理颜色
 *  3.3 将片元颜色和纹理颜色相乘得到最终颜色
 */
const fragmentShader = `
  #define PI 3.1415926535897932384626433832795

  uniform float colorChangeSpeed;
  uniform vec3 mouseColor;
  uniform sampler2D pointTexture;

  uniform vec3 color;

  varying vec3 vColor;
  varying float vTime;

 void main() {
   float zigzagTime = 1.0 + (sin(vTime * 2.0 * PI)) / 6.0;

   gl_FragColor = vec4(color * vColor, 1.0);
   gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord);
 }
`
