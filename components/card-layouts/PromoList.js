import {useState} from "react";
import {Card} from "../cards/MediaFull";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const PromoList = ({extraClass, grid, gap, title}) => {
	return (
		<div className={`section ${extraClass || ''}`}>
			<div className="container">
        { title && 
				<div className="section-header">
					<div className="section-title">{title}</div>
				</div> }
				<div className="section-body">
          <div className={`grid gap-${gap || '5'} sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${grid || '5'}`}>
            <Card 
              cta="Explore"
              mediaUri="https://picsum.photos/600/600?random=1"
            />
            <Card
              title="Atari Capsule Collection"
              text="Originally released in 1981, Centipede is a fixed shooter arcade game that became one of the most successful titles of its time, and one of the first to attract a significant female player base"
              cta="Explore"
              mediaUri="https://picsum.photos/600/600?random=2"
            />
            <Card
              mediaUri="https://picsum.photos/600/600?random=3"
            />
            <Card 
              text="Originally released in 1981, Centipede is a fixed shooter arcade game that became one of the most successful titles of its time, and one of the first to attract a significant female player base"
              mediaUri="https://picsum.photos/600/600?random=4"
              cta="Explore"
            />
            <Card 
              title="Atari Capsule Collection"
              mediaUri="https://picsum.photos/600/600?random=5"
              cta="Explore"
            />
					</div>
				</div>
			</div>
		</div>
	)
}

