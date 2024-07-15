import * as THREE from "three";
import { updateMovement } from "./movement.js";

export const setupRendering = (
    scene,
    camera,
    renderer,
    // paintings,
    controls,
    walls,
    teleportVR
) => {
    const clock = new THREE.Clock();

    let render = function () {
        const delta = clock.getDelta();

        updateMovement(delta, controls, camera, walls);

        const distanceThreshold = 8;

        // let paintingToShow;
        // paintings.forEach((painting) => {
        //     const distanceToPainting = camera.position.distanceTo(painting.position);
        //     if (distanceToPainting < distanceThreshold) {
        //         paintingToShow = painting;
        //     }
        // });

        // if (paintingToShow) {
        //     // if there is a painting to show
        //     displayPaintingInfo(paintingToShow.userData.info);
        // } else {
        //     hidePaintingInfo();
        // }

        renderer.gammaOutput = true;
        renderer.gammaFactor = 2.2;

        teleportVR.update();

        renderer.render(scene, camera);
        renderer.setAnimationLoop(render);
    };

    render();
};
