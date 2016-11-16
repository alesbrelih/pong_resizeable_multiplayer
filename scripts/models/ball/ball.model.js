// base class
const CanvasModel = require("../canvas.model");

//canvas ball class
class CanvasBall extends CanvasModel{
    constructor(color,canvas,ai=true){
        super(color,canvas,ai);

    }

    //draw function for ball
    draw(canvas,canvasWrapper){

    }
    createElementObject(canvasWrapper){
        console.log("drawing ball");
    }
}

module.exports = CanvasBall;