import * as THREE from "three";

// Setting up canvas
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.appendChild(renderer.domElement);

// Setting up camera
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2

// Setting up the scene
const scene = new THREE.Scene()

// Rendering scene with camera
renderer.render(scene, camera)