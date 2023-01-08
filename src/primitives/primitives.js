import * as THREE from "three";
// https://cdn.skypack.dev/three
// import {ParametricGeometry} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/geometries/ParametricGeometry";
// import {ParametricGeometries} from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/geometries/ParametricGeometries";

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

const coneRadius = 6;
const coneHeight = 8;
const coneSegments = 16;
createMesh(0, 2, new THREE.ConeGeometry(coneRadius, coneHeight, coneSegments))

const cylinderRadius = 4;
const cylinderHeight = 8;
const cylinderRadialSegments = 12;
createMesh(1, 2, new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight, cylinderRadialSegments))

const dodecahedronRadius = 7;
createMesh(2, 2, new THREE.DodecahedronGeometry(dodecahedronRadius))

const shape = new THREE.Shape()
const x = -2
const y = 0.75
shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);
const extrudeSettings = {
	steps: 2,
	depth: 2,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 1,
	bevelSegments: 2
}
createMesh(x, y, new THREE.ExtrudeGeometry(shape, extrudeSettings))

const icosahedronRadius = 7;
createMesh(-1, 0.75, new THREE.IcosahedronGeometry(icosahedronRadius))

const latherPoints = new Array(10)
	.fill(0)
	.map((_i, index) => new THREE.Vector2(Math.sin(index * 0.2) * 3 + 3, (index - 5) * 0.8))
createMesh(0, 0.75, new THREE.LatheGeometry(latherPoints))

const octahedronRadius = 7;
createMesh(1, 0.75, new THREE.OctahedronGeometry(octahedronRadius))

function klein(v, u, target) {
	u += 2 * Math.PI
	v += 2 * Math.PI

	const x = (u < Math.PI)
		? 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v)
		: 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI)
	const z = (u < Math.PI)
		? -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v)
		: -8 * Math.sin(u)
	const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

	target.set(x, y, z).multipluScalar(0.75)
}
const parametricSlices = 25
const parametricStacks = 25
// createMesh(2, 0.75, new ParametricGeometry(klein, parametricSlices, parametricStacks))


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