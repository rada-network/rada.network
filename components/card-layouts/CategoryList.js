import {Card} from "../cards/Category";
import { useState, useEffect, createRef } from 'react'

import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

import stylesSB from '../../styles/modules/Scrollbar.module.css';
import styles from "../../styles/modules/Layout.module.css";

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
		<div className={`${styles.section} ${extraClass || ''}`}>
      <div className={`${styles.section_inner}`}>

				<div className={`${styles.section_header}`}>

          { title && 
					<div className={`${styles.section_title}`}>
            { titleIcon &&
            <span className={`icon mr-3 text-${titleIconColor}`}>
              <i className={`fad fa-${titleIcon}`}></i>
            </span> }
            <span>{title}</span>
          </div>
          }

				</div>

				<div className={`${styles.section_body}`}>

          <div className={`${stylesSB.category_scroll} scrollbar ${stylesSB.scrollbar}`} ref={scrollBox}>
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

