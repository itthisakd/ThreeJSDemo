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
  CylinderGeometry,
  PlaneGeometry,
  TextureLoader,
  Clock,
  DirectionalLight,
  PointLight,
  SpotLight,
  FogExp2,
  PCFSoftShadowMap,
} from "/three/build/three.module.js";

import { OrbitControls } from "/three/tools/jsm/controls/OrbitControls.js";

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

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

// const textureLoader = new TextureLoader();
// const boxTexture = textureLoader.load("textures/basicBox.jpg");
const deg = (d) => {
  return (d / 180) * Math.PI;
};

let brightness = 3;
let dir = true;
const flicker = () => {
  if (dir === true) {
    brightness += 0.2;
  } else if (dir === false) {
    brightness -= 0.2;
  }

  if (brightness < 1) {
    dir = true;
  } else if (brightness > 5) {
    dir = false;
  }
};

const textureLoader = new TextureLoader();

const sunLight = new PointLight(0xfdfbd3, 2, 70);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const dirLight = new DirectionalLight(0xffffff, 0.2);
dirLight.position.set(0, 10, 0);
dirLight.castShadow = true;
scene.add(dirLight);

const sunTexture = textureLoader.load("textures/sun.jpeg");
const earthTexture = textureLoader.load("textures/earth.jpeg");
const moonTexture = textureLoader.load("textures/moon.jpeg");
const starTexture = textureLoader.load("textures/stars.jpeg");
const metallicTexture = textureLoader.load("textures/metallic.jpeg");

scene.background = starTexture;

// Create Object
const sunGeometry = new SphereGeometry(2, 32, 32);
const sunMaterial = new MeshBasicMaterial({ map: sunTexture });
const sun = new Mesh(sunGeometry, sunMaterial);
sun.castShadow = true;
scene.add(sun);

const mGeometry = new TorusGeometry(7, 0.01, 30, 200, 6.3);
const mMaterial = new MeshBasicMaterial({ color: 0xffffff });
const mPath = new Mesh(mGeometry, mMaterial);
scene.add(mPath);
mPath.rotation.x = -deg(90);

const moonGeometry = new TorusGeometry(1, 0.005, 30, 200, 6.3);
const moonPMaterial = new MeshBasicMaterial({ color: 0xffffff });
const moonPath = new Mesh(moonGeometry, moonPMaterial);
moonPath.rotation.x = -deg(90);
// moonPath.rotation.y = deg(23.5); //omit this line
scene.add(moonPath);

const earth = sun.clone();
const earthMaterial = new MeshStandardMaterial({
  map: earthTexture,
});
earth.material = earthMaterial;
earth.scale.set(0.3, 0.3, 0.3);
earth.rotation.z = -deg(23.5);
scene.add(earth);

const axisgeometry = new CylinderGeometry(0.01, 0.01, 3, 64, 1);
const axismaterial = new MeshBasicMaterial({ color: 0xffffff });
const axis = new Mesh(axisgeometry, axismaterial);
axis.rotation.z = -deg(23.5);
scene.add(axis);

const moon = earth.clone();
const moonMaterial = new MeshStandardMaterial({
  map: moonTexture,
});
moon.material = moonMaterial;
moon.scale.set(0.1, 0.1, 0.1);
scene.add(moon);

const planeGeometry = new PlaneGeometry(100, 100);
const planeMaterial = new MeshStandardMaterial({ color: 0x00008d });
const floor = new Mesh(planeGeometry, planeMaterial);
floor.castShadow = false;
floor.receiveShadow = true;
floor.rotation.x = -deg(90);
floor.position.y = -2;
scene.add(floor);

//-----SPACESHIP
const geometry = new TorusKnotGeometry(1, 0.5, 12, 4, 2, 1);
const material = new MeshStandardMaterial({ map: metallicTexture });
const ship = new Mesh(geometry, material);
scene.add(ship);

let earthTmr = 0;
let moonTmr = 0;
let shipTmr = 0;

const updateFrame = () => {
  //2. command to render any frame
  requestAnimationFrame(updateFrame);

  ship.position.x = Math.cos(earthTmr) * 4;
  ship.position.y = Math.sin(earthTmr) * 7;
  ship.position.z = Math.tan(earthTmr) * 2;

  earth.position.x = Math.cos(earthTmr) * 7;
  earth.position.z = Math.sin(earthTmr) * 7;

  axis.position.x = Math.cos(earthTmr) * 7;
  axis.position.z = Math.sin(earthTmr) * 7;

  moonPath.position.x = Math.cos(earthTmr) * 7;
  moonPath.position.z = Math.sin(earthTmr) * 7;

  moon.position.x = Math.cos(moonTmr) * 1 + earth.position.x;
  moon.position.z = Math.sin(moonTmr) * 1 + earth.position.z;
  // moon.position.y = (Math.sin(moonTmr) * 1) / Math.tan(deg(23.5 + 45)); // omit this line

  flicker();
  earthTmr += 0.01;
  moonTmr += 0.05;
  shipTmr += 0.1;
  //1. Set Render
  renderer.render(scene, camera);
};

updateFrame();
