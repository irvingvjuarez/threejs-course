import * as THREE from "three";
import { TextGeometry } from "three"
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
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

const heart = new THREE.Shape()
const heartX = -2
const heartY = 0.75
heart.bezierCurveTo(heartX + 2.5, heartY + 2.5, heartX + 2, heartY, heartX, heartY);
heart.bezierCurveTo(heartX - 3, heartY, heartX - 3, heartY + 3.5, heartX - 3, heartY + 3.5);
heart.bezierCurveTo(heartX - 3, heartY + 5.5, heartX - 1.5, heartY + 7.7, heartX + 2.5, heartY + 9.5);
heart.bezierCurveTo(heartX + 6, heartY + 7.7, heartX + 8, heartY + 4.5, heartX + 8, heartY + 3.5);
heart.bezierCurveTo(heartX + 8, heartY + 3.5, heartX + 8, heartY, heartX + 5, heartY);
heart.bezierCurveTo(heartX + 3.5, heartY, heartX + 2.5, heartY + 2.5, heartX + 2.5, heartY + 2.5);
const extrudeSettings = {
	steps: 2,
	depth: 2,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 1,
	bevelSegments: 2
}
createMesh(heartX, heartY, new THREE.ExtrudeGeometry(heart, extrudeSettings))

const icosahedronRadius = 7;
createMesh(-1, 0.75, new THREE.IcosahedronGeometry(icosahedronRadius))

const latherPoints = new Array(10)
	.fill(0)
	.map((_i, index) => new THREE.Vector2(Math.sin(index * 0.2) * 3 + 3, (index - 5) * 0.8))
createMesh(0, 0.75, new THREE.LatheGeometry(latherPoints))

const octahedronRadius = 7;
createMesh(1, 0.75, new THREE.OctahedronGeometry(octahedronRadius))

const planeSize = 9;
const planeSegments = 2;
createMesh(2, 0.75, new THREE.PlaneGeometry(planeSize, planeSize, planeSegments, planeSegments))

const vertices = [
    -1, -1, -1,    1, -1, -1,    1,  1, -1,    -1,  1, -1,
    -1, -1,  1,    1, -1,  1,    1,  1,  1,    -1,  1,  1,
];
const indices = [
    2, 1, 0,    0, 3, 2,
    0, 4, 7,    7, 3, 0,
    0, 1, 5,    5, 4, 0,
    1, 2, 6,    6, 5, 1,
    2, 3, 7,    7, 6, 2,
    4, 5, 6,    6, 7, 4,
];
const polyhedronRadius = 7;
const polyhedronDetail = 2;
createMesh(-2, -0.5, new THREE.PolyhedronGeometry(vertices, indices, polyhedronRadius, polyhedronDetail))

const ringInner = 2;
const ringOuter = 7;
const ringSegments = 18;
createMesh(-1, -0.5, new THREE.RingGeometry(ringInner, ringOuter, ringSegments))

const planeHeart = new THREE.Shape()
const planeHeartX = 0;
const planeHeartY = -0.5;
planeHeart.moveTo(planeHeartX + 2.5, planeHeartY + 2.5);
planeHeart.bezierCurveTo(planeHeartX + 2.5, planeHeartY + 2.5, planeHeartX + 2, planeHeartY, planeHeartX, planeHeartY);
planeHeart.bezierCurveTo(planeHeartX - 3, planeHeartY, planeHeartX - 3, planeHeartY + 3.5, planeHeartX - 3, planeHeartY + 3.5);
planeHeart.bezierCurveTo(planeHeartX - 3, planeHeartY + 5.5, planeHeartX - 1.5, planeHeartY + 7.7, planeHeartX + 2.5, planeHeartY + 9.5);
planeHeart.bezierCurveTo(planeHeartX + 6, planeHeartY + 7.7, planeHeartX + 8, planeHeartY + 4.5, planeHeartX + 8, planeHeartY + 3.5);
planeHeart.bezierCurveTo(planeHeartX + 8, planeHeartY + 3.5, planeHeartX + 8, planeHeartY, planeHeartX + 5, planeHeartY);
planeHeart.bezierCurveTo(planeHeartX + 3.5, planeHeartY, planeHeartX + 2.5, planeHeartY + 2.5, planeHeartX + 2.5, planeHeartY + 2.5);
createMesh(planeHeartX, planeHeartY, new THREE.ShapeGeometry(planeHeart))

const sphereRadius = 7;
const sphereWidth = 12;
const sphereHeight = 8;
createMesh(1, -0.5, new THREE.SphereGeometry(sphereRadius, sphereWidth, sphereHeight))

const tetrahedronRadius = 7;
createMesh(2, -0.5, new THREE.TetrahedronGeometry(tetrahedronRadius))

const loader = new FontLoader()
loader.load("fonts/helvetiker_regular.typeface.json", (font) => {
	createMesh(-2, -2, new TextGeometry("three", {
		font: font,
		size: 3.0,
		height: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.15,
		bevelSize: 0.3,
		bevelOffset: 0,
		bevelSegments: 5
	}))
})

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