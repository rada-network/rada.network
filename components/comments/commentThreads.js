import {RiThumbUpFill} from "react-icons/ri";
import {CommentForm} from "./commentForm";
import {CommentAvatar} from "./commentAvatar";
import getClient from "../../data/client";
import itemComments from "../../data/query/itemComments";
import useSWR from "swr";
import {CommentMain} from "./commentMain";
import {types, applySnapshot, flow, getSnapshot} from 'mobx-state-tree'
import {serializeFetchParameter} from "@apollo/client";
import {observer} from "mobx-react";
import {useStore} from "../../lib/useStore";
import {useWallet} from "use-wallet";
import {values} from "mobx";
import {UserStore} from "./commentList";
import {useState} from "react";


export const CommentThreads = observer(({item,ItemCommentStore}) => {
  let comments = getSnapshot(ItemCommentStore.getChildComment(item.id))
  let sortComments = comments.slice(0)
  sortComments = sortComments.sort(function(a,b){
    return b.createdAt - a.createdAt
  })
  return (
    <div className="comments-list grid grid-cols-1">
        {
          sortComments.map(function (comment) {
            let user = getSnapshot(ItemCommentStore.getUser(comment.userId))
            return (
              <div className="comments-list-item flex flex-col items-stretch">
              <CommentMain item={item} comment={comment} user={user} ItemCommentStore={ItemCommentStore} level={1}  parent={null} />
              </div>
            )
          })
        }
    </div>
  )
})