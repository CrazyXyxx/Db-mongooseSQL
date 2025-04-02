
// Music control
let music = document.getElementById("music");
let musicPlayer = document.querySelector(".music-player");

musicPlayer.addEventListener("click", function() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

