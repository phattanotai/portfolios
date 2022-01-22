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
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

export class Raycaster {
  renderer: WebGLRenderer = new WebGLRenderer();
  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera();
  canvas: any;
  controls: OrbitControls | any;
  redBox: Mesh | undefined;
  bV: number = 0;

  raycaster: THREE.Raycaster = new THREE.Raycaster(); // create once
  clickMouse: THREE.Vector2 = new THREE.Vector2(); // create once
  moveMouse: THREE.Vector2 = new THREE.Vector2(); // create once
  draggable: THREE.Object3D;
  canvasContainer: HTMLElement;

  constructor() {
    this.canvasContainer = document.getElementById("canvasContainer");
    if (this.canvasContainer) {
      this.init();
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
    this.renderer.setSize(this.canvasContainer.offsetWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      60,
      this.canvasContainer.offsetWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 20, 50);
    this.camera.lookAt(0, 0, 0);
    this.controls = new OrbitControls(this.camera, this.canvas);

    this.createLight();
    this.createFloor();
    this.createBox();
    this.createSphere();
    this.createCylinder();
    // this.createCastle();

    window.addEventListener("resize", this.windowResize);

    this.canvasContainer.addEventListener("click", (event) => {
      if (this.draggable != null) {
        console.log(`dropping draggable ${this.draggable.userData.name}`);
        this.draggable = null as any;
        return;
      }

      // THREE RAYCASTER

      const rect = this.renderer.domElement.getBoundingClientRect();
      this.clickMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.clickMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const found: any = this.intersect(this.clickMouse);
      if (found.length > 0) {
        if (found[0].object.userData.draggable) {
          this.draggable = found[0].object;
          console.log(`found draggable ${this.draggable.userData.name}`);
        }
      }
    });

    window.addEventListener("mousemove", (event) => {
      const rect = this.renderer.domElement.getBoundingClientRect();
      this.moveMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.moveMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });

    this.render();
  }

  createLight = () => {
    // ambient light
    let hemiLight = new THREE.AmbientLight(0xffffff, 0.2);
    this.scene.add(hemiLight);

    //Add directional light
    let dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-30, 50, -30);
    this.scene.add(dirLight);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.left = -70;
    dirLight.shadow.camera.right = 70;
    dirLight.shadow.camera.top = 70;
    dirLight.shadow.camera.bottom = -70;
  };

  createFloor = () => {
    let pos = { x: 0, y: -1, z: 3 };
    let scale = { x: 100, y: 2, z: 100 };

    let blockPlane = new THREE.Mesh(
      new THREE.BoxBufferGeometry(),
      new THREE.MeshPhongMaterial({ color: 0xf9c834 })
    );
    blockPlane.position.set(pos.x, pos.y, pos.z);
    blockPlane.scale.set(scale.x, scale.y, scale.z);
    blockPlane.castShadow = true;
    blockPlane.receiveShadow = true;
    this.scene.add(blockPlane);

    blockPlane.userData.ground = true;
  };

  createBox = () => {
    let scale = { x: 6, y: 6, z: 6 };
    let pos = { x: 15, y: scale.y / 2, z: 15 };

    let box = new THREE.Mesh(
      new THREE.BoxBufferGeometry(),
      new THREE.MeshPhongMaterial({ color: 0xdc143c })
    );
    box.position.set(pos.x, pos.y, pos.z);
    box.scale.set(scale.x, scale.y, scale.z);
    box.castShadow = true;
    box.receiveShadow = true;
    this.scene.add(box);

    box.userData.draggable = true;
    box.userData.name = "BOX";
  };

  createSphere = () => {
    let radius = 4;
    let pos = { x: 15, y: radius, z: -15 };

    let sphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(radius, 32, 32),
      new THREE.MeshPhongMaterial({ color: 0x43a1f4 })
    );
    sphere.position.set(pos.x, pos.y, pos.z);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    this.scene.add(sphere);

    sphere.userData.draggable = true;
    sphere.userData.name = "SPHERE";
  };

  createCylinder = () => {
    let radius = 4;
    let height = 6;
    let pos = { x: -15, y: height / 2, z: 15 };

    // threejs
    let cylinder = new THREE.Mesh(
      new THREE.CylinderBufferGeometry(radius, radius, height, 32),
      new THREE.MeshPhongMaterial({ color: 0x90ee90 })
    );
    cylinder.position.set(pos.x, pos.y, pos.z);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    this.scene.add(cylinder);

    cylinder.userData.draggable = true;
    cylinder.userData.name = "CYLINDER";
  };

  createCastle = () => {
    const objLoader = new OBJLoader();

    objLoader.loadAsync("./castle.obj").then((group) => {
      const castle = group.children[0];

      castle.position.x = -15;
      castle.position.z = -15;

      castle.scale.x = 5;
      castle.scale.y = 5;
      castle.scale.z = 5;

      castle.castShadow = true;
      castle.receiveShadow = true;

      castle.userData.draggable = true;
      castle.userData.name = "CASTLE";

      this.scene.add(castle);
    });
  };

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

  intersect = (pos: THREE.Vector2) => {
    this.raycaster.setFromCamera(pos, this.camera);
    return this.raycaster.intersectObjects(this.scene.children);
  };

  resetMaterials() {
    for (let i = 0; i < this.scene.children.length; i++) {
      const object: any = this.scene.children[i];
      if (object.material) {
        object.material.opacity = 1.0;
      }
    }
  }

  hoverObject = () => {
    if (this.moveMouse.x && this.moveMouse.y) {
      const found: any = this.intersect(this.moveMouse);
      if (found.length > 1) {
        found[0].object.material.transparent = true;
        found[0].object.material.opacity = 0.5;
      }
    }
  };

  dragObject = () => {
    if (this.draggable != null) {
      const found = this.intersect(this.moveMouse);
      if (found.length > 0) {
        for (let i = 0; i < found.length; i++) {
          console.log(found[i].object.userData);
          if (!found[i].object.userData.ground) continue;

          let target = found[i].point;
          this.draggable.position.x = target.x;
          this.draggable.position.z = target.z;
        }
      }
    }
  };

  render = () => {
    this.dragObject();
    this.resetMaterials();
    this.hoverObject();
    requestAnimationFrame(this.render);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
