import {CommentForm} from "./commentForm";
import {CommentThreads} from "./commentThreads";
import getClient from "../../data/client";
import itemComments from "../../data/query/itemComments";
import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {ThreadsStore, UserStore} from "../../lib/store";
import {useTranslation} from "next-i18next";

export const CommentList = ({detailStore,dataStore}) => {
  const [comments,setComments] = useState([]);
  useEffect(() => {
    const client = getClient()
    console.log("load comment")
    client.query({
      query : itemComments,
      variables : {itemId : detailStore.data.item.id,orderBy : {createdAt : "desc"}},
      fetchPolicy: "no-cache"
    }).then(function(res){
      setComments(res.data.commentFeed)
    })
  },[detailStore.data])
  let item = detailStore.data
  let threads = {}
  threads[item.item.id] = []
  const ItemCommentStore = ThreadsStore.create({
    threads: threads,
    users: []
  });
  for (let comment of comments){
    
    let userObj = Object.assign({}, comment.user);
    if (userObj.email === null){
      userObj.email = ""
    }
    if (userObj.name === null){
      userObj.name = ""
    }
    let user = UserStore.create(userObj)
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

            <div className="col-span-12">
              {/* Comment Form */}
              <div className="comment-form">
                <CommentForm replyFor={null}  item={item} ItemCommentStore={ItemCommentStore} dataStore={dataStore} detailStore={detailStore} />
              </div>
              {/* Comment Threads */}
              <CommentThreads key={'commentThreads' + item.item.id} item={item} ItemCommentStore={ItemCommentStore} dataStore={dataStore} detailStore={detailStore} />
            </div>
            
          </div>
        </div>

    </div>
    </>
  )
}

const CommentHeader = observer(function ({detailStore}){
  let item = detailStore.data
  const {t} = useTranslation()
  return (
    <div className="section-header">
      <div className="section-title">
        <span className="icon mr-2"><i className="fa-duotone fa-comments"/></span>
        <span className="text-color-title">{item.item.totalComment} {t('comment')}</span>
      </div>
    </div>
  )
})