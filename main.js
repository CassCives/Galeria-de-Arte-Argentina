import * as THREE from "three";
import { scene, setupScene } from "./modules/scene.js";
import { createWalls } from "./modules/walls.js";
import { setupFloor } from "./modules/floor.js";
import { createCeiling } from "./modules/ceiling.js";
import { createBoundingBoxes } from "./modules/boundingBox.js";
import { setupRendering } from "./modules/rendering.js";
import { setupEventListeners } from "./modules/eventListeners.js";
//import { addObjectsToScene } from "./modules/sceneHelpers.js";
import { setupPlayButton } from "./modules/menu.js";
import { VRButton } from 'three/addons/webxr/VRButton.js';
import TeleportVR from "teleportvr";

let { camera, controls, renderer } = setupScene();

const textureLoader = new THREE.TextureLoader();

const walls = createWalls(scene, textureLoader);
const floor = setupFloor(scene);
const ceiling = createCeiling(scene);
createBoundingBoxes(walls)
setupPlayButton(controls);
setupEventListeners(controls);
//intento tp vr
const teleportVR = new TeleportVR(scene, camera);
const lefthand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16, 1, true),
    new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
    })
)

const controllerGrip0 = renderer.xr.getControllerGrip(0)
controllerGrip0.addEventListener('connected', (event) => {
    controllerGrip0.add(lefthand);
    teleportVR.add(0, controllerGrip0, event.data.gamepad);
})

const righthand = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 0.4, 16, 1, true),
    new THREE.MeshBasicMaterial({
        color: 0x00ff88,
        wireframe: true,
    })
)
const controllerGrip1 = renderer.xr.getControllerGrip(1)
controllerGrip1.addEventListener('connected', (event) => {
    controllerGrip1.add(righthand);
    teleportVR.add(1, controllerGrip1, event.data.gamepad);
})
//fin tp

setupRendering(scene, camera, renderer, controls, walls, teleportVR);
renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));


//luz de ambiente
const ambientLight = new THREE.AmbientLight(0x101010, 1.0); //color, intensidad
//ambientLight.position = camera.position; //la luz sigue a la camara
scene.add(ambientLight);
//luz direccional
const sunLight = new THREE.DirectionalLight(0xddddd, 1.0);
sunLight.position.y = 15;
scene.add(sunLight);


//crear pinturas
function createPainting(imageURL, width, height, position) {
    const TextureLoader = new THREE.TextureLoader();
    const paintingTexture = TextureLoader.load(imageURL);
    const paintingMaterial = new THREE.MeshBasicMaterial({
        map: paintingTexture,
    });
    const paintingGeometry = new THREE.PlaneGeometry(width, height);
    const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
    painting.position.set(position.x, position.y, position.z);
    return painting;
}

const painting1 = createPainting('/artworks/0.jpg', 10, 5, new THREE.Vector3(-10, 5, -19.99));
const painting2 = createPainting('/artworks/1.jpg', 10, 5, new THREE.Vector3(10, 5, -19.99));
scene.add(painting1, painting2);