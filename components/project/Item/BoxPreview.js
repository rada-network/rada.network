import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ContentDescription from "@components/ContentDescription";


const BoxPreview = function({project,pool}){
  const {t} = useTranslation("launchpad")
  if (!pool.project_pool_content) return null
  return (
    <div className="card card-default">
      <div className="card-header items-end">
        <div>
          <span class="text-2xs uppercase opacity-60 tracking-wide">Info </span>
          <h3>{pool.project_pool_content.title}</h3>
        </div>
        <a href={pool.project_pool_content.learn_more_url} target="_blank" className="btn btn-default">
          <span className="btn--text text-xs">
            {t("Learn more")}
          </span>
        </a>  
      </div>
      <div className="card-body">
        <div className="flex center">
        <div className="section-body post-body">
          <div className="post-content" itemProp="description">
            <ContentDescription content={pool.project_pool_content.description} />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
export default BoxPreview