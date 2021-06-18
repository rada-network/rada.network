import {useState} from "react";
import {Card} from "../cards/MediaFull";
import {CardMiniH} from "../cards/MiniHorizontal";

import WidgetTitle from "../text/widgetTitle";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const MediaList = ({
                          extraClass, 
                          grid, 
                          gap, 
                          title,
                          titleIcon,
                          titleIconColor,
                        }) => 
  {
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
          <div className={`grid grid-cols-1 lg:grid-cols-12`}>

            <div className="col-span-8 media-player">
              <Card
                title="STARTLING TRUTH ABOUT CARDANO! (ADA Holders Must PREPARE)"
                mediaType="Podcast"
                mediaUri="https://www.youtube.com/embed/Ck1Xza8Xmyw"
              />
            </div>

            <div className="col-span-4 media-list border-l border-gray-500 border-opacity-10">
              <CardMiniH
                title="The future will be decentralized | Charles Hoskinson | TEDxBermuda"
                mediaType="Video"
                mediaUri="https://picsum.photos/300/300?random=1"
                link="#"
              />

              <CardMiniH
                title="Cardano - Simply Explained"
                mediaType="Video"
                mediaUri="https://picsum.photos/300/300?random=2"
                link="#"
              />

              <CardMiniH
                title="What is Cardano? | Charles Hoskinson and Lex Fridman"
                mediaUri="https://picsum.photos/300/300?random=3"
                mediaType="Video"
                link="#"
              />

              <CardMiniH 
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

