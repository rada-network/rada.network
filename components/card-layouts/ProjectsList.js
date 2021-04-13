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
						<button className="btn ml-4 pb-1 text-gray-700 border-b-2 border-transparent opacity-60">
							<span className="icon mr-1"><RiFireFill /></span>
							<span className="btn-text text-xs font-medium uppercase">Popular</span>
						</button>
					</div>
					}
				</div>
				<div className="section-body">
					<div className={`grid gap-${gap || '5'} grid-cols-1 md:grid-cols-2`}>
						<Card 
							title="Identity Crisis"
							text="Foundation is building the new creative economy. Create, explore & collect digital art NFTs."
							mediaUri="https://picsum.photos/400/400?random=1"
							link="#"
							projectDate="4 hours ago"
							projectSubmitterImgUri="https://picsum.photos/80/80?random=1"
							projectSubmitter="rada.co"
							projectCommentsCounts="2"
							voteTotal="2"
						/>
						<Card 
							title="CryptoPunks"
							text="The CryptoPunks are the first NFT. A fixed set of 10,000, they were launched in mid-2017 and became one of the inspirations for the ERC-721 standard."
							mediaUri="https://picsum.photos/400/400?random=2"
							link="#"
							projectDate="4 hours ago"
							projectSubmitterImgUri="https://picsum.photos/80/80?random=2"
							projectSubmitter="Hung Dinh"
							projectCommentsCounts="125"
							voteTotal="192"
						/>
						<Card 
							title="Rarible Collectibles"
							text="Rarible makes it easy to create, sell, and collect rare digital art."
							mediaUri="https://picsum.photos/400/400?random=3"
							link="#"
							projectDate="4 hours ago"
							projectSubmitterImgUri="https://picsum.photos/80/80?random=3"
							projectSubmitter="Khanh Le"
							projectCommentsCounts="56"
							voteTotal="1"
						/>
						<Card 
							title="Picasso Kongz"
							text="1,000 unique Picasso Kongz have been minted ! Each Picasso Kongz is unique and is sold in a 1/1 edition. This project is inspired by the CyberKongz."
							mediaUri="https://picsum.photos/400/400?random=4"
							link="#"
							projectDate="4 hours ago"
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