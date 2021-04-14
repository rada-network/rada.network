import React from 'react';

import {useState} from "react";
import {Card} from "../cards/Project";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";
import { RiFireFill } from "react-icons/ri";
import { RiTimeFill } from "react-icons/ri";
import { RiFireLine } from "react-icons/ri";
import { RiTimeLine } from "react-icons/ri";



export const ProjectsList = ({extraClass, grid, gap, title, cta}) => {
	return (
		<div className={`section ${extraClass || ''}`}>
			<div className="container">
				<div className="section-header">
					<div className="section-title">{title}</div>
					{ cta && 
					<div className="section-cta">
						<button className="btn pb-1 text-gray-700 border-b-2 border-gray-700">
							<span className="icon mr-1"><RiTimeFill /></span>
							<span className="btn-text text-xs font-medium uppercase">Latest</span>
						</button>
						<button className="btn ml-4 pb-1 text-gray-700 border-b-2 border-transparent opacity-60 hover:opacity-100">
							<span className="icon mr-1"><RiFireFill /></span>
							<span className="btn-text text-xs font-medium uppercase">Popular</span>
						</button>
					</div>
					}
				</div>
				<div className="section-body">
					<div className={`grid grid gap-${gap || '5'} grid-cols-1 lg:grid-cols-${grid || '2'}`}>
						<Card 
							projectTitle="SolaSystem"
							projectTextShort="SolaSystem is building the new creative economy. Coming soon!"
							projectIconUri="https://picsum.photos/400/400?random=1"
							link="#"
							projectType="dApp"
							projectPlatform="Solana"
							projectPlatformShort="sol"
							projectDate="4 hours ago"
							projectSubmitterImgUri="https://picsum.photos/80/80?random=1"
							projectSubmitter="rada.co"
							projectCommentsCounts="2"
							voteTotal="2"
						/>
						<Card 
							projectTitle="Blockchain Adventurers"
							projectTextShort="Enabling DeFi on Thorchain through synthetic assets and efficient use of your crypto."
							projectIconUri="https://picsum.photos/400/400?random=2"
							link="#"
							projectType="Token"
							projectPlatform="Ethereum"
							projectPlatformShort="eth"
							projectDate="23 hours ago"
							projectSubmitterImgUri="https://picsum.photos/80/80?random=2"
							projectSubmitter="Hung Dinh"
							projectCommentsCounts="125"
							voteTotal="192"
						/>
						<Card 
							projectTitle="Alpha Omega"
							projectTextShort="A socioeconomic experiment of human creativity, cooperation and governance."
							projectIconUri="https://picsum.photos/400/400?random=3"
							link="#"
							projectType="NFT"
							projectPlatform="Cardano"
							projectPlatformShort="ada"
							projectDate="2 days ago"
							projectSubmitterImgUri="https://picsum.photos/80/80?random=3"
							projectSubmitter="Khanh Le"
							projectCommentsCounts="56"
							voteTotal="1"
						/>
						<Card 
							projectTitle="Picasso Kongz"
							projectTextShort="1,000 unique Picasso Kongz have been minted !"
							projectIconUri="https://picsum.photos/400/400?random=4"
							link="#"
							projectType="dApp"
							projectPlatform="Binance BSC"
							projectPlatformShort="bnb"
							projectDate="7 days ago"
							projectSubmitterImgUri="https://picsum.photos/80/80?random=4"
							projectSubmitter="Hieu Nguyen"
							projectCommentsCounts="18"
							voteTotal="28"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}