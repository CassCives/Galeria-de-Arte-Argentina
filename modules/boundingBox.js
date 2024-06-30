import * as THREE from 'three';

export const createBoundingBoxes = (objects) => {
    // objects will be either paintings or walls that we pass in from main.js
    if (!Array.isArray(objects)) {
        objects = objects.children;
    }

    objects.forEach((object) => {
        object.BoundingBox = new THREE.Box3(); // create a new bounding box for each object
        object.BoundingBox.setFromObject(object); // set the bounding box to the object (painting or wall)
    });
};