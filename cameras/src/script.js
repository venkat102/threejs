import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from 'gsap'
import * as dat from "dat.gui";

const gui = new dat.GUI();
gui.hide()

const cursor = {
	x: 0,
	y: 0,
};

const parameters = {
	color: 0xff0000,
	spin: ()=>{
		gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2, duration: 10})
	},
	scalex:1,
	scaley:1,
	scalez:1,
	rotate: true
}

// window.addEventListener('mousemove', (event)=>{
// 	cursor.x = event.clientX / sizes.width - 0.5
// 	cursor.y = event.clientY / sizes.height - 0.5
// })

window.addEventListener("mousemove", (event) => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -(event.clientY / sizes.height - 0.5);
});

const scene = new THREE.Scene();

const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2);

// const count = 500;
// const position = new Float32Array(count * 3 * 3)

// for(let i=0; i<count*3*3; i++){
// 	position[i] = (Math.random() - 0.5) * 10
// }

// const positionAttribute = new THREE.BufferAttribute(position, 3)
// const geometry = new THREE.BufferGeometry()

// geometry.setAttribute("position", positionAttribute)

// const geometry = new THREE.Geometry()

// for(let i = 0; i<50; i++){
// 	for(let j=0;j<3;j++){
// 		geometry.vertices.push(new THREE.Vector3((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4))
// 	}
// 	const verticesIndex = i*3
// 	geometry.faces.push(new THREE.Face3(
// 		verticesIndex,
// 		verticesIndex + 1,
// 		verticesIndex + 2
// 	))
// }

const material = new THREE.MeshBasicMaterial({
	color: parameters.color,
	// wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


gui.add(mesh, 'visible')
gui.add(material, "wireframe")
gui.add(parameters, "rotate").onChange(()=>{
	if(parameters.rotate)
	animate()
})
gui.addColor(parameters, 'color').onChange(()=>{
	material.color.set(parameters.color)
})

const positions = gui.addFolder("Positions")
positions.add(mesh.position, "x", -3, 3, 0.0001).name("X - Position");
positions.add(mesh.position, "y").min(-3).max(3).step(0.0001).name("Y - Position");
positions.add(mesh.position, "z").min(-3).max(3).step(0.0001).name("Z - Position");


const rotation = gui.addFolder("Rotation")
rotation.add(mesh.rotation, "x").min(-3).max(3).step(0.0001).name("X - Rotation");
rotation.add(mesh.rotation, "y").min(-3).max(3).step(0.0001).name("Y - Rotation");
rotation.add(mesh.rotation, "z").min(-3).max(3).step(0.0001).name("Z - Rotation");

const scale = gui.addFolder("Scale")
scale.add(parameters, "scalex").name("X - Scale").min(0).max(5).onChange(()=>{
	mesh.scale.set(parameters.scalex, parameters.scaley, parameters.scalez)
})
scale.add(parameters, "scaley").name("Y - Scale").min(0).max(5).onChange(()=>{
	mesh.scale.set(parameters.scalex, parameters.scaley, parameters.scalez)
})
scale.add(parameters, "scalez").name("Z - Scale").min(0).max(5).onChange(()=>{
	mesh.scale.set(parameters.scalex, parameters.scaley, parameters.scalez)
})




// gui.add(parameters, "spin")


// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

const sizes = {
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight,
};

window.addEventListener("resize", () => {
	sizes.width = document.documentElement.clientWidth;
	sizes.height = document.documentElement.clientHeight;

	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();
	renderer.setSize(sizes.width, sizes.height);
});

window,
	addEventListener("dblclick", () => {
		if (!document.fullscreenElement) canvas.requestFullscreen();
		else document.exitFullscreen();
	});

const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100)
camera.position.z = 3;
// camera.position.y = 2
scene.add(camera);
const canvas = document.querySelector(".webgl");

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const clock = new THREE.Clock();

const animate = () => {
	const elapsed_time = clock.getElapsedTime();

	mesh.rotation.y = elapsed_time

	// camera.position.x = cursor.x * -3
	// camera.position.y = cursor.y * 3
	// camera.lookAt(mesh.position)

	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
	// camera.position.y = cursor.y * 5
	// camera.lookAt(mesh.position)

	controls.update();

	renderer.render(scene, camera);

	if(parameters.rotate)
	window.requestAnimationFrame(animate);
};

animate();
