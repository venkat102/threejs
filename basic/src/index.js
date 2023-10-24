// import './style/main.css'
// import * as THREE from 'three'

// const scene = new THREE.Scene()

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({color: 0xff0000})
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// const sizes = {
//   width: 800,
//   height: 600
// }

// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z = 3
// camera.position.x = 2
// camera.position.y = 2
// scene.add(camera)

// const canvas = document.querySelector('.webgl')
// const renderer = new THREE.WebGLRenderer({canvas})
// renderer.setSize(sizes.width, sizes.height)
// renderer.render(scene, camera)



import './style.css'
import * as THREE from 'three'

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


const sizes = {
	width: document.documentElement.clientWidth,
	height: document.documentElement.clientHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
camera.position.y = 2
scene.add(camera)


const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


const clock = new THREE.Clock()

const animate = () => {
	const elapsed_time = clock.getElapsedTime()

	mesh.rotation.y = elapsed_time

	camera.lookAt(mesh.position)

	renderer.render(scene, camera)


	window.requestAnimationFrame(animate)
}

animate()