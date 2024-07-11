export const setupVR = (renderer) => {
  document.body.appendChild(VRButton.createButton(renderer));
  renderer.xr.enabled = true;
  renderer.render(scene, camera);
  renderer.setAnimationLoop(render);
}

