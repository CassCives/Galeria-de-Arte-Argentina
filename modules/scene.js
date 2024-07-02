import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';

export const scene = new THREE.Scene();
let camera;
let controls;
let renderer;



export const setupScene = () => {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //camara invisible, es un pov, da profundidad, parametros fov y aspect ratio, lejos y cerca
    scene.add(camera);
    camera.position.set(0, 2, 15); //se mueve la camara para atras 5 unidades

    renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xfffff, 1); //cambio fondo a blanco
    document.body.appendChild(renderer.domElement); //añade renderer a html

    renderer.shadowMap.enabled = true; // enable shadow mapping
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // `renderer.shadowMap.type` is a property that defines the type of shadow map used by the renderer. THREE.PCFSoftShadowMap is one of the available shadow map types and stands for Percentage-Closer Filtering Soft Shadow Map. This type of shadow map uses an algorithm to smooth the edges of shadows and make them appear softer

    controls = new PointerLockControls(camera, renderer.domElement);
    scene.add(controls.getObject());
    window.addEventListener("resize", onWindowResize, false); // add an event listener to the window that calls the onWindowResize function when the window is resized. Its work is to update the camera's aspect ratio and the renderer's size. The third parameter is set to false to indicate that the event listener should be triggered in the bubbling phase instead of the capturing phase. The bubbling phase is when the event bubbles up from the target element to the parent elements. The capturing phase is when the event trickles down from the parent elements to the target element. The default value is false, so we don't need to include it, but I included it for clarity. The capturing phase is rarely used, so you can ignore it for now. You can read more about the capturing and bubbling phases here: https://javascript.info/bubbling-and-capturing

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight; // update the camera's aspect ratio
        camera.updateProjectionMatrix(); // update the camera's projection matrix. The projection matrix is used to determine how 3D points are mapped to the 2D space of the screen. It is used to calculate the frustum of the camera which is a truncated pyramid that represents the camera's field of view. Anything outside the frustum is not rendered. The projection matrix is used to calculate the frustum every time the window is resized.
        renderer.setSize(window.innerWidth, window.innerHeight); // update the size of the renderer
    }

    return { camera, controls, renderer };
};