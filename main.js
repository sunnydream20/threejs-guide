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

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { GlitchPass } from "three/addons/postprocessing/GlitchPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const composer = new EffectComposer(renderer);

function animate() {
  requestAnimationFrame(animate);

  composer.render();
}
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);

const glitchPass = new GlitchPass();
composer.addPass(glitchPass);

const outputPass = new OutputPass();
composer.addPass(outputPass);
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { LuminosityShader } from "three/addons/shaders/LuminosityShader.js";

// later in your init routine

const luminosityPass = new ShaderPass(LuminosityShader);
composer.addPass(luminosityPass);

animate();
// renderer.render(scene, camera);
