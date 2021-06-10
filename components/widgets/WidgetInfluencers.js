import Link from "next/link"

import styles from '../../styles/modules/Widget.module.css'
import stylesInfluencers from '../../styles/modules/Widget.influencers.module.css'

import {RiExternalLinkLine} from "react-icons/ri";

export const WidgetInfluencers = ({title, widgetIcon, widgetIconColor}) => {
  return (

    <div className={`${styles.widget}`}>

      { title &&
      <div className={`${styles.widget_header}`}>
        <div className={`${styles.widget_title}`}>{title}</div>
        <span className={`${styles.widget_icon}`}>
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} ${styles.widget_icon_fa}`}/>
        </span>
      </div> }

      <div className={`${stylesInfluencers.body}`}>

        <div className={`${styles.widget_list}`}>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesInfluencers.title}`}>
                <span>Charles Hoskinson</span>
              </div>

              <div className={`${stylesInfluencers.info_wrapper}`}>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`}>
                  Founder
                </span>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`}>
                  Mathematicians
                </span>
              </div>

              <div className={`${stylesInfluencers.text}`}>
                Charles Hoskinson is the founder of Cardano and co-founder of Ethereum, which are both blockchain platforms.
              </div>

              <div className={`${stylesInfluencers.avatar}`}>
               <img width="220" height="220" data-w="440" data-h="440" data-fw="600" data-fh="600" src="//upload.wikimedia.org/wikipedia/commons/thumb/2/21/Charles_Hoskinson_profile_color_no_background.png/440px-Charles_Hoskinson_profile_color_no_background.png" data-original="//upload.wikimedia.org/wikipedia/commons/thumb/2/21/Charles_Hoskinson_profile_color_no_background.png/440px-Charles_Hoskinson_profile_color_no_background.png" data-href="/wiki/File:Charles_Hoskinson_profile_color_no_background.png" alt="Charles Hoskinson" />
              </div>

              <div className={`${stylesInfluencers.links}`}>
                <a href="#" target="_blank">
                  <span className={`icon ${stylesInfluencers.links__icon}`}>
                    <i class="fab fa-twitter"></i>
                  </span>
                </a>
                <a href="#" target="_blank">
                  <span className={`icon ${stylesInfluencers.links__icon}`}>
                    <i class="fab fa-telegram-plane"></i>
                  </span>
                </a>
                <a href="#" target="_blank">
                  <span className={`icon ${stylesInfluencers.links__icon}`}>
                    <i class="fa fa-globe"></i>
                  </span>
                </a>
              </div>

            </div>
          </a>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesInfluencers.title}`}>
                <span>Cardano First Ever Airdrop</span>
              </div>
              <div className={`${stylesInfluencers.info_wrapper}`}>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`} type="event-airdrop">
                  Airdrop
                </span>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_date}`} title="19:00, 30, Sep 2021">
                  <strong>5d 23h</strong> to go
                </span>
              </div>
              <div className={`${stylesInfluencers.text}`}>
                One day, you'll look to see I've gone. For tomorrow may rain, so I'll follow the sun
              </div>

            </div>
          </a>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesInfluencers.title}`}>
                <span>Cardano First Ever Launchpad</span>
              </div>
              <div className={`${stylesInfluencers.info_wrapper}`}>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`} type="event-launchpad">
                  Launchpad
                </span>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_date}`} title="19:00, 30, Sep 2021">
                  <strong>5d 23h</strong> to go
                </span>
              </div>
              <div className={`${stylesInfluencers.text}`}>
                "Follow me down to the valley below You know Moonlight is bleeding From out of your soul...
              </div>

            </div>
          </a>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesInfluencers.title}`}>
                <span>Cardano First Ever Launchpad</span>
              </div>
              <div className={`${stylesInfluencers.info_wrapper}`}>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`} type="event-launchpad">
                  Launchpad
                </span>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`} type="event-expired">
                  Expired
                </span>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_date}`} title="19:00, 30, Sep 2021">
                  <strong>25d</strong> ago
                </span>
              </div>
              <div className={`${stylesInfluencers.text}`}>
                "Follow me down to the valley below You know Moonlight is bleeding From out of your soul...
              </div>

            </div>
          </a>

        </div>

      </div>

      <div className={`${styles.widget_footer}`}>
        <a class="btn block bg-gray-100 hover:bg-purple-100 hover:text-purple-700 justify-center py-3 px-6 rounded w-full text-sm">
          <span class="btn-text">Show 4 more</span>
        </a>
      </div>

    </div>

  );
};