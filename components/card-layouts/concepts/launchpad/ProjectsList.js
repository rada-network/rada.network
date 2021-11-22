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
      <div className="">
        <div className="">
          <div className="projects--wrapper single">
            {/* add class "single" if there's only 1 live project*/}

            <CardProject
              title="Parallel" 
              img="/placeholders/parallel-thumb.jpg"
              tokenLogo="/placeholders/parallel-token.png"
              raise="360,000 USDT"
              progressToken="72,000"
              target="10,000,000"
              progressPercentage="70%"
              type="public"
              token="PRL"
              countdown="4 days"
              status="open"
              network="BSC"
              link="project"
              tokenPrice="0.036 USDT"
              desc="You can build your unique character (Paragon) and have its copyright, then trade your Paragon for tokens or join the battle for amazing rewards."
            />   

             <CardProject
              title="Widiland" 
              img="/placeholders/widiland-thumb.jpg"
              tokenLogo="/token-logos/widiland.jpg"
              raise="350,000 USDT"
              progressToken="6,000,000"
              target="10,000,000"
              progressPercentage="60%"
              type="public"
              token="WIDI"
              countdown="4 days"
              status="open"
              network="BSC"
              link="project-widi"
              tokenPrice="0.035 USDT"
              desc="WidiLand is an NFT Game aiming to become a globally well-known social networking game."
            />     
          </div>
        </div>
        <div className="mt-4">
          <div className="section-header ml-2">
            <h2 className="p-2 font-semibold">Upcoming</h2>
          </div>

          <div className="projects--wrapper projects-grid">
            <CardProject
              title="Moniwar" 
              img="https://media.rada.network/assets/026f4bd5-9741-4b9c-a075-0acfe7c86cb7?format=webp&width=1080"
              tokenLogo="./../../token-logos/moniwar.png"
              raise="45,000 USDT"
              progressToken="100,000"
              target="100,000"
              progressPercentage="100%"
              type="public"
              token="MOWA"
              countdown="2 hours"
              status="upcoming"
              tokenPrice="0.035 USDT"
              desc="Reviving a legendary dragon hunting game with built-in blockchain technology."
            />

            <CardProject
              title="Thetan"
              img="https://media.rada.network/assets/1659ec6e-3c7f-4da9-9edc-aa779726e58c?format=webp&width=1080"
              tokenLogo="https://media.rada.network/assets/021fa100-b616-42be-8009-deea259d1db9?format=webp&width=128"
              raise="45,000 USDT"
              progressToken="100,000"
              target="100,000"
              progressPercentage="100%"
              type="public"
              token="THG"
              status="upcoming"
              tokenPrice="0.035 USDT"
              desc="Form a team and battle with others while you earn token rewards based on your skills"
            />
            <CardProject
              title="Pegaxy"
              img="https://media.rada.network/assets/23115282-3877-4f7a-a794-04d709e30b35?format=webp&width=1080"
              tokenLogo="./../../token-logos/pegaxy.png"
              raise="45,000 USDT"
              progressToken="100,000"
              target="100,000"
              progressPercentage="100%"
              type="public"
              token="PGX"
              status="upcoming"
              desc="Racing game with futuristic mythological styling"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="section-header ml-2">
            <h2 className="p-2 font-semibold">Closed</h2>
          </div>

          <div className="projects--wrapper projects-grid">
            <CardProject
              title="Heroverse" 
              img="https://media.rada.network/assets/5a380cca-fbd9-4cf5-9667-d1a85949bc9f?format=webp&width=1080"
              tokenLogo="https://media.rada.network/assets/4f62c6d6-b3b3-4f07-85cc-e9b15c8676b8?format=webp&width=128"
              raise="45,000 USDT"
              progressToken="100,000"
              target="100,000"
              progressPercentage="100%"
              type="public"
              token="HER"
              countdown="2 hours"
              status="closed"
              tokenPrice="0.035 USDT"
              desc="Pioneering #gamefi by integrating the mobile game category called Match-3 Games into blockchain and #gamefi"
            />

            <CardProject
              title="Elemon"
              img="https://media.rada.network/assets/1648aeef-10de-44b5-a2a1-b3c9835ad63c?format=webp&width=1080"
              tokenLogo="https://media.rada.network/assets/171ff579-8dcf-4751-be36-553a6a434021?format=webp&width=128"
              raise="45,000 USDT"
              progressToken="100,000"
              target="100,000"
              progressPercentage="100%"
              type="public"
              token="Elmon"
              status="closed"
              tokenPrice="0.035 USDT"
              desc="Elemon seeks to improve the limitations of the traditional gaming industry with transparency, inclusion, governance, and Play2Earn (P2E)"
            />
            <CardProject
              title="My Mastery War"
              img="https://media.rada.network/assets/a91592b5-a77c-44fd-9010-2740665e5006?format=webp&width=1080"
              tokenLogo="https://media.rada.network/assets/7b7b721f-9b6a-4d65-b54c-4aa14e42c4f2?format=webp&width=128"
              raise="45,000 USDT"
              progressToken="100,000"
              target="100,000"
              progressPercentage="100%"
              type="public"
              token="MAT"
              status="closed"
              tokenPrice="0.035 USDT"
              desc="Reminiscent of the long lost Three Kingdoms period, MyMasterWar enables Players to build their own empire in the MMW MetaVerse"
            />
          </div>
        </div>
      </div>
    </div>
  )
}