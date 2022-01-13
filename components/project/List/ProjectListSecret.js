import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import ProjectPool from "./ProjectPool";
import Image from "@components/Image";

export default function ProjectsListSecret({ title, extraClass, projects }) {
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
              <div key={project.slug} className="secrect-pool relative px-16 py-12 mb-4 text-white bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-2xl">
                {/* <Image
                  layout="fill"
                  src={project.cover_uri}
                  objectFit="none"
                  objectPosition="bottom right"
                  className="opacity-100"
                  priority
                  /> */}
                <div className="secrect-pool--deco"></div>
                <div className="flex">
                  <div className="mt-2 mr-8">
                    <Image
                      src={project.thumbnail_uri}
                      alt={project.content.title}
                      width={160}
                      height={160}
                    />
                  </div>

                  <div className="flex flex-col flex-shrink-0 max-w-sm">
                    <div className="mb-4">
                      <h4 className="font-medium">
                        {/* {project.content.title} */}
                        <span className="uppercase tracking-widest text-sm opacity-60 font-light">Introducing</span>
                        <strong className="text-3xl block font-medium">Secrect Project</strong>
                      </h4>
                    </div>

                    <div className="">
                      {/* <p dangerouslySetInnerHTML={{__html: project.content.description}}></p> */}
                      <p>RADA's Secrect Project is a new interesting way to join the token sale.</p>
                      <button className="btn btn-primary px-4 py-2 mt-4">
                        <span className="btn--text">Learn more</span>
                        <span className="icon"><i class="fa-duotone fa-square-arrow-up-right"></i></span>
                      </button>
                    </div>

                    <div className="mt-6">
                      {/* COUNTDOWN */}
                      <div className="legend text-2xs uppercase tracking-widest opacity-60 mb-4">
                        <h5 className="bg-gray-800">Time until reveal</h5>
                      </div>

                      <div className="text-3xl text-center justify-evenly flex space-x-4">
                          <div className="w-20 p-2 bg-white text-gray-700 rounded-lg">
                            <div className="slashed-zero tabular-nums leading-none" x-text="days">6</div>
                            <div className="uppercase text-2xs leading-none opacity-70 mt-2">days</div>
                          </div>

                          <div className="w-20 p-2 bg-white text-gray-700 rounded-lg">
                            <div className="slashed-zero tabular-nums leading-none" x-text="hours">14</div>
                            <div className="uppercase text-2xs leading-none opacity-70 mt-2">hours</div>
                          </div>

                          <div className="w-20 p-2 bg-white text-gray-700 rounded-lg">
                            <div className="slashed-zero tabular-nums leading-none" x-text="minutes">20</div>
                            <div className="uppercase text-2xs leading-none opacity-70 mt-2">minutes</div>
                          </div>

                          <div className="text-2xl mx-1 opacity-50 font-light mt-2">:</div>

                          <div className="w-20 p-2 bg-white text-gray-700 rounded-lg">
                            <div className="slashed-zero tabular-nums leading-none" x-text="seconds">45</div>
                            <div className="uppercase text-2xs leading-none opacity-70 mt-2">seconds</div>
                          </div>
                      </div>
                      {/* END: COUNTDOWN */}
                    </div>
                  </div>
                </div>

                {/* <div className="project-links">
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
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
