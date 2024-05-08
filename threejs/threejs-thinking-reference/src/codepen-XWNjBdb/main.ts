import {AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, LoadingManager, Mesh, MeshBasicMaterial, Object3DEventMap, PerspectiveCamera, PlaneGeometry, Raycaster, Scene, ShaderMaterial, ShapeGeometry, Texture, TextureLoader, Vector2, Vector3, WebGLRenderer} from "three";
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let manager: LoadingManager

function main() {
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

    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableDamping = true;
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
  private buttom: boolean;
  private data: { area: number; ease: number; amount: number; textSize: number; particleColor: number; particleSize: number; text: string };
  private planeArea: Mesh<PlaneGeometry, MeshBasicMaterial, Object3DEventMap>;

  constructor(scene: Scene, font: Font, particle: Texture, camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.scene = scene;
    this.font = font;
    this.particleImg = particle;
    this.camera = camera;
    this.renderer = renderer;


    this.raycaster = new Raycaster();
    this.mouse = new Vector2(-200, 200);
    this.colorChange = new Color();

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

  }

  createText() {
    let thePoints = [];
    // 获取所有文字的 Shape 对象
    // generateShapes 生成轮廓形状
    let shapes = this.font.generateShapes(this.data.text, this.data.textSize);

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

    // 大概为 1500 * 11 + 2 * 750 = 18000
    // console.log(thePoints)
    // 1500 * 11 + 2 * 750 * 3 = 54000
    // console.log(colors)
    // 1500 * 11 + 2 * 750 = 18000
    // console.log(sizes)

    const geoParticles = new BufferGeometry()
      .setFromPoints(thePoints)
      .translate(xMid, yMid, 0)

    // 存到 attr 里面
    geoParticles.setAttribute('customColor', new Float32BufferAttribute(colors, 3));
    geoParticles.setAttribute('size', new Float32BufferAttribute(sizes, 1));

    const material = new ShaderMaterial({
      uniforms: {
        color: {value: new Color(0xffffff)},
        pointTexture: {value: this.particleImg},
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      // https://www.youtube.com/watch?v=AxopC4yW4uY
      blending: AdditiveBlending,
      // 深度测试是渲染管线中的一个步骤，它比较每个像素的深度值（即像素到观察者的距离），以决定是否应该绘制该像素
      depthTest: false,
      transparent: true,
    })

  }

  onMouseDown() {

  }

  onMouseMove() {

  }

  onMouseUp() {

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
}

main()

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
  attribute float size;
  attribute vec3 customColor;
  varying vec3 vColor;

  void main() {
    vColor = customColor;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_PointSize = size * ( 300.0 / -mvPosition.z );
    gl_Position = projectionMatrix * mvPosition;
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
 uniform vec3 color;
 uniform sampler2D pointTexture;
 varying vec3 vColor;

 void main() {
   gl_FragColor = vec4( color * vColor, 1.0 );
   gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
 }
`
