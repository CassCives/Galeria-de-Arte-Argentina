import * as THREE from 'three';

export function createWalls(scene, textureLoader) {
    let wallGroup = new THREE.Group();//grupo que va a contener las paredes
    scene.add(wallGroup);
    const wallMaterial = textureLoader.load("img/Wall1.jpg");
    wallMaterial.wrapS = THREE.RepeatWrapping;
    wallMaterial.wrapT = THREE.RepeatWrapping;
    wallMaterial.repeat.set(20, 20);
    const frontWall = new THREE.Mesh(
        new THREE.BoxGeometry(50, 20, 0.001),
        new THREE.MeshBasicMaterial({ map: wallMaterial, side: THREE.DoubleSide })
    );
    frontWall.position.z = -20;
    wallGroup.add(frontWall);

    const leftWall = new THREE.Mesh(
        new THREE.BoxGeometry(50,20,0.001),
        new THREE.MeshBasicMaterial({map: wallMaterial})
    );
    leftWall.position.x = -20;
    leftWall.rotation.y = Math.PI/2;//rota 90 grados 
    wallGroup.add(leftWall);

    const rightWall = new THREE.Mesh(
        new THREE.BoxGeometry(50,20,0.001),
        new THREE.MeshBasicMaterial({map: wallMaterial})
    );
    rightWall.position.x = 20;
    rightWall.rotation.y = Math.PI/2;
    wallGroup.add(rightWall);

    const backWall = new THREE.Mesh(
        new THREE.BoxGeometry(50,20,0.001),
        new THREE.MeshBasicMaterial({map: wallMaterial})
    );
    backWall.position.z = 25;
    wallGroup.add(backWall);

    return wallGroup;
}