import { useTranslation } from "next-i18next";
import { CheckSvg } from "../../../../svg/SvgIcons";
import { observer } from "mobx-react";
import useStore from "@lib/useStore";

const Timeline = observer (({ step, steps }) => {
  const store = useStore();
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
          {!!steps && steps.map(function (item) {
            return (
              <Step
                step={item.step}
                title={item.title}
                desc={item.des}
                timeOpen="9AM, 21/01/2022 (UTC)"
                timeClose="9AM, 24/01/2022 (UTC)"
              />
            )
          })}
        </ol>
      </nav>
    </>
  );
});

export default Timeline;
