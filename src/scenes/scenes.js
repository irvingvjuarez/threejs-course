import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement)

const fov = 40;
const aspect = window.innerWidth / window.innerHeight;
const near = 2;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

const controls = new OrbitControls(camera, renderer.domElement)

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xAAAAAA)

camera.position.z = 13
controls.update()

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

function animate() {
	requestAnimationFrame(animate)

	controls.update()
	renderer.render(scene, camera)
}
requestAnimationFrame(animate)