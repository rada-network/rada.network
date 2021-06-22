import Link from "next/link"

import styles from '../../styles/modules/Widget.module.css'
import stylesPosts from '../../styles/modules/Widget.posts.module.css'

import {RiExternalLinkLine} from "react-icons/ri";

export const WidgetPosts = ({title, widgetIcon, widgetIconColor}) => {
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

          {/* Post Item */}
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesPosts.title}`}>
                <span>Family/Groups join planning dAPP</span>
              </div>

              <div className="overflow-hidden">
                <div className={`${stylesPosts.media}`}>
                  <img src="https://picsum.photos/300/300?random=1" alt="" />
                </div>

                <div className={`${stylesPosts.text}`}>
                  Provide a simple and good way for family and groups participate in join projects
                </div>
              </div>

              <div className="metadata-wrapper mt-2">
                <a className="metadata project-metadata_type project-metadata_type_dapp " href="/explore/dapp"> 
                  <span className="metadata-value">dapp</span> 
                </a>
                <a rel="nofollow" target="_blank" href="https://cardano.org/" className="metadata project-metadata_platform project-metadata_platform_car ">
                  <span className="icon mr-1"><i className="cf cf-car text-base"></i></span><span className="metadata-value">Cardano</span>
                </a>
                <div className="metadata metadata_date"><span className="metadata-value" title="6:23 PM - May 25, 2021">May 25</span></div>
              </div>

            </div>
          </a>

          {/* Post Item */}
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesPosts.title}`}>
                <span>Family/Groups join planning dAPP</span>
              </div>

              <div className="overflow-hidden">
                <div className={`${stylesPosts.media}`}>
                  <img src="https://picsum.photos/300/300?random=2" alt="" />
                </div>

                <div className={`${stylesPosts.text}`}>
                  Provide a simple and good way for family and groups participate in join projects
                </div>
              </div>

              <div className="metadata-wrapper mt-2">
                <a className="metadata project-metadata_type project-metadata_type_dapp " href="/explore/dapp"> 
                  <span className="metadata-value">dapp</span> 
                </a>
                <a rel="nofollow" target="_blank" href="https://cardano.org/" className="metadata project-metadata_platform project-metadata_platform_car ">
                  <span className="icon mr-1"><i className="cf cf-car text-base"></i></span><span className="metadata-value">Cardano</span>
                </a>
                <div className="metadata metadata_date"><span className="metadata-value" title="6:23 PM - May 25, 2021">May 25</span></div>
              </div>

            </div>
          </a>

          {/* Post Item */}
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesPosts.title}`}>
                <span>Cardano China Info Hub</span>
              </div>

              <div className="overflow-hidden">
                <div className={`${stylesPosts.media}`}>
                  <img src="https://picsum.photos/300/300?random=3" alt="" />
                </div>

                <div className={`${stylesPosts.text}`}>
                  The Chinese Cardano community has limited access to accurate Cardano-related information which led to low awareness and mass misconception
                </div>
              </div>

              <div className="metadata-wrapper mt-2">
                <a className="metadata project-metadata_type project-metadata_type_dapp " href="/explore/dapp"> 
                  <span className="metadata-value">dapp</span> 
                </a>
                <a rel="nofollow" target="_blank" href="https://cardano.org/" className="metadata project-metadata_platform project-metadata_platform_car ">
                  <span className="icon mr-1"><i className="cf cf-car text-base"></i></span><span className="metadata-value">Cardano</span>
                </a>
                <div className="metadata metadata_date"><span className="metadata-value" title="6:23 PM - May 25, 2021">May 25</span></div>
              </div>

            </div>
          </a>

          {/* Post Item */}
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesPosts.title}`}>
                <span>This is a post with no image</span>
              </div>

              <div className="overflow-hidden">
                {/* <div className={`${stylesPosts.media}`}>
                  <img src="https://picsum.photos/300/300?random=4" alt="" />
                </div> */}

                <div className={`${stylesPosts.text}`}>
                  People desire a secure, reliable, and immutable source of truth when dealing with votes, polls, and elections
                </div>
              </div>

              <div className="metadata-wrapper mt-2">
                <a className="metadata project-metadata_type project-metadata_type_dapp " href="/explore/dapp"> 
                  <span className="metadata-value">dapp</span> 
                </a>
                <a rel="nofollow" target="_blank" href="https://cardano.org/" className="metadata project-metadata_platform project-metadata_platform_car ">
                  <span className="icon mr-1"><i className="cf cf-car text-base"></i></span><span className="metadata-value">Cardano</span>
                </a>
                <div className="metadata metadata_date"><span className="metadata-value" title="6:23 PM - May 25, 2021">May 25</span></div>
              </div>

            </div>
          </a>

          {/* Post Item */}
          <a className={`${styles.widget_list__link}`} href="#" target="_blank">
            <div className={`group ${styles.widget_list__item}`}>

              <div className={`${stylesPosts.title}`}>
                <span>Cardano On-Chain Voting</span>
              </div>

              <div className="overflow-hidden">
                <div className={`${stylesPosts.media}`}>
                  <img src="https://picsum.photos/300/300?random=4" alt="" />
                </div>

                <div className={`${stylesPosts.text}`}>
                  People desire a secure, reliable, and immutable source of truth when dealing with votes, polls, and elections
                </div>
              </div>

              <div className="metadata-wrapper mt-2">
                <a className="metadata project-metadata_type project-metadata_type_dapp " href="/explore/dapp"> 
                  <span className="metadata-value">dapp</span> 
                </a>
                <a rel="nofollow" target="_blank" href="https://cardano.org/" className="metadata project-metadata_platform project-metadata_platform_car ">
                  <span className="icon mr-1"><i className="cf cf-car text-base"></i></span><span className="metadata-value">Cardano</span>
                </a>
                <div className="metadata metadata_date"><span className="metadata-value" title="6:23 PM - May 25, 2021">May 25</span></div>
              </div>

            </div>
          </a>

        </div>

      </div>

      <div className={`${styles.widget_footer}`}>
        <a className="btn btn-nav block">
          <span className="btn__text">Show 4 more</span>
          <span className="btn__caret_down"></span>
        </a>
      </div>

    </div>

  );
};