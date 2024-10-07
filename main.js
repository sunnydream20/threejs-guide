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

// Position the camera
camera.position.set(0, 1, 5); // Adjust as needed
camera.lookAt(0, 0, 0); // Look at center

const MAX_POINTS = 500;

// geometry
const geometry = new THREE.BufferGeometry();

// attributes
const positions = new Float32Array(MAX_POINTS * 3); // 3 floats (x, y and z) per point
geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

// draw range
const drawCount = 2; // draw the first 2 points, only
geometry.setDrawRange(0, drawCount);

// material
const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

// line
const line = new THREE.Line(geometry, material);

const positionAttribute = line.geometry.getAttribute("position");

let x = 0,
  y = 0,
  z = 0;

for (let i = 0; i < positionAttribute.count; i++) {
  positionAttribute.setXYZ(i, x, y, z);

  x += (Math.random() - 0.5) * 30;
  y += (Math.random() - 0.5) * 30;
  z += (Math.random() - 0.5) * 30;
}

line.geometry.setDrawRange(0, 10);

scene.add(line);

positionAttribute.needsUpdate = true; // required after the first render

line.geometry.computeBoundingBox();
line.geometry.computeBoundingSphere();

renderer.render(scene, camera);

import { VRButton } from "three/addons/webxr/VRButton.js";
VRButton.position.setXYZ(10, 10, 10);
document.body.appendChild(VRButton.createButton(renderer));
renderer.xr.enabled = true;
renderer.setAnimationLoop(function () {
  renderer.render(scene, camera);
});
