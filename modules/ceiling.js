import * as THREE from 'three';

export const createCeiling = (scene, textureLoader) => {
    const ceilingGeometry = new THREE.PlaneGeometry(50, 50);
    const ceilingMaterial = new THREE.MeshBasicMaterial(({ color: "white" }))
    const ceilingPlane = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
    ceilingPlane.rotation.x = Math.PI / 2;
    ceilingPlane.position.y = 10;
    scene.add(ceilingPlane);
}