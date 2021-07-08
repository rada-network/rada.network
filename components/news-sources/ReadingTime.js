import React from "react";

const show = (time) => (
  <div className="metadata metadata_date flex items-center content-center">
    <span className="metadata-value" title=''>{time < 2 ? time + ' min' : time + ' mins'} read</span>
  </div>
)

export default function ReadingTime({content}) {
  let words_ = 0
  if (typeof content === 'object'){
    Object.keys(content).map(function (key) {
      const a = content[key].a
      const b = content[key].b
      const allWord = a.trim().split(/\s+/).length + b.trim().split(/\s+/).length
      words_ += allWord
    })
    const wpm = 255
    const time = Math.ceil(words_ / wpm)
    return show(time)
  }else {
    const allWord = content.trim().split(/\s+/).length
    const wpm = 255
    const time = Math.ceil(allWord / wpm)
    return show(time)
  }
}