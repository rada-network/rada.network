import React, {useCallback, useEffect, useMemo, useState, createRef} from 'react';

//ReactIcons
import {IoChevronDownSharp, IoChevronForwardSharp, IoChevronBackSharp} from "react-icons/io5";
import Link from "next/link"
import {observer} from "mobx-react";
import {CardProject} from "../../../cards/concepts/launchpad/Project";
import ContentLoader from "react-content-loader";


export const ProjectsList = ({title, extraClass}) => {

  return (
    <div className="page page-full page-projects-list scrollbar">
      <div className="w-limiter-lg">
        <div className="">

          <div className="section-header ml-2">
            <h2 className="p-2 font-semibold">Open Projects</h2>
          </div>

          <div className="projects--wrapper">

            <CardProject
              title="Moniwar" 
              img="https://picsum.photos/600/300?random=1"
              tokenLogo="./../../token-logos/moniwar.png"
              raise="45,000 USDT"
              progressToken="72,000"
              target="100,000"
              progressPercentage="70%"
              type="private"
              token="MOWA"
              countdown="4 days"
              status="open"
            />

            <CardProject
              title="Pegaxy"
              img="https://picsum.photos/600/300?random=2"
              tokenLogo="./../../token-logos/pegaxy.png"
              raise="45,000 USDT"
              progressToken="95,000"
              target="100,000"
              progressPercentage="95%"
              type="public"
              token="PGX"
              countdown="12 hours 44 minutes"
              status="open"
            />

           
            
          </div>
        </div>

        <div className="mt-6">
          
          <div className="section-header ml-2">
            <h2 className="p-2 font-semibold">Closed Projects</h2>
          </div>

          <div className="projects--wrapper">
            <CardProject
              title="Moniwar" 
              img="https://picsum.photos/600/300?random=1"
              tokenLogo="./../../token-logos/moniwar.png"
              raise="45,000 USDT"
              progressToken="100,000"
              target="100,000"
              progressPercentage="100%"
              type="public"
              token="MOWA"
              countdown="2 hours"
              status="closed"
            />

            <CardProject
              title="Pegaxy"
              img="https://picsum.photos/600/300?random=2"
              tokenLogo="./../../token-logos/pegaxy.png"
              raise="45,000 USDT"
              progressToken="100,000"
              target="100,000"
              progressPercentage="100%"
              type="public"
              token="PGX"
              status="closed"
            />
           

           
            
          </div>
        </div>

      </div>
    </div>
  )
}