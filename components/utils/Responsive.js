import { useEffect, useState, useRef } from "react";

const SCREENS = ['sm', 'md', 'lg', 'xl', '2xl']
const SCREENS_WIDTH = [640, 768, 1023, 1280, 1536]

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
