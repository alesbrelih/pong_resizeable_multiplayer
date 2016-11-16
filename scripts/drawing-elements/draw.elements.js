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