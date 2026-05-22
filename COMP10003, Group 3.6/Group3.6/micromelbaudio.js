function playAudio(filename) {
    audio = new Audio(filename);
    audio.play();
    alert("Playing audio");
}

function stopAudio(filename) {
    audio.pause();
    alert("Stopping audio");
}

function toggleAudio() {
    if (document.getElementById("audio-toggle").checked) {
        localStorage.setItem("autoplay", "true");
        alert("Autoplay is on");
    } else {
        localStorage.setItem("autoplay", "false");
        alert("Autoplay is off");
    }
}

function autoAudio(filename) {
    alert("Auto play is " + localStorage.getItem("autoplay"));
    if (localStorage.getItem("autoplay") == "true") {
        alert("Autoplay is on, playing audio");
        playAudio(filename);
    }
}

function makeColor(color) {
    document.getElementById("h1").style.color = color;
}