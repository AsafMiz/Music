var song;
var playButton;
var stopButton;
var sliderVol;
var fft;
var w;

function preload() {

}

function setup() {
    createCanvas(480, 480);
    colorMode(HSB);
    w = 10;
    angleMode(DEGREES);
    img = loadImage("media/dj-bg.jpg");
    song = loadSound("media/Future.mp3", loaded);
    fft = new p5.FFT(0.9, 64);
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
    background(img);
    song.setVolume(sliderVol.value());
    var spectrum = fft.analyze();
    noStroke();
    for (var i = 0; i < spectrum.length; i++) {
        var y = map(spectrum[i], 0, 256, height, 0);
        fill(250 + i, 100 - i, 100, 0.7);
        rect(i * w, y, w - 2, height - y);
    }
}
