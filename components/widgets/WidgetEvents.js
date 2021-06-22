import Link from "next/link"

import styles from '../../styles/modules/Widget.module.css'
import stylesEvent from '../../styles/modules/Widget.events.module.css'

import {RiExternalLinkLine} from "react-icons/ri";

export const WidgetEvents = ({title, widgetIcon, widgetIconColor}) => {
  return (

    <div className={`${styles.widget}`}>

      { title &&
      <div className={`${styles.widget_header}`}>
        <div className={`${styles.widget_title}`}>{title}</div>
        <span className={`${styles.widget_icon}`}>
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} ${styles.widget_icon_fa}`}/>
        </span>
      </div> }

      <div className={`${styles.widget_body_p0}`}>

        <div className={`${styles.widget_list}`}>

          {/* Even Item */}
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesEvent.title}`}>
                <span>Smart Contract Launch</span>
                <span className="icon ml-2 -mb-0.5 icon ico-external-link"><RiExternalLinkLine /></span>
              </div>
              <div className={`${stylesEvent.info_wrapper}`}>
                <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-important">
                  Important
                </span>
                <span className={`${stylesEvent.info} ${stylesEvent.info_date}`} title="00:00, 30, Sep 2021">
                  <strong>17d</strong> to go
                </span>
              </div>
              <div className={`${stylesEvent.text}`}>
                One day, you'll look to see I've gone. For tomorrow may rain, so I'll follow the sun
              </div>

            </div>
          </a>

          {/* Even Item */}
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesEvent.title}`}>
                <span>Cardano First Ever Airdrop</span>
                <span className="icon ml-2 -mb-0.5 icon ico-external-link"><RiExternalLinkLine /></span>
              </div>
              <div className={`${stylesEvent.info_wrapper}`}>
                <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-airdrop">
                  Airdrop
                </span>
                <span className={`${stylesEvent.info} ${stylesEvent.info_date}`} title="19:00, 30, Sep 2021">
                  <strong>5d 23h</strong> to go
                </span>
              </div>
              <div className={`${stylesEvent.text}`}>
                One day, you'll look to see I've gone. For tomorrow may rain, so I'll follow the sun
              </div>

            </div>
          </a>
          
          {/* Even Item */}
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesEvent.title}`}>
                <span>Cardano First Ever Launchpad</span>
                <span className="icon ml-2 -mb-0.5 icon ico-external-link"><RiExternalLinkLine /></span>
              </div>
              <div className={`${stylesEvent.info_wrapper}`}>
                <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-launchpad">
                  Launchpad
                </span>
                <span className={`${stylesEvent.info} ${stylesEvent.info_date}`} title="19:00, 30, Sep 2021">
                  <strong>5d 23h</strong> to go
                </span>
              </div>
              <div className={`${stylesEvent.text}`}>
                "Follow me down to the valley below You know Moonlight is bleeding From out of your soul...
              </div>

            </div>
          </a>

          {/* Even Item */}
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesEvent.title}`}>
                <span>Cardano First Ever Launchpad</span>
                <span className="icon ml-2 -mb-0.5 icon ico-external-link"><RiExternalLinkLine /></span>
              </div>
              <div className={`${stylesEvent.info_wrapper}`}>
                <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-launchpad">
                  Launchpad
                </span>
                <span className={`${stylesEvent.info} ${stylesEvent.info_type}`} type="event-expired">
                  Expired
                </span>
                <span className={`${stylesEvent.info} ${stylesEvent.info_date}`} title="19:00, 30, Sep 2021">
                  <strong>25d</strong> ago
                </span>
              </div>
              <div className={`${stylesEvent.text}`}>
                "Follow me down to the valley below You know Moonlight is bleeding From out of your soul...
              </div>

            </div>
          </a>

        </div>

      </div>

      <div className={`${styles.widget_footer}`}>
        <a className="btn block bg-gray-100 hover:bg-purple-100 hover:text-purple-700 justify-center py-3 px-6 rounded w-full text-sm">
          <span className="btn__text">Show 4 more</span>
          <span className="btn__caret_down"></span>
        </a>
      </div>

    </div>

  );
};