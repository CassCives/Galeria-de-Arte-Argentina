import * as THREE from 'three';
import { PointerLockControls } from 'three-stdlib';

export const scene = new THREE.Scene();
let camera;
let controls;
let renderer;



export const setupScene = () => {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //camara invisible, es un pov, da profundidad, parametros fov y aspect ratio, lejos y cerca
    scene.add(camera);
    camera.position.z = 5; //se mueve la camara para atras 5 unidades

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xfffff, 1); //cambio fondo a blanco
    document.body.appendChild(renderer.domElement); //añade renderer a html

    controls = new PointerLockControls(camera, document.domElement);
    scene.add(controls.getObject());
    return { camera, controls, renderer};
};