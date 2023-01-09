import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

// Setting up
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)
const canvas = renderer.domElement

// Camera - Controls - Scene
const fov = 40;
const aspect = window.innerWidth / window.innerHeight;
const near = 2;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
const controls = new OrbitControls(camera, renderer.domElement)
const scene = new THREE.Scene()

camera.position.set(0, 8, 11)
controls.update()

// Adding light into the scene
const lightColor = "white"
const intensity = 3
const light = new THREE.PointLight(lightColor, intensity)
scene.add(light)

// An array of objects whose rotation to update
const objects = []

// User just one sphere for everything
const radius = 1;
const widhtSegments = 6;
const heightSegments = 6;
const sunGeometry = new THREE.SphereGeometry(radius, widhtSegments, heightSegments);

const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xFFFF00 })
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.scale.set(5, 5, 5)

scene.add(sun)
objects.push(sun)

function resizeCanvas() {
	const pixelRatio = window.devicePixelRatio
	const resizeWidth = canvas.width * pixelRatio !== window.innerWidth
	const resizeHeight = canvas.height * pixelRatio !== window.innerHeight
	const resizingResult = resizeWidth || resizeHeight

	if (resizingResult) {
		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	return resizingResult
}

function animate(time) {
	requestAnimationFrame(animate)

	if (resizeCanvas()) {
		camera.aspect = canvas.clientWidth / canvas.clientHeight
		camera.updateProjectionMatrix()
	}

	objects.forEach(obj => {
		obj.rotation.x = time / 1000
		obj.rotation.y = time / 1000
	})

	controls.update()
	renderer.render(scene, camera)
}
requestAnimationFrame(animate)