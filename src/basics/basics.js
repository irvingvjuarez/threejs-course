import * as THREE from "three"

// Setting up canvas
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Setting up cameras
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Setting up scenes
const scene = new THREE.Scene();

// Setting up the displayed mash
const boxWidth = 1;
const boxHeight = boxWidth;
const boxDepth = boxHeight
const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

const boxMaterial = new THREE.MeshPhongMaterial({ color: "green" })

const cube = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(cube)

// Animate the cube to see it as a whole, and not only one face
function animate(time) {
	time *= 0.001 // convert time to seconds
	cube.rotation.x = cube.rotation.y = time;
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