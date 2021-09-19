import {CommentMain} from "./commentMain";
import {types, applySnapshot, flow, getSnapshot} from 'mobx-state-tree'
import {observer} from "mobx-react";


export const CommentThreads = observer(({item,ItemCommentStore,dataStore,detailStore}) => {
  let comments = getSnapshot(ItemCommentStore.getChildComment(item.item.id))
  let sortComments = comments.slice(0)
  sortComments = sortComments.sort(function(a,b){
    return b.createdAt - a.createdAt
  })
  return (
    <div className="comments-list">
      {
        sortComments.map(function (comment) {
          let user = getSnapshot(ItemCommentStore.getUser(comment.userId))
          return (
            <CommentMain key={comment.id} item={item} comment={comment} user={user} ItemCommentStore={ItemCommentStore} level={1}  parent={null} dataStore={dataStore} detailStore={detailStore} />
          )
        })
      }
    </div>
  )
})