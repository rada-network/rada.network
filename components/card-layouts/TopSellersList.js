import {useState} from "react";
import {Card} from "../cards/MiniHorizontal";

export const TopSellersList = ({extraClass, grid, gap}) => {
	return (
		<div className={`section section-sellers-list ${extraClass || ''}`}>
			<div className="container">
				<div className="section-header">
					<div className="section-title">
            Top Sellers In 1 Day
          </div>
				</div>
				<div className="section-body">
          <div className={`grid gap-${gap || '5'} sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${grid || '5'}`}>
            <Card 
              title="Peeble"
              text="9999.99 ADA"
              mediaUri="https://picsum.photos/80/80?random=1"
              link="#"
            />
            <Card
              title="KryptoPunks"
              text="2999.99 ADA"
              mediaUri="https://picsum.photos/80/80?random=2"
              link="#"
            />
            <Card 
              title="NFT Panda"
              text="2000.96 ADA"
              mediaUri="https://picsum.photos/80/80?random=3"
              link="#"
            />
            <Card 
              title="Picasso"
              text="1999.96 ADA"
              mediaUri="https://picsum.photos/80/80?random=4"
              link="#"
            />
            <Card 
              title="Peeble"
              text="9999.99 ADA"
              mediaUri="https://picsum.photos/80/80?random=5"
              link="#"
            />
            <Card
              title="KryptoPunks"
              text="2999.99 ADA"
              mediaUri="https://picsum.photos/80/80?random=6"
              link="#"
            />
            <Card 
              title="NFT Panda"
              text="2000.96 ADA"
              mediaUri="https://picsum.photos/80/80?random=7"
              link="#"
            />
            <Card 
              title="Picasso"
              text="1999.96 ADA"
              mediaUri="https://picsum.photos/80/80?random=8"
              link="#"
            />
					</div>
				</div>
			</div>
		</div>
	)
}

