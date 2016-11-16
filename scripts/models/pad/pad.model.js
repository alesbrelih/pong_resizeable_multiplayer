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