import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import ProjectPool from "./ProjectPool";
import Image from "@components/Image";

export default function ProjectsList({ title, extraClass, projects }) {
  function checkURL(project) {
    let socialURL = new Array();
    if (project.website) {
      socialURL.push(project.website);
    }

    if (project.twitter) {
      socialURL.push(project.twitter);
    }

    if (project.telegram) {
      socialURL.push(project.telegram);
    }

    if (project.medium) {
      socialURL.push(project.medium);
    }

    if (project.discord) {
      socialURL.push(project.discord);
    }

    if (project.facebook) {
      socialURL.push(project.facebook);
    }
    return socialURL;
  }

  function checkDiscord(project) {
    return (
      project.website == null ||
      project.twitter == null ||
      project.telegram == null ||
      project.medium == null
    );
  }

  function checkFacebook(project) {
    return checkDiscord(project) && checkURL(project).length <= 4;
  }

  return (
    <>
      <div className="projects-section">
        <div className="projects-section--subheader">
          <h3 className="">{title}</h3>
        </div>

        <div className="w-full">
          {projects.map((project) => {
            return (
              <div key={project.slug}>
                <Disclosure
                  as="div"
                  defaultOpen={project.is_default_open}
                  className="pools-container"
                  style={{ backgroundImage: `url(${project.cover_uri})` }}
                >
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        as="div"
                        className="pools-container--toggle"
                        title={project.content.title}
                      >
                        <div className="project-logo">
                          <Image
                            src={project.thumbnail_uri}
                            alt={project.content.title}
                            width={80}
                            height={80}
                          />
                        </div>

                        <div className="flex flex-col md:flex-row md:pr-0 flex-shrink-0">
                          <div className="flex md:justify-between items-center">
                            <h4 className="line-clamp-1">
                              {project.content.title}
                            </h4>
                            <span className="badge badge-coin md:mr-4">
                              ${project.token.symbol}
                            </span>
                          </div>

                          <div className="project-links">
                            <ul>
                              {project.website && (
                                <li key={`website`}>
                                  <a
                                    className="btn-website"
                                    target="_blank"
                                    href={project.website}
                                    rel="noreferrer"
                                  >
                                    <i className="fa-solid fa-globe"></i>
                                    <span className="sr-only">Website</span>
                                  </a>
                                </li>
                              )}

                              {project.twitter && (
                                <li key={`twitter`}>
                                  <a
                                    className="btn-twitter"
                                    target="_blank"
                                    href={project.twitter}
                                    rel="noreferrer"
                                  >
                                    <i className="fa-brands fa-twitter"></i>
                                    <span className="sr-only">Twitter</span>
                                  </a>
                                </li>
                              )}

                              {project.telegram && (
                                <li key={`telegram`}>
                                  <a
                                    className="btn-medium"
                                    target="_blank"
                                    href={project.telegram}
                                  >
                                    <i className="fa-brands fa-telegram"></i>
                                    <span className="sr-only">Telegram</span>
                                  </a>
                                </li>
                              )}

                              {project.medium && (
                                <li key={`medium`}>
                                  <a
                                    className="btn-medium"
                                    target="_blank"
                                    href={project.medium}
                                  >
                                    <i className="fa-brands fa-medium"></i>
                                    <span className="sr-only">Medium</span>
                                  </a>
                                </li>
                              )}

                              {project.discord && checkDiscord(project) && (
                                <li key={`discord`}>
                                  <a
                                    className="btn-discord"
                                    target="_blank"
                                    href={project.discord}
                                    rel="noreferrer"
                                  >
                                    <i className="fa-brands fa-discord"></i>
                                    <span className="sr-only">Discord</span>
                                  </a>
                                </li>
                              )}

                              {project.facebook && checkFacebook(project) && (
                                <li key={`facebook`}>
                                  <a
                                    className="btn-twitter"
                                    target="_blank"
                                    href={project.facebook}
                                    rel="noreferrer"
                                  >
                                    <i className="fa-brands fa-facebook"></i>
                                    <span className="sr-only">Facebook</span>
                                  </a>
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>

                        <span
                          className={`${
                            open ? "open" : ""
                          } pools-container--toggle-arrow`}
                        >
                          <i className="fas fa-angle-down"></i>
                        </span>
                      </Disclosure.Button>
                      {/* <Transition
                        enter="transition duration-200 ease-out"
                        enterFrom="transform origin-top scale-y-75 opacity-100"
                        enterTo="transform origin-top scale-y-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform origin-top opacity-100"
                        leaveTo="transform origin-top opacity-0"
                      > */}
                      <Disclosure.Panel className="pools-container--panel">
                        <ProjectPool project={project}></ProjectPool>
                      </Disclosure.Panel>
                      {/* </Transition> */}
                    </>
                  )}
                </Disclosure>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
