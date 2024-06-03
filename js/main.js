import * as THREE from './three.module.js';

const scene = new THREE.Scene(); //crear la escena

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); //camara invisible, es un pov, da profundidad, parametros fov y aspect ratio, lejos y cerca

scene.add(camera); //se añade a la escena
camera.position.z = 5; //se mueve la camara para atras 5 unidades

//Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(0xfffff, 1); //cambio fondo a blanco
document.body.appendChild(renderer.domElement); //añade renderer a html

//luz de ambiente
let ambientLight = new THREE.AmbientLight(0x101010,1.0); //color, intensidad
ambientLight.position = camera.position; //la luz sigue a la camara
scene.add(ambientLight);
//luz direccional
let sunLight = new THREE.DirectionalLight(0xddddd,1.0);
sunLight.position.y = 15;
scene.add(sunLight);

//renderizar
renderer.render(scene,camera);
