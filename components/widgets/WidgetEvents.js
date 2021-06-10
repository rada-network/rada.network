import Link from "next/link"

import styles from '../../styles/modules/Widget.module.css'
import stylesEvent from '../../styles/modules/Widget.events.module.css'

import {RiExternalLinkLine} from "react-icons/ri";

export const WidgetEvents = ({title, text, footer, widgetIcon, widgetIconColor}) => {
  return (

    <div className={`${styles.widget}`}>

      { title &&
      <div className={`${styles.widget_header}`}>
        <div className={`${styles.widget_title}`}>{title}</div>
        <span className={`${styles.widget_icon}`}>
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} ${styles.widget_icon_fa}`}/>
        </span>
      </div> }

      { text &&
      <div className={`${stylesEvent.body}`}>

        <div className={`${styles.widget_list}`}>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesEvent.title}`}>
                <span>Smart Contract Launch</span>
                <span className="icon transition ml-2 -mb-0.5 opacity-0 group-hover:opacity-100"><RiExternalLinkLine /></span>
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
                "In our regular monthly show, we're sharing more on how #Alonzo will comprise a colour-coded series of testnets, gradually rolling out..."
              </div>

            </div>
          </a>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesEvent.title}`}>
                <span>Cardano First Ever Airdrop</span>
                <span className="icon transition ml-2 -mb-0.5 opacity-0 group-hover:opacity-100"><RiExternalLinkLine /></span>
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
                One day, you'll look To see I've gone For tomorrow may rain, so I'll follow the sun
              </div>

            </div>
          </a>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesEvent.title}`}>
                <span>Cardano First Ever Airdrop</span>
                <span className="icon transition ml-2 -mb-0.5 opacity-0 group-hover:opacity-100"><RiExternalLinkLine /></span>
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
                One day, you'll look To see I've gone For tomorrow may rain, so I'll follow the sun
              </div>

            </div>
          </a>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesEvent.title}`}>
                <span>Cardano First Ever Airdrop</span>
                <span className="icon transition ml-2 -mb-0.5 opacity-0 group-hover:opacity-100"><RiExternalLinkLine /></span>
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

        </div>

      </div> }

      { footer &&
      <div className={`${styles.widget_footer}`}>
        <div className={`${styles.widget_text}`}>{footer}</div>
      </div> }

    </div>

  );
};