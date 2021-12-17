import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';

import {CardProject} from "../cards/Project-v3";

export default function ProjectsList({title, extraClass}){

  return (
    <>

    <div className="projects-section !mt-0">

      <div className="projects-section--subheader">
        <h3 className="">The Parallel's Pools</h3>
      </div>

      <div className="w-full">

        <div className="pools-container" 
          style={{backgroundImage: `url(/placeholders/parallel-cover.jpg)`,}}
        >
            <>
        
              
              <div className="pools-container--panel !p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <CardProject
                    title="Private" 
                    img="./../../placeholders/parallel-cover.jpg"
                    tokenLogo="./../../token-logos/theparallel.png"
                    raise="45,000 USDT"
                    progressToken="100,000"
                    target="100,000"
                    progressPercentage="2%"
                    type="private"
                    token="PRL"
                    countdown="2 hours"
                    status="coming"
                    statusName="Sale start in"
                    tokenPrice="0.035 USDT"
                    desc="Reviving a legendary dragon hunting game with built-in blockchain technology."
                  />
                  <CardProject
                    title="Community" 
                    img="./../../placeholders/parallel-cover.jpg"
                    tokenLogo="./../../token-logos/theparallel.png"
                    raise="45,000 USDT"
                    progressToken="100,000"
                    target="100,000"
                    progressPercentage="2%"
                    type="community"
                    token="PRL"
                    countdown="2 hours"
                    status="whitelisting"
                    statusName="Close in"
                    tokenPrice="0.035 USDT"
                    desc="Reviving a legendary dragon hunting game with built-in blockchain technology."
                  />
                  <CardProject
                    title="VIP" 
                    img="./../../placeholders/parallel-cover.jpg"
                    tokenLogo="./../../token-logos/theparallel.png"
                    raise="45,000 USDT"
                    progressToken="100,000"
                    target="100,000"
                    progressPercentage="2%"
                    type="community"
                    token="PRL"
                    countdown="2 hours"
                    status="open"
                    statusName="Prefunding"
                    tokenPrice="0.035 USDT"
                    desc="Reviving a legendary dragon hunting game with built-in blockchain technology."
                  />
                </div>
              </div>
            </>
        </div>

        

      </div>


    </div>
    </>
  )
}