import * as THREE from 'three';

//teclas presionadas
export const keysPressed = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    w: false,
    a: false,
    s: false,
    d: false,
};

export const updateMovement = (delta, controls, camera, walls) => {
    const moveSpeed = 5 * delta; //moveSpeed es la distancia que se mueve la camara en un segundo, independiente del framerate
    const previousPosition = camera.position.clone();//guardo la posicion anterior para ver colisiones
    if(keysPressed.ArrowRight || keysPressed.d){
        controls.moveRight(moveSpeed);
    }
    if(keysPressed.ArrowLeft || keysPressed.a){
        controls.moveRight(-moveSpeed);
    }
    if(keysPressed.ArrowUp || keysPressed.w){
        controls.moveForward(moveSpeed);
    }
    if(keysPressed.ArrowDown || keysPressed.s){
        controls.moveForward(-moveSpeed);
    }

    if(checkCollision(camera,walls)){
        camera.position.copy(previousPosition); 
    }
};

//colisiones
export const checkCollision = (camera,walls) => {
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
};