import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  BoxGeometry,
  SphereGeometry,
  TorusGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Mesh,
  TorusKnotGeometry,
  PlaneGeometry,
  TextureLoader,
  Clock,
  DirectionalLight,
  PointLight,
  SpotLight,
  FogExp2,
  AmbientLight,
  PCFSoftShadowMap,
} from "/three/build/three.module.js";

import { OrbitControls } from "/three/tools/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "/three/tools/jsm/loaders/GLTFLoader.js";

// Create WebGL Renderer
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.shadowMap.enabled = true;

// Add domElement to Body
document.body.appendChild(renderer.domElement);

// Create Scene
const scene = new Scene();
scene.fog = new FogExp2(0x000000, 0.02);
scene.background = new Color(0x202020);

// Create Camera
const camera = new PerspectiveCamera(
  60, // fov
  window.innerWidth / window.innerHeight, //aspect
  0.01, //near
  100.0 //far
);
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

const loader = new GLTFLoader();
loader.load("/models/VikingRoom/scene.gltf", (model) => {
  scene.add(model.scene);
});

const aLight = new AmbientLight(0xffffff, 1);
scene.add(aLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const textureLoader = new TextureLoader();

const sunLight = new PointLight(0xfdfbd3, 2, 70);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const dirLight = new DirectionalLight(0xffffff, 0.2);
dirLight.position.set(0, 10, 0);
dirLight.castShadow = true;
scene.add(dirLight);

// Create Object

const updateFrame = () => {
  //2. command to render any frame
  requestAnimationFrame(updateFrame);

  //3. Add position/rotation changes

  //1. Set Render
  renderer.render(scene, camera);
};

updateFrame();
