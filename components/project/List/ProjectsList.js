import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';

import {CardProject} from "@components/project/List/CardProject";

export default function ProjectsList({title, extraClass}){

  return (
    <>

    <div className="projects-section">

      <div className="projects-section--subheader">
        <h3 className="">{title}</h3>
      </div>

      <div className="w-full">

        <Disclosure as="div" className="pools-container" 
          style={{backgroundImage: `url(/placeholders/parallel-cover.jpg)`,}}
        >
          {({ open }) => (
            <>
              <Disclosure.Button as="div" className="pools-container--toggle">
                <div className="project-logo">
                  <img src={process.env.NEXT_PUBLIC_CDN + "/project-logos/theparallel.png"} alt="The Parallels"/>
                </div>
                <div className="flex w-1/4 flex-shrink-0 justify-between items-baseline">
                  <h4>
                    The Parallels
                  </h4>
                  <span className="badge badge-coin badge-coin-lg mr-4">$PRL</span>
                </div>
                <div className="project-links">
                  <ul>
                    <li>
                      <a class="btn-website" target="_blank" href="#" rel="noreferrer">
                        <i class="fa-solid fa-globe"></i>
                        <span className="sr-only">Website</span>
                      </a>
                    </li>
                    <li>
                      <a class="btn-twitter" target="_blank" href="#" rel="noreferrer">
                        <i class="fa-brands fa-twitter"></i>
                        <span className="sr-only">Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a class="btn-discord" target="_blank" href="#" rel="noreferrer">
                        <i class="fa-brands fa-discord"></i>
                        <span className="sr-only">Discord</span>
                      </a>
                    </li>
                    <li>
                      <a class="btn-medium" target="_blank" href="#">
                        <i class="fa-brands fa-medium"></i>
                        <span className="sr-only">Medium</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <span
                  className={`${
                    open ? 'open' : ''
                  } pools-container--toggle-arrow`}
                >
                  <i class="fas fa-angle-down"></i>
                </span>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform origin-top scale-y-100 opacity-0"
                enterTo="transform origin-top scale-y-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform origin-top scale-y-100 opacity-100"
                leaveTo="transform origin-top scale-y-0 opacity-0"
              >
              <Disclosure.Panel className="pools-container--panel">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    statusName="Application close in"
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
              </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="pools-container" 
          style={{backgroundImage: `url(/placeholders/defihorse-cover.jpeg)`,}}
        >
          {({ open }) => (
            <>
              <Disclosure.Button as="div" className="pools-container--toggle">
                <div className="project-logo">
                  <img src={process.env.NEXT_PUBLIC_CDN + "/project-logos/defihorse.png"} alt="DefiHorse"/>
                </div>
                <div className="flex w-1/4 flex-shrink-0 justify-between items-baseline">
                  <h4>
                    DefiHorse
                  </h4>
                  <span className="badge badge-coin badge-coin-lg mr-4">$DFH</span>
                </div>
                <div className="project-links">
                  <ul>
                    <li>
                      <a class="btn-website" target="_blank" href="#" rel="noreferrer">
                        <i class="fa-solid fa-globe"></i>
                        <span className="sr-only">Website</span>
                      </a>
                    </li>
                    <li>
                      <a class="btn-twitter" target="_blank" href="#" rel="noreferrer">
                        <i class="fa-brands fa-twitter"></i>
                        <span className="sr-only">Twitter</span>
                      </a>
                    </li>
                    <li>
                      <a class="btn-discord" target="_blank" href="#" rel="noreferrer">
                        <i class="fa-brands fa-discord"></i>
                        <span className="sr-only">Discord</span>
                      </a>
                    </li>
                    <li>
                      <a class="btn-medium" target="_blank" href="#">
                        <i class="fa-brands fa-medium"></i>
                        <span className="sr-only">Medium</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <span
                  className={`${
                    open ? 'open' : ''
                  } pools-container--toggle-arrow`}
                >
                  <i class="fas fa-angle-down"></i>
                </span>
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform origin-top scale-y-100 opacity-0"
                enterTo="transform origin-top scale-y-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform origin-top scale-y-100 opacity-100"
                leaveTo="transform origin-top scale-y-0 opacity-0"
              >
              <Disclosure.Panel className="pools-container--panel">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    statusName="Application close in"
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