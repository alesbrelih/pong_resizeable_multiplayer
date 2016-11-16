////////////////////////////////////
// ----------- classes -------------
////////////////////////////////////

//canvas pad
const CanvasPad = require("../models/pad/pad.model");
//canvas ball
const CanvasBall = require("../models/ball/ball.model");
//returned array

//creates game elements
function createElements(canvas){

    //array containing elements
    let array = [];

    //first pad
    const firstPad = new CanvasPad("#fff","top",canvas);
    array.push(firstPad);

    //second pad - human guided
    const secondPad = new CanvasPad("#fff","bottom",canvas,false);
    array.push(secondPad);

    //create ball
    const ball = new CanvasBall("#fff",canvas);
    array.push(ball);

    //return all elements
    return array;

}

//Return module
module.exports = createElements;
