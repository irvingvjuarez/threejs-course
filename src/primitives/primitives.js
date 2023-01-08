import * as THREE from "three";

// Setting up canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement

document.body.appendChild(canvas);

// Setting up camera
const fov = 40;
const aspect = 2;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120

// Setting up the scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xAAAAAA)

// CONSTANTS
const MESHES = []
const GAP = 15

// Adding lights to the scene
const color = "white"
const intensity = 1
const light = new THREE.DirectionalLight(color, intensity)
light.position.set(0,0,3)
scene.add(light)

// Adding light helper
// const lightHelper = new THREE.DirectionalLightHelper(light, 5);
// scene.add(lightHelper)

// Function to determine if the canvas requires changes in size
function updatingCanvas() {
	const pixelRatio = window.devicePixelRatio
	const changeInWidth = canvas.width * pixelRatio !== window.innerWidth
	const changeInHeight = canvas.height * pixelRatio !== window.innerHeight
	const updatingResult = changeInWidth || changeInHeight

	if (updatingResult) {
		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	return updatingResult
}

// Function to create a random colored material
function createMaterial() {
	const n = (Math.random() * 0xfffff * 1000000).toString(16);
	const color = '#' + n.slice(0, 6);
	const material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color })

	// const hue = Math.random();
	// const saturation = 1;
	// const luminance = 0.5;
	// material.color.setHSL(hue, saturation, luminance)

	return material
}

// Function to attach the material to the geometry
function createMesh(x, y, geometry) {
	const mesh = new THREE.Mesh(geometry, createMaterial())
	mesh.position.x = x * GAP;
	mesh.position.y = y * GAP;

	MESHES.push(mesh)
}

// Creating the Meshes
const boxSize = 8;
createMesh(-2, 2, new THREE.BoxGeometry(boxSize, boxSize, boxSize))

const circleRadius = 7;
const circleSegments = 27;
createMesh(-1, 2, new THREE.CircleGeometry(circleRadius, circleSegments))

// Rendering the current meshes
MESHES.forEach(mesh => scene.add(mesh))

// Animate the mesh to see it as a whole
function animate(time) {
	time *= 0.001 // convert time to seconds

	if(updatingCanvas()) {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	}

	MESHES.forEach(mesh => mesh.rotation.x = mesh.rotation.y = time)
	renderer.render(scene, camera)
	requestAnimationFrame(animate)
}

requestAnimationFrame(animate)