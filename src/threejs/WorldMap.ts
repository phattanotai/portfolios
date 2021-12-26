import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  DirectionalLight,
  PCFSoftShadowMap,
  SphereGeometry,
  MeshBasicMaterial,
  TextureLoader,
  AmbientLight,
  MeshPhongMaterial,
} from "three";

import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class WorldMap {
  renderer: WebGLRenderer = new WebGLRenderer();
  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera();
  canvas: any;
  controls: OrbitControls | any;
  earth: Mesh | undefined;
  moon: Mesh | undefined;
  sun: Mesh | undefined;
  clouds: Mesh;
  earthVec = new THREE.Vector3(0, 0, 0);
  moonTheta = 0;
  sunTheta = 0;
  moonR = 15;
  earthR = 200;
  dx = 0.01;
  dy = -0.01;
  dz = -0.05;
  ambientLight: AmbientLight;
  spotLight: DirectionalLight;
  lastTime = Date.now();
  canvasContainer: HTMLElement;

  constructor() {
    this.canvasContainer = document.getElementById("canvasContainer");
    if (this.canvasContainer) {
      this.onInit();
      this.onCreateObjects();
      this.onRender();
    }
  }

  onInit() {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "three-canvas");
    this.canvasContainer.appendChild(this.canvas);
    this.renderer = new WebGLRenderer({ canvas: this.canvas });

    this.renderer.setSize(this.canvasContainer.offsetWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.scene = new Scene();

    this.camera = new PerspectiveCamera(
      60,
      this.canvasContainer.offsetWidth / window.innerHeight,
      0.1,
      2000
    );
    this.camera.position.set(0, 2, 15);
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
    // this.ambientLight = new AmbientLight(0xf1f1f1);
    // this.scene.add(this.ambientLight);

    this.spotLight = new DirectionalLight(0xf1f1f1);
    this.spotLight.position.set(50, 50, 50);
    this.scene.add(this.spotLight);

    this.setStars();
    this.setClouds();

    this.earth = new Mesh(
      new SphereGeometry(5, 50, 50),
      new MeshPhongMaterial({
        color: 0xf2f2f2,
        specular: 0xbbbbbb,
        shininess: 2,
        map: new TextureLoader().load("./assets/textures/map-world.jpeg"),
      })
    );

    this.earth.position.set(0, 0, 0);
    this.earthVec = new THREE.Vector3(
      this.earth.position.x,
      this.earth.position.y,
      this.earth.position.z
    );

    this.scene.add(this.earth);

    this.moon = new Mesh(
      new SphereGeometry(0.8, 50, 50),
      new MeshBasicMaterial({
        map: new TextureLoader().load("./assets/textures/map-moon.jpeg"),
      })
    );

    this.moon.position.set(this.moonR, 0, 0);
    this.scene.add(this.moon);

    this.sun = new Mesh(
      new SphereGeometry(20, 50, 50),
      new MeshBasicMaterial({
        color: 0xff0000,
        map: new TextureLoader().load("./assets/textures/map-sun.jpeg"),
      })
    );

    this.sun.position.set(this.earthR, 0, 0);
    this.scene.add(this.sun);
  }

  onRender = () => {
    this.controls.update();
    if (!!this.earth) {
      this.earth.rotation.y += 0.001;
    }

    if (!!this.clouds) {
      this.clouds.rotation.y += 0.00005;
    }

    if (!!this.moon && !!this.earth) {
      const dTheta = (2 * Math.PI) / 2000;
      this.moonTheta += dTheta;

      this.moon.rotation.y += 0.005;

      this.moon.position.set(
        this.earth.position.x + this.moonR * Math.cos(this.moonTheta),
        this.moon.position.y,
        this.earth.position.z + this.moonR * Math.sin(this.moonTheta)
      );
    }

    if (!!this.sun) {
      this.sun.rotation.y += 0.001;

      const dTheta = (2 * Math.PI) / 10000;
      this.sunTheta += dTheta;
      this.sun.position.x = this.earthR * Math.cos(this.sunTheta);
      this.sun.position.z = this.earthR * Math.sin(this.sunTheta);

      this.spotLight.position.set(
        this.sun.position.x,
        this.sun.position.y,
        this.sun.position.z
      );
    }

    // // Flyby;
    // if (this.camera.position.z < 0) {
    //   this.dx *= -1;
    // }

    // this.camera.position.x += this.dx;
    // this.camera.position.y += this.dy;
    // this.camera.position.z += this.dz;

    // this.camera.lookAt(this.earthVec);

    // //Flyby reset
    // if (this.camera.position.z < -50) {
    //   this.camera.position.set(0, 0, 35);
    // }

    this.camera.lookAt(this.earthVec);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.onRender);
  };

  setStars = () => {
    // const starGeometry = new BufferGeometry();
    // const starMaterial = new PointsMaterial({
    //   color: 0xffffff,
    // });

    // const starVertices: number[] = [];
    // for (let i = 0; i < 10000; i++) {
    //   const x = (Math.random() - 0.5) * 2000;
    //   const y = (Math.random() - 0.5) * 2000;
    //   const z = -Math.random() * 2000;

    //   starVertices.push(x, y, z);
    // }

    // starGeometry.setAttribute(
    //   "position",
    //   new Float32BufferAttribute(starVertices, 3)
    // );

    // const stars = new Points(starGeometry, starMaterial);
    // this.scene.add(stars);

    //Stars
    const starGeometry = new THREE.SphereGeometry(1000, 50, 50);
    const starMaterial = new THREE.MeshBasicMaterial({
      map: new TextureLoader().load("./assets/textures/galaxy_starfield.png"),
      side: THREE.DoubleSide,
    });
    const starField = new THREE.Mesh(starGeometry, starMaterial);
    this.scene.add(starField);
  };

  setClouds = () => {
    //Clouds
    const cloudGeometry = new THREE.SphereGeometry(5.3, 50, 50);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: new TextureLoader().load("./assets/textures/clouds_2.jpg"),
      transparent: true,
      opacity: 0.1,
    });
    this.clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    this.scene.add(this.clouds);
  };
}
