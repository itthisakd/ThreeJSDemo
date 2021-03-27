import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PlaneGeometry,
  TextureLoader,
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
camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

const textureLoader = new TextureLoader();
const boxTexture = textureLoader.load("textures/basicBox.jpg");

// Create Object
const boxGeometry = new BoxGeometry(1, 1, 1);
const boxMaterial = new MeshBasicMaterial({ color: 0xff0000 });
const box = new Mesh(boxGeometry, boxMaterial);
box.position.x = -2;

const boxGeometry2 = new BoxGeometry(2, 2, 2);
const boxMaterial2 = new MeshBasicMaterial({
  color: 0xffffff,
  map: boxTexture,
});
const box2 = new Mesh(boxGeometry2, boxMaterial2);
box2.position.x = 2;
box2.position.y = 2;

scene.add(box, box2);

const deg = (d) => {
  return (d / 180) * Math.PI;
};

let agr = 0;
let amp = 2;
const eqn = () => {
  const y = Math.abs(Math.cos(agr) * amp);
  // y = Acos(t + O)
  agr += 0.1;
  if (amp > 1) amp -= 0.1;
  return y;
};

const planeGeometry = new PlaneGeometry(5, 5);
const planeMaterial = new MeshBasicMaterial({ color: 0xffffff });
const plane = new Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -deg(90);
scene.add(plane);

const updateFrame = () => {
  //2. command to render any frame
  requestAnimationFrame(updateFrame);

  box.position.y = eqn();
  box.rotation.y += 0.05;

  //1. Set Render
  renderer.render(scene, camera);
};

updateFrame();
