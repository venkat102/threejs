import './style/main.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
/**
 * GUI Controls
 */
import * as dat from 'dat.gui'
const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const object1 = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.5, 16, 16),
	new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.5, 16, 16),
	new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
	new THREE.SphereBufferGeometry(0.5, 16, 16),
	new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

scene.add(object1, object2, object3)


const raycaster = new THREE.Raycaster();

// const raycasterOrigin = new THREE.Vector3(-3, 0, 0);
// const raycasterDirection = new THREE.Vector3(10, 0, 0);
// raycasterDirection.normalize();

// raycaster.set(raycasterOrigin, raycasterDirection);

// const intersect = raycaster.intersectObject(object2)
// console.log(intersect)

// const intersects = raycaster.intersectObjects([object1, object2, object3])
// console.log(intersects)

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight
}

window.addEventListener('resize', () =>
{
	// Update sizes
	sizes.width = window.innerWidth
	sizes.height = window.innerHeight

	// Update camera
	camera.aspect = sizes.width / sizes.height
	camera.updateProjectionMatrix()

	// Update renderer
	renderer.setSize(sizes.width, sizes.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


const mouse = new THREE.Vector2()
window.addEventListener('mousemove', (e)=>{
	mouse.x = e.clientX / sizes.width * 2 -1
	mouse.y = - (e.clientY / sizes.height) * 2 + 1
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const animate = () =>
{
	const elapsedTime = clock.getElapsedTime()

	object1.position.y = Math.sin(elapsedTime *0.5) * 1.5
	object2.position.y = Math.sin(elapsedTime * 1.5) * 1.5
	object3.position.y = Math.sin(elapsedTime * 0.8) * 1.5


	raycaster.setFromCamera(mouse, camera)

	// const rayOrigin = new THREE.Vector3(-3, 0, 0)
	// const rayDirection = new THREE.Vector3(1, 0, 0)
	// rayDirection.normalize()

	// raycaster.set(rayOrigin, rayDirection)

	const objectToTest = [object1, object2, object3]

	const intersects = raycaster.intersectObjects(objectToTest)

	for (const object of objectToTest) {
		object.material.color.set("#ff0000")
	}

	for (const intersect of intersects) {
		intersect.object.material.color.set("#0000ff")
	}

	// Update controls
	controls.update()

	// Render
	renderer.render(scene, camera)

	// Call animate again on the next frame
	window.requestAnimationFrame(animate)
}

animate()