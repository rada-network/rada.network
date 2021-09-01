import { useEffect, useState, useRef } from "react";

const SCREENS = ['sm', 'md', 'lg', 'xl', '2xl']
const SCREENS_WIDTH = [640, 768, 1024, 1280, 1536]

{/* <Screen from="md">xxxx</Screen>
<Screen upto="md">xxxx</Screen> */}

export default function Screen({from, upto, children}) {
    const [screen, setScreen] = useState(0)

    // setup monitor ww
    useEffect(() => {
        const onResize = () => {
            // setWw(window.innerWidth)
            const w = window.innerWidth
            let i = 0
            while (i<SCREENS.length-1 && w > SCREENS_WIDTH[i+1]) i++
            setScreen(i)
        }
        onResize()
        window.addEventListener("resize", onResize)
        return () => {
            window.removeEventListener("resize", onResize);
          }
    }, [])

    let isValid = false
    if (from && SCREENS.indexOf(from) <= screen) {
        // from this up
        isValid = true
    }
    if (upto && SCREENS.indexOf(upto) >= screen) {
        // from this down
        isValid = true
    }

    return isValid ? children : ''
}

export function Responsive({lt, gt, children}) {
    const [ww, setWw] = useState(0)

    // setup monitor ww
    useEffect(() => {
        const onResize = () => {
            setWw(window.innerWidth)
        }
        onResize()
        window.addEventListener("resize", onResize)

        return () => {
            window.removeEventListener("resize", onResize);
          }
    }, [])

    const _lt = parseInt(lt) || 0
    const _gt = parseInt(gt) || 0

    // render empty
    if (!ww || (_lt && _lt < ww) || (_gt && _gt >= ww)) return ''

    return children
}


export function Dragger({className, onDragStart, onDragStop, onDragMove, style}) {
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

    return <div className={`dragger ${className || ''}`} ref={barRef} style={style || {}}>...</div>
}