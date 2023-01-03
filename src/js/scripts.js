import * as THREE from "three"

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.z = 6;
camera.position.x = 2;
camera.position.y = 2

const meshConfig = {
	color: "#fff"
}

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial(meshConfig);
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box)

renderer.render(scene, camera)