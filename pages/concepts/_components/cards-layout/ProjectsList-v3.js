import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';

import {CardProject} from "../cards/Project-v3";
import { backgroundImage } from 'tailwindcss/defaultTheme';

import Bg1 from "../../../../public/placeholders/parallel-cover.jpg";

export default function ProjectsList({title, extraClass}){

  return (
    <>

    <div className="projects-section">

      <div className="projects-section--subheader">
        <h3 className="">Current Projects</h3>
      </div>

      <div className="w-full">

        <Disclosure as="div" className="pools-container" 
          style={{backgroundImage: `url(${Bg1})`,}}
        >
          {({ open }) => (
            <>
              <Disclosure.Button as="div" className="pools-container--toggle">
                <div className="w-16 h-16">
                  <img src={process.env.NEXT_PUBLIC_CDN + "/project-logos/theparallel.png"} alt="The Parallels"/>
                </div>
                <h4 className="text-2xl">The Parallels</h4>
                <span
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
              <Disclosure.Panel className="p-8">
                <div className="grid grid-cols-2 gap-8">
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
                    status="open"
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
                    status="open"
                    tokenPrice="0.035 USDT"
                    desc="Reviving a legendary dragon hunting game with built-in blockchain technology."
                  />
                </div>
              </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="pools-container">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>Do you offer technical support?</span>
                <span
                  className={`${
                    open ? 'transform rotate-180' : ''
                  } w-5 h-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="projects-list">
                  <CardProject
                    title="DefiHorse - VIP"
                    img="https://media.rada.network/assets/23115282-3877-4f7a-a794-04d709e30b35?format=webp&width=1080"
                    tokenLogo="./../../token-logos/pegaxy.png"
                    raise="45,000 USDT"
                    progressToken="100,000"
                    target="100,000"
                    progressPercentage="50%"
                    type="vip"
                    token="DFH"
                    status="open"
                    tokenPrice="0.035 USDT"
                    desc="Racing game with futuristic mythological styling"
                  />
                </div>
              </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

      </div>


    </div>
    </>
  )
}