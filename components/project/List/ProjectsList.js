import { Fragment } from 'react';
import { Disclosure, Transition } from '@headlessui/react';
import { CardProject } from "@components/project/List/CardProject";

export default function ProjectsList({ title, extraClass, projects, isComing}) {
  return (
    <>
      <div className="projects-section">

        <div className="projects-section--subheader">
          <h3 className="">{title}</h3>
        </div>

        <div className="w-full">
          {projects.map(project => {
            return (
              <>
                <Disclosure key={project.slug} as="div" defaultOpen={project.is_default_open} className="pools-container"
                  style={{ backgroundImage: `url(${project.cover_uri})`, }}
                >
                  {({ open }) => (
                    <>
                      <Disclosure.Button as="div" className="pools-container--toggle" title={project.content.title}>

                        <div className="project-logo">
                          <img src={project.thumbnail_uri} alt="The Parallels" />
                        </div>

                        <div className="flex flex-col md:flex-row md:pr-0 flex-shrink-0">
                          <div className="flex md:justify-between items-center">
                            <h4 className="line-clamp-1">
                              {project.content.title}
                            </h4>
                            <span className="badge badge-coin md:mr-4">${project.token.symbol}</span>
                          </div>

                          <div className="project-links">
                            <ul>
                              {project.website && (
                                <li>
                                  <a class="btn-website" target="_blank" href={project.website} rel="noreferrer">
                                    <i class="fa-solid fa-globe"></i>
                                    <span className="sr-only">Website</span>
                                  </a>
                                </li>
                              )}

                              {project.facebook && (
                                <li>
                                  <a class="btn-twitter" target="_blank" href={project.facebook} rel="noreferrer">
                                    <i class="fa-brands fa-facebook"></i>
                                    <span className="sr-only">Facebook</span>
                                  </a>
                                </li>
                              )}

                              {project.twitter && (
                                <li>
                                  <a class="btn-twitter" target="_blank" href={project.twitter} rel="noreferrer">
                                    <i class="fa-brands fa-twitter"></i>
                                    <span className="sr-only">Twitter</span>
                                  </a>
                                </li>
                              )}

                              {project.discord && (
                                <li>
                                  <a class="btn-discord" target="_blank" href={project.discord} rel="noreferrer">
                                    <i class="fa-brands fa-discord"></i>
                                    <span className="sr-only">Discord</span>
                                  </a>
                                </li>
                              )}

                              {project.medium && (
                                <li>
                                  <a class="btn-medium" target="_blank" href="#">
                                    <i class="fa-brands fa-medium"></i>
                                    <span className="sr-only">Medium</span>
                                  </a>
                                </li>
                              )}

                              {project.telegram && (
                                <li>
                                  <a class="btn-medium" target="_blank" href={project.telegram}>
                                    <i class="fa-brands fa-telegram"></i>
                                    <span className="sr-only">Telegram</span>
                                  </a>
                                </li>
                              )}

                            </ul>
                          </div>
                        </div>

                        <span
                          className={`${open ? 'open' : ''
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
                          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {project.project_pool.map((pool) => (
                              <CardProject key={pool.slug}
                                isComing={isComing}
                                project={project}
                                pool={pool}
                                title={pool.title}
                                raise={pool.raise}
                                tokenPrice={pool.price}
                                type={pool.type}
                                img="./../../placeholders/parallel-cover.jpg"
                                tokenLogo="./../../token-logos/theparallel.png"
                                progressToken="100,000"
                                target="100,000"
                                progressPercentage="2%"
                                token="PRL"
                                countdown="2 hours"
                                status={project}
                                statusName="Sale start in"
                                
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