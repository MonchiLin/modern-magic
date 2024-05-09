import {AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, LoadingManager, Mesh, MeshBasicMaterial, NormalBufferAttributes, Object3DEventMap, PerspectiveCamera, PlaneGeometry, Points, Raycaster, Scene, ShaderMaterial, ShapeGeometry, Texture, TextureLoader, Vector2, Vector3, WebGLRenderer} from "three";
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader";
import * as dat from "lil-gui";

let manager: LoadingManager
const gui = new dat.GUI()
const globalParameters = {
  animationSpeed: 12,
}

gui.add(globalParameters, 'animationSpeed', 0, 100)


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
  private geometryCopy: BufferGeometry<NormalBufferAttributes>;
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
      // 当前文字粒子的坐标
      const pos = this.particles.geometry.attributes.position;
      // 初始文字粒子的坐标
      const copy = this.geometryCopy.attributes.position;
      // 当前文字粒子的颜色
      const coulors = this.particles.geometry.attributes.customColor;
      //
      const size = this.particles.geometry.attributes.size;

      // mx my mz 就是三维空间中鼠标的位置
      const mx = intersects[0].point.x;
      const my = intersects[0].point.y;
      const mz = intersects[0].point.z;
      // 在 mx my mz 创建一个矩形, 方便调试, 3秒后移除掉, 通过这段代码可以, mx my mz 是三维空间中当前鼠标的位置
      // const rect = new Mesh(
      //   new PlaneGeometry(1, 1),
      //   new MeshBasicMaterial({color: 0xff0000}),
      // )
      // rect.position.set(mx, my, mz)
      // this.scene.add(rect)
      //  setTimeout(() => {
      //    this.scene.remove(rect)
      //  }, 3000)

      // 循环每一个粒子
      for (var i = 0, l = pos.count; i < l; i++) {
        // 获取初始位置
        const initX = copy.getX(i);
        const initY = copy.getY(i);
        const initZ = copy.getZ(i);

        // 获取粒子当前位置
        let px = pos.getX(i);
        let py = pos.getY(i);
        let pz = pos.getZ(i);

        // 修改粒子的 customColor 和 size 属性
        this.colorChange.setHSL(.5, 1, 1)
        coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b)
        coulors.needsUpdate = true;

        size.array[i] = this.data.particleSize;
        size.needsUpdate = true;

        // dx 表示鼠标的 x 坐标 mx 与粒子的 x 坐标 px 之间的差值。
        // dy 表示鼠标的 y 坐标 my 与粒子的 y 坐标 py 之间的差值。
        let dx = mx - px;
        let dy = my - py;
        const dz = mz - pz;

        // 欧几里得距离: 欧几里得距离是指在二维平面上，两点之间的直线距离。它可以通过勾股定理计算得出，即 sqrt((mx - px)^2 + (my - py)^2)。
        const mouseDistance = this.distance(mx, my, px, py)

        // 鼠标越靠近当前粒子的位置, d 越大, 反之则越小
        let d = dx * dx + dy * dy;

        /**
         * 这个是力的模拟, 当 d 越大, f 就越小, 作用是模拟鼠标对粒子施加的力的强度
         * 参考图像 https://www.desmos.com/calculator/bo1bner62o
         *
         * f 可以被理解为对力的模拟，特别是在物理模拟中，它通常表示一个物体对另一个物体施加的力的强度。在这个特定的上下文中，f 表示鼠标对粒子施加的力的强度，这个力可以是吸引力或排斥力，取决于代码中的逻辑和鼠标的状态（例如，鼠标是否被按下）。
         *
         * 在 render 函数中，f 的意义和意图可以从以下几个方面来理解：
         *
         * 交互性：f 的存在使得粒子系统能够响应用户的交互，即鼠标的移动。通过改变 f 的值，粒子的行为会随之改变，从而创造出一种动态的、交互式的视觉效果。
         *
         * 衰减效应：f 与 d（距离的平方和）成反比关系，这意味着随着粒子与鼠标之间距离的增加，粒子受到的力会减弱。这种衰减效应模拟了现实世界中力的传播方式，即力随着距离的增加而减弱。
         *
         * 控制粒子行为：f 的值被用来计算粒子的新位置，这直接影响粒子的移动。通过调整 f 的值，可以控制粒子是向鼠标靠拢（吸引力）还是远离鼠标（排斥力），以及这种移动的速度和幅度。
         *
         * 视觉反馈：f 的计算和应用为用户提供了一种视觉反馈，用户可以通过移动鼠标来直接影响粒子系统的行为。这种反馈增强了用户体验，使得用户感觉自己能够控制和影响场景中的元素。
         *
         * 动画效果：f 的动态变化是实现动画效果的关键。随着鼠标的移动，f 的值不断更新，导致粒子的位置和颜色也随之变化，从而创造出一种连续的、流畅的动画效果。
         *
         * 总的来说，f 在 render 函数中的意义是作为一个力的模拟，用于控制粒子系统对鼠标交互的响应。它的意图是通过模拟力和距离之间的关系，实现一个交互式的、动态的粒子动画效果，为用户提供一种直观和有趣的视觉体验。
         */
        const f = -this.data.area / d;

        if (this.buttom) {

          const t = Math.atan2(dy, dx);
          px -= f * Math.cos(t);
          py -= f * Math.sin(t);

          this.colorChange.setHSL(.5 + zigzagTime, 1.0, .5)
          coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b)
          coulors.needsUpdate = true;

          if ((px > (initX + 70)) || (px < (initX - 70)) || (py > (initY + 70) || (py < (initY - 70)))) {

            this.colorChange.setHSL(.15, 1.0, .5)
            coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b)
            coulors.needsUpdate = true;

          }

        } else {
          if (mouseDistance < this.data.area) {
            /**
             * 通过 atan2 可以得到一个弧度值, 值为鼠标与粒子之间的夹角弧度
             * 坐标系如下
             *         -90°
             *          |
             *          |
             *          |
             *          |
             * 180 ______________ 0°
             *          |
             *          |
             *          |
             *          |
             *        -90°
             */
            const t = Math.atan2(dy, dx);
            // 下面代码解除注释后会在控制台打印夹角的度数 方便调试, random > 0.9 防止卡死..
            // if (Math.random() > 0.9) {
            //   console.log(t * (180 / Math.PI))
            // }

            /**
             * 通过运行代码可以看到现在的效果是鼠标移动到粒子上时会产生一个粒子被推开的效果, 并且底部还有一个完整的 shape(文字)
             * 其实文字就是 i % 5 == 0 时渲染的, 试着把 5 变小就会发现底部 shape 变清晰, 反之则变模糊
             * 这是因为当这个 if 进去的比较多时底部 shape 渲染的次数就多, 从而视觉上更清晰
             */
            if (i % 5 == 0) {

              px -= .03 * Math.cos(t);
              py -= .03 * Math.sin(t);

              this.colorChange.setHSL(.15, 1.0, .5)
              coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b)
              coulors.needsUpdate = true;

              size.array[i] = this.data.particleSize / 1.2;
              size.needsUpdate = true;

            }
            else {
              px += f * Math.cos(t);
              py += f * Math.sin(t);

              pos.setXYZ(i, px, py, pz);
              pos.needsUpdate = true;

              // 这里让粒子新的大小比原来大一些, 这样就可以盖住底部的 shape, 试着修改 particleSize 或者把 1.3 修改成更大或者更小的值试试
              size.array[i] = this.data.particleSize * 1.3;
              size.needsUpdate = true;
            }

            if ((px > (initX + 10)) || (px < (initX - 10)) || (py > (initY + 10) || (py < (initY - 10)))) {

              this.colorChange.setHSL(.15, 1.0, .5)
              coulors.setXYZ(i, this.colorChange.r, this.colorChange.g, this.colorChange.b)
              coulors.needsUpdate = true;

              size.array[i] = this.data.particleSize / 1.8;
              size.needsUpdate = true;

            }
          }

        }

        px += (initX - px) * this.data.ease;
        py += (initY - py) * this.data.ease;
        pz += (initZ - pz) * this.data.ease;

        pos.setXYZ(i, px, py, pz);
        pos.needsUpdate = true;

      }
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
        // 为 shader 存入颜色和纹理变量
        color: {value: new Color(0xffffff)},
        pointTexture: {value: this.particleImg},
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      /**
       *
       * https://www.youtube.com/watch?v=AxopC4yW4uY
       *
       * blending属性用于设置材质的混合模式。这里设置为AdditiveBlending,表示使用加法混合。
       *
       * 加法混合的效果是,将材质的颜色值与背景的颜色值相加。这常用于创建发光、火焰等效果,因为加法混合会让亮度不断累加,产生更亮的效果。
       */
      blending: AdditiveBlending,
      /**
       * 深度测试的作用是决定哪些面片可以渲染、哪些被遮挡。默认情况下,深度测试是开启的。渲染时,远处的物体会被近处的物体遮挡。
       *
       * 禁用深度测试后,渲染顺序就完全取决于物体添加到场景的顺序,后添加的物体会覆盖先添加的物体,与远近无关。
       * 这种做法常用于渲染总是显示在最前面的效果,如火焰粒子、镜头光晕等。
       */
      depthTest: false,
      transparent: true,
    })

    /**
     * font -> shape(生成形状) -> shape.getSpacedPoints(根据形状变成粒子) -> new BufferGeometry().setFromPoints(thePoints) 变成 BufferGeometry
     */
    this.particles = new Points(geoParticles, material);
    this.scene.add(this.particles);

    // 这里是存一份初始的 geometry 的拷贝, 主要是为了用其原始的 position 属性
    this.geometryCopy = new BufferGeometry();
    this.geometryCopy.copy(this.particles.geometry);
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
