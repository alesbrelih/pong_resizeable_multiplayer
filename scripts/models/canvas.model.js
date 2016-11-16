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