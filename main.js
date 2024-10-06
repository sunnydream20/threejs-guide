/** @format */

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Load the model
const loader = new GLTFLoader();
loader.load(
  "plane_tree_trunk.glb",
  function (gltf) {
    console.log("Model loaded", gltf);
    gltf.scene.position.set(0, 0, 0); // Center model
    gltf.scene.scale.set(0.1, 0.1, 0.1); // Adjust scale if necessary
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error("An error occurred:", error);
  }
);

// Position the camera
camera.position.set(0, 1, 5); // Adjust as needed
camera.lookAt(0, 0, 0); // Look at center

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
