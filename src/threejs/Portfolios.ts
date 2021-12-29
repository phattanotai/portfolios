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
  Object3D,
  AnimationMixer,
  BoxGeometry,
  PlaneGeometry,
  MeshStandardMaterial,
} from "three";

import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls.js";
import { MD2CharacterComplex } from "three/examples/jsm/misc/MD2CharacterComplex.js";
import { Gyroscope } from "three/examples/jsm/misc/Gyroscope.js";
import { Octree } from "three/examples/jsm/math/Octree.js";
import { Capsule } from "three/examples/jsm/math/Capsule";
import DAT from "dat.gui";

import { portfolios, portfoliosData } from "../data/portfolios.data";

declare const window: any;

export type ControlsType = {
  crouch: boolean;
  moveForward: boolean;
  moveBackward: boolean;
  moveLeft: boolean;
  moveRight: boolean;
  walking: boolean;
  jump: boolean;
  wave: boolean;
};

export class Portfolios {
  canvasContainer: HTMLElement;
  renderer: WebGLRenderer = new WebGLRenderer();
  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera();
  canvas: HTMLElement;
  cameraControls: OrbitControls | any;
  pointerLockControls: PointerLockControls;
  ambientLight: AmbientLight;
  spotLight: DirectionalLight;
  mixer: AnimationMixer;
  clock: any;
  stats: any;
  gui: GUI;

  datgui: DAT.GUI;

  actions: any = {};
  activeAction: any;
  previousAction: any;
  api: any = { state: "Idle" };
  emoteFolder: any;
  controls: ControlsType | any = {
    crouch: false,
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    walking: false,
    jump: false,
    wave: false,
    running: false,
  };
  images: any;
  model: Object3D;
  angle: number = 3;
  states: string[] = [
    "Idle",
    // "Walking",
    // "Running",
    "WalkJump",
    "Dance",
    "Death",
    "Sitting",
    "Standing",
  ];
  emotes: string[] = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];
  characterOgro: MD2CharacterComplex;
  readonly rotateSpeed: number = 0.5;
  moveSpeed: number = 100;

  // temporary data
  rotateAngle: THREE.Vector3 = new THREE.Vector3(0, 1, 0);
  rotateQuarternion: THREE.Quaternion = new THREE.Quaternion();
  walkDirection: THREE.Vector3 = new THREE.Vector3();
  playerVelocity: THREE.Vector3 = new THREE.Vector3();

  worldOctree: Octree = new Octree();
  playerCollider: Capsule = new Capsule(
    new THREE.Vector3(0, 0.35, 0),
    new THREE.Vector3(0, 1, 0),
    0.35
  );

  playerDirection: THREE.Vector3 = new THREE.Vector3();
  playerOnFloor: boolean = false;
  GRAVITY: number = 10;

  draggable: THREE.Object3D;
  raycaster: THREE.Raycaster = new THREE.Raycaster();
  clickMouse: THREE.Vector2 = new THREE.Vector2();
  moveMouse: THREE.Vector2 = new THREE.Vector2();

  imageSaveData: THREE.Object3D;

  editImages = false;
  showImage: any;

  constructor() {
    this.canvasContainer = document.getElementById("canvasContainer");
    if (this.canvasContainer) {
      // this.onCreateBlocker();
      // this.onCreateInfo();
      this.onInit();
    }
  }

  onInit() {
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "three-canvas");
    this.canvasContainer.appendChild(this.canvas);

    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setSize(
      this.canvasContainer.offsetWidth + 20,
      window.innerHeight
    );
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new PerspectiveCamera(
      60,
      this.canvasContainer.offsetWidth / window.innerHeight,
      0.1,
      2000
    );
    this.camera.position.set(0, 40, 150);
    this.camera.lookAt(0, 0, 0);

    this.cameraControls = new OrbitControls(this.camera, this.canvas);
    this.cameraControls.target.set(0, 7, 0);
    this.cameraControls.minPolarAngle = Math.PI / 2 - 0.6;
    this.cameraControls.maxPolarAngle = Math.PI / 2;
    this.cameraControls.listenToKeyEvents(window); // optional
    this.cameraControls.enableDamping = true;
    this.cameraControls.dampingFactor = 0.05;
    this.cameraControls.rotateSpeed = 0.4;
    this.cameraControls.screenSpacePanning = false;
    this.cameraControls.minDistance = 100;
    this.cameraControls.maxDistance = 500;

    // this.cameraControls.addEventListener("change", () => {
    //   const vector = new THREE.Vector3(0, 0, -1);
    //   vector.applyQuaternion(this.camera.quaternion);
    //   const theta = Math.atan2(vector.x, vector.z);
    //   // if (this.model) {
    //   //   this.model.rotation.set(0, theta, 0);
    //   // }
    //   this.angle = theta;
    //   // console.log(this.angle);
    // });

    this.clock = new THREE.Clock();
    this.stats = Stats();

    this.onCreateLight();
    // this.onCreateFloor();
    this.createFloor();
    this.onLoadModelMap();
    this.onLoadModelCharacter();
    // this.onCreateModelOgro();

    this.setImages(portfolios);
    this.onLoadImages();
    this.onRender();

    window.addEventListener("resize", this.onResize);
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);

    document.body.addEventListener("mousemove", (event) => {
      this.camera.rotation.y -= event.movementX / 500;
      this.camera.rotation.x -= event.movementY / 500;
    });

    window.addEventListener("click", this.onMouseClick);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  private onResize = () => {
    const w = this.canvasContainer.offsetWidth + 20;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  };

  private resetMaterials() {
    for (let i = 0; i < this.scene.children.length; i++) {
      const object: any = this.scene.children[i];
      if (object.material) {
        object.material.opacity = 1.0;
      }
    }
  }

  private hoverObject = () => {
    if (this.moveMouse.x && this.moveMouse.y) {
      const found: any = this.intersect(this.moveMouse);
      if (found.length > 1) {
        found[0].object.material.transparent = true;
        found[0].object.material.opacity = 0.5;
      }
    }
  };

  private intersect = (pos: THREE.Vector2) => {
    this.raycaster.setFromCamera(pos, this.camera);
    return this.raycaster.intersectObjects(this.scene.children);
  };

  private dragObject = () => {
    if (this.editImages) {
      const found = this.intersect(this.moveMouse);
      if (this.draggable != null) {
        const found = this.intersect(this.moveMouse);
        if (found.length > 0) {
          for (let i = 0; i < found.length; i++) {
            if (!found[i].object.userData.ground) continue;
            let target = found[i].point;
            this.draggable.position.x = target.x;
            this.draggable.position.z = target.z;
          }
        }
      }
    }
  };

  private onMouseClick = (e) => {
    if (this.draggable) {
      console.log(`dropping draggable ${this.draggable.userData.name}`);
      this.draggable = null as any;
      return;
    }
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.clickMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.clickMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const found = this.intersect(this.clickMouse);
    if (found.length > 0 && found[0].object.userData.draggable) {
      this.draggable = found[0].object;

      console.log(`found draggable ${this.draggable.userData.name}`);

      if (!this.editImages) {
        this.showImage(0);
      } else {
        this.createDatGui(this.draggable);
      }
    }
  };

  private onMouseMove = (e) => {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.moveMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.moveMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  private onCreateInfo = () => {
    const info: HTMLElement = document.createElement("div");
    info.setAttribute("id", "info");
    const htmlInfo = ` Portfolios
          <br />
          <p>
            The animation system allows clips to be played individually, looped,
            or crossfaded with other clips. This example shows a character
            looping in one of several base animation states, then transitioning
            smoothly to one-time actions. Facial expressions are controlled
            independently with morph targets.
          </p>
          Model by
          <a
            href="https://www.patreon.com/quaternius"
            target="_blank"
            rel="noopener"
          >
            Tomás Laulhé
          </a>
          , modifications by{" "}
          <a href="https://donmccurdy.com/" target="_blank" rel="noopener">
            Don McCurdy
          </a>
          . CC0.
          <br />`;

    info.innerHTML = htmlInfo;

    this.canvasContainer.appendChild(info);
  };

  private onLoadImages = () => {
    for (let index in this.images) {
      const items = this.images[index];
      if (index !== "2taxi") {
        for (let i = 0; i < items.length; i++) {
          const imagesData = items[i];
          for (let imageUrl of imagesData.images) {
            const url = imageUrl;
            new THREE.TextureLoader().load(url, (texture) => {
              const materialPainting = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                map: texture,
              });
              const geometry = new THREE.BoxGeometry(100, 100, 2);
              const mesh = new THREE.Mesh(geometry, materialPainting);

              const data = portfoliosData[imageUrl];

              if (data) {
                mesh.position.copy(data.position);
                mesh.scale.copy(data.scale);
                mesh.rotation.copy(data.rotation);
              } else {
                // mesh.scale.x = texture.image.width / 1000;
                // mesh.scale.y = texture.image.height / 500;
                // const i = this.random(-Math.PI * 2, Math.PI * 2);
                // mesh.position.setFromCylindricalCoords(600, i, 40);
                // mesh.position.y = 50;
              }

              mesh.userData.draggable = true;
              mesh.userData.url = imageUrl;
              mesh.userData.name = imagesData.name;

              this.scene.add(mesh);
            });
          }
        }
      }
    }
  };

  private onLoadModelMap = () => {
    const loader = new GLTFLoader().setPath("./assets//models/gltf/");
    loader.load("collision-world.glb", (gltf) => {
      // gltf.scene.scale.set(100, 0, 100);

      gltf.scene.scale.x = 120;
      gltf.scene.scale.z = 120;
      gltf.scene.scale.y = 40;

      // gltf.scene.position.y = 70;

      gltf.scene.userData.ground = true;

      this.scene.add(gltf.scene);
      this.worldOctree.fromGraphNode(gltf.scene);
      gltf.scene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;

          if (child.material.map) {
            child.material.map.anisotropy = 8;
          }
        }
      });
      // this.onRender();
    });
  };

  public setImages = (images: any) => {
    this.images = images;
  };

  private random = (min: number, max: number) => {
    return min + Math.random() * (max - min);
  };

  private onCreateBlocker = () => {
    const blocker: HTMLElement = document.createElement("div");
    blocker.setAttribute("id", "blocker");

    const instructions: HTMLElement = document.createElement("div");
    instructions.setAttribute("id", "instructions");

    const html = `<p style={{ fontSize: "36px" }}>Click to play</p>
            <p>
              Move: WASD
              <br />
              Jump: SPACE
              <br />
              Look: MOUSE
            </p>`;

    instructions.innerHTML = html;

    blocker.appendChild(instructions);

    instructions.addEventListener("click", () => {
      instructions.style.display = "none";
      blocker.style.display = "none";
      this.gui.open();
      this.setNewScene();
    });

    this.canvasContainer.appendChild(blocker);
  };

  private setNewScene = () => {
    this.onCreateFloor();
    // this.onCreateBox();
  };

  private onCreateLight = () => {
    this.ambientLight = new AmbientLight(0x222222);
    this.scene.add(this.ambientLight);
    this.spotLight = new THREE.DirectionalLight(0xffffff, 2.25);
    this.spotLight.position.set(200, 450, 500);
    this.spotLight.castShadow = true;
    this.spotLight.shadow.mapSize.width = 1024;
    this.spotLight.shadow.mapSize.height = 512;
    this.spotLight.shadow.camera.near = 100;
    this.spotLight.shadow.camera.far = 1200;
    this.spotLight.shadow.camera.left = -1000;
    this.spotLight.shadow.camera.right = 1000;
    this.spotLight.shadow.camera.top = 350;
    this.spotLight.shadow.camera.bottom = -350;
    this.scene.add(this.spotLight);

    const fillLight1 = new DirectionalLight(0xff9999, 0.5);
    fillLight1.position.set(-1, 1, 2);
    this.scene.add(fillLight1);

    const fillLight2 = new DirectionalLight(0x8888ff, 0.2);
    fillLight2.position.set(0, -1, 0);
    this.scene.add(fillLight2);

    const directionalLight = new DirectionalLight(0xffffaa, 1.2);
    directionalLight.position.set(-5, 25, -1);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.radius = 4;
    directionalLight.shadow.bias = -0.00006;

    this.scene.add(directionalLight);
  };

  private onLoadModelCharacter() {
    const loader = new GLTFLoader();
    let url = "../assets/models/gltf/RobotExpressive/RobotExpressive.glb";
    loader.load(
      url,
      (gltf) => {
        this.model = gltf.scene;
        // this.model.rotateY(3);
        this.model.receiveShadow = true;
        this.model.scale.set(10, 10, 10);

        // this.model.position.y = -10;
        this.scene.add(this.model);
        // this.createGUI(this.model, gltf.animations);
        this.setActionCharacter(this.model, gltf.animations);
        this.playerVelocity.copy(this.model.position);
      },
      undefined,
      function (e) {
        console.error("error", e);
      }
    );
  }

  private updatePlayer = (deltaTime) => {
    let damping = Math.exp(-4 * deltaTime) - 1;

    if (!this.playerOnFloor) {
      this.playerVelocity.y -= this.GRAVITY * deltaTime;
      // small air resistance
      damping *= 0.01;
    }

    this.playerVelocity.addScaledVector(this.playerVelocity, damping);
    const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
    this.playerCollider.translate(deltaPosition);
    this.playerCollisions();
    this.model.position.copy(this.playerCollider.end);
  };

  private playerCollisions = () => {
    const result = this.worldOctree.capsuleIntersect(this.playerCollider);
    this.playerOnFloor = false;
    if (result) {
      this.playerOnFloor = result.normal.y > 0;
      if (!this.playerOnFloor) {
        this.playerVelocity.addScaledVector(
          result.normal,
          -result.normal.dot(this.playerVelocity)
        );
      }
      this.playerCollider.translate(result.normal.multiplyScalar(result.depth));
    }
  };

  private onCreateModelOgro = () => {
    const configOgro = {
      baseUrl: "../assets/models/md2/ogro/",

      body: "ogro.md2",
      skins: [
        "grok.jpg",
        "ogrobase.png",
        "arboshak.png",
        "ctf_r.png",
        "ctf_b.png",
        "darkam.png",
        "freedom.png",
        "gib.png",
        "gordogh.png",
        "igdosh.png",
        "khorne.png",
        "nabogro.png",
        "sharokh.png",
      ],
      weapons: [["weapon.md2", "weapon.jpg"]],
      animations: {
        move: "run",
        idle: "stand",
        jump: "jump",
        attack: "attack",
        crouchMove: "cwalk",
        crouchIdle: "cstand",
        crouchAttach: "crattack",
      },
      walkSpeed: 350,
      crouchSpeed: 175,
    };

    this.characterOgro = new MD2CharacterComplex();
    this.characterOgro.scale = 3;
    this.characterOgro.controls = this.controls;

    this.characterOgro.onLoadComplete = () => {
      // cast and receive shadows
      this.characterOgro.enableShadows(true);
      this.characterOgro.setWeapon(0);
      this.characterOgro.setSkin(0);
      this.scene.add(this.characterOgro.root);
      const gyro = new Gyroscope();
      gyro.add(this.camera);
      gyro.add(this.spotLight, this.spotLight.target);
      this.characterOgro.root.add(gyro);
    };
    this.characterOgro.loadParts(configOgro);
  };

  private onCreateFloor = () => {
    //  GROUND
    const gt = new THREE.TextureLoader().load(
      "../assets/textures/terrain/grasslight-big.jpg"
    );
    const gg = new THREE.PlaneGeometry(16000, 16000);
    const gm = new THREE.MeshPhongMaterial({ color: 0xffffff, map: gt });

    const ground: any = new THREE.Mesh(gg, gm);
    ground.rotation.x = -Math.PI / 2;
    ground.material.map.repeat.set(64, 64);
    ground.material.map.wrapS = THREE.RepeatWrapping;
    ground.material.map.wrapT = THREE.RepeatWrapping;
    ground.material.map.encoding = THREE.sRGBEncoding;
    // note that because the ground does not cast a shadow, .castShadow is left false
    ground.receiveShadow = true;
    ground.position.y = -70;
    ground.userData.ground = true;
    this.scene.add(ground);
  };

  private createFloor = () => {
    const floorGeometry = new PlaneGeometry(3500, 3500);
    const floorMaterial = new MeshStandardMaterial({
      color: 0xffffff,
    });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.castShadow = true;
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -80;
    this.scene.add(floor);
    floor.userData.ground = true;
  };

  private onCreateBox = () => {
    const color = new THREE.Color();
    const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();

    const position = boxGeometry.attributes.position;
    const colorsBox: number[] = [];

    for (let i = 0, l = position.count; i < l; i++) {
      color.setHSL(
        Math.random() * 0.3 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75
      );
      colorsBox.push(color.r, color.g, color.b);
    }

    boxGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colorsBox, 3)
    );

    for (let i = 0; i < 500; i++) {
      const boxMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        flatShading: true,
        vertexColors: true,
      });
      boxMaterial.color.setHSL(
        Math.random() * 0.2 + 0.5,
        0.75,
        Math.random() * 0.25 + 0.75
      );

      const box = new THREE.Mesh(boxGeometry, boxMaterial);
      box.position.x = Math.floor(Math.random() * 200 - 10) * 20;
      box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
      box.position.z = Math.floor(Math.random() * 200 - 10) * 20;

      this.scene.add(box);
    }
  };

  private directionOffset = () => {
    let directionOffset = Math.PI; // w
    if (this.controls.moveForward) {
      if (this.controls.moveLeft) {
        directionOffset = directionOffset + Math.PI / 4; // w+a
      } else if (this.controls.moveRight) {
        directionOffset = directionOffset - Math.PI / 4; // w+d
      }
    } else if (this.controls.moveBackward) {
      if (this.controls.moveLeft) {
        directionOffset = Math.PI / 4 - Math.PI / 2; // s+a
      } else if (this.controls.moveRight) {
        directionOffset = -Math.PI / 4 + Math.PI / 2; // s+d
      } else {
        directionOffset = 0; // s
      }
    } else if (this.controls.moveLeft) {
      directionOffset = -Math.PI / 2; // a
    } else if (this.controls.moveRight) {
      directionOffset = Math.PI / 2; // d
    }
    return directionOffset;
  };

  private checkWalking = () => {
    if (this.controls) {
      if (this.controls.moveForward) {
        this.controls.walking = true;
      } else if (this.controls.moveBackward) {
        this.controls.walking = true;
      } else if (this.controls.moveLeft) {
        this.controls.walking = true;
      } else if (this.controls.moveRight) {
        this.controls.walking = true;
      } else {
        this.controls.walking = false;
      }
    }
  };

  private updateCameraTarget = (moveX: number, moveZ: number) => {
    // move camera
    this.camera.position.x -= moveX;
    this.camera.position.z -= moveZ;
    // update camera target
    // --set cameraControls with model position
    if (this.cameraControls) {
      this.cameraControls.target.set(
        this.model.position.x,
        this.model.position.y,
        this.model.position.z
      );
    }
  };

  private updateCameraTargetByModel = () => {
    // update camera target
    // --set cameraControls with model position
    if (this.cameraControls) {
      this.cameraControls.target.set(
        this.model.position.x,
        this.model.position.y,
        this.model.position.z
      );
    }
  };

  private rotateModel = () => {
    const angleYCameraDirection = Math.atan2(
      this.camera.position.x - this.model.position.x,
      this.camera.position.z - this.model.position.z
    );
    // diagonal movement angle offset
    const directionOffset = this.directionOffset();

    // rotate model
    this.rotateQuarternion.setFromAxisAngle(
      this.rotateAngle,
      angleYCameraDirection + directionOffset
    );
    this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);
  };

  private controlsModel = (delta) => {
    if (this.controls) {
      if (this.controls.walking || this.controls.running) {
        const speedDelta = delta * (this.playerOnFloor ? this.moveSpeed : 100);

        if (this.controls.moveForward) {
          this.playerVelocity.add(
            this.getForwardVector().multiplyScalar(speedDelta)
          );
        }
        if (this.controls.moveBackward) {
          this.playerVelocity.add(
            this.getForwardVector().multiplyScalar(-speedDelta)
          );
        }
        if (this.controls.moveLeft) {
          this.playerVelocity.add(
            this.getSideVector().multiplyScalar(-speedDelta)
          );
        }
        if (this.controls.moveRight) {
          this.playerVelocity.add(
            this.getSideVector().multiplyScalar(speedDelta)
          );
        }

        this.moveSpeed += 0.5;
        if (this.moveSpeed > 250) {
          this.moveSpeed = 250;
        }
        this.rotateModel();
        this.updateCameraTargetByModel();
      }
      // -- check speed for run
      if (this.moveSpeed > 200) {
        if (!this.controls.running) {
          this.controls.running = true;
          if (this.controls.running) {
            this.api.state = "Running";
            this.fadeToAction(this.api.state, 0.5);
          }
        }
        if (!this.controls.walking) {
          this.controls.running = false;
        }
      }
      // --setAction model
      if (this.controls.walking && this.api.state !== "Walking" && this.model) {
        if (!this.controls.running) {
          this.api.state = "Walking";
          this.fadeToAction(this.api.state, 0.5);
        }
      }
      if (
        !this.controls.walking &&
        !this.controls.running &&
        (this.api.state === "Walking" ||
          (this.api.state === "Running" && this.model))
      ) {
        this.moveSpeed = 50;
        this.api.state = "Idle";
        this.fadeToAction(this.api.state, 0.5);
      }

      if (this.controls.jump && this.model) {
        this.api.state = "Jump";
        this.fadeToAction(this.api.state, 0.5);
        this.playerVelocity.y = 15;
      }
      if (this.controls.wave && this.model) {
        this.api.state = "Wave";
        this.fadeToAction(this.api.state, 0.5);
      }
    }
  };

  private modelAction = (delta) => {
    if (this.controls) {
      if (this.controls.walking || this.controls.running) {
        // calculate towards camera direction
        const angleYCameraDirection = Math.atan2(
          this.camera.position.x - this.model.position.x,
          this.camera.position.z - this.model.position.z
        );
        // diagonal movement angle offset
        const directionOffset = this.directionOffset();

        // rotate model
        this.rotateQuarternion.setFromAxisAngle(
          this.rotateAngle,
          angleYCameraDirection + directionOffset
        );
        this.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);

        // calculate direction
        this.camera.getWorldDirection(this.walkDirection);
        this.walkDirection.y = 0;
        this.walkDirection.normalize();
        this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

        // move model & camera
        const moveX = this.walkDirection.x * this.moveSpeed * delta;
        const moveZ = this.walkDirection.z * this.moveSpeed * delta;

        this.playerVelocity.x -= moveX;
        this.playerVelocity.z -= moveZ;

        this.model.position.copy(this.playerVelocity);
        this.updateCameraTarget(moveX, moveZ);

        this.moveSpeed += 0.5;
        if (this.moveSpeed > 300) {
          this.moveSpeed = 300;
        }
      }
      // -- check speed for run
      if (this.moveSpeed > 200) {
        if (!this.controls.running) {
          this.controls.running = true;
          if (this.controls.running) {
            this.api.state = "Running";
            this.fadeToAction(this.api.state, 0.5);
          }
        }
        if (!this.controls.walking) {
          this.controls.running = false;
        }
      }
      // --setAction model
      if (this.controls.walking && this.api.state !== "Walking" && this.model) {
        if (!this.controls.running) {
          this.api.state = "Walking";
          this.fadeToAction(this.api.state, 0.5);
        }
      } else if (
        !this.controls.walking &&
        !this.controls.running &&
        (this.api.state === "Walking" ||
          (this.api.state === "Running" && this.model))
      ) {
        this.moveSpeed = 50;
        this.api.state = "Idle";
        this.fadeToAction(this.api.state, 0.5);
      } else if (this.controls.jump && this.model) {
        this.api.state = "Jump";
        this.fadeToAction(this.api.state, 0.5);

        this.playerVelocity.y = 15;
      } else if (this.controls.wave && this.model) {
        this.api.state = "Wave";
        this.fadeToAction(this.api.state, 0.5);
      }
    }
  };

  private modelActionB = (delta) => {
    if (this.controls) {
      // --set model moment
      if (this.controls.moveForward) {
        // -- speed
        this.moveSpeed += 0.01;
        if (this.moveSpeed > 2) {
          this.moveSpeed = 2;
        }
        if (this.model) {
          // --angle
          if (this.angle <= 3) {
            this.angle += this.rotateSpeed;
            if (this.angle > 3) {
              this.angle = 3;
            }
          } else {
            this.angle -= this.rotateSpeed;
          }
          this.model.rotation.set(0, this.angle, 0);
          this.model.position.z -= this.moveSpeed;
        }

        this.camera.position.z -= this.moveSpeed;
      }

      if (this.controls.moveBackward) {
        // -- speed
        this.moveSpeed += 0.01;
        if (this.moveSpeed > 2) {
          this.moveSpeed = 2;
        }

        if (this.model) {
          // --angle
          this.angle -= this.rotateSpeed;
          if (this.angle < 0) {
            this.angle = 0;
          }
          this.model.rotation.set(0, this.angle, 0);
          this.model.position.z += this.moveSpeed;
        }
        this.camera.position.z += this.moveSpeed;
      }

      if (this.controls.moveLeft) {
        // -- speed
        this.moveSpeed += 0.01;
        if (this.moveSpeed > 2) {
          this.moveSpeed = 2;
        }
        if (this.model) {
          // --angle
          this.angle += this.rotateSpeed;
          if (this.angle > 4.5) {
            this.angle = 4.5;
          }
          this.model.rotation.set(0, this.angle, 0);
          this.model.position.x -= this.moveSpeed;
        }
        this.camera.position.x -= this.moveSpeed;
      }

      if (this.controls.moveRight) {
        // -- speed
        this.moveSpeed += 0.01;
        if (this.moveSpeed > 2) {
          this.moveSpeed = 2;
        }
        if (this.model) {
          // --angle
          this.angle -= this.rotateSpeed;
          if (this.angle < 1.5) {
            this.angle = 1.5;
          }
          this.model.rotation.set(0, this.angle, 0);
          this.model.position.x += this.moveSpeed;
        }
        this.camera.position.x += this.moveSpeed;
      }

      ///  -- เดินเฉียง
      if (this.controls.moveForward && this.controls.moveRight && this.model) {
        this.angle -= this.rotateSpeed;
        if (this.angle < 2) {
          this.angle = 2;
        }
        this.model.rotation.set(0, this.angle, 0);
      }

      if (this.controls.moveForward && this.controls.moveLeft && this.model) {
        this.angle += this.rotateSpeed;
        if (this.angle > 4) {
          this.angle = 4;
        }
        this.model.rotation.set(0, this.angle, 0);
      }

      if (this.controls.moveBackward && this.controls.moveRight && this.model) {
        this.angle -= this.rotateSpeed;
        if (this.angle < 1) {
          this.angle = 1;
        }
        this.model.rotation.set(0, this.angle, 0);
      }

      if (this.controls.moveBackward && this.controls.moveLeft && this.model) {
        this.angle += this.rotateSpeed;
        if (this.angle < 5) {
          this.angle = 5;
        }
        this.model.rotation.set(0, this.angle, 0);
      }

      // -- check speed for run
      if (this.moveSpeed > 1.5) {
        if (!this.controls.running) {
          this.controls.running = true;
          if (this.controls.running) {
            this.api.state = "Running";
            this.fadeToAction(this.api.state, 0.5);
          }
        }
        if (!this.controls.walking) {
          this.controls.running = false;
        }
      }

      // --setAction model
      if (this.controls.walking && this.api.state !== "Walking" && this.model) {
        if (!this.controls.running) {
          this.api.state = "Walking";
          this.fadeToAction(this.api.state, 0.5);
        }
      } else if (
        !this.controls.walking &&
        !this.controls.running &&
        (this.api.state === "Walking" ||
          (this.api.state === "Running" && this.model))
      ) {
        this.moveSpeed = 0.5;
        this.api.state = "Idle";
        this.fadeToAction(this.api.state, 0.5);
      } else if (this.controls.jump && this.model) {
        this.api.state = "Jump";
        this.fadeToAction(this.api.state, 0.5);
      } else if (this.controls.wave && this.model) {
        this.api.state = "Wave";
        this.fadeToAction(this.api.state, 0.5);
      }

      // --set cameraControls with model position
      if (this.model) {
        this.cameraControls.target.set(
          this.model.position.x,
          this.model.position.y,
          this.model.position.z
        );
      }
    }
  };

  private updateModelCharacter = (delta) => {
    if (this.characterOgro) {
      this.characterOgro.update(delta);
    }
    if (this.model) {
      this.checkWalking();
      this.controlsModel(delta);
      const STEPS_PER_FRAME = this.moveSpeed <= 100 ? 1 : 8;
      for (let i = 0; i < STEPS_PER_FRAME; i++) {
        this.updatePlayer(delta);
      }
      // this.modelAction(delta);
    }
  };

  private restoreState = () => {
    this.mixer.removeEventListener("finished", this.restoreState);
    this.fadeToAction(this.api.state, 0.2);
  };

  private createEmoteCallback = (name: string) => {
    this.api[name] = () => {
      this.fadeToAction(name, 0.2);
      this.mixer.addEventListener("finished", this.restoreState);
    };
    this.emoteFolder.add(this.api, name);
  };

  private fadeToAction = (name: string, duration: number) => {
    this.previousAction = this.activeAction;
    this.activeAction = this.actions[name];

    if (this.previousAction !== this.activeAction) {
      this.previousAction.fadeOut(duration);
    }

    if (this.activeAction) {
      this.activeAction
        .reset()
        .setEffectiveTimeScale(1)
        .setEffectiveWeight(1)
        .fadeIn(duration)
        .play();
    }
  };

  private onRender = () => {
    const dt = this.clock.getDelta();

    this.dragObject();
    this.resetMaterials();
    this.hoverObject();
    this.updateModelCharacter(dt);

    if (this.mixer) this.mixer.update(dt);
    this.stats.update();
    this.cameraControls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.onRender);
  };

  public onDestroy = () => {
    if (this.canvasContainer) {
      this.canvasContainer.removeChild(this.canvas);
    }
    if (this.gui) {
      this.gui.destroy();
    }

    if (this.datgui) {
      this.datgui.destroy();
    }

    window.removeEventListener("resize", this.onResize, false);
    window.removeEventListener("click", this.onMouseClick, false);
    window.removeEventListener("mousemove", this.onMouseMove, false);
  };

  public moveForwardBtnT = (btn) => {
    switch (btn) {
      case "w":
        this.controls.moveForward = true;
        this.controls.walking = true;
        break;
      case "s":
        this.controls.moveBackward = true;
        this.controls.walking = true;
        break;
      case "a":
        this.controls.moveLeft = true;
        this.controls.walking = true;
        break;
      case "d":
        this.controls.moveRight = true;
        this.controls.walking = true;
        break;
      case "c":
        this.controls.wave = true;
        break;
      case "space":
        this.controls.jump = true;
        break;
      // case 'ControlLeft':
      // case 'ControlRight': controls.attack = true; break;
    }
  };

  public moveForwardBtnF = (btn) => {
    switch (btn) {
      case "w":
        this.controls.moveForward = false;
        this.controls.walking = false;
        break;
      case "s":
        this.controls.moveBackward = false;
        this.controls.walking = false;
        break;
      case "a":
        this.controls.moveLeft = false;
        this.controls.walking = false;
        break;
      case "d":
        this.controls.moveRight = false;
        this.controls.walking = false;
        break;
      case "c":
        this.controls.wave = false;
        break;
      case "space":
        this.controls.jump = false;
        break;
      // case 'ControlLeft':
      // case 'ControlRight': controls.attack = true; break;
    }
  };

  private onKeyDown = (event) => {
    if (this.controls) {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          this.controls.moveForward = true;
          this.controls.walking = true;
          break;
        case "ArrowDown":
        case "KeyS":
          this.controls.moveBackward = true;
          this.controls.walking = true;
          break;
        case "ArrowLeft":
        case "KeyA":
          this.controls.moveLeft = true;
          this.controls.walking = true;
          break;
        case "ArrowRight":
        case "KeyD":
          this.controls.moveRight = true;
          this.controls.walking = true;
          break;
        case "KeyC":
          this.controls.wave = true;
          break;
        case "Space":
          this.controls.jump = true;
          break;
        // case 'ControlLeft':
        // case 'ControlRight': controls.attack = true; break;
      }
    }
  };

  private onKeyUp = (event) => {
    if (this.controls) {
      switch (event.code) {
        case "ArrowUp":
        case "KeyW":
          this.controls.moveForward = false;
          break;
        case "ArrowDown":
        case "KeyS":
          this.controls.moveBackward = false;
          break;
        case "ArrowLeft":
        case "KeyA":
          this.controls.moveLeft = false;
          break;
        case "ArrowRight":
        case "KeyD":
          this.controls.moveRight = false;
          break;
        case "KeyC":
          this.controls.wave = false;
          break;
        case "Space":
          this.controls.jump = false;
          break;
        // case 'ControlLeft':
        // case 'ControlRight': controls.attack = false; break;
      }
    }
  };

  private setActionCharacter = (model: any, animations: any) => {
    this.mixer = new THREE.AnimationMixer(model);
    for (let i = 0; i < animations.length; i++) {
      const clip = animations[i];
      const action = this.mixer.clipAction(clip);
      this.actions[clip.name] = action;
      if (
        this.emotes.indexOf(clip.name) >= 0 ||
        this.states.indexOf(clip.name) >= 4
      ) {
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
      }
    }

    this.api.state = "Wave";
    this.activeAction = this.actions[this.api.state];
    this.activeAction.play();
  };

  private createDatGui = (object: THREE.Object3D) => {
    if (this.datgui) {
      this.datgui.destroy();
    }
    this.datgui = new DAT.GUI();
    const rotationFolder = this.datgui.addFolder("Rotation");
    const sizeFolder = this.datgui.addFolder("Size");
    const positionFolder = this.datgui.addFolder("Position");
    rotationFolder.add(object.rotation, "x", 0, Math.PI * 2);
    rotationFolder.add(object.rotation, "y", 0, Math.PI * 2);
    rotationFolder.add(object.rotation, "z", 0, Math.PI * 2);
    rotationFolder.open();
    sizeFolder.add(object.scale, "x", 0, 10);
    sizeFolder.add(object.scale, "y", 0, 10);
    sizeFolder.add(object.scale, "z", 0, 10);
    sizeFolder.open();
    positionFolder.add(object.position, "x", 0, 1000);
    positionFolder.add(object.position, "y", 0, 100);
    positionFolder.add(object.position, "z", 0, 1000);
    positionFolder.open();

    this.imageSaveData = object;

    this.datgui.add(
      {
        Save: this.saveData,
      },
      "Save"
    );

    this.datgui.add(
      {
        Exit: () => {
          if (this.datgui) {
            this.datgui.destroy();

            this.datgui = undefined;
          }
        },
      },
      "Exit"
    );
  };

  private saveData = () => {
    let data = {};

    if (localStorage.getItem("images")) {
      data = JSON.parse(localStorage.getItem("images"));
    }

    const d = {
      position: this.imageSaveData.position,
      scale: this.imageSaveData.scale,
      rotation: this.imageSaveData.rotation,
    };

    data[this.imageSaveData.userData.url] = d;

    localStorage.setItem("images", JSON.stringify(data));
    if (this.datgui) {
      this.datgui.destroy();

      this.datgui = undefined;
    }
  };

  private createGUI = (model: any, animations: any) => {
    this.gui = new GUI();
    this.mixer = new THREE.AnimationMixer(model);
    for (let i = 0; i < animations.length; i++) {
      const clip = animations[i];
      const action = this.mixer.clipAction(clip);
      this.actions[clip.name] = action;

      if (
        this.emotes.indexOf(clip.name) >= 0 ||
        this.states.indexOf(clip.name) >= 4
      ) {
        action.clampWhenFinished = true;
        action.loop = THREE.LoopOnce;
      }
    }

    // ---states

    const statesFolder = this.gui.addFolder("States");
    const clipCtrl = statesFolder.add(this.api, "state").options(this.states);
    clipCtrl.onChange(() => {
      this.fadeToAction(this.api.state, 0.5);
    });
    statesFolder.open();

    // ---emotes

    this.emoteFolder = this.gui.addFolder("Emotes");
    for (let i = 0; i < this.emotes.length; i++) {
      this.createEmoteCallback(this.emotes[i]);
    }
    this.emoteFolder.open();

    // ---expressions

    const face = model.getObjectByName("Head_4");
    const expressions = Object.keys(face.morphTargetDictionary);
    const expressionFolder = this.gui.addFolder("Expressions");

    for (let i = 0; i < expressions.length; i++) {
      expressionFolder
        .add(face.morphTargetInfluences, i.toString(), 0, 1, 0.01)
        .name(expressions[i]);
    }
    expressionFolder.open();

    this.gui.close();
  };

  private getForwardVector = () => {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();

    return this.playerDirection;
  };

  private getSideVector = () => {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    this.playerDirection.cross(this.camera.up);

    return this.playerDirection;
  };
}
