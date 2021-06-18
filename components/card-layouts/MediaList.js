import { useState, useEffect, createRef } from 'react'
import {Card} from "../cards/MediaFull";
import {CardMiniV} from "../cards/MiniVertical";

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import styles from '../../styles/modules/Scrollbar.module.css';

import WidgetTitle from "../text/widgetTitle";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

const scrollBox = createRef();
let ps;

export const MediaList = ({
                          extraClass, 
                          grid, 
                          gap, 
                          title,
                          titleIcon,
                          titleIconColor,
                        }) => {

  const [timelineWidth, setTimelineWidth] = useState('')

  useEffect(() => {
    // make scrollbar
    ps = new PerfectScrollbar(scrollBox.current, {
    });

    return () => {
      ps.destroy();
    }
  }, [scrollBox]);

	return (
		<div className={`section ${extraClass || ''}`}>
      <div className="section-inner">

        { title && 
				<div className="section-header border-b border-gray-500 border-opacity-10">
					<div className="section-title">
            <span className={`icon mr-3 text-${titleIconColor}`}>
              <i className={`fad fa-${titleIcon}`}/>
            </span>
            <span> {title}</span>
          </div>
				</div> }

				<div className="section-body no-padding">
          <div className={`grid grid-cols-1`}>

            {/* Media Player */}
            <div className="media-player p-8">
              <Card
                title="STARTLING TRUTH ABOUT CARDANO! (ADA Holders Must PREPARE)"
                mediaType="Podcast"
                mediaUri="https://www.youtube.com/embed/Ck1Xza8Xmyw"
              />
            </div>

            {/* Media Playlist */}
            <div className={`scrollbar ${styles.scrollbar} ${styles.media_scroll}`} ref={scrollBox}>
              <CardMiniV
                title="The future will be decentralized | Charles Hoskinson | TEDxBermuda"
                mediaType="Video"
                mediaUri="https://picsum.photos/300/300?random=1"
                link="#"
              />

              <CardMiniV
                title="Cardano - Simply Explained"
                mediaType="Video"
                mediaUri="https://picsum.photos/300/300?random=2"
                link="#"
              />

              <CardMiniV
                title="What is Cardano? | Charles Hoskinson and Lex Fridman"
                mediaUri="https://picsum.photos/300/300?random=3"
                mediaType="Video"
                link="#"
              />

              <CardMiniV 
                title="Ethereum vs. Cardano: Which is BEST?!"
                mediaUri="https://picsum.photos/300/300?random=4"
                mediaType="Podcast"
                link="#"
              />

              <CardMiniV
                title="The future will be decentralized | Charles Hoskinson | TEDxBermuda"
                mediaType="Video"
                mediaUri="https://picsum.photos/300/300?random=1"
                link="#"
              />

              <CardMiniV
                title="Cardano - Simply Explained"
                mediaType="Video"
                mediaUri="https://picsum.photos/300/300?random=2"
                link="#"
              />

              <CardMiniV
                title="What is Cardano? | Charles Hoskinson and Lex Fridman"
                mediaUri="https://picsum.photos/300/300?random=3"
                mediaType="Video"
                link="#"
              />

              <CardMiniV 
                title="Ethereum vs. Cardano: Which is BEST?!"
                mediaUri="https://picsum.photos/300/300?random=4"
                mediaType="Podcast"
                link="#"
              />

            </div>

					</div>
				</div>

			</div>
		</div>
	)
}

