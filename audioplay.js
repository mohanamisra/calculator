let audioButtons = document.getElementsByClassName("button");
let backgroundMusic = document.getElementById("audio");

let muteButton;
let playButton;
let audioButton = document.getElementById("audio-button");
audioButton.addEventListener("click", playMusic);

for(let button of audioButtons){
    button.addEventListener("click", playMusic);
}

function stopMusic(){
    backgroundMusic.pause();
    audioButton.innerText = "Play Audio";
    muteButton.removeEventListener("click", stopMusic);
}

function playMusic(){
    backgroundMusic.play();
    audioButton.innerText = "Pause Audio";
    for(let button of audioButtons){
        button.removeEventListener("click", playMusic);
    }
    muteButton = audioButton;
    muteButton.addEventListener("click", stopMusic);
}

backgroundMusic.addEventListener("ended", () => {
    this.currentTime = 0;
    this.play();
}, false);