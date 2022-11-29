var lx, ly, rx, ry;
var lscore = 0
var rscore = 0
var status1, status2 =""

function preload() {
  hedwigs = loadSound("hedwigs.mp3");
  star = loadSound("star.mp3");
}

function setup() {
  canvas = createCanvas(640, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  posenet = ml5.poseNet(video, modelLoaded);
  posenet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log('Posenet is On!')
}

function gotPoses(results) {
  if(results.length > 0) {
    //console.log(results)
    lx = results[0].pose.leftWrist.x
    ly = results[0].pose.leftWrist.y
    rx = results[0].pose.rightWrist.x
    ry = results[0].pose.rightWrist.y
    lscore = results[0].pose.keypoints[9].score;
    rscore = results[0].pose.keypoints[10].score;
    console.log(lscore, rscore);
  }
}

function draw() {
  image(video, 0, 0, 640, 500);
  status1 = hedwigs.isPlaying()
  status2 = star.isPlaying()
  if(lscore > 0.2) {
    circle(lx, ly, 30)
    star.stop()
    if(status1 == false) {
      hedwigs.play()
      hedwigs.setVolume(1)
      hedwigs.rate(1.5)
    }
  }

  if(rscore > 0.2) {
    circle(rx, ry, 30)
    hedwigs.stop()
      if(status2 == false) {
        star.play()
        star.setVolume(1)
        star.rate(1.5)
      }
  }
}
