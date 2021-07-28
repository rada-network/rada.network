import { useEffect, useState } from "react";

export default function Responsive({lt, gt, children}) {
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
    }, [ww])

    const _lt = parseInt(lt) || 0
    const _gt = parseInt(gt) || 0

    // render empty
    if (!ww || (_lt && _lt < ww) || (_gt && _gt >= ww)) return ''

    return children
}