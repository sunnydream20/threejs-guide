/** @format */

import * as THREE from "three";
// import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.137.0/examples/jsm/loaders/GLTFLoader.js";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, mixer, mesh;
const clock = new THREE.Clock();

init();
animate();

function init() {
  // Create scene
  scene = new THREE.Scene();

  // Set up camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 5); // Set camera further back
  camera.lookAt(0, 0, 0); // Look at the center of the scene

  // Set up renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add some basic lighting
  const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  scene.add(directionalLight);

  // Load GLTF model with animations
  const loader = new GLTFLoader();
  loader.load(
    "stylized_big_sword.glb",
    (gltf) => {
      mesh = gltf.scene;
      mesh.scale.set(1, 1, 1);
      // Add model to scene
      scene.add(mesh);

      // Create AnimationMixer
      mixer = new THREE.AnimationMixer(mesh);

      // Get clips and play a specific animation
      const clips = gltf.animations;

      // Play the specified "dance" animation
      const clip = THREE.AnimationClip.findByName(clips, "dance");
      if (clip) {
        const action = mixer.clipAction(clip);
        action.play();
      }

      // Optional: Play all animations
      // clips.forEach((clip) => {
      //     mixer.clipAction(clip).play();
      // });
    },
    undefined,
    (error) => {
      // console.log(error);
    }
  );

  // Handle window resize
  window.addEventListener("resize", onWindowResize, false);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta(); // seconds.
  if (mixer) mixer.update(delta); // Update the mixer.
  if (mesh) {
    mesh.rotation.x += 0.01; // Rotate the mesh around the Y axis
  }
  render(); // Render the scene.
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
