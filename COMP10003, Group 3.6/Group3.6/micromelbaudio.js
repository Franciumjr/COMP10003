function playAudio(audiofilename) {
    audio = new Audio(audiofilename);
    alert("Playing audio " + audiofilename);
    audio.play();
}

function stopAudio(audiofilename) {
    audio.pause();
    alert("Stopping audio");
}

// function toggleAudio() {
//     if (document.getElementById("audio-toggle").checked) {
//         localStorage.setItem("autoplay", "true");
//         alert("Autoplay is on");
//     } else {
//         localStorage.setItem("autoplay", "false");
//         alert("Autoplay is off");
//     }
// }

// function autoAudio(audiofilename) {
//     alert("Auto play is " + localStorage.getItem("autoplay"));
//     if (localStorage.getItem("autoplay") == "true") {
//         alert("Autoplay detected");
//         alert(audiofilename);
//         playAudio(audiofilename);
//     }
// }