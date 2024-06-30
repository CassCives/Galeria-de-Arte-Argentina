import * as THREE from 'three';
import { createBoundingBoxes } from './modules/boundingBox';
import { createCeiling } from './modules/ceiling';
import { setupFloor } from './modules/floor';
import { createWalls } from './modules/walls';
import { scene,setupScene } from './modules/scene';
import { setupPlayButton } from "./modules/menu.js";

let { camera, controls, renderer } = setupScene();

const textureLoader = new THREE.TextureLoader();

setupPlayButton(controls);

// const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000); //camara invisible, es un pov, da profundidad, parametros fov y aspect ratio, lejos y cerca

// scene.add(camera); //se añade a la escena
// camera.position.z = 5; //se mueve la camara para atras 5 unidades

//Renderer
// const renderer = new THREE.WebGLRenderer({antialias: true});
// renderer.setSize(window.innerWidth,window.innerHeight);
// renderer.setClearColor(0xfffff, 1); //cambio fondo a blanco
// document.body.appendChild(renderer.domElement); //añade renderer a html

//luz de ambiente
const ambientLight = new THREE.AmbientLight(0x101010,1.0); //color, intensidad
//ambientLight.position = camera.position; //la luz sigue a la camara
scene.add(ambientLight);
//luz direccional
const sunLight = new THREE.DirectionalLight(0xddddd,1.0);
sunLight.position.y = 15;
scene.add(sunLight);

const geometry = new THREE.BoxGeometry(1, 1, 1); //boxgeometry es la forma del objeto
const material = new THREE.MeshBasicMaterial({color: 0xff000}); //color del objeto
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

//crear el plano del piso
setupFloor(scene);

//crear paredes
const walls = createWalls(scene, textureLoader);

createBoundingBoxes(walls)

//crear techo
createCeiling(scene, textureLoader);

//crear pinturas
function createPainting(imageURL, width, height, position){
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

const painting1 = createPainting('/artworks/0.jpg', 10, 5, new THREE.Vector3(-10,5, -19.99));
const painting2 = createPainting('/artworks/1.jpg', 10, 5, new THREE.Vector3(10,5, -19.99));
scene.add(painting1,painting2);

//colisiones
function checkCollision(){
    const playerBoundingBox = new THREE.Box3();
    const cameraWorldPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraWorldPosition);
    playerBoundingBox.setFromCenterAndSize(//toma el centro y tamaño de la caja, seteamos la caja del jugador y centramos en la world position de la camara
        cameraWorldPosition,
        new THREE.Vector3(1,1,1)
    );
    for(let i = 0; i < walls.children.length;i++){
        const wall = walls.children[i];
        if(playerBoundingBox.intersectsBox(wall.BoundingBox)){
            return true;
        }
    }
    return false;
}

//controles

// const controls = new PointerLockControls(camera, document.body);
// //bloquear el puntero(se activan los controles), y oculta el menu cuando empieza la experiencia
// function startExperience(){
//     //bloquear puntero
//     controls.lock();
//     hideMenu();
// }
// const playButton = document.getElementById("play_button");
// playButton.addEventListener("click", startExperience);

// //ocultar menu
// function hideMenu(){
//     const menu = document.getElementById("menu");
//     menu.style.display = 'none';
// };
// //ver menu
// function showMenu(){
//     const menu = document.getElementById("menu");
//     menu.style.display = 'block';
// }

//teclas presionadas
const keyPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
};
//cuando presionan
document.addEventListener(
    'keydown',
    (event) => {
        if(event.key in keyPressed){
            keyPressed[event.key] = true;
        }
    },
    false
);
//cuando sueltan
document.addEventListener(
    'keyup',
    (event) => {
        if(event.key in keyPressed){
            keyPressed[event.key] = false;
        }
    },
    false
);

//movimiento
const clock = new THREE.Clock();//tiempo en el medio de los frames

function updateMovement(delta){
    const moveSpeed = 5 * delta; //moveSpeed es la distancia que se mueve la camara en un segundo, independiente del framerate
    const previousPosition = camera.position.clone();//guardo la posicion anterior para ver colisiones
    if(keyPressed.ArrowRight || keyPressed.d){
        controls.moveRight(moveSpeed);
    }
    if(keyPressed.ArrowLeft || keyPressed.a){
        controls.moveRight(-moveSpeed);
    }
    if(keyPressed.ArrowUp || keyPressed.w){
        controls.moveForward(moveSpeed);
    }
    if(keyPressed.ArrowDown || keyPressed.s){
        controls.moveForward(-moveSpeed);
    }

    if(checkCollision()){
        camera.position.copy(previousPosition); 
    }
}

let render = function() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    const delta = clock.getDelta();
    updateMovement(delta);
    renderer.render(scene,camera);//renderizar

    requestAnimationFrame(render);//llama a render() antes del proximo repaint
};

render();