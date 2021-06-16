import {CommentHeader} from "./commentHeader";
import {RiThumbUpFill} from "react-icons/ri";
import {useState} from "react";
import {CommentAvatar} from "./commentAvatar";
import {CommentForm} from "./commentForm";
import {getSnapshot} from "mobx-state-tree";
import {observer} from "mobx-react";

export const CommentMain = observer(({item,comment,user,ItemCommentStore,level, parent}) =>{
  const [showReply,setShowReply] = useState(false)
  let comments = getSnapshot(ItemCommentStore.getChildComment(comment.id))
  let sortComments = comments.slice(0)
  sortComments.sort(function(a,b){
    return b.createdAt - a.createdAt
  })
  let nextLevel = level + 1
  let mainClass = level > 1 ? "comment comment_reply group flex"  : "comments-list-item flex flex-col items-stretch"
  const subclass = level > 1 ? "comment group flex comment_reply"  : "comment group flex"
  if (sortComments.length === 0){
    mainClass = mainClass + ' no-reply'
  }
  const SubComment = () =>{
    return (
      <>
        <div className={subclass}>
          <div className={`mr-3 md:mr-4 user-wallet_avatar${level === 1 ? "" : "_sm"}`}>
            <CommentAvatar user={user} size={level > 1 ? 32 : 40} />
          </div>
          <div className="comment-main">
            <CommentHeader comment={comment} user={user} level={level} parent={parent} ItemCommentStore={ItemCommentStore}/>
            <div className="comment-text mt-1">
              <p>{comment.content}</p>
            </div>
            <div className="comment-footer mt-3 flex flex-wrap items-center justify-between text-xs text-gray-400">
              <div className="flex items-center">
                <button
                  className="btn py-1 px-2 border border-gray-200 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-100 rounded">
                  {/*<button*/}
                  {/*  className="btn py-1 px-2 border border-primary-500 text-primary-700 bg-primary-100 rounded">*/}
                  <span className="icon mr-2"><RiThumbUpFill/></span>
                  <span className="font-bold mr-2">1</span><span>Likes</span>
                </button>
                {
                  level  <= 1 ?
                    <button className="btn py-1 px-2 ml-2 hover:text-primary-700 rounded"
                            onClick={()=>{setShowReply(!showReply)}}
                    >
                      <span className="icon mr-2"><i className="fa fa-reply"/></span>
                      <span>Reply</span>
                    </button>
                    : ""
                }

              </div>
              <button className="btn py-1 px-2 ml-2 hover:text-red-700 rounded opacity-0 group-hover:opacity-100">
                <span className="icon mr-2"><i className="fas fa-exclamation"></i></span>
                <span>Report</span>
              </button>

              {/*<btn*/}
              {/*  className="btn py-1 px-2 ml-2 hover:text-red-700 rounded opacity-0 group-hover:opacity-100">*/}
              {/*  <span className="icon mr-2"><i className="fas fa-exclamation"></i></span>*/}
              {/*  <span>Report</span>*/}
              {/*</btn>*/}
            </div>
          </div>

        </div>
        {showReply ?
          <div className="comment_reply_form flex justify-center">
            <CommentForm key={'cmform' + comment.id}  item={item} ItemCommentStore={ItemCommentStore} replyFor={comment.id}  />
          </div>
          : ""
        }
        {
          sortComments.map(function (c) {
            let user = getSnapshot(ItemCommentStore.getUser(c.userId))
            return (
              <CommentMain key={c.id} item={item} comment={c} user={user} ItemCommentStore={ItemCommentStore} level={nextLevel} parent={comment}  />
            )
          })
        }

      </>
    )
  }

  return (
    <>
      {level  > 1 ?
        <SubComment />
        :
        <div className={mainClass}>
          <SubComment />
        </div>
      }
    </>
  )
})


