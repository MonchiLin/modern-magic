import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {DoubleSide, Mesh, PerspectiveCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer} from "three";
import {Font, FontLoader} from "three/examples/jsm/loaders/FontLoader";

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
        // 如果小于 0.5 则返回 0， 否则返回 1 （也就是说大于等于 0.5 都返回 1）
        strength = step(0.5, strength);
        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern10
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
        float strength = mod((vUv.x * 10.0), 1.0);
        // 如果小于 0.5 则返回 0， 否则返回 1 （也就是说大于等于 0.5 都返回 1）
        strength = step(0.5, strength);
        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern11
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
        // 设想， 上面的 x 和 y 经过重新映射范围 0~1 -> 0~10 -> [0...0, 1...1, 0....0, 1...1]
        // 假设渲染坐标为 (0, 1) 那么结果为 (0, 1)  X 轴无颜色， Y 轴有颜色
        // 假设渲染坐标为 (0, 0) 那么结果为 (0, 0)  X 轴有颜色， Y 轴无颜色
        // 假设渲染坐标为 (1, 1) 那么结果为 (1, 1)  X 轴有颜色， Y 轴乌颜色
        float strength = step(0.5, mod((vUv.x * 10.0), 1.0));
        strength += step(0.5, mod((vUv.y * 10.0), 1.0));

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern12
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
        float strength = step(0.8, mod((vUv.x * 10.0), 1.0));
        // 秘诀在于如果上面是 0，这里必定也是 0
        strength *= step(0.8, mod((vUv.y * 10.0), 1.0));

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern14
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
        float barX = step(0.4, mod((vUv.x * 10.0), 1.0));
        barX *= step(0.8, mod((vUv.y * 10.0), 1.0));
        float barY = step(0.8, mod((vUv.x * 10.0), 1.0));
        barY *= step(0.4, mod((vUv.y * 10.0), 1.0));

        float strength = barX + barY;

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern15
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
        float barX = step(0.4, mod((vUv.x * 10.0), 1.0));
        barX *= step(0.8, mod((vUv.y * 10.0) + 0.2, 1.0));

        float barY = step(0.8, mod((vUv.x * 10.0) + 0.2, 1.0));
        barY *= step(0.4, mod((vUv.y * 10.0), 1.0));

        float strength = barX + barY;

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern16
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
        // 这里其实是把 0~1 映射到 0.5 ~ 0 ~ 0.5
        // 0.0 -> 0.5
        // 0.1 -> 0.4
        // 0.2 -> 0.3
        // 0.3 -> 0.2
        // 0.4 -> 0.1
        // 0.5 -> 0.0
        // 0.6 -> 0.1
        // 0.7 -> 0.2
        // 0.8 -> 0.3
        // 0.9 -> 0.4
        // 1.0 -> 0.5
        float strength = abs(vUv.x - 0.5);

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern17 pattern17.ts
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
        float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern18 pattern18.ts
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
        float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern19: import "./pattern18.ts" 控制台看输出结果
  // 可以看到越靠近 (0.5,0.5) 值域越接近 0.0, 所以这里 step(0.2) 就会输出靠近 (0.5,0.5) 20% 范围的值
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
        float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern20
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
        float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
        strength *= 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern21
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
        float strength = floor(vUv.x * 10.0) / 10.0;

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern22
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
        float strength = floor(vUv.x * 10.0) / 10.0;
        strength *= floor(vUv.y * 10.0) / 10.0;

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern23
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

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        float strength = random(vUv);

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern24
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

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 gridUV = vec2(
          floor(vUv.x * 10.0) / 10.0,
          floor(vUv.y * 10.0) / 10.0
        );
        float strength = random(gridUV);

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern25
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

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 gridUV = vec2(
          floor(vUv.x * 10.0) / 10.0,
          floor(vUv.y * 10.0 + vUv.x * 5.0) / 10.0
        );
        float strength = random(gridUV);

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern26
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
        float strength = length(vUv);

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern27
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
//        float strength = length(vUv - .5);
        float strength = distance(vUv, vec2(0.5, 0.5));

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern28
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
        float strength = 1.0 - distance(vUv, vec2(0.5, 0.5));

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern29
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
        float strength = 0.015 / distance(vUv, vec2(0.5, 0.5));

        gl_FragColor = vec4(strength, strength, strength, 1.0);
      }
    `
  },
  // pattern30
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
        float strength = 0.015 / distance(vUv, vec2(0.5, 0.5));

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
  setTimeout(() =>{
    document.body.scrollTo({
      left: 0,
      top: Number.MAX_VALUE
    })
  })
})
