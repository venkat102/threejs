import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'


const scene = new THREE.Scene()

const group = new THREE.Group()
scene.add(group)


const cube1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1, 1), new THREE.MeshBasicMaterial({color: 0xff0000}))
const cube2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1, 1), new THREE.MeshBasicMaterial({color: 0x00ff00}))
const cube3 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1, 1), new THREE.MeshBasicMaterial({color: 0x0000ff}))

cube1.position.set(0, 0, 0)
cube2.position.set(0.75, 0, 0)
cube3.position.set(1.5, 0, 0)

group.add(cube1)
group.add(cube2)
group.add(cube3)

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

const sizes = {
  width: document.documentElement.clientWidth,
  height: document.documentElement.clientHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 2
camera.position.x = 1
camera.position.y = 0
scene.add(camera)

// camera.lookAt(group.position)


const canvas = document.querySelector('.webgl')
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// const clock = new THREE.Clock()
gsap.to(group.position, {duration:5, delay:1, x:2.5})
gsap.to(group.position, {duration:5, delay:6, x:-2.5})


const animate = () => {

	// const elapsed_time = clock.getElapsedTime()

	// group.rotation.y = elapsed_time
	// group.rotation.x = elapsed_time
	// group.rotation.z = elapsed_time


	// camera.rotation.y = -elapsed_time
	// camera.rotation.x = -elapsed_time
	// camera.rotation.z = -elapsed_time


	// camera.lookAt(group.position)

	renderer.render(scene, camera)

	// console.count();

	window.requestAnimationFrame(animate)
}


animate()