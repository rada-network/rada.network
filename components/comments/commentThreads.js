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


export const CommentThreads =observer(({item,ItemCommentStore}) => {

  return (
    <div className="comments-list grid grid-cols-1">
      <div className="comments-list-item flex flex-col items-stretch">
        {
          ItemCommentStore.getChildComment(item.id).map(function (comment) {
            comment = getSnapshot(comment)
            let user = getSnapshot(ItemCommentStore.getUser(comment.userId))
            return (
              <div className="comment group flex">
                <div className="mr-3">
                  <CommentAvatar user={user} />
                </div>
                <CommentMain comment={comment} user={user} ItemCommentStore={ItemCommentStore}/>

              </div>
            )
          })
        }
      </div>
    </div>
  )
})