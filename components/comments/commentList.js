import {CommentForm} from "./commentForm";
import {SubSideBar} from "../subSideBar";
import {CommentThreads} from "./commentThreads";
import {getSnapshot, types} from "mobx-state-tree";
import getClient from "../../data/client";
import itemComments from "../../data/query/itemComments";
import useSWR from "swr";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {getInfluencers} from "../../data/query/getSuggestUser";
import {ThreadsStore, UserStore} from "../../lib/store";

export const CommentList =({detailStore,dataStore}) => {
  let item = detailStore.data
  console.log("CommentList")
  const [comments,setComments] = useState([]);
  useEffect(() => {
    const client = getClient()
    client.query({
      query : itemComments,
      variables : {itemId : item.item.id,orderBy : {createdAt : "desc"}}
    }).then(function(res){
      setComments(res.data.commentFeed)
    })
  },[item])
  let threads = {}
  threads[item.item.id] = []
  const ItemCommentStore = ThreadsStore.create({
    threads: threads,
    users: []
  });
  for (let comment of comments){
    let user = UserStore.create(comment.user)
    ItemCommentStore.addUser(user)
    let createdAt = new Date(comment.createdAt)
    ItemCommentStore.addComment({
      id : comment.id,
      createdAt: createdAt.getTime(),
      content : comment.content,
      parent : comment.parent,
      itemId : comment.itemId,
      userId : comment.user.id
    })

  }

  return (
    <>
    <div className="section section-comments">

        <CommentHeader detailStore={detailStore} />
        
        <div className="section-body">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* <div className="md:col-span-9 md:pr-10"> */}
            <div className="col-span-12">
              {/* Comment Form */}
              <div className="flex justify-center">
                <CommentForm replyFor={null}  item={item} ItemCommentStore={ItemCommentStore} dataStore={dataStore}/>
              </div>
              {/* Comment Threads */}
              <CommentThreads key={'commentThreads' + item.item.id} item={item} ItemCommentStore={ItemCommentStore} dataStore={dataStore} />
            </div>
            {/* <SubSideBar /> */}
          </div>
        </div>

    </div>
    </>
  )
}

const CommentHeader = observer(function ({detailStore}){
  let item = detailStore.data
  return (
    <div className="section-header">
      <div className="section-title">
        <span className="icon mr-2"><i className="fad fa-comments"/></span>
        <span className="text-color-title">{item.item.totalComment} Comments</span>
      </div>
    </div>
  )
})