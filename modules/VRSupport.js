

export const setupVR = (renderer) => {
  document.body.appendChild(VRButton.createButton(renderer));
  renderer.xr.enabled = true;
  renderer.setAnimationLoop(function () {

    renderer.render(scene, camera);

  });
  renderer.setAnimationLoop();
}

