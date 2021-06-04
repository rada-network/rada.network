import IdeaInfo from "./ideaInfo";
import {useState} from "react";

import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";

export default function IdeaContent({item}){
  const [hideContent,setHideContent] = useState(true)

  const readMore = (event) => {
    const readBtn = event.currentTarget
    setHideContent(!hideContent)
    if (read.style.display === ""){
      readBtn.innerHTML = "Show less"
    }else{
      readBtn.innerHTML = "Read more"
    }
  }
  const showContents = Object.keys(item.contentJson).map(key => {
    return `
    <div class="project-text_section">
      <h3 class="project-text_title">${item.contentJson[key].a}</h3> 
      <div class="project-text_content">${item.contentJson[key].b}</div>
    </div>
    `
  })
  return (
    <div className="grid grid-col-1 md:grid-cols-12">

      <div className="md:col-span-9 text-gray-900 text-opacity-100 md:pr-10 project-text">

        {/* <div className="project-text_short" dangerouslySetInnerHTML={{__html: item.description}} /> */}
        
        <div style={{display : hideContent ? '' : `block`}}
          id={`read`} dangerouslySetInnerHTML={{__html: showContents.join("")}}  />
        <button className="btn mt-4 text-purple-500 hover:underline" onClick={readMore} id={"readBtn"}>Read more</button>
      </div>

      {item.ideaUser !== null ? <IdeaInfo item={item}/> : ""}
      
    </div>
  )
}