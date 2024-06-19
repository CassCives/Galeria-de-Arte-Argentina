import * as THREE from 'three';
import { PointerLockControls, ThreeMFLoader } from 'three-stdlib';
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
//texturas del piso
const floorTexture = new THREE.TextureLoader().load("img/WoodFloor.jpg");
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(20,20);
const planeGeometry = new THREE.PlaneGeometry(50,50);//ancho y alto
const planeMaterial = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide});
const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

floorPlane.rotation.x = Math.PI/2; //rotacion de 90 grados
floorPlane.position.y = -Math.PI;
scene.add(floorPlane);

//crear paredes
const wallGroup = new THREE.Group();//grupo que va a contener las paredes
scene.add(wallGroup);
//pared del fondo
const wallMaterial = new THREE.TextureLoader().load("img/Wall1.jpg");
wallMaterial.wrapS = THREE.RepeatWrapping;
wallMaterial.wrapT = THREE.RepeatWrapping;
wallMaterial.repeat.set(20,20);
const frontWall = new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshBasicMaterial({map: wallMaterial, side: THREE.DoubleSide})
);
frontWall.position.z = -20;
wallGroup.add(frontWall);
//pared izquierda
const leftWall = new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshBasicMaterial({map: wallMaterial})
);
leftWall.position.x = -20;
leftWall.rotation.y = Math.PI/2;//rota 90 grados 
wallGroup.add(leftWall);
//pared derecha
const rightWall = new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshBasicMaterial({map: wallMaterial})
);
rightWall.position.x = 20;
rightWall.rotation.y = Math.PI/2;
wallGroup.add(rightWall);
//pared atras
const backWall = new THREE.Mesh(
    new THREE.BoxGeometry(50,20,0.001),
    new THREE.MeshBasicMaterial({map: wallMaterial})
);
backWall.position.z = 25;
wallGroup.add(backWall);


//crear techo
const ceilingGeometry = new THREE.PlaneGeometry(50,50);
const ceilingMaterial = new THREE.MeshBasicMaterial(({color: "white"}))
const ceilingPlane = new THREE.Mesh(ceilingGeometry,ceilingMaterial);
ceilingPlane.rotation.x = Math.PI/2;
ceilingPlane.position.y = 10;
scene.add(ceilingPlane);

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

//controles

const controls = new PointerLockControls(camera, document.body);
//bloquear el puntero(se activan los controles), y oculta el menu cuando empieza la experiencia
function startExperience(){
    //bloquear puntero
    controls.lock();
    hideMenu();
}
const playButton = document.getElementById("play_button");
playButton.addEventListener("click", startExperience);

//ocultar menu
function hideMenu(){
    const menu = document.getElementById("menu");
    menu.style.display = 'none';
};
//ver menu
function showMenu(){
    const menu = document.getElementById("menu");
    menu.style.display = 'block';
}

document.addEventListener("keydown", onKeyDown, false);

function onKeyDown(event){
    //se usan keycodes para saber que tecla es
    switch(event.which){
    case 37://izq
    case 65://a
        controls.moveRight(-0.08);
        break;
    case 38://arriba
    case 87://w
        controls.moveForward(0.08);
        break;
    case 39://derecha
    case 68://d
        controls.moveRight(0.08);
        break;
    case 40://abajo
    case 83://s
        controls.moveForward(-0.08);
        break;
    }
};

let render = function() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);//renderizar

    requestAnimationFrame(render);//1 vez por frame, independiente de framerate
};

render();