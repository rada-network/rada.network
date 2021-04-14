import {useState} from "react";
import {Card} from "../cards/MediaFull";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const CategoryList = ({extraClass, grid, gap, title, cta}) => {
	return (
		<div className={`section ${extraClass || ''}`}>
			<div className="container">

				<div className="section-header">
          { title && 
					<div className="section-title">{title}</div> }
          { cta && 
					<div className="section-cta">
						<button className="btn">
							<span className="btn-text">{cta}</span>
							<span className="icon"><IoChevronForwardSharp /></span>
						</button>
					</div> }
				</div>
				<div className="section-body">
          <div className={`grid gap-${gap || '5'} sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${grid || '5'}`}>
            <Card 
              title="Finance"
              text=""
              cta="138 Projects"
              mediaUri="https://picsum.photos/600/600?random=1"
            />
            <Card
              title="Exchange"
              text=""
              cta="28 Projects"
              mediaUri="https://picsum.photos/600/600?random=2"
            />
            <Card
              title="High Risk"
              text=""
              cta="92 Projects"
              mediaUri="https://picsum.photos/600/600?random=3"
            />
            <Card 
              title="Gaming"
              text=""
              mediaUri="https://picsum.photos/600/600?random=4"
              cta="300 Projects"
            />
            <Card 
              title="Utilities"
              mediaUri="https://picsum.photos/600/600?random=5"
              cta="28 Projects"
            />
					</div>
				</div>
			</div>
		</div>
	)
}

