import "./Canvas.scss"

import React, { useCallback, useEffect, useState } from 'react';

const Canvas = () => {

    const [context , setContext] = useState(null) ; 
    const [canvasDiv , settCanvasDiv] = useState(null) ; 

    const canvasParentId = 'canvas-parent' ; 
    const canvasElementId = 'canvas-element' ; 
    let DPR = window.devicePixelRatio || 1 ; 

    const setCanvasRef = useCallback((element) => {
        if(element !== null){
            const canvasContext = element.getContext('2d') ; 
            setContext(canvasContext) ;
            settCanvasDiv(element) ;
        }
    } , []) ; 

    const resizeCanvas = useCallback(() => {
        if(canvasDiv){
            const parentDiv = document.getElementById(canvasParentId) ; 
            const width = parentDiv.clientWidth ; 

            canvasDiv.width = width  * DPR ; 
            canvasDiv.height = 400 ;

            if(context){
                context.scale(DPR , DPR) ; 
            }
        }
    } , [DPR , canvasDiv , context]) ; 
    
    useEffect(() => {
        resizeCanvas() ; 
        window.addEventListener('resize' , resizeCanvas) ; 
        return () =>{
            window.removeEventListener('resize' , resizeCanvas) ; 
        } ;
    } , [context , resizeCanvas , canvasDiv]) ;


    let mouseDown = false ; 

    const onMouseDown = (e) => {
        if(context){
            const {clientX , clientY} = e ;
            x = clientX - 15 ; 
            y = clientY - canvasDiv.offsetTop;
            context.moveTo(x , y) ; 
            mouseDown = true
        }
    }

    const onMouseUp = () => {
        mouseDown = false ;
    }

    let x , y ; 
    const onMouseMove = (e) => {
        if(mouseDown && context){
            const {clientX , clientY} = e ; 
            const newX = clientX - 15 ; 
            const newY = clientY - canvasDiv.offsetTop ; 
            context.lineTo(newX , newY) ; 
            context.strokeStyle = 'white' ; 
            context.stoke() ;
            x = newX ; 
            y = newY ;
        }
    }

    return (
        <div className="canvas-container" id={canvasParentId}>
            <canvas
                id={canvasElementId} className="canvas-element"
                ref={setCanvasRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            />
        </div>
    );
};

export default Canvas;