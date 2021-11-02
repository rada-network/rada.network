import {useRef,useEffect} from 'react'
const BackgroundWrapper = function({image}){

  const ref = useRef()
  useEffect(() => {
    ref.current.setAttribute("style",`background-image: url("https://source.unsplash.com/user/nnth/likes/1600x900")`)
  },[])

  const handleChangeBg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    ref.current.setAttribute("style",`background-image: url("https://source.unsplash.com/user/nnth/likes/1600x900?time=${(new Date()).getTime()}")`)
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