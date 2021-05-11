import IdeaInfo from "./ideaInfo";
import {useState} from "react";

export default function IdeaContent({item}){
  const [hideContent,setHideContent] = useState(true)

  const readMore = (event) => {
    const readBtn = event.currentTarget
    setHideContent(!hideContent)
    if (read.style.display === ""){
      readBtn.innerHTML = "Read Less"
    }else{
      readBtn.innerHTML = "Read More"
    }
  }
  const showContents = Object.keys(item.contentJson).map(key => {
    return `${item.contentJson[key].a} <br /> ${item.contentJson[key].b} <br />`
  })
  return (
    <div className="pt-4 mt-4 md:flex md:mt-8">

      <div className="flex-1 w-full text-gray-900 text-opacity-100 md:pr-10 project-text">
        <div style={{display : hideContent? `inline` : ''}}
          id={`read`} dangerouslySetInnerHTML={{__html: showContents.join("")}}  />
        <button className="hover:underline text-blue-700" onClick={readMore} id={"readBtn"}>Read more</button>
      </div>
      {item.ideaUser !== null ? <IdeaInfo item={item}/> : ""}
    </div>
  )
}