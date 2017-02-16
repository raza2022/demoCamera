//here all detected image display
var canvasObjects = {};
//detect the face from base64 image
function detectImages(e){
    e && e.preventDefault();

    $('.face').remove();

    //$('#base64').faceDetection({
    $('#picture').faceDetection({
        complete: function (faces) {
            for (var i = 0; i < faces.length; i++) {
                cropImages(faces[i], i);
                $('<div>', {
                    'class':'face',
                    'css': {
                        'position': 'absolute',
                        'left':   faces[i].x * faces[i].scaleX + 'px',
                        'top':    faces[i].y * faces[i].scaleY + 'px',
                        'width':  faces[i].width  * faces[i].scaleX + 'px',
                        'height': faces[i].height * faces[i].scaleY + 'px'
                    }
                })
                    .insertAfter(this);
            }
        },
        error:function (code, message) {
            alert('Error: ' + message);
        }
    });
}

//convert the image to base 64
function base64Image(){
    $("#picture").attr("src", $('#detectedImage')[0].toDataURL());

    detectImages();
}

//crop image and display
function cropImages ( f, index ){
    //face found
    if( f ){
        //get body
        var body = $('body')[0];
        //create new canvas for cropped Image
        canvasObjects[index] = document.createElement('canvas');

        //get old canvas for cropping
        var i = document.getElementById("detectedImage");
        //get old image context
        var ctx = i.getContext("2d");
        //get new created canvas context
        var ctx1 = canvasObjects[index].getContext("2d");

        //now get to x y and width and height of current Faces
        //margin added in both width and height
        var croppedImage = ctx.getImageData( f.x - 7, f.y - 7, f.width + 20, f.height + 40 );
        //draw image with given values to new canvas
        ctx1.putImageData(croppedImage, 0, 0);
        //all done just append the canvas to body
        body.appendChild(canvasObjects[index])
    }
}

function attachEvent(videoInput){
    //listen to face tracker event
    document.addEventListener('facetrackingEvent', function(evt) {

        //draw tracking image to canvas
        context.drawImage(videoInput, 0, 0, 640, 480);

        //now remove the listener we got the image
        this.removeEventListener('facetrackingEvent', arguments.callee);

        setTimeout(function(){
            attachEvent(videoInput)
        }, 5000);

        //convert the image to base64
        base64Image();
    });
}