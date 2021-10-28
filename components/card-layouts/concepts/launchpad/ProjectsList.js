import React, {useCallback, useEffect, useMemo, useState, createRef} from 'react';

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import Link from "next/link"
import {observer} from "mobx-react";
import {CardProject} from "../../../cards/concepts/launchpad/Project";
import ContentLoader from "react-content-loader";

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

const scrollBox = createRef();
let ps;

export const ProjectsList = ({title, extraClass}) => {

  return (
    <div className="page page-full page-projects-list">
      <div className="page-full--inner--lg no-padding scrollbar" ref={scrollBox}>
        <h2 className="p-4 font-semibold text-center">Public sales</h2>
        <div className="projects--wrapper">

          <CardProject
            title="Moniwar" 
            img="https://picsum.photos/600/300?random=1"
            tokenLogo="./../../token-logos/moniwar.png"
            description="Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. "
            type="Contributor-only"
            requirement="Requirement"
            allocation="1"
          />

          <CardProject
            title="Pegaxy"
            img="https://picsum.photos/600/300?random=2"
            tokenLogo="./../../token-logos/pegaxy.png"
            description="Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit."
            type="Contributor-only"
            requirement="Requirement"
            allocation="1"
          />

          <CardProject
            title="DareNFT"
            img="https://picsum.photos/600/300?random=3"
            tokenLogo="./../../token-logos/darenft.png"
            description="Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit."
            type="Contributor-only"
            requirement="Requirement"
            allocation="1"
          />
          

        </div>

        <h2 className="p-4 font-semibold text-center">Private sales</h2>
        <div className="projects--wrapper">

          <CardProject
            title="Thetan Arena" 
            img="https://picsum.photos/600/300?random=4"
            tokenLogo="./../../token-logos/thetan.png"
            description="Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. "
            type="Contributor-only"
            requirement="Requirement"
            allocation="1"
          />

          <CardProject
            title="Elemon"
            img="https://picsum.photos/600/300?random=5"
            tokenLogo="./../../token-logos/elemon.png"
            description="Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit."
            type="Contributor-only"
            requirement="Requirement"
            allocation="1"
          />

          <CardProject
            title="DareNFT"
            img="https://picsum.photos/600/300?random=6"
            tokenLogo="./../../token-logos/darenft.png"
            description="Etiam porta sem malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra augue. Nullam id dolor id nibh ultricies vehicula ut id elit."
            type="Contributor-only"
            requirement="Requirement"
            allocation="1"
          />
          

        </div>

      </div>
    </div>
  )
}