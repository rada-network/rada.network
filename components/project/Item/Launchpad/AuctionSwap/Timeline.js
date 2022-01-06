import { useTranslation } from "next-i18next";
import { CheckSvg } from "../../../../svg/SvgIcons";

const Timeline = ({ step }) => {
  const cstep = step || 1;
  const { t } = useTranslation("launchpad");
  const Step = ({ step, title, desc, timeOpen, timeClose }) => {
    // console.log('tl:', cstep, props.step)
    const cls = ["timeline-event"];
    if (cstep == step) cls.push("is-current");
    if (cstep > step) cls.push("is-complete");
    return (
      <li className={cls.join(" ")}>
        <div className="timeline-event-body" aria-current="step">
          <div className="timeline-event--icon">
            <span className="timeline-event--icon--text">
              {/* {cstep > step ? <CheckSvg /> : step} */}
              {cstep > step ? step : step}
            </span>
          </div>
          <div className="timeline-event--content">
            <span className="timeline-event--title">{title}</span>
            <span className="timeline-event--text">{desc}</span>
            <div className="tooltip">
              <time className="timeline-event--time">
                <span>From:</span> {timeOpen}
              </time>
              <time className="timeline-event--time">
                <span>To:</span> {timeClose}
              </time>
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      {/* Steps Progress */}
      <nav aria-label="Progress">
        <ol role="list" className="timeline">
          <Step
            step="1"
            title={t("Whitelist")}
            desc={t("Apply for whitelist")}
            timeOpen="9AM, 21/01/2022 (UTC)"
            timeClose="9AM, 24/01/2022 (UTC)"
          />
          <Step
            step="2"
            title={t("Auction")}
            desc={t("Place your bid")}
            timeOpen="9AM, 21/01/2022 (UTC)"
            timeClose="9AM, 24/01/2022 (UTC)"
          />

          <Step
            step="3"
            title={t("Status")}
            desc={t("Status of your bid")}
            timeOpen="9AM, 21/01/2022 (UTC)"
            timeClose="9AM, 24/01/2022 (UTC)"
          />
          <Step
            step="4"
            title={t("Claim")}
            desc={t("Claim your token")}
            timeOpen="9AM, 21/01/2022 (UTC)"
            timeClose="9AM, 24/01/2022 (UTC)"
          />
        </ol>
      </nav>
    </>
  );
};

export default Timeline;
