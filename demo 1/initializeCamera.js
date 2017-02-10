// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

/* Legacy code below: getUserMedia
 else if(navigator.getUserMedia) { // Standard
 navigator.getUserMedia({ video: true }, function(stream) {
 video.src = stream;
 video.play();
 }, errBack);
 } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
 navigator.webkitGetUserMedia({ video: true }, function(stream){
 video.src = window.webkitURL.createObjectURL(stream);
 video.play();
 }, errBack);
 } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
 navigator.mozGetUserMedia({ video: true }, function(stream){
 video.src = window.URL.createObjectURL(stream);
 video.play();
 }, errBack);
 }
 */
//Once it's been established that the browser supports navigator.mediaDevices.getUserMedia, a simple method sets the video element's src to the user's live camera/webcam.  Calling the play method of the video then starts the element's live streaming video connection.  That's all that's required to connect your camera to the browser!

    //Taking a photo is only marginally more difficult.  Simply add a click listener to a generic button and and draw an image from video!

// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);
});