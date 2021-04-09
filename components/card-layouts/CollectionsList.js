import {useState} from "react";
import {Card} from "../cards/Collection";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const CollectionsList = ({extraClass, grid, gap, title, cta}) => {
	return (
		<div className={`section ${extraClass || ''}`}>
			<div className="container">
				<div className="section-header">
					<div className="section-title">{title}</div>
					{ cta && 
					<div className="section-cta">
						<button className="btn">
							<span className="btn-text">{cta}</span>
							<span className="icon"><IoChevronForwardSharp /></span>
						</button>
					</div>
					}
				</div>
				<div className="section-body">
					<div className={`grid gap-${gap || '5'} sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-${grid || '5'}`}>
						<Card 
							title="Identity Crisis"
							text="Foundation is building the new creative economy. Create, explore & collect digital art NFTs."
							mediaUri="https://picsum.photos/400/300?random=1"
							avatarUri="https://picsum.photos/80/80?random=1"
							link="#"
							isMulti={true}
						/>
						<Card 
							title="CryptoPunks"
							text="The CryptoPunks are the first NFT. A fixed set of 10,000, they were launched in mid-2017 and became one of the inspirations for the ERC-721 standard."
							mediaUri="https://picsum.photos/400/300?random=2"
							avatarUri="https://picsum.photos/80/80?random=2"
							link="#"
							isMulti={true}
						/>
						<Card 
							title="Rarible Collectibles"
							text="Rarible makes it easy to create, sell, and collect rare digital art."
							mediaUri="https://picsum.photos/400/300?random=3"
							avatarUri="https://picsum.photos/80/80?random=3"
							link="#"
							isMulti={true}
						/>
						<Card 
							title="Picasso Kongz"
							text="1,000 unique Picasso Kongz have been minted ! Each Picasso Kongz is unique and is sold in a 1/1 edition. This project is inspired by the CyberKongz."
							mediaUri="https://picsum.photos/400/300?random=4"
							avatarUri="https://picsum.photos/80/80?random=5"
							link="#"
							isMulti={true}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}