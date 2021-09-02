import { useState, useEffect, useRef } from "react"

export function Resizer({className, onDragStart, onDragStop, onDragMove, style}) {
    const barRef = useRef()
    const [drag, setDrag] = useState({dragging: false})
    let stopTimeout = 0
    const dragStart = e => {
        setDrag({dragging: true, x: e.clientX, y: e.clientY})
        if (onDragStart) onDragStart({target: e.target, startX: drag.x, startY: drag.y})
    }
    const dragStop = e => {
        // clear stopTimeout 
        if (stopTimeout) {
            clearTimeout(stopTimeout)
            stopTimeout = false
        }
        if (onDragStop) onDragStop({target: e.target, clientX: e.clientX, clientY: e.clientY, startX: drag.x, startY: drag.y})
        setDrag({dragging: false})
    }
    const dragMove = e => {
        if (onDragMove) onDragMove({target: e.target, clientX: e.clientX, clientY: e.clientY, startX: drag.x, startY: drag.y})

        // stop dragging by timeout
        if (stopTimeout) {
            clearTimeout(stopTimeout)
        }
        stopTimeout = setTimeout(() => {
            setDrag({dragging: false})
            dragStop(e)
        }, 1000)
    }

    useEffect(() => {
        barRef.current.removeEventListener('mousedown', dragStart)
        barRef.current.addEventListener('mousedown', dragStart)
        if (drag.dragging) {
            window.addEventListener('mousemove', dragMove)
            window.addEventListener('mouseup', dragStop)
        }

        return () => {
            window.removeEventListener('mouseup', dragStop)
            window.removeEventListener('mousemove', dragMove)
        }
    }, [drag.dragging])

    return <div className={`dragger${drag.dragging ? ' dragging' : ''} ${className || ''}`} ref={barRef} style={style || {}}>&nbsp;</div>
}