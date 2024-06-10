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
//ambientLight.position = camera.position; //la luz sigue a la camara
scene.add(ambientLight);
//luz direccional
let sunLight = new THREE.DirectionalLight(0xddddd,1.0);
sunLight.position.y = 15;
scene.add(sunLight);

let geometry = new THREE.BoxGeometry(1, 1, 1); //boxgeometry es la forma del objeto
let material = new THREE.MeshBasicMaterial({color: 0xff000}); //color del objeto
let cube = new THREE.Mesh(geometry, material);

scene.add(cube);

//crear el plano del piso
//texturas del piso
let floorTexture = new THREE.TextureLoader().load("img/WoodFloor.jpg");
let planeGeometry = new THREE.PlaneGeometry(50,50);//ancho y alto
let planeMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
let floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

floorPlane.rotation.x = Math.PI/2; //rotacion de 90 grados
floorPlane.position.y = -Math.PI;
scene.add(floorPlane);

//controles
document.addEventListener("keydown", onKeyDown, false);

function onKeyDown(event){
    //se usan keycodes para saber que tecla es
    let keycode = event.which;
    if(keycode == 39){
        camera.translateX(-0.05);
    }
    else if(keycode == 37){
        camera.translateX(0.05);
    }
    else if(keycode == 38){
        camera.translateY(-0.05);
    }
    else if(keycode == 40){
        camera.translateY(0.05);
    }
};

let render = function() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);//renderizar

    requestAnimationFrame(render);//1 vez por frame, independiente de framerate
};

render();