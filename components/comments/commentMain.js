import {CommentHeader} from "./commentHeader";
import {RiThumbUpFill} from "react-icons/ri";
import {useState} from "react";
import {CommentAvatar} from "./commentAvatar";
import {CommentForm} from "./commentForm";
import {getSnapshot} from "mobx-state-tree";
import {observer} from "mobx-react";

export const CommentMain = observer(({item,comment,user,ItemCommentStore,level, parent,dataStore}) =>{
  const [showReply,setShowReply] = useState(false)
  let comments = getSnapshot(ItemCommentStore.getChildComment(comment.id))
  let sortComments = comments.slice(0)
  sortComments.sort(function(a,b){
    return b.createdAt - a.createdAt
  })
  let nextLevel = level + 1
  let mainClass = level > 1 ? "comment comment_reply"  : "comments-list-item"
  const subclass = level > 1 ? "comment comment_reply"  : "comment"
  if (sortComments.length === 0){
    mainClass = mainClass + ' no-reply'
  }
  if (showReply == 1) {
    mainClass = mainClass + ' has-reply-form'
  }
  const SubComment = () =>{
    return (
      <>
        <div className={subclass}>

          <div className="comment-trail"></div>

          <div className={`avatar${level === 1 ? "-sm" : "-xs"}`}>
            <CommentAvatar user={user} size={level > 1 ? 32 : 32} />
          </div>

          <div className="comment-main">

            <CommentHeader comment={comment} user={user} level={level} parent={parent} ItemCommentStore={ItemCommentStore}/>

            <div className="comment-text mt-1">
              <p>{comment.content}</p>
            </div>

            <div className="comment-footer">
              <div className="flex items-center space-x-4">

                {/* Todo: Comment Votte function */}
                <button
                  className="btn btn-post-vote disabled">
                  <span className="icon mr-1"><RiThumbUpFill/></span>
                  <span className="font-bold mr-1">1</span><span>Likes</span>
                </button>

                {
                  level  <= 1 ?
                    <button className="btn py-1 hover:text-primary-700 rounded"
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

            </div>
          </div>

        </div>
        {showReply ?
          <div className="comment-reply-form">
            <div className="comment-trail"></div>
            <CommentForm key={'cmform' + comment.id}  item={item} ItemCommentStore={ItemCommentStore} replyFor={comment.id} dataStore={dataStore}  />
          </div>
          : ""
        }
        {
          sortComments.map(function (c) {
            let user = getSnapshot(ItemCommentStore.getUser(c.userId))
            return (
              <CommentMain key={c.id} item={item} comment={c} user={user} ItemCommentStore={ItemCommentStore} level={nextLevel} parent={comment} dataStore={dataStore}  />
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


