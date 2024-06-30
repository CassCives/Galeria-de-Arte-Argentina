import * as THREE from 'three';

export const setupFloor = (scene) => {
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load("img/WoodFloor.jpg");
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(20, 20);
    const planeGeometry = new THREE.PlaneGeometry(50, 50);//ancho y alto
    const planeMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    const floorPlane = new THREE.Mesh(planeGeometry, planeMaterial);

    floorPlane.rotation.x = Math.PI / 2; //rotacion de 90 grados
    floorPlane.position.y = -Math.PI;
    scene.add(floorPlane);
}