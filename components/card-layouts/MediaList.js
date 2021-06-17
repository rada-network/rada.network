import {useState} from "react";
import {Card} from "../cards/MediaFull";

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
				<div className="section-header">
					<div className="section-title">
            <span className={`icon mr-3 text-${titleIconColor}`}>
              <i className={`fad fa-${titleIcon}`}/>
            </span>
            <span> {title}</span>
          </div>
				</div> }

				<div className="section-body">
          <div className={`grid gap-${gap || '5'} sm:grid-cols-2 lg:grid-cols-${grid || '3'}`}>
            
            <Card 
              title="STARTLING TRUTH ABOUT CARDANO! (ADA Holders Must PREPARE)"
              mediaType="Podcast"
              mediaUri="https://www.youtube.com/embed/Ck1Xza8Xmyw"
            />

            <Card 
              title="The future will be decentralized | Charles Hoskinson | TEDxBermuda"
              mediaType="Video"
              mediaUri="https://www.youtube.com/embed/97ufCT6lQcY"
            />

            <Card
              title="Cardano - Simply Explained"
              mediaType="Video"
              mediaUri="https://www.youtube.com/embed/Do8rHvr65ZA"
            />

            <Card 
              title="What is Cardano? | Charles Hoskinson and Lex Fridman"
              mediaUri="https://www.youtube.com/embed/Elwv7Itr1qA"
              mediaType="Video"
            />

            <Card 
              title="Ethereum vs. Cardano: Which is BEST?!"
              mediaUri="https://www.youtube.com/embed/SXfXydnXNH4"
              mediaType="Podcast"
            />

					</div>
				</div>

			</div>
		</div>
	)
}

