import Link from "next/link";
//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";

export const Card = ({post, title, text, mediaUri, link}) => {
  const content = 
    <div className="card card-blog">
      <div className="card-media">
        <img className="card-img" src={mediaUri} />
      </div> 
      <div className="card-body">
        <div className="card-body-header">
          <div className="card-meta">
            <span className="blog-category">Category</span>
            <span className="meta-divider">—</span>
            <span className="blog-date">Jan 28, 1983</span>
          </div>
          <div className="card-title">
            <Link href={`/blog/${post.id}`}>
            <a title={post.title} className="">
              {post.title}
            </a>
            </Link>
          </div>
        </div> 
        <div className="card-body-main">
          <div className="card-text text-color-desc">{post.content}</div>
        </div>
      </div>
    </div>;

  return link ? (
    <a className="card-link" href={link}>
      {content}
    </a>
  ) : (
    content
  );
};