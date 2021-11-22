import Timeline from "./Timeline";
import ProjectCountdown from "./Countdown";
import OpenDate from "./OpenDate"
import { useTranslation } from "next-i18next";

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

            <div className="">
              <Timeline step="1" />
            </div>

            <div className="global-padding-lg min-h-full">

              <div className="">
                <h3 class="text-3xl text-center mb-8 font-normal">
                  <span className="text-color-title">{t("The whitelist will open in")}</span>
                </h3>
                <ProjectCountdown project={project} />
                <div>
                <p className="text-sm text-center mt-8 leading-7">
                  <span className="text-color-desc">{t("Openat")} </span> <OpenDate time={project.open_date} />
                </p>
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