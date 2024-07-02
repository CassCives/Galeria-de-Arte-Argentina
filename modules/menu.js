export const hideMenu = () => {
    const menu = document.getElementById("menu");
    menu.style.display = 'none';
};

//ver menu
export const showMenu = () => {
    const menu = document.getElementById("menu");
    menu.style.display = 'block';
};

//bloquear el puntero(se activan los controles), y oculta el menu cuando empieza la experiencia
export const startExperience = (controls) => {
    //bloquear puntero
    controls.lock();
    hideMenu();
};

export const setupPlayButton = (controls) => {
    const playButton = document.getElementById("play_button");
    playButton.addEventListener("click", () => startExperience(controls));
}