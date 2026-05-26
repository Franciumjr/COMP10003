function playAudio(audiofilename) {
    audio = new Audio(audiofilename);
    audio.play();
}

function stopAudio() {
    audio.pause();
}