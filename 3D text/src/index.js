import * as dat from "dat.gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style/main.css";

const gui = new dat.GUI();

const scene = new THREE.Scene();

// const axisHelper = new THREE.AxesHelper()
// scene.add(axisHelper)

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");

const fontLoader = new THREE.FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
	const textGeometry = new THREE.TextBufferGeometry("Hello World", {
		font: font,
		size: 0.5,
		height: 0.2,
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 2,
	});
	// textGeometry.computeBoundingBox()
	// textGeometry.translate(
	// 	- (textGeometry.boundingBox.max.x - 0.02) * 0.5,
	// 	- (textGeometry.boundingBox.max.y - 0.02) * 0.5,
	// 	- (textGeometry.boundingBox.max.z - 0.03) * 0.5
	// )
	textGeometry.center();

	// const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
	const material = new THREE.MeshNormalMaterial();
	const text = new THREE.Mesh(textGeometry, material);

	scene.add(text);


	const torusGeomatry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)

	for (let index = 0; index < 400; index++) {
		const torus = new THREE.Mesh(torusGeomatry, material)

		torus.position.x = (Math.random() - 0.5) * 20
		torus.position.y = (Math.random() - 0.5) * 20
		torus.position.z = (Math.random() - 0.5) * 20

		torus.rotation.x = Math.random() * Math.PI
		torus.rotation.y = Math.random() * Math.PI

		const scale = Math.random()
		torus.scale.set(scale, scale, scale)

		scene.add(torus)

	}

});

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial();
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

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
camera.position.z = 3;
camera.position.y = 0;
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

	// camera.lookAt(mesh.position);

	controls.update();

	renderer.render(scene, camera);

	window.requestAnimationFrame(animate);
};

animate();
