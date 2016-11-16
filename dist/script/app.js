(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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








},{"./canvas-sizing/canvas.sizing":2,"./create-elements/create.elements":3,"./drawing-elements/draw.elements":4}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
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

},{"../models/ball/ball.model":5,"../models/pad/pad.model":7}],4:[function(require,module,exports){
function drawElementsToCanvas(gameElements, wrapperSize,document,canvas){

    function drawElements(){
        canvas.clearRect(0,0,wrapperSize.width,wrapperSize.height);
        for(let ele of gameElements){
            ele.createElementObject(wrapperSize);
        }
        window.requestAnimationFrame(drawElements);
    }
    drawElements();

    const userElement = gameElements.filter((el)=>{
        return el.ai === false;
    });

    const user = userElement[0];
    
    document.addEventListener("keydown",function(e){
        
        if(e.keyCode === 37)
        {
            user.moveLeft();
        }
        if(e.keyCode === 39){
            user.moveRight();
        }
        

    });
    

}

module.exports = drawElementsToCanvas;
},{}],5:[function(require,module,exports){
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
},{"../canvas.model":6}],6:[function(require,module,exports){
//abstract class that models inherit from

class CanvasModel{
    constructor(color,canvas,ai){
        this._color = color;
        this._ai = ai;
        this._canvas = canvas;
        this._x = null;
        this._y = null;

        //need last values to make it resizable
        this._lastX = null;
        this._lastY = null;

        //last wrapperSize
        this._lastWrapperSize = {
            x:null,
            y:null
        };
    }

    get canvas(){
        return this._canvas;
    }

    //get set lastX
    get lastX(){
        return this._lastX;

    }
    set lastX(x){
        this._lastX = x;
    }

    //get set lastY
    get lastY(){
        return this._lastY;

    }
    
    set lastY(y){
        this._lastY = y;
    }
    
    //get set current x
    get x(){
        return this._x;
    }
    set x(x){
        this._x = x;
    }

    //get set current y
    get y(){
        return this._y;
    }
    set y(y){
        this._y = y;
    }

    get lastWrapperSize(){
        return this._lastWrapperSize;
    }

    set lastWrapperSize(size){
        this._lastWrapperSize.x = size.x;
        this._lastWrapperSize.y = size.y;
    }

    //ui prop / if true its AI else its player
    get ai (){
        return this._ai;
    }
    
    //color
    get color(){
        return this._color;
    }
    
    set color(color){
        this._color = color;
    }
}
module.exports = CanvasModel;
},{}],7:[function(require,module,exports){
const CanvasModel = require("../canvas.model");

class CanvasPad extends CanvasModel{
    //color of pad
    //position of pad
    // bool if its AI - default its true
    constructor(color,position,canvas,ai=true){
        super(color,canvas,ai);
        this._position = position;
        this._width = null;  
        this._height = null;

    }

    /////////////////////////////
    // ----- getters/ setters --
    /////////////////////////////

    //position : top or bot
    get position (){
        return this._position;
    }

    get height(){
        return this._height;
    }
    get width(){
        return this._width;
    }
    set height(x){
        this._height = x;
    }
    set width(x){
        this._width = x;
    }

    


    //////////////////////////////
    // ---- object methods ------
    /////////////////////////////

    //dynamic purpose
    createElementObject(canvasWrapper){
        //IF TOP PAD
        if(this.position === "top"){
            //first time initialized
            if(this.lastX == null){
                this.width = canvasWrapper.width/5;
                this.height = canvasWrapper.height/20;
                this.x = 1;
                this.y = 1;
                
            }
            if(canvasWrapper.changed){
                //recalculate width height x y
                console.log("wrapper changed");
                canvasWrapper.changed = false;
            }
        }

        //IF BOT PAD
        else if(this.position === "bottom")
        {
            if(this.lastX == null){
                this.width = canvasWrapper.width/5;
                this.height = canvasWrapper.height/20;
                this.x = 1;
                this.y = canvasWrapper.height-(this.height-1);
                
            }
        }

        this.draw();
        
    }

    draw(){

        this.canvas.fillStyle = this.color;
        this.canvas.fillRect(this.x,this.y,this.width,this.height);
        this.lastX = this.x;
        this.lastY = this.y;
    }

    moveLeft(){
        console.log(this.x);
        this.x -= 5;
    }
    moveRight(){
        console.log(this.x);
        this.x += 5;
    }
}

module.exports = CanvasPad;
},{"../canvas.model":6}]},{},[1]);
