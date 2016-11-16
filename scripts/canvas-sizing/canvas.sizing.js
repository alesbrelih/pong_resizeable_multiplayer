function sizeCanvas(document,canvas,wrapperSize){

    //canvas wrapper
    const canvasWrapper = document.querySelector(".canvas-wrapper");

    //position info for wrapper
    var positionInfo = canvasWrapper.getBoundingClientRect();

    //set sizing
    setSizes(positionInfo.width,positionInfo.height);

    //event listener for window, when it resizes, canvas resizes
    window.addEventListener("resize",function(){

        var positionInfo = canvasWrapper.getBoundingClientRect();

        //set sizing
        setSizes(positionInfo.width,positionInfo.height);
        wrapperSize.changed = true;
    },false);

    function setSizes(width, height){
        wrapperSize.width = Math.abs(width);
        wrapperSize.height = Math.abs(height);
        canvas.width = Math.abs(width);
        canvas.height = Math.abs(height);
    }

}

module.exports = sizeCanvas;