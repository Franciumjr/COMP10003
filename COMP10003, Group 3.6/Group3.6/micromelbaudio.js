function playAudio(filename) {
    audio = new Audio(filename);
    audio.play();
}

function stopAudio(filename) {
    audio.pause();
}

function toggleAudio() {
    if (document.getElementById("audio-toggle").checked) {
        alert("Autoplay is on");
        localStorage.setItem("autoPlayVar", "true");
    } else {
        alert("Autoplay is off");
        localStorage.setItem("autoPlayVar", "false");
    }
}

function autoAudio(filename) {
    if (localStorage.getItem("autoPlayVar") == "true") {
        alert("Autoplay is on, playing audio");
        playAudio(filename);
    }
}