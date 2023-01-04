import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(0, 10, 7);
orbit.update()

// Box
const boxMaterialConfig = { color: "#00ff00" }

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial(boxMaterialConfig);
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box)

// box.translateY(-3)

function rotateBox(time) {
	box.rotation.x = time / 1000;
	box.rotation.y = time / 1000;
	renderer.render(scene, camera)
}
renderer.setAnimationLoop(rotateBox)

// Plane
const planeMaterialConfig = { color: "#fff", side: THREE.DoubleSide }

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial(planeMaterialConfig)
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI

// Grid helper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper)

// Sphere
const sphereMaterialConfig = { color: "blue", wireframe: true }

const sphereGeometry = new THREE.SphereGeometry(2.5, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial(sphereMaterialConfig);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere)

// Sphere with a standard material
const standardSphereConfig = { ...sphereMaterialConfig, wireframe: false }

const standardSphereMaterial = new THREE.MeshStandardMaterial(standardSphereConfig);
const standardSphere = new THREE.Mesh(sphereGeometry, standardSphereMaterial);
scene.add(standardSphere);

standardSphere.translateX(6)
