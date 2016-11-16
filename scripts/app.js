(function(window){
    "use strict";

    ///////////////////////////
    // ----- model functions ---
    //////////////////////////////

    const resizeCanvas = require("./canvas-sizing/canvas.sizing");

    const createElements = require("./create-elements/create.elements");

    const drawElementsToCanvas = require("./drawing-elements/draw.elements");


    //initialize canvas
    
    const document = window.document;
    const canvas = document.getElementById("pong-game");
    const pongCanvas = canvas.getContext("2d"); //2d context

    
    //initialize wrapper size
    const wrapperSize = {
        width:0,
        height:0,
        changed:false
    };

    // set canvas sizing
    resizeCanvas(document,canvas,wrapperSize);

    // create game elements
    const gameElements = createElements(pongCanvas);

    //draws elements to canvas
    drawElementsToCanvas(gameElements,wrapperSize,document,pongCanvas);





})(window);







