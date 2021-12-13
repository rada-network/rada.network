import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';

import {CardProject} from "@components/project/List/CardProject";

export default function ProjectsList({title, extraClass,projects}){
  console.log(projects);
  return (
    <>

    <div className="projects-section">

      <div className="projects-section--subheader">
        <h3 className="">{title}</h3>
      </div>

      <div className="w-full">
        {projects.map(project =>{
          return (
            <>
            <Disclosure as="div" className="pools-container" 
                style={{backgroundImage: `url(${project.cover_uri})`,}}
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button as="div" className="pools-container--toggle">
                      <div className="project-logo">
                        <img src={process.env.NEXT_PUBLIC_CDN + "/project-logos/theparallel.png"} alt="The Parallels"/>
                      </div>
                      <div className="flex w-1/4 flex-shrink-0 justify-between items-baseline">
                        <h4>
                          {project.content.title}
                        </h4>
                        <span className="badge badge-coin badge-coin-lg mr-4">${project.token.symbol}</span>
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
                        {project.project_pool.map((pool) => (
                          <CardProject
                            project={project}
                            pool={pool}
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
                        ))}
                      </div>
                    </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </>
          )
        })}
        
      </div>


    </div>
    </>
  )
}