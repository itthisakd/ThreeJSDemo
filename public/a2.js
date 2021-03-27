import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  BoxGeometry,
  SphereGeometry,
  TorusGeometry,
  MeshBasicMaterial,
  Mesh,
  TorusKnotGeometry,
  PlaneGeometry,
  TextureLoader,
  Clock,
  DirectionalLight,
  PointLight,
  SpotLight,
  PCFSoftShadowMap,
} from "/three/build/three.module.js";
import Stats from "/three/tools/jsm/libs/stats.module.js";

// Create WebGL Renderer
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Add domElement to Body
document.body.appendChild(renderer.domElement);

// Create Scene
const scene = new Scene(); // environment matrix
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

// const textureLoader = new TextureLoader();
// const boxTexture = textureLoader.load("textures/basicBox.jpg");
const deg = (d) => {
  return (d / 180) * Math.PI;
};

const textureLoader = new TextureLoader();
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
scene.add(sun);

const mGeometry = new TorusGeometry(7, 0.01, 30, 200, 6.3);
const mMaterial = new MeshBasicMaterial({ color: 0xffffff });
const mPath = new Mesh(mGeometry, mMaterial);
scene.add(mPath);
mPath.rotation.x = -deg(90);

// const mPlanet = sun.clone();
// const mPlanetMaterial = new MeshBasicMaterial({ color: 0xffffff, map: sunTexture });
// mPlanet.mMaterial = mPlanetMaterial;
// mPlanet.scale.set(0.2, 0.2, 0.2);
// mPlanet.position.x = 4;

const earth = sun.clone();
const earthMaterial = new MeshBasicMaterial({
  map: earthTexture,
});
earth.material = earthMaterial;
earth.scale.set(0.3, 0.3, 0.3);
earth.psoitio;
scene.add(earth);

const moon = earth.clone();
const moonMaterial = new MeshBasicMaterial({
  map: moonTexture,
});
moon.material = moonMaterial;
moon.scale.set(0.1, 0.1, 0.1);
moon.position.x = -20;
scene.add(moon);

// const geometry = new TorusKnotGeometry(3, 4.1, 4, 8, 10, 8);
// const material = new MeshBasicMaterial({ map: metallicTexture });
// const torusKnot = new Mesh(geometry, material);
// scene.add(torusKnot);

let earthTmr = 0;
let moonTmr = 0;

const updateFrame = () => {
  //2. command to render any frame
  requestAnimationFrame(updateFrame);

  earth.position.x = Math.cos(earthTmr) * 7;
  earth.position.z = Math.sin(earthTmr) * 7;

  moon.position.x = Math.cos(moonTmr) * 1 + earth.position.x;
  moon.position.z = Math.sin(moonTmr) * 1 + earth.position.z;

  earthTmr += 0.01;
  moonTmr += 0.05;
  //1. Set Render
  renderer.render(scene, camera);
};

updateFrame();
