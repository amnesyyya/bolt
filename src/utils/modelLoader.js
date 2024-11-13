import * as THREE from 'three';
    import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

    const loader = new GLTFLoader();

    const models = {
      robot: '/models/robot.glb',
      car: '/models/car.glb',
      spaceship: '/models/spaceship.glb'
    };

    export async function loadModel(modelName) {
      return new Promise((resolve, reject) => {
        loader.load(
          models[modelName],
          (gltf) => resolve(gltf.scene),
          undefined,
          (error) => reject(error)
        );
      });
    }
