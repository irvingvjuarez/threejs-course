import * as THREE from "three";

// Setting up canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement

document.body.appendChild(canvas);

// Setting up camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 5

// Setting up the scene
const scene = new THREE.Scene()

// Creation of a box buffer geometry
const squareGeometry = new THREE.BufferGeometry()
const vertices = new Float32Array([
	-1, -1, 1,
	1, -1, 1,
	1, 1, 1,

	1, 1, 1,
	-1, 1, 1,
	-1, -1, 1
])
squareGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3))

const squareMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const square = new THREE.Mesh(squareGeometry, squareMaterial)
scene.add(square)

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

// Animate the square to see it as a whole
function animate(time) {
	time *= 0.001 // convert time to seconds

	if(updatingCanvas()) {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	}

	square.rotation.x = square.rotation.y = time
	renderer.render(scene, camera)
	requestAnimationFrame(animate)
}

requestAnimationFrame(animate)