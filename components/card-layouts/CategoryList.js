import {Card} from "../cards/Category";
import { useState, useEffect, createRef } from 'react'
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

import styles from '../../styles/modules/Scrollbar.module.css';

const categoryPanel = createRef();
let ps;

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const CategoryList = ({extraClass, title, titleIcon, titleIconColor, topic}) => {

  const [timelineWidth, setTimelineWidth] = useState('')


  useEffect(() => {
    const onResize = () => {
      setTimelineWidth('')
      const timelinebox = document.querySelector('.timeline')
      setTimelineWidth(timelinebox?.scrollWidth)
    };
    window.addEventListener("resize", onResize);
    onResize()
    console.log('init ps')
    // make scrollbar
    ps = new PerfectScrollbar(categoryPanel.current, {
    });

    return () => {
      window.removeEventListener("resize", onResize);
      ps.destroy();
    }
  }, [categoryPanel]);


	return (
		<div className={`section ${extraClass || ''}`}>
			<div className="container">
      <div className="container-inner">

				<div className="section-header">

          { title && 
					<div className="section-title">
            { titleIcon &&
            <span class={`icon mr-3 text-${titleIconColor}`}>
              <i class={`fad fa-${titleIcon}`}></i>
            </span> }
            <span>{title}</span>
          </div> }

				</div>

				<div className="section-body">

          <div className={`${styles.category_scroll} scrollbar ${styles.scrollbar}`} ref={categoryPanel}>
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
		</div>
	)
}

