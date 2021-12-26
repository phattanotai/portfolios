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
  Clock,
  AmbientLight,
} from "three";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { Octree } from "three/examples/jsm/math/Octree.js";
import { Capsule } from "three/examples/jsm/math/Capsule.js";
import Stats from "three/examples/jsm/libs/stats.module.js";

export class Game {
  renderer: WebGLRenderer = new WebGLRenderer();
  scene: Scene = new Scene();
  camera: PerspectiveCamera = new PerspectiveCamera();
  canvas: any;
  clock: THREE.Clock;
  stats;
  GRAVITY = 30;
  STEPS_PER_FRAME = 5;
  worldOctree = new Octree();
  playerCollider = new Capsule(
    new THREE.Vector3(0, 0.35, 0),
    new THREE.Vector3(0, 1, 0),
    0.35
  );
  playerVelocity = new THREE.Vector3();
  playerDirection = new THREE.Vector3();
  playerOnFloor = false;
  mouseTime = 0;
  keyStates = {};
  vector1 = new THREE.Vector3();
  vector2 = new THREE.Vector3();
  vector3 = new THREE.Vector3();
  sphereIdx = 0;
  spheres = [];
  cameraControls: OrbitControls | any;

  constructor() {
    this.canvas = document.getElementById("three-canvas");
    this.onInit();
    // this.render();
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

    this.clock = new Clock();

    const ambientlight = new AmbientLight(0x6688cc);
    this.scene.add(ambientlight);

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

    this.stats = Stats();
    this.stats.domElement.style.position = "absolute";
    this.stats.domElement.style.top = "0px";

    let NUM_SPHERES = 100;
    let SPHERE_RADIUS = 0.2;
    const sphereGeometry = new THREE.SphereGeometry(SPHERE_RADIUS, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0x888855,
      roughness: 0.8,
      metalness: 0.5,
    });

    for (let i = 0; i < NUM_SPHERES; i++) {
      const sphere = new Mesh(sphereGeometry, sphereMaterial);
      sphere.castShadow = true;
      sphere.receiveShadow = true;
      this.scene.add(sphere);
      this.spheres.push({
        mesh: sphere,
        collider: new THREE.Sphere(
          new THREE.Vector3(0, -100, 0),
          SPHERE_RADIUS
        ),
        velocity: new THREE.Vector3(),
      });
    }

    const loader = new GLTFLoader().setPath("./assets//models/gltf/");
    loader.load(
      "collision-world.glb",
      (gltf) => {
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
        this.animate();
      },
      undefined,
      (e) => {
        console.log("error", e);
      }
    );

    document.addEventListener("keydown", (event) => {
      this.keyStates[event.code] = true;
    });

    document.addEventListener("keyup", (event) => {
      console.log(event.code);
      this.keyStates[event.code] = false;
    });

    document.addEventListener("mousedown", () => {
      document.body.requestPointerLock();
      this.mouseTime = performance.now();
    });

    document.addEventListener("mouseup", (e) => {
      if (e.which === 3) {
        this.throwBall();
      }
    });

    document.body.addEventListener("mousemove", (event) => {
      if (document.pointerLockElement === document.body) {
        this.camera.rotation.y -= event.movementX / 500;
        this.camera.rotation.x -= event.movementY / 500;
      }
    });

    // this.cameraControls = new OrbitControls(this.camera, this.canvas);
    // // this.cameraControls.target.set(0, 7, 0);
    // this.cameraControls.minPolarAngle = Math.PI / 2 - 0.6;
    // this.cameraControls.maxPolarAngle = Math.PI / 2;
    // this.cameraControls.listenToKeyEvents(window); // optional
    // this.cameraControls.enableDamping = true;
    // this.cameraControls.dampingFactor = 0.05;
    // this.cameraControls.rotateSpeed = 0.4;
    // this.cameraControls.screenSpacePanning = false;
    // this.cameraControls.minDistance = 5;
    // this.cameraControls.maxDistance = 18;

    window.addEventListener("resize", this.onResize);
  }

  onResize = () => {
    const canvasContainer: any = document.getElementById("canvasContainer");
    const w = canvasContainer.offsetWidth;
    const h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(w, h);
  };

  throwBall = () => {
    const sphere = this.spheres[this.sphereIdx];
    console.log(sphere);
    this.camera.getWorldDirection(this.playerDirection);

    sphere.collider.center
      .copy(this.playerCollider.end)
      .addScaledVector(this.playerDirection, this.playerCollider.radius * 1.5);

    // throw the ball with more force if we hold the button longer, and if we move forward

    const impulse =
      15 + 30 * (1 - Math.exp((this.mouseTime - performance.now()) * 0.001));

    sphere.velocity.copy(this.playerDirection).multiplyScalar(impulse);
    sphere.velocity.addScaledVector(this.playerVelocity, 2);

    this.sphereIdx = (this.sphereIdx + 1) % this.spheres.length;
  };

  playerCollisions = () => {
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

  updatePlayer = (deltaTime) => {
    let damping = Math.exp(-4 * deltaTime) - 1;
    if (!this.playerOnFloor) {
      this.playerVelocity.y -= this.GRAVITY * deltaTime;
      // small air resistance
      damping *= 0.1;
    }

    this.playerVelocity.addScaledVector(this.playerVelocity, damping);
    const deltaPosition = this.playerVelocity.clone().multiplyScalar(deltaTime);
    this.playerCollider.translate(deltaPosition);
    this.playerCollisions();
    this.camera.position.copy(this.playerCollider.end);
  };

  spheresCollisions = () => {
    for (let i = 0, length = this.spheres.length; i < length; i++) {
      const s1 = this.spheres[i];

      for (let j = i + 1; j < length; j++) {
        const s2 = this.spheres[j];

        const d2 = s1.collider.center.distanceToSquared(s2.collider.center);
        const r = s1.collider.radius + s2.collider.radius;
        const r2 = r * r;

        if (d2 < r2) {
          const normal = this.vector1
            .subVectors(s1.collider.center, s2.collider.center)
            .normalize();
          const v1 = this.vector2
            .copy(normal)
            .multiplyScalar(normal.dot(s1.velocity));
          const v2 = this.vector3
            .copy(normal)
            .multiplyScalar(normal.dot(s2.velocity));

          s1.velocity.add(v2).sub(v1);
          s2.velocity.add(v1).sub(v2);

          const d = (r - Math.sqrt(d2)) / 2;

          s1.collider.center.addScaledVector(normal, d);
          s2.collider.center.addScaledVector(normal, -d);
        }
      }
    }
  };

  updateSpheres = (deltaTime) => {
    this.spheres.forEach((sphere) => {
      sphere.collider.center.addScaledVector(sphere.velocity, deltaTime);

      const result = this.worldOctree.sphereIntersect(sphere.collider);

      if (result) {
        sphere.velocity.addScaledVector(
          result.normal,
          -result.normal.dot(sphere.velocity) * 1.5
        );
        sphere.collider.center.add(result.normal.multiplyScalar(result.depth));
      } else {
        sphere.velocity.y -= this.GRAVITY * deltaTime;
      }

      const damping = Math.exp(-1.5 * deltaTime) - 1;
      sphere.velocity.addScaledVector(sphere.velocity, damping);
      this.playerSphereCollision(sphere);
    });

    this.spheresCollisions();

    for (const sphere of this.spheres) {
      sphere.mesh.position.copy(sphere.collider.center);
    }
  };

  playerSphereCollision = (sphere) => {
    const center = this.vector1
      .addVectors(this.playerCollider.start, this.playerCollider.end)
      .multiplyScalar(0.5);

    const sphere_center = sphere.collider.center;
    const r = this.playerCollider.radius + sphere.collider.radius;
    const r2 = r * r;

    // approximation: player = 3 spheres

    for (const point of [
      this.playerCollider.start,
      this.playerCollider.end,
      center,
    ]) {
      const d2 = point.distanceToSquared(sphere_center);

      if (d2 < r2) {
        const normal = this.vector1
          .subVectors(point, sphere_center)
          .normalize();
        const v1 = this.vector2
          .copy(normal)
          .multiplyScalar(normal.dot(this.playerVelocity));
        const v2 = this.vector3
          .copy(normal)
          .multiplyScalar(normal.dot(sphere.velocity));

        this.playerVelocity.add(v2).sub(v1);
        sphere.velocity.add(v1).sub(v2);

        const d = (r - Math.sqrt(d2)) / 2;
        sphere_center.addScaledVector(normal, -d);
      }
    }
  };

  getForwardVector = () => {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();

    return this.playerDirection;
  };

  getSideVector = () => {
    this.camera.getWorldDirection(this.playerDirection);
    this.playerDirection.y = 0;
    this.playerDirection.normalize();
    this.playerDirection.cross(this.camera.up);

    return this.playerDirection;
  };

  teleportPlayerIfOob = () => {
    if (this.camera.position.y <= -25) {
      this.playerCollider.start.set(0, 0.35, 0);
      this.playerCollider.end.set(0, 1, 0);
      this.playerCollider.radius = 0.35;
      this.camera.position.copy(this.playerCollider.end);
      this.camera.rotation.set(0, 0, 0);
    }
  };

  controls(deltaTime) {
    // gives a bit of air control
    const speedDelta = deltaTime * (this.playerOnFloor ? 25 : 8);

    if (this.keyStates["KeyW"]) {
      this.playerVelocity.add(
        this.getForwardVector().multiplyScalar(speedDelta)
      );
    }

    if (this.keyStates["KeyS"]) {
      this.playerVelocity.add(
        this.getForwardVector().multiplyScalar(-speedDelta)
      );
    }

    if (this.keyStates["KeyA"]) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(-speedDelta));
    }

    if (this.keyStates["KeyD"]) {
      this.playerVelocity.add(this.getSideVector().multiplyScalar(speedDelta));
    }

    if (this.playerOnFloor) {
      if (this.keyStates["Space"]) {
        this.playerVelocity.y = 15;
      }
    }

    if (this.keyStates["KeyE"]) {
      this.throwBall();
    }
  }

  render = () => {
    requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };

  animate = () => {
    const deltaTime =
      Math.min(0.05, this.clock.getDelta()) / this.STEPS_PER_FRAME;

    // we look for collisions in substeps to mitigate the risk of
    // an object traversing another too quickly for detection.

    for (let i = 0; i < this.STEPS_PER_FRAME; i++) {
      this.controls(deltaTime);
      this.updatePlayer(deltaTime);
      this.updateSpheres(deltaTime);
      this.teleportPlayerIfOob();
    }

    this.renderer.render(this.scene, this.camera);
    this.stats.update();
    // this.cameraControls.update();
    requestAnimationFrame(this.animate);
  };
}
