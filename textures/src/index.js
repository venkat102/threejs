import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style/main.css";
// import imageSource from '../static/textures/door/color.jpg'

// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
// 	texture.needsUpdate = true;
// };
// image.src = "/textures/door/color.jpg";

const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
	console.log("ON Start");
};

loadingManager.onLoaded = () => {
	console.log("ON Load");
};

loadingManager.onProgress = () => {
	console.log("ON Progress");
};

loadingManager.onError = () => {
	console.log("ON Error");
};

const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("/textures/minecraft.png");
// const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// const heightTexture = textureLoader.load("/textures/door/height.jpg");
// const normalTexture = textureLoader.load("/textures/door/normal.jpg");
// const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
// const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3

// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping

// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5

// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

colorTexture.generateMipmaps = false;

colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

const sizes = {
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight,
};

const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);

camera.position.x = 1;
camera.position.z = 1;
camera.position.y = 1;
scene.add(camera);

const canvas = document.querySelector(".webgl");

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// const clock = new THREE.Clock();

const animate = () => {
	// const elapsed_time = clock.getElapsedTime();

	// mesh.rotation.y = elapsed_time;

	camera.lookAt(mesh.position);

	controls.update();

	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
};

animate();
