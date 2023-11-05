import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style/main.css";
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper';
/**
 * GUI Controls
 */
import * as dat from "dat.gui";
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.37;
material.roughness = 0.4;
// const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 10));

// scene.add(plane)

const sphere = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.5, 32, 32),
	material
);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(
	new THREE.BoxBufferGeometry(0.75, 0.75, 0.75),
	material
);

const torus = new THREE.Mesh(
	new THREE.TorusBufferGeometry(0.3, 0.2, 32, 64),
	material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 5), material);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// ambientLight.color = new THREE.Color(0xffffff)
// ambientLight.intensity = 0.5
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.5)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 0.5)
pointLight.position.set(1, -0.5, 1)
scene.add(pointLight)

const rectareaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
rectareaLight.position.set(0, 0, 1)
scene.add(rectareaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 0)
scene.add(spotLight)


const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

window.requestAnimationFrame(()=>{
	spotLightHelper.update()
})

const rectareaLightHelper = new RectAreaLightHelper(rectareaLight)
scene.add(rectareaLightHelper)

window.requestAnimationFrame(()=>{
	rectareaLightHelper.position.copy(rectareaLight.position)
	rectareaLightHelper.update()
})


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
	0.001,
	5000
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const animate = () => {
	const elapsedTime = clock.getElapsedTime();

	sphere.rotation.x = elapsedTime * 0.3
	cube.rotation.x = elapsedTime * 0.3
	torus.rotation.x = elapsedTime * 0.3

	sphere.rotation.y = elapsedTime * 0.2
	cube.rotation.y = elapsedTime * 0.2
	torus.rotation.y = elapsedTime * 0.2

	camera.lookAt(cube.position);

	// Update controls
	controls.update();
	// Render
	renderer.render(scene, camera);

	// Call animate again on the next frame
	window.requestAnimationFrame(animate);
};

animate();
