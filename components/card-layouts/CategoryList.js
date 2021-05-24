import {Card} from "../cards/MediaFull";
import Link from "next/link"
import { useState, useEffect, createRef } from 'react'
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

const timelinePanel = createRef();
let ps;

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const CategoryList = ({extraClass, grid, gap, title, titleIcon, titleIconColor, cta, itemType}) => {

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
    ps = new PerfectScrollbar(timelinePanel.current, {
    });

    return () => {
      window.removeEventListener("resize", onResize);
      ps.destroy();
    }
  }, [timelinePanel]);


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

          <div className={`flex flex-nowrap scrollbar`} ref={timelinePanel}>

          {/* <div className={`grid scrollbar gap-${gap || '5'} sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${grid || '5'}`} ref={timelinePanel}> */}

          {/* <div className={`grid gap-${1 || '5'} sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-${1 || '5'}`}> */}

            <Card 
              title="Finance"
              text="short text 1"
              itemType={"defi"}
              cta="DEFI Projects"
              mediaUri="https://picsum.photos/600/600?random=1"
            />
            <Card
              title="Exchange"
              text="short text 2"
              itemType={"token"}
              cta="TOKEN Projects"
              mediaUri="https://picsum.photos/600/600?random=2"
            />
            <Card
              title="High Risk"
              text="this is a text"
              itemType={"nft"}
              cta="NFT Projects"
              mediaUri="https://picsum.photos/600/600?random=3"
            />
            <Card 
              title="Gaming"
              text="Game is just for fun"
              mediaUri="https://picsum.photos/600/600?random=4"
              itemType={"dapp"}
              cta="DAPP Projects"
            />
            <Card 
              title="Utilities"
              text="Utilities makes various"
              mediaUri="https://picsum.photos/600/600?random=5"
              itemType={"token"}
              cta="TOKEN Projects"
            />
              <Card
              title="Utilities"
              mediaUri="https://picsum.photos/600/600?random=6"
              cta="81 Projects"
            />
              <Card
              title="Utilities"
              mediaUri="https://picsum.photos/600/600?random=7"
              cta="58 Projects"
            />

					</div>
				</div>

      </div>
			</div>
		</div>
	)
}

