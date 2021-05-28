import {Card} from "../cards/Category";
import { useState, useEffect, createRef } from 'react'
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";

import styles from '../../styles/modules/Scrollbar.module.css';

const categoryPanel = createRef();
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

            <Card 
              title="DeFi"
              itemType={"defi"}
              text="Financial smart contract, DApps, and financial protocols"
              cta="15 hunted"
            />
            <Card
              title="DEX"
              itemType={"token"}
              text="Decentralized cryptocurrency exchanges that allow users to trade cryptocurrencies"
              cta="32 hunted"
            />
            <Card
              title="NFT"
              itemType={"nft"}
              text="Nonfungible tokens NFT is another type of digital asset besides cryptocurrencies"
              cta="192 hunted"
            />
            <Card 
              title="DApps"
              itemType={"dapp"}
              text="A Dapp, or decentralized application, is a software application that runs on a distributed network"
              cta="202 hunted"
            />
            <Card 
              title="Utilities"
              itemType={"utilities"}
              text="Blockchain utilities refer to the blockchain applications built on blockchains to provide utility functions to users"
              cta="8 hunted"
            />
            <Card 
              title="Gambling"
              itemType={"dapp"}
              text="Blockchain gambling apps are any gambling products that include blockchain elements"
              cta="8 hunted"
            />
					</div>

				</div>

      </div>
			</div>
		</div>
	)
}

