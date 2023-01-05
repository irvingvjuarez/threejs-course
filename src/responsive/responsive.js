import * as THREE from "three"

// Setting up canvas
const canvas = document.getElementById("c")
const renderer = new THREE.WebGLRenderer({ canvas })

// Setting up cameras
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Setting up scenes
const scene = new THREE.Scene();

// Function to add mashes automatically
function createMash(config = {}) {
	const size = config.size || 1
	const color = config.color || "green"

	const {
		x = 0,
		geometry = new THREE.BoxGeometry(size, size, size),
		material = new THREE.MeshPhongMaterial({ color }),
	} = config

	const mesh = new THREE.Mesh(geometry, material)
	mesh.position.x = x

	return mesh
}

// Adding mashes to the scene
const cube = createMash()
const cube2 = createMash({ color: "#44aa88", x: -2 })
const cube3 = createMash({ color: "#aa8844", x: 2 })
const cubes = [cube, cube2, cube3]
cubes.forEach(mesh => scene.add(mesh))

// Function to analize if the renderer size needs to be changed
function changeRendererSize() {
	const resizeWidth = canvas.width !== window.innerWidth
	const resizeHeight = canvas.height !== window.innerHeight
	const resizingResult = resizeWidth || resizeHeight

	if (resizingResult) {
		renderer.setSize(window.innerWidth, window.innerHeight)
	}

	return resizingResult
}

// Animate the cube to see it as a whole, and not only one face
function animate(time) {
	time *= 0.001 // convert time to seconds

	if (changeRendererSize()) {
		const canvas = renderer.domElement
		camera.aspect = canvas.clientWidth / canvas.clientHeight
		camera.updateProjectionMatrix()
	}

	cubes.forEach(mesh => mesh.rotation.x = mesh.rotation.y = time)
	renderer.render(scene, camera)
	requestAnimationFrame(animate)
}

requestAnimationFrame(animate)

// Adding a light
const color = 0xFFFFFF
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-2, 2, 4)
scene.add(light)

// Rendering the whole scenario
// renderer.render(scene, camera)