import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  MathUtils,
  PlaneGeometry,
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  DirectionalLight,
  PCFSoftShadowMap,
  SphereGeometry,
  MeshBasicMaterial,
  TextureLoader,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class RedBox {
  renderer: WebGLRenderer = new WebGLRenderer();
  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera();
  canvas: any;
  controls: OrbitControls | any;
  redBox: Mesh | undefined;
  bV: number = 0;

  canvasContainer;

  constructor() {
    this.canvasContainer = document.getElementById("canvasContainer");
    if (this.canvasContainer) {
      this.init();
      this.createObjects();
      this.render();
    }
  }

  windowResize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  init() {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "three-canvas");
    this.canvasContainer.appendChild(this.canvas);
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

    this.scene = new Scene();

    this.camera = new PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2, 5);
    this.camera.lookAt(0, 0, 0);

    this.controls = new OrbitControls(this.camera, this.canvas);

    window.addEventListener("resize", this.windowResize);
  }

  createObjects() {
    const floorGeometry = new PlaneGeometry(10, 10);
    const floorMaterial = new MeshStandardMaterial({
      color: 0xffffff,
    });

    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.castShadow = true;
    floor.rotation.x = -Math.PI / 2;

    floor.rotation.x = MathUtils.degToRad(-90);
    this.scene.add(floor);

    this.redBox = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ color: 0xff0000 })
    );

    this.redBox.position.y = 2;
    this.redBox.castShadow = true;
    this.scene.add(this.redBox);

    const dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 10, 5);
    dirLight.castShadow = true;
    this.scene.add(dirLight);
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.controls.update();

    if (!!this.redBox) {
      this.redBox.rotation.x += 0.01;
      this.redBox.rotation.y += 0.01;
      this.redBox.rotation.z += 0.01;

      this.redBox.position.y = Math.sin((this.bV += 0.01)) + 1.5;
    }

    this.renderer.render(this.scene, this.camera);
  };
}
