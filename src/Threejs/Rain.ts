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
  BufferGeometry,
  PointsMaterial,
  Float32BufferAttribute,
  Points,
} from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class WorldMap {
  renderer: WebGLRenderer = new WebGLRenderer();
  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera();
  canvas: any;
  controls: OrbitControls | any;
  sphere: Mesh | undefined;

  constructor() {
    this.canvas = document.getElementById("three-canvas");
    this.onInit();
    this.onCreateObjects();
    this.onRender();
  }

  onInit() {
    this.renderer = new WebGLRenderer({ canvas: this.canvas });
    const canvasContainer: any = document.getElementById("canvasContainer");

    this.renderer.setSize(canvasContainer.offsetWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.scene = new Scene();

    this.camera = new PerspectiveCamera(
      60,
      canvasContainer.offsetWidth / window.innerHeight,

      0.1,
      1000
    );
    this.camera.position.set(0, 0, 15);
    this.camera.lookAt(0, 0, 0);
    this.controls = new OrbitControls(this.camera, this.canvas);
    window.addEventListener("resize", this.onResize);
  }

  onResize = () => {
    const canvasContainer: any = document.getElementById("canvasContainer");
    const w = canvasContainer.offsetWidth;
    // const h = canvasContainer.offsetHeight;
    // const w = window.innerWidth;
    const h = window.innerHeight;

    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w, h);
  };

  onCreateObjects() {
    this.sphere = new Mesh(
      new SphereGeometry(5, 50, 50),
      new MeshBasicMaterial({
        color: 0xff0000,
        map: new TextureLoader().load("./images/map-world.jpeg"),
      })
    );

    this.scene.add(this.sphere);
    this.setStars();
  }

  onRender = () => {
    requestAnimationFrame(this.onRender);
    this.controls.update();
    if (!!this.sphere) {
      this.sphere.rotation.y += 0.001;
    }
    this.renderer.render(this.scene, this.camera);
  };

  setStars = () => {
    const starGeometry = new BufferGeometry();
    const starMaterial = new PointsMaterial({
      color: 0xffffff,
    });

    const starVertices: number[] = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;

      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(starVertices, 3)
    );

    const stars = new Points(starGeometry, starMaterial);
    this.scene.add(stars);
  };
}
