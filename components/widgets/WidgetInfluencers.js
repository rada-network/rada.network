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

              <div className="flex">
                <div className={`${stylesInfluencers.text}`}>
                  Charles Hoskinson is the founder of Cardano and co-founder of Ethereum, which are both blockchain platforms.
                </div>

                <div className={`${stylesInfluencers.avatar}`}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/21/Charles_Hoskinson_profile_color_no_background.png" alt="Charles Hoskinson" />

                </div>
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
                    <i class="fal fa-globe"></i>
                  </span>
                </a>
              </div>

            </div>
          </a>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesInfluencers.title}`}>
                <span>Vitalik Buterin</span>
              </div>

              <div className={`${stylesInfluencers.info_wrapper}`}>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`}>
                  Founder
                </span>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`}>
                  Developer
                </span>
              </div>

              <div className="flex">
                <div className={`${stylesInfluencers.text}`}>
                  Vitaly Dmitriyevich "Vitalik" Buterin is a Russian-Canadian programmer and writer who is best known as one of the co-founders of Ethereum.
                </div>

                <div className={`${stylesInfluencers.avatar}`}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/VitalikButerinProfile.jpg/1920px-VitalikButerinProfile.jpg?1623322336489" alt="Vitalik Buterin" />
                </div>
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
                    <i class="fal fa-globe"></i>
                  </span>
                </a>
              </div>

            </div>
          </a>

          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesInfluencers.title}`}>
                <span>Pink Floyd</span>
              </div>

              <div className={`${stylesInfluencers.info_wrapper}`}>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`}>
                  Legend
                </span>
                <span className={`${stylesInfluencers.info} ${stylesInfluencers.info_type}`}>
                  Musicians
                </span>
              </div>

              <div className="flex">
                <div className={`${stylesInfluencers.text}`}>
                  Pink Floyd were an English rock band formed in London in 1965. Gaining an early following as one of the first British psychedelic groups
                </div>

                <div className={`${stylesInfluencers.avatar}`}>
                  <img src="https://upload.wikimedia.org/wikipedia/en/d/d6/Pink_Floyd_-_all_members.jpg?1623322481672" alt="Pink Floyd" />
                </div>
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
                    <i class="fal fa-globe"></i>
                  </span>
                </a>
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