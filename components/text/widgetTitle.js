import React from "react";

export default function WidgetTitle ({title,titleIcon,titleIconColor,dataStore}){
  return (
    <>
      {titleIcon &&
      <span className={`icon mr-3 text-${titleIconColor}`}>
          <i className={`fad fa-${titleIcon}`}/>
        </span>}
      <span> {title} <strong>{dataStore.query}</strong> </span>
    </>
  )
}