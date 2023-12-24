import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";

import waterFragmentShader from "./shaders/water/fragment.glsl";
import waterVertexShader from "./shaders/water/vertex.glsl";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });

const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Water
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512);

debugObject.depthColor = "#406cd4";
debugObject.surfaceColor = "#9bd8ff";

// Material
const waterMaterial = new THREE.ShaderMaterial({
	side: THREE.DoubleSide,
	vertexShader: waterVertexShader,
	fragmentShader: waterFragmentShader,
	uniforms: {
		uTime: {
			value: 0,
		},

		uBigWaveElevation: {
			value: 0.2,
		},
		uBigWaveFrequency: {
			value: new THREE.Vector2(4, 1.5),
		},
		uBigWavesSpeed: {
			value: 0.75,
		},

		uSmallWaveElevation: {
			value: 0.15,
		},
		uSmallWaveFrequency: {
			value: 3,
		},
		uSmallWavesSpeed: {
			value: 0.2,
		},
		uSmallWavesIterations: {
			value: 2,
		},

		uDepthColor: {
			value: new THREE.Color(debugObject.depthColor),
		},
		uSurfaceColor: {
			value: new THREE.Color(debugObject.surfaceColor),
		},
		uColorOffset: {
			value: 0.08,
		},
		uColorMultiplier: {
			value: 5.0,
		},
	},
});

gui
	.add(waterMaterial.uniforms.uBigWaveElevation, "value")
	.min(0)
	.max(1)
	.step(0.001)
	.name("BigWaveElevation");
gui
	.add(waterMaterial.uniforms.uBigWaveFrequency.value, "x")
	.min(0)
	.max(10)
	.step(0.001)
	.name("BigWaveFrequencyX");
gui
	.add(waterMaterial.uniforms.uBigWaveFrequency.value, "y")
	.min(0)
	.max(10)
	.step(0.001)
	.name("BigWaveFrequencyY");

gui
	.add(waterMaterial.uniforms.uBigWavesSpeed, "value")
	.min(0)
	.max(4)
	.step(0.001)
	.name("BigWavesSpeed");

gui
	.addColor(debugObject, "depthColor")
	.name("DepthColor")
	.onChange((value) => {
		waterMaterial.uniforms.uDepthColor.value.set(value);
	});
gui
	.addColor(debugObject, "surfaceColor")
	.name("SurfaceColor")
	.onChange((value) => {
		waterMaterial.uniforms.uSurfaceColor.value.set(value);
	});

gui
	.add(waterMaterial.uniforms.uColorOffset, "value")
	.min(0)
	.max(1)
	.step(0.001)
	.name("ColorOffset");
gui
	.add(waterMaterial.uniforms.uColorMultiplier, "value")
	.min(0)
	.max(10)
	.step(0.001)
	.name("ColorMultiplier");


gui.add(waterMaterial.uniforms.uSmallWaveElevation, 'value').min(0).max(1).step(0.001).name('SmallWaveElevation')
gui.add(waterMaterial.uniforms.uSmallWaveFrequency, 'value').min(0).max(30).step(0.001).name('SmallWaveFrequency')
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('SmallWavesSpeed')
gui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value').min(0).max(5).step(1).name('SmallWavesIterations')

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

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
camera.position.set(1, 1, 1);
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

	waterMaterial.uniforms.uTime.value = elapsedTime;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(animate);
};

animate();
