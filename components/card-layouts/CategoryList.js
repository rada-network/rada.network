import {Card} from "../cards/Category";
import { useState, useEffect, createRef } from 'react'

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

const scrollBox = createRef();
let ps;

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const CategoryList = ({extraClass, title, titleIcon, titleIconColor, topic}) => {

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
      <div className={`section-inner`}>

				<div className={`section-header`}>

          { title && 
					<div className={`section-title`}>
            { titleIcon &&
            <span className={`icon mr-3 text-${titleIconColor}`}>
              <i className={`fad fa-${titleIcon}`}></i>
            </span> }
            <span>{title}</span>
          </div>
          }

				</div>

				<div className={`section-body`}>

          <div className={`scrollbar category-scroll`} ref={scrollBox}>
            {topic.map(function(item){
              return (
                <Card
                  key={item.itemType}
                  title={item.title}
                  itemType={item.itemType}
                  text={item.description}
                  cta={item.ideaCount + ' hunted'}
                />
              )
            })}
					</div>

				</div>

			</div>
		</div>
	)
}

