import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import OpenDate from "./OpenDate"
import { useTranslation } from "next-i18next";
import Link from "next/link"
import {toast} from "react-toastify"

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
                {project.open_date ?
                <div>
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
                </div>
                :
                <div className="">
                  <h3 class="text-4xl text-center mt-4 mb-4 font-normal">
                    <span className="text-gray-700 dark:text-white font-semibold">{t("Coming Soon")}</span>
                  </h3>
                  <div className="max-w-md mx-auto">
                    <p class="text-sm text-center mt-4 leading-7" dangerouslySetInnerHTML={{__html : t("coming soon note",
                      {
                        twitter : `<a class="link" target="_blank" rel="nofollow" href="https://twitter.com/rada_network">@rada_network</a>`,
                        radanetwork : `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radanetwork">Telegram channel</a>`,
                        radadao : `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radadao">Telegram Community</a>`
                      }
                    )}} >
                    </p>
                  </div>
                </div>
                }

                <div className="flex flex-col md:flex-row mt-8 max-w-xl justify-evenly mx-auto">
                  <Link href={`/launchverse/${project.slug}/share2earn`}>
                    <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-primary-700 dark:bg-primary-700 text-white rounded-lg flex items-center cursor-pointer">
                      <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-gray-900 bg-opacity-50 rounded-full flex-shrink-0 mr-4 shadow">
                        <i class="fa-duotone fa-hand-holding-heart"></i>
                      </span>
                      <div>
                        <p className="mb-1 opacity-80">{t("Refer a friend to earn RIR")}</p>
                      
                        <a href={`/launchverse/${project.slug}/share2earn`} class="group text-white">
                          <span class="text-sm">{t("Join Share2Earn")}</span>
                          <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
                        </a>
                      
                      </div>
                    </div>
                  </Link>

                  <div className="w-full md:w-1/2 p-4 my-2 md:m-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex cursor-pointer">
                    <span className="icon text-xl opacity-70 w-10 h-10 !flex items-center justify-center bg-white dark:bg-gray-900 rounded-full flex-shrink-0 mr-4 shadow">
                      <i class="fad fa-info"></i>
                    </span>
                    <div>
                      <p className="mb-1 opacity-80">{t("How to join RADA LaunchVerse")}</p>
                      {/* <Link href={`/launchverse/${project.slug}/share2earn`}>
                      <a href={`/launchverse/${project.slug}/share2earn`} class="group">
                        <span class="text-sm">{t("Learn more")}</span>
                        <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
                      </a>
                      </Link> */}
                      <a href={`#`} onClick={e => {toast.info(t("Coming Soon"),{position:"top-center"})}} class="group">
                        <span class="text-sm">{t("Learn more")}</span>
                        <span class="icon text-xs relative left-1 group-hover:left-2 transition-all"><i class="fas fa-angle-right"></i></span>
                      </a>
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