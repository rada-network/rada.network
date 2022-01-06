import { useTranslation } from "next-i18next";
import { CheckSvg } from "../../../../svg/SvgIcons";

const Timeline = ({ step }) => {
  const cstep = step || 1;
  const { t } = useTranslation("launchpad");
  const Step = ({ step, title, desc }) => {
    // console.log('tl:', cstep, props.step)
    const cls = ["step-compact"];
    if (cstep == step) cls.push("is-current");
    if (cstep > step) cls.push("is-complete");
    return (
      <li className={cls.join(" ")}>
        <div className="timeline-event-body" aria-current="step">
          <div className="timeline-event-body--icon">
            <span className="timeline-event-body--icon--text">
              {cstep > step ? <CheckSvg /> : step}
            </span>
          </div>
          <div className="timeline-event-body--content">
            <span className="timeline-event-body--title">{title}</span>
            <span className="timeline-event-body--text">{desc}</span>
          </div>
        </div>
      </li>
    );
  };

  return (
    <>
      {/* Steps Progress */}
      <nav aria-label="Progress">
        <ol role="list" className="steps-compact ">
          <Step
            step="1"
            title={t("Whitelist")}
            desc={t("Apply for whitelist")}
          />

          <Step
            step="2"
            title={t("Purchase")}
            desc={t("Deposit your fund")}
          />

          <Step
            step="3"
            title={t("Status")}
            desc={t("Status of your application")}
          />
        </ol>
      </nav>
    </>
  );
};

export default Timeline;
