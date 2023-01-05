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

const boxMaterial = new THREE.MeshBasicMaterial({ color: "green" })

const cube = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(cube)

// Rendering the whole scenario
renderer.render(scene, camera)