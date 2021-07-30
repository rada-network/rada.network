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

export const UserStore = types.model({
  id : types.identifier,
  walletAddress : types.string
})

export const CommentStore = types.model({
  id: types.identifier,
  createdAt :types.Date,
  content : types.string,
  parent: types.string,
  itemId : types.string,
  userId : types.string,

}).views(self => ({

})).actions(self => {
  const getUser = function (){
    return self.user
  }
  return {getUser}
})

const ThreadsStore = types.model({
  users: types.array(UserStore),
  threads : types.map(types.array(CommentStore))
}).views(self => ({
})).actions(self => {
  const addComment = function (data){
    if (typeof self.threads.get(data.parent) === "undefined") {
      self.threads.set(data.parent,[])
    }
    let arr = self.threads.get(data.parent)
    if (arr.find(c => c.id === data.id) !== undefined) return
    arr.unshift(CommentStore.create(data))
    self.threads.set(data.parent, arr)
    if (typeof self.threads.get(data.id) === "undefined") {
      self.threads.set(data.id, [])
    }

  }

  const addUser = function (data){
    self.users.push(data)
  }

  const getUser = function (userId){
    return self.users.find(u => u.id === userId) || null
  }
  const getChildComment = function(parentId){
    return self.threads.get(parentId) || []
  }
  return {addComment,getChildComment,addUser,getUser}
})


export const CommentList = observer(({item}) => {
  let threads = {}
  const [comments,setComments] = useState([]);
  useEffect(() => {
    const client = getClient()
    client.query({
      query : itemComments,
      variables : {itemId : item.item.id,orderBy : {createdAt : "desc"}}
    }).then(function(res){
      setComments(res.data.commentFeed)
    })
  },[])
  threads[item.item.id] = []
  let ItemCommentStore = ThreadsStore.create({
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

        <div className="section-header">
          <div className="section-title">
            <span className="icon mr-2"><i class="fad fa-comments" /></span>
            <span className="text-color-title">{item.item.totalComment} Comments</span>
          </div>
        </div>
        
        <div className="section-body">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* <div className="md:col-span-9 md:pr-10"> */}
            <div className="col-span-12">
              {/* Comment Form */}
              <div className="flex justify-center">
                <CommentForm replyFor={null}  item={item} ItemCommentStore={ItemCommentStore} />
              </div>
              {/* Comment Threads */}
              <CommentThreads key={'commentThreads' + item.item.id} item={item} ItemCommentStore={ItemCommentStore} />
            </div>
            {/* <SubSideBar /> */}
          </div>
        </div>

    </div>
    </>
  )
})