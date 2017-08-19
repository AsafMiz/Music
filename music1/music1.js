var song;
var playButton;
var stopButton;
var sliderVol;
var amp;
var volHistory = [];

function preload() {

}

function setup() {
    createCanvas(500, 500);
    angleMode(DEGREES);
    song = loadSound("media/The Ecstacy of Gold.mp3", loaded);
    amp = new p5.Amplitude();
    sliderVol = createSlider(0, 1, 0.3, 0.01);
    playButton = createButton("loading");
    stopButton = createButton("...");
    playButton.mousePressed(on);
    stopButton.mousePressed(off);
}

function loaded() {
    playButton.html("play");
    stopButton.html("stop");
    console.log("loaded");
}

function on() {
    if (!song.isPlaying()) {
        song.play();
        song.setVolume(0.3);
        playButton.html("pause");
    } else {
        song.pause();
        playButton.html("play");
    }
}

function off() {
    song.stop();
    playButton.html("play");
}

function draw() {
    background(50);
    song.setVolume(sliderVol.value());
    var vol = amp.getLevel();
    volHistory.push(vol);
    stroke(255);
    noFill();

    translate(width / 2, height / 2);
    rotate(90);
    beginShape();
    for (var i = 0; i <= 360; i++) {
        var r = map(volHistory[i], 0, 1, 150, 500);
        var x = r * cos(i / 2);
        var y = r * sin(i);
        vertex(x, y);
    }
    endShape();
    beginShape();
    for (var i = 0; i <= 360; i++) {
        var r = map(volHistory[i], 0, 1, 150, 500);
        var x = r * cos(i / 2);
        var y = r * sin(i + 180);
        vertex(x, y);
    }
    endShape();

    if (volHistory.length > 360) {
        volHistory.splice(0, 1);
    }
}
