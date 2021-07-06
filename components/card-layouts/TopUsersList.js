import {Card} from "../cards/MiniHorizontal";

export const TopUsersList = ({extraClass, grid, gap, titleIcon, titleIconColor}) => {
	return (
		<div className={`section section-users-list ${extraClass || ''}`}>
			<div className="container">
        <div className="container-inner">

          <div className="section-header">
            <div className="section-title">
              { titleIcon &&
							<span className={`icon mr-3 text-${titleIconColor}`}>
								<i className={`fad fa-${titleIcon}`}></i>
							</span> }
              <span className="title">Most Active Users</span>
            </div>
          </div>

          <div className="section-body">
            <div className={`grid gap-${gap || '5'} sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${grid || '5'}`}>
              <Card 
                title="Peeble"
                text="2920 Votes"
                mediaUri="https://picsum.photos/80/80?random=1"
                link="#"
              />
              <Card
                title="KryptoPunks"
                text="1256 Votes"
                mediaUri="https://picsum.photos/80/80?random=2"
                link="#"
              />
              <Card 
                title="NFT Panda"
                text="896 Votes"
                mediaUri="https://picsum.photos/80/80?random=3"
                link="#"
              />
              <Card 
                title="Picasso"
                text="700 Votes"
                mediaUri="https://picsum.photos/80/80?random=4"
                link="#"
              />
              <Card 
                title="Peeble"
                text="256 Votes"
                mediaUri="https://picsum.photos/80/80?random=5"
                link="#"
              />
            </div>
          </div>
          
        </div>
			</div>
		</div>
	)
}

