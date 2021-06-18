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
  
  const items = [
    {
      title: 'The future will be decentralized | Charles Hoskinson | TEDxBermuda',
      type: 'Video',
      id: 'Ck1Xza8Xmyw'
    },
    {
      title: 'BREAKING: Hoskinson UPDATES Cardano Smart Contract Timeline',
      type: 'Video',
      id: 'ZpRwpDt8wGw'
    },
    {
      title: 'Greatest Cardano News Of 2021!! (Best Altcoin And Crypto Strategy)',
      type: 'Video',
      id: '9ZPzC-3sueo'
    },
  ]

  const [activeIdx, setActiveIdx] = useState(0)
  const activeItem = items[activeIdx] ?? items[0]

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
            <div className="media-player">
              <Card
                title={activeItem.title}
                mediaType={activeItem.type}
                mediaUri={`https://www.youtube.com/embed/${activeItem.id}`}
              />
            </div>

            {/* Media Playlist */}
            <div className={`media-playlist scrollbar ${styles.scrollbar} ${styles.media_scroll}`} ref={scrollBox}>

              { items.map((item, idx) => <CardMiniV {...item} onClick={() => setActiveIdx(idx)} />) }

            </div>

					</div>
				</div>

			</div>
		</div>
	)
}

