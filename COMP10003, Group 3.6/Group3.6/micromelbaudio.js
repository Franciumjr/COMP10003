function playAudio(audiofilename) {
    audio = new Audio(audiofilename);
    audio.play();
}

function stopAudio(audiofilename) {
    audio.pause();
}