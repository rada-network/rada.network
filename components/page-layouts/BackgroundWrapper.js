import {useRef,useEffect} from 'react'
import { useTheme } from 'next-themes'
const BackgroundWrapper = function({image}){
  const { theme } = useTheme()
  const ref = useRef()
  const randomeBg = function(){
    const index = Math.floor(Math.random() * 10) % 5 + 1;
    return index;
  }

  useEffect(() => {
    const bgUrl = `/wallpapers/${theme}/${randomeBg()}.jpg`
    ref.current.setAttribute("style",`background-image: url("${bgUrl}")`)
  },[theme])

  const handleChangeBg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const bgUrl = `/wallpapers/${theme}/${randomeBg()}.jpg`
    ref.current.setAttribute("style",`background-image: url("${bgUrl}")`)
  }

  const handleRemoveBg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    ref.current.setAttribute("style",`background-image: none`)
  }

  return (
    <>
      <div ref={ref} className={`body-decor`}>
      </div>

      <div className={`body-decor--text`}>
        <p className="mb-1">&copy; Photo from Unsplash</p>
        <div className="flex">
          <a href="#" onClick={handleChangeBg}><i className="far fa-random"></i> New Photo</a>
          <a href="#" onClick={handleRemoveBg} className="ml-2"><i className="far fa-minus-circle"></i> Remove</a>
        </div>
      </div>
    </>
  )
}

export default BackgroundWrapper