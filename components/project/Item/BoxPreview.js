import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useRef, useState } from "react";
import { set } from "lodash";
import { useTranslation } from "react-i18next";
import Image from "@components/Image";

const BoxPreview = function({project,pool}){
  const {t} = useTranslation("launchpad")
  console.log(pool)
  if (!pool.token_name) return null
  return (
    <div className="card card-default">
      <div className="card-header items-end">
        <div>
          <span class="text-2xs uppercase opacity-60 tracking-wide">Info </span>
          <h3>{pool.token_name} Collection</h3>
        </div>
        <a className="btn btn-default">
          <span className="btn--text text-xs">
            {t("Learn more")}
          </span>
        </a>  
      </div>
      <div className="card-body">

        <div className="flex center">
          Intro of {pool.token_name}
        </div>
      </div>
    </div>
  )
}
export default BoxPreview