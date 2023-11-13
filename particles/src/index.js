import "./style/main.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const starTexture = new textureLoader.load("/textures/particles/2.png");

// const particlesGeomatry = new THREE.SphereBufferGeometry(1, 32, 32)
const particlesGeomatry = new THREE.BufferGeometry();
const count = 20000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count, 3);

for (let i = 0; i < count * 3; i++) {
	positions[i] = (Math.random() - 0.5) * 10;
	colors[i] = Math.random();
}
particlesGeomatry.setAttribute(
	"position",
	new THREE.BufferAttribute(positions, 3)
);
particlesGeomatry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
	size: 0.1,
	sizeAttenuation: true,
	// color: '#ff88cc',
	alphaMap: starTexture,
	transparent: true,
	// alphaTest: 0.001,
	// depthTest: false
	depthWrite: false,
	blending: THREE.AdditiveBlending,
	vertexColors: true,
});

const particles = new THREE.Points(particlesGeomatry, particlesMaterial);

scene.add(particles);

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
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const animate = () => {
	const elapsedTime = clock.getElapsedTime();

	// particles.rotation.x = elapsedTime * 0.3
	// particles.rotation.y = elapsedTime * 0.2
	// particles.rotation.z = elapsedTime * 0.1

	for (let i = 0; i < count; i++) {
		const i3 = i * 3;
		const x = particlesGeomatry.attributes.position.array[i3]
		particlesGeomatry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
	}
	particlesGeomatry.attributes.position.needsUpdate = true
	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call animate again on the next frame
	window.requestAnimationFrame(animate);
};

animate();
