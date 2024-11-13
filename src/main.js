import * as THREE from 'three';
    import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
    import { loadModel } from './utils/modelLoader';
    import { gsap } from 'gsap';

    // Scene setup
    const canvas = document.getElementById('hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(ambientLight, directionalLight);

    // Camera positioning
    camera.position.z = 5;

    // Mouse movement tracking
    const mouse = new THREE.Vector2();
    let currentModel = null;

    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Gentle camera panning
      gsap.to(camera.position, {
        x: mouse.x,
        y: mouse.y,
        duration: 1,
        ease: 'power1.out'
      });
    }

    // Model loading and switching
    async function switchModel(modelName) {
      if (currentModel) {
        scene.remove(currentModel);
      }

      currentModel = await loadModel(modelName);
      currentModel.scale.set(2, 2, 2);
      scene.add(currentModel);
    }

    // Background color change
    const colorPicker = document.getElementById('background-color');
    colorPicker.addEventListener('input', (e) => {
      scene.background = new THREE.Color(e.target.value);
    });

    // Model selector buttons
    document.querySelectorAll('.model-selector button').forEach(button => {
      button.addEventListener('click', () => {
        switchModel(button.dataset.model);
      });
    });

    // Initial model load
    switchModel('robot');

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      if (currentModel) {
        currentModel.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    }

    // Event listeners
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
