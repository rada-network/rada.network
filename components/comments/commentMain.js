import {CommentHeader} from "./commentHeader";

export function CommentMain({comment,user,ItemCommentStore}){
  return (
    <div className="comment-main">
      <CommentHeader comment={comment} user={user}/>
      <div className="comment-text mt-1">
        <p>{comment.content}</p>
      </div>
      <div
        className="comment-footer mt-3 flex flex-wrap items-center justify-between text-xs text-gray-900 text-opacity-50">
        <div className="flex items-center">
          {/*<btn*/}
          {/*  className="btn py-1 px-2 border border-primary-500 text-primary-700 bg-primary-100 rounded">*/}
          {/*  <span className="icon mr-2"><RiThumbUpFill/></span>*/}
          {/*  <span className="font-bold mr-2">1983</span> <span>Likes</span>*/}
          {/*</btn>*/}
          <button className="btn py-1 px-2 ml-2 hover:text-primary-700 rounded">
            <span className="icon mr-2"><i className="fa fa-reply"></i></span>
            <span>Reply</span>
          </button>
        </div>

        {/*<btn*/}
        {/*  className="btn py-1 px-2 ml-2 hover:text-red-700 rounded opacity-0 group-hover:opacity-100">*/}
        {/*  <span className="icon mr-2"><i className="fas fa-exclamation"></i></span>*/}
        {/*  <span>Report</span>*/}
        {/*</btn>*/}
      </div>
    </div>
  )
}