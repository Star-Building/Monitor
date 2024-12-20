
document.addEventListener("DOMContentLoaded", startVideo);

function startVideo() {
    // document.getElementsByTagName("video")[0].play();
    console.log("hello");
    var elem = document.getElementsByTagName("video")[0];
    // elem.width = window.outerWidth;
    elem.height = window.outerHeight;
    
        // if (elem.requestFullscreen) {
        //     elem.requestFullscreen();
        // } else if (elem.mozRequestFullScreen) {
        //     elem.mozRequestFullScreen();
        // } else if (elem.webkitRequestFullscreen) {
        //     elem.webkitRequestFullscreen();
        // } else if (elem.msRequestFullscreen) {
        //     elem.msRequestFullscreen();
        // }
    }