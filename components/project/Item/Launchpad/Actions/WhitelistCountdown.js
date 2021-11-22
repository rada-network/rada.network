import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import OpenDate from "./OpenDate"
import { useTranslation } from "next-i18next";
import Link from "next/link"

const WhitelistCountdown = ({project}) => {
  const {t} = useTranslation("launchpad")
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-header text-center sr-only">
          <h3>Public Sale</h3>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="relative z-0">
              <Timeline step="1" />
            </div>

            <div className="global-padding-lg min-h-full bg-white dark:bg-gray-800 relative z-10">

              <div className="">
                <h3 class="text-2xl text-center mb-4 font-normal">
                  <span className="text-color-title">{t("The whitelist will open in")}</span>
                </h3>
                <ProjectCountdown project={project} />
                <div>
                  <p className="text-sm text-center mt-4 leading-7">
                    {/* <span className="text-color-desc">{t("Please wait until the whitelist opens!")}</span><br />
                    <span className="text-color-desc">{t("You need to apply to join the whitelist.")}</span><br /> */}
                    <span className="text-color-desc">{t("Openat")} </span> <OpenDate time={project.open_date} />
                  </p>
                </div>

                <div className="flex flex-col md:flex-row mt-8 max-w-lg justify-evenly mx-auto">
                  <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-primary-700 text-white rounded-lg flex items-center cursor-pointer">
                    <span className="icon text-xl opacity-70 w-12 h-12 !flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full flex-shrink-0 mr-4">
                      <i class="fa-duotone fa-hand-holding-heart"></i>
                    </span>
                    <div>
                      <p className="mb-1 opacity-80">{t("Get more RIR with Share2Earn")}</p>
                      <Link href={`/launchverse/${project.slug}/share2earn`}>
                      <a href={`/launchverse/${project.slug}/share2earn`} class="group text-white">
                        <span class="text-sm">{t("Joint now")}</span>
                        <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
                      </a>
                      </Link>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-gray-700 text-white rounded-lg flex items-center cursor-pointer">
                    <span className="icon text-xl opacity-70 w-12 h-12 !flex items-center justify-center bg-gray-900 rounded-full flex-shrink-0 mr-4">
                      <i class="fad fa-info"></i>
                    </span>
                    <div>
                      <p className="mb-1 opacity-80">{t("Joint the launchverse is really simple")}</p>
                      <Link href={`/launchverse/${project.slug}/share2earn`}>
                      <a href={`/launchverse/${project.slug}/share2earn`} class="group text-white">
                        <span class="text-sm">{t("Learn more")}</span>
                        <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
                      </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
            
        </div>

      </div>
    </>
  );
}

export default WhitelistCountdown