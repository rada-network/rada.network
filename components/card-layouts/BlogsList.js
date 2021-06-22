import {useState} from "react";
import posts from "../../data/query/posts";
import {Card} from "../cards/Blog";

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const BlogsList = ({posts, extraClass, grid, gap, title, cta}) => {
	return (
		<div className={`section ${extraClass || ''}`}>
			<div className="container">
				<div className="section-header">
					<div className="section-title">{title}</div>
					{ cta && 
					<div className="section-cta">
						<button className="btn">
							<span className="btn__text">{cta}</span>
							<span className="icon"><IoChevronForwardSharp /></span>
						</button>
					</div>
					}
				</div>
				<div className="section-body">
					<div className={`grid grid gap-${gap || '5'} sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${grid || '5'}`}>
						{posts.map(post => (
							<Card
								key={post.id}
								post={post}
								mediaUri="https://picsum.photos/400/300?random=1"
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

