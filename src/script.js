import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Sky } from "three/addons/objects/Sky.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
//Floor Texture
const floorAlphaTexture = textureLoader.load("./floor/alpha.jpg");
const floorColorTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg"
);
const floorARMTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg"
);
const floorNormalTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg"
);
const floorDisplacementTexture = textureLoader.load(
  "./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg"
);

floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

// floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.4,
    displacementBias: -0.2,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);
gui
  .add(floor.material, "displacementScale")
  .min(0)
  .max(1)
  .step(0.001)
  .name("floorDisplacementScale");
gui
  .add(floor.material, "displacementBias")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("floorDisplacementBias");

// Wall
const wallColorTexture = textureLoader.load(
  "./wall/aerial_rocks_02_1k/aerial_rocks_02_diff_1k.jpg"
);
const wallARMTexture = textureLoader.load(
  "./wall/aerial_rocks_02_1k/aerial_rocks_02_arm_1k.jpg"
);
const wallNormalTexture = textureLoader.load(
  "./wall/aerial_rocks_02_1k/aerial_rocks_02_nor_gl_1k.jpg"
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;
// wallColorTexture.repeat.set(2, 2);
// wallARMTexture.repeat.set(2, 2);
// wallNormalTexture.repeat.set(2, 2);

// wallColorTexture.wrapS = THREE.RepeatWrapping;
// wallARMTexture.wrapS = THREE.RepeatWrapping;
// wallNormalTexture.wrapS = THREE.RepeatWrapping;

// wallColorTexture.wrapT = THREE.RepeatWrapping;
// wallARMTexture.wrapT = THREE.RepeatWrapping;
// wallNormalTexture.wrapT = THREE.RepeatWrapping;

// Roof
const roofColorTexture = textureLoader.load(
  "./roof/roof_07_1k/roof_07_diff_1k.jpg"
);
const roofARMTexture = textureLoader.load(
  "./roof/roof_07_1k/roof_07_arm_1k.jpg"
);
const roofNormalTexture = textureLoader.load(
  "./roof/roof_07_1k/roof_07_nor_gl_1k.jpg"
);
roofColorTexture.colorSpace = THREE.SRGBColorSpace;
roofColorTexture.repeat.set(2, 1);
roofARMTexture.repeat.set(2, 1);
roofNormalTexture.repeat.set(2, 1);

roofColorTexture.wrapS = THREE.RepeatWrapping;
roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;
roofColorTexture.wrapT = THREE.RepeatWrapping;
roofARMTexture.wrapT = THREE.RepeatWrapping;
roofNormalTexture.wrapT = THREE.RepeatWrapping;
//Door
// Roof
const doorColorTexture = textureLoader.load("./door/color.jpg");
const doorAlphaTexture = textureLoader.load("./door/alpha.jpg");
const doorNormalTexture = textureLoader.load("./door/normal.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./door/height.jpg");
const doorMetalnessTexture = textureLoader.load("./door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("./door/roughness.jpg");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// Bush
const bushColorTexture = textureLoader.load(
  "./bush/rocks_ground_02_1k/rocks_ground_02_col_1k.jpg"
);
const bushARMTexture = textureLoader.load(
  "./bush/rocks_ground_02_1k/rocks_ground_02_arm_1k.jpg"
);
const bushNormalTexture = textureLoader.load(
  "./bush/rocks_ground_02_1k/rocks_ground_02_nor_gl_1k.jpg"
);
bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;
// Rock
const rockColorTexture = textureLoader.load(
  "./rock/mossy_rock_1k/mossy_rock_diff_1k.jpg"
);
const rockARMTexture = textureLoader.load(
  "./rock/mossy_rock_1k/mossy_rock_arm_1k.jpg"
);
const rockNormalTexture = textureLoader.load(
  "./rock/mossy_rock_1k/mossy_rock_nor_gl_1k.jpg"
);
rockColorTexture.colorSpace = THREE.SRGBColorSpace;
// rockColorTexture.repeat.set(2, 1);
// rockARMTexture.repeat.set(2, 1);
// rockNormalTexture.repeat.set(2, 1);

// rockColorTexture.wrapS = THREE.RepeatWrapping;
// rockARMTexture.wrapS = THREE.RepeatWrapping;
// rockNormalTexture.wrapS = THREE.RepeatWrapping;
// rockColorTexture.wrapT = THREE.RepeatWrapping;
// rockARMTexture.wrapT = THREE.RepeatWrapping;
// rockNormalTexture.wrapT = THREE.RepeatWrapping;
/**
 * House
 */
// Group => House Container
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    transparent: true,
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);
walls.position.y += 2.5 / 2;
house.add(walls);

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4), // base, height, radius segment
  new THREE.MeshStandardMaterial({
    transparent: true,
    map: roofColorTexture,
    aoMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);
roof.position.y = 2.5 + 1.5 * 0.5;
roof.rotation.y = Math.PI * 0.25;

house.add(roof);

//Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    // wireframe: true,
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    normalMap: doorNormalTexture,
    displacementScale: 0.2,
    // color: "#344B40",
    displacementBias: -0.04,
  })
);
door.position.y = 2 * 0.5;
door.position.z = 2 + 0.001;
house.add(door);

// Bush
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  map: bushColorTexture,
  aoMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
  color: "#ccffcc",
});
//bush1
const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

// bush2
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

// bush3
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

// bush4
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
house.add(bush1, bush2, bush3, bush4);

//bush rotation
bush1.rotation.x = -0.75;
bush2.rotation.x = -0.75;
bush3.rotation.x = -0.75;
bush4.rotation.x = -0.75;
// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  transparent: true,
  map: rockColorTexture,
  aoMap: rockARMTexture,
  metalnessMap: rockARMTexture,
  roughnessMap: rockARMTexture,
  normalMap: rockNormalTexture,
  color: "gray",
});
const graveGroup = new THREE.Group();
scene.add(graveGroup);

for (let i = 0; i < 30; i++) {
  const radius = 3 + Math.random() * 4;
  const angle = Math.random() * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  //Mesh
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.x = x;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z;
  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  // Add to grave Group
  graveGroup.add(grave);
}
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

const doorLight = new THREE.PointLight("#ff7d46", 2);
house.add(doorLight);
doorLight.position.set(0, 2.2, 2.5);

// Ghosts
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightCameraHelper.visible = false;
scene.add(directionalLightCameraHelper);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
/**
 * Shadows
 */

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
directionalLight.castShadow = true;
walls.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
roof.castShadow = true;
graveGroup.children.forEach((children) => {
  children.castShadow = true;
});

walls.receiveShadow = true;
floor.receiveShadow = true;

//Mapping
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 18;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;
ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;
ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

// Sky
const sky = new Sky();
// sky.scale.set(100, 100, 100);
sky.scale.setScalar(1000);
scene.add(sky);
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 1;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);

//Fog
// scene.fog = new THREE.Fog("#ff0000", 1, 13); // color, near, far
scene.fog = new THREE.FogExp2("#04343f", 0.1); // color, near, far

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Ghost animation
  //Ghost 1
  const ghost1Angle = -elapsedTime * 0.3;
  ghost1.position.x = Math.cos(ghost1Angle) * 4.5;
  ghost1.position.z = Math.sin(ghost1Angle) * 4.5;
  ghost1.position.y =
    Math.sin(ghost1Angle) *
    Math.sin(ghost1Angle * 2.4) *
    Math.sin(ghost1Angle * 3.45);
  //Ghost 2
  const ghost2Angle = elapsedTime * 0.25;
  ghost2.position.x = Math.cos(ghost2Angle) * 6;
  ghost2.position.z = Math.sin(ghost2Angle) * 6;
  ghost2.position.y =
    Math.sin(ghost2Angle) *
    Math.sin(ghost2Angle * 2.4) *
    Math.sin(ghost2Angle * 3.45);
  //Ghost 3
  const ghost3Angle = elapsedTime * 0.38;
  ghost3.position.x = Math.cos(ghost3Angle) * 7;
  ghost3.position.z = Math.sin(ghost3Angle) * 7;
  ghost3.position.y =
    Math.sin(ghost3Angle) *
    Math.sin(ghost3Angle * 2.4) *
    Math.sin(ghost3Angle * 3.45);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
