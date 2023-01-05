import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import * as dat from "dat.gui"

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

// LIGHTS
const ambientLight = new THREE.AmbientLight("#333333");
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight("#fff", 1)
scene.add(directionalLight)
directionalLight.position.set(-30, -50, 0);

const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(dLightHelper)

// Box
const boxMaterialConfig = { color: "#00ff00" }

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial(boxMaterialConfig);
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box)

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
const sphereMaterialConfig = { color: "blue" }

const sphereGeometry = new THREE.SphereGeometry(2.5, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial(sphereMaterialConfig);
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere)

// Sphere with a standard material

const standardSphereMaterial = new THREE.MeshStandardMaterial(sphereMaterialConfig);
const standardSphere = new THREE.Mesh(sphereGeometry, standardSphereMaterial);
scene.add(standardSphere);

standardSphere.translateX(6)

// Dat library
const gui = new dat.GUI();
const guiOptions = {
	sphereColor: "#ffea00",
	wireframe: false,
	speed: 0.01
}

gui.addColor(guiOptions, "sphereColor")
	.onChange(evt => {
		sphere.material.color.set(evt)
	})

gui.add(guiOptions, "wireframe").onChange(evt => {
	sphere.material.wireframe = evt
})

// Adding controllers for the speed
gui.add(guiOptions, "speed", 0, 0.1);

// Adding animation to the sphere
let step = 0;

function rotateBox(time) {
	box.rotation.x = time / 1000;
	box.rotation.y = time / 1000;

	step += guiOptions.speed
	sphere.position.y = 10 * Math.abs(Math.sin(step))

	renderer.render(scene, camera)
}
renderer.setAnimationLoop(rotateBox)