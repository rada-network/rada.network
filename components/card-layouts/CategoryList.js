import {Card} from "../cards/MediaFull";
import {Carousel} from "../carousel/Carousel";

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
          {/*<div className={`grid gap-${gap || '5'} sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${grid || '5'}`}>*/}
          <div className={`grid gap-${1 || '5'} sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-${1 || '5'}`}>
            <Carousel show={4}>
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
              cta="218 Projects"
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
            </Carousel>
					</div>
				</div>
			</div>
		</div>
	)
}

