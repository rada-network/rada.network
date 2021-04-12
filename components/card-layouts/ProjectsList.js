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
						<button className="btn pb-1 text-gray-900 border-b-2 border-gray-900">
							<span className="icon mr-1"><RiTimeFill /></span>
							<span className="btn-text font-medium uppercase">Latest</span>
						</button>
						<button className="btn ml-4 pb-1 text-gray-900 border-b-2 border-transparent opacity-60">
							<span className="icon mr-1"><RiFireFill /></span>
							<span className="btn-text font-medium uppercase">Popular</span>
						</button>
					</div>
					}
				</div>
				<div className="section-body">
					<div className={`grid gap-${gap || '5'}`}>
						<Card 
							title="Identity Crisis"
							text="Foundation is building the new creative economy. Create, explore & collect digital art NFTs."
							mediaUri="https://picsum.photos/400/400?random=1"
							avatarUri="https://picsum.photos/80/80?random=1"
							link="#"
							voteTotal="2"
						/>
						<Card 
							title="CryptoPunks"
							text="The CryptoPunks are the first NFT. A fixed set of 10,000, they were launched in mid-2017 and became one of the inspirations for the ERC-721 standard."
							mediaUri="https://picsum.photos/400/400?random=2"
							avatarUri="https://picsum.photos/80/80?random=2"
							link="#"
							voteTotal="192"
						/>
						<Card 
							title="Rarible Collectibles"
							text="Rarible makes it easy to create, sell, and collect rare digital art."
							mediaUri="https://picsum.photos/400/400?random=3"
							avatarUri="https://picsum.photos/80/80?random=3"
							link="#"
							voteTotal="1"
						/>
						<Card 
							title="Picasso Kongz"
							text="1,000 unique Picasso Kongz have been minted ! Each Picasso Kongz is unique and is sold in a 1/1 edition. This project is inspired by the CyberKongz."
							mediaUri="https://picsum.photos/400/400?random=4"
							avatarUri="https://picsum.photos/80/80?random=5"
							link="#"
							voteTotal="28"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}