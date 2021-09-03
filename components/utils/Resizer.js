import { useState, useEffect, useRef } from "react"

export function Resizer({className, onDragStart, onDragStop, onDragMove, style}) {
    const barRef = useRef()
    const [drag, setDrag] = useState({dragging: false})
    let stopTimeout = 0

    const getPoint = e => {
        let x, y
        if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
            var touch = e.touches[0] || e.changedTouches[0];
            x = touch.pageX;
            y = touch.pageY;
        } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
            x = e.clientX;
            y = e.clientY;
        }
        return {x, y}
    }


    useEffect(() => {
        const dragStart = e => {
            if (drag.dragging) return        
            const pt = getPoint(e)        
            setDrag({dragging: true, ...pt})
            if (onDragStart) onDragStart({target: e.target, startX: pt.x, startY: pt.y})
        }
        const dragStop = e => {
            const pt = getPoint(e)        
            // clear stopTimeout 
            if (stopTimeout) {
                clearTimeout(stopTimeout)
                stopTimeout = false
            }
            if (onDragStop) onDragStop({target: e.target, clientX: pt.x, clientY: pt.y, startX: drag.x, startY: drag.y})
            setDrag({dragging: false})
        }
        const dragMove = e => {
            const pt = getPoint(e)        
            if (onDragMove) onDragMove({target: e.target, clientX: pt.x, clientY: pt.y, startX: drag.x, startY: drag.y})
    
            // stop dragging by timeout
            if (stopTimeout) {
                clearTimeout(stopTimeout)
            }
            stopTimeout = setTimeout(() => {
                setDrag({dragging: false})
                dragStop(e)
            }, 1000)
        }
      
        barRef.current.removeEventListener('mousedown', dragStart)
        barRef.current.addEventListener('mousedown', dragStart)
        barRef.current.removeEventListener('touchstart', dragStart)
        barRef.current.addEventListener('touchstart', dragStart)
        if (drag.dragging) {
            window.addEventListener('mousemove', dragMove)
            window.addEventListener('mouseup', dragStop)
            window.addEventListener('touchmove', dragMove)
            window.addEventListener('touchend', dragStop)
        }

        return () => {
            if (barRef?.current) {
                barRef.current.removeEventListener('mousedown', dragStart)
                barRef.current.removeEventListener('touchstart', dragStart)
            }
            window.removeEventListener('mouseup', dragStop)
            window.removeEventListener('mousemove', dragMove)
            window.removeEventListener('touchend', dragStop)
            window.removeEventListener('touchmove', dragMove)
        }
    }, [drag.dragging])

    return <div className={`dragger${drag.dragging ? ' dragging' : ''} ${className || ''}`} ref={barRef} style={style || {}}>&nbsp;</div>
}