function playAudio(filename) {
    let audio = new Audio(filename);
    audio.play();
}

function autoAudio(autoPlay, filename) {
    if (autoPlay.value == "on") {
        playAudio(filename);
    }
}