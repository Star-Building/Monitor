import java.lang.Object;
import java.io.IOException;
import java.io.InputStreamReader;
import processing.video.*;
//https://toolzu.com/downloader/instagram/video/

Movie video2, video;
PImage image2, newsletter;
float c,d;

void setup() {
  /*
  try {
      // Get a Runtime object
      Runtime runtime = Runtime.getRuntime();

      // Execute the command (replace "ls -l" with your command)
      Process process = runtime.exec(new String[]{"node", "index.js"});

      // Get the input stream of the process 
      // (you can read the output of the command from this stream)
      InputStream inputStream = process.getInputStream();

      // ... (process the output if needed)
      println("finished");
  } catch (IOException e) {
      e.printStackTrace();
  }
  ffmpeg -i video2.mp4 -c copy -an video2nosound.mp4
  */

  // fullScreen(2);
  frameRate(60);
  size(1080, 1920,P3D);
  videoRunner();
}

void videoRunner() {

  //https://ohanastar.com/wp-content/uploads/2024/10/
  video = new Movie(this, "video1.mp4");
  video2 = new Movie(this, "video2nosound.mp4");
  newsletter = loadImage("newsletter.jpg");
  image2 = loadImage("newsletter.jpg");

  video.loop();
  video.play();
  video2.loop();
  video2.play();
  video2.volume(0);
  c = width/2;
  d = height/2;
}
void draw() {

  if(frameCount % 30 ==0 ){
    if(mouseX>700){
      video2.volume(5);
    }
    if(mouseX<200){    
      video2.volume(0);
    }
    
  }

  image(video, 0, 0,c,d);
  image(video2, width/2, height/2,c,d);
  image(newsletter, width/2,0, c,d);
  image(image2, 0, height/2,c,d);
}

void movieEvent(Movie m) {
  m.read();
}

void mousePressed(){
  println(mouseX,mouseY);
}