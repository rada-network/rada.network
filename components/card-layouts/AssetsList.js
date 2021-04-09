import {Card} from "../cards/Asset";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const AssetsList = ({assets, extraClass, grid, gap, title, cta}) => {
	return (
		<div className={`section ${extraClass || ''}`}>
			<div className="container">
				<div className="section-header">
					<div className="section-title"><span>{title}</span></div>
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
					<div className={`list-assets grid gap-${gap || '5'} grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${grid || '5'}`}>
						{assets && assets.map(item => (
							<Card key={item.id} item={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	)
}