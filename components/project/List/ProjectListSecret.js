import { Fragment } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import ProjectPool from "./ProjectPool";
import Image from "@components/Image";
import MiniCountdown from "./Countdown";
import { useTranslation } from "react-i18next";

export default function ProjectsListSecret({ title, extraClass, projects }) {
  const {t,i18n} = useTranslation("launchpad")
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
              <div key={project.slug} className="secrect-pool relative p-6 md:p-12 lg:px-16 lg:py-12 mb-4 text-white bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-2xl">
                <div className="secrect-pool--deco"></div>
                <div className="flex flex-col md:flex-row">
                  <div className="absolute right-4 bottom-20 opacity-10 transform scale-125 
                                  md:static md:transform-none md:opacity-100 md:mt-2 md:mr-8
                                  ">
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
                        <strong className="text-3xl block font-medium">{project.content.title}</strong>
                      </h4>
                    </div>

                    <div className="">
                      <p dangerouslySetInnerHTML={{__html:project.content.description}}></p>
                      <button className="btn btn-primary px-4 py-2 mt-4">
                        <span className="btn--text">Learn more</span>
                        <span className="icon"><i class="fa-duotone fa-square-arrow-up-right"></i></span>
                      </button>
                    </div>

                    <div className="mt-6">
                      {/* COUNTDOWN */}
                      <div className="legend text-2xs uppercase tracking-widest opacity-60 mb-4">
                        <h5 className="bg-gray-800">{t("Time until reveal")}</h5>
                      </div>

                      <MiniCountdown pool={project} isEndDate={false} style="full" />
                      {/* END: COUNTDOWN */}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
