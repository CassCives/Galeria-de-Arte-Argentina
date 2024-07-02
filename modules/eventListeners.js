import { keysPressed } from "./movement.js";
import { showMenu, hideMenu } from "./menu.js";

let lockPointer = true;
let showMenuOnUnlock = false;

export const setupEventListeners = (controls, camera, scene) => {
    // add the event listeners to the document which is the whole page
    document.addEventListener(
        "keydown",
        (event) => onKeyDown(event, controls),
        false
    );
    document.addEventListener(
        "keyup",
        (event) => onKeyUp(event, controls),
        false
    );

    controls.addEventListener("unlock", () => {
        if (showMenuOnUnlock) {
            showMenu();
        }
        showMenuOnUnlock = false;
    });
};

function togglePointerLock(controls) {
    if (lockPointer) {
        controls.lock();
    } else {
        showMenuOnUnlock = false;
        controls.unlock();
    }
    lockPointer = !lockPointer; // toggle the lockPointer variable
};

function onKeyDown(event, controls) {
    // event is the event object that has the key property
    if (event.key in keysPressed) {
        // check if the key pressed by the user is in the keysPressed object
        keysPressed[event.key] = true; // if yes, set the value of the key pressed to true
    }
    if (event.key === "Escape") {
        // if the "ESC" key is pressed
        showMenu(); // show the menu
        showMenuOnUnlock = true;
        controls.unlock(); // unlock the pointer
        lockPointer = false;
    }
    if (event.key === "p") {
        // if the "SPACE" key is pressed
        controls.unlock(); // unlock the pointer
        lockPointer = false;
    }
    // if key prssed is enter or return for mac
    if (event.key === "Enter" || event.key === "Return") {
        // if the "ENTER" key is pressed
        hideMenu(); // hide the menu
        controls.lock(); // lock the pointer
        lockPointer = true;
    }
    if (event.key === "m") {
        // if the "h" key is pressed
        showMenu(); // show the menu
        showMenuOnUnlock = true;
        controls.unlock(); // unlock the pointer
        lockPointer = false;
    }

    if (event.key === "r") {
        // if the "r" key is pressed
        location.reload(); // reload the page
    }
};

function onKeyUp(event, controls) {
    // same but for keyup
    if (event.key in keysPressed) {
        keysPressed[event.key] = false; // set to false when the key is released
    }
};