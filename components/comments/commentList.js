import {CommentForm} from "./commentForm";
import {SubSideBar} from "../subSideBar";
import {CommentThreads} from "./commentThreads";
import {types} from "mobx-state-tree";
import getClient from "../../data/client";
import itemComments from "../../data/query/itemComments";
import useSWR from "swr";

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
    if (arr.find(c => c.id === data.id)) return
    arr.push(CommentStore.create(data))
    self.threads.set(data.parent, arr)
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
let ItemCommentStore = ThreadsStore.create({})

const client = getClient();
async function getComments(itemId){
  let _comments = await client.query({
    query : itemComments,
    variables : {itemId : itemId,orderBy : {createdAt : "desc"}}
  })
  return {
    comments : _comments.data.commentFeed
  }
}

export const CommentList = ({item}) => {

  const {data,error} = useSWR([item.id,"commentThread"],getComments,{revalidateOnMount : true})

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const comments = data.comments
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
      <div className="pt-8 border-t border-gray-100 section section-project-discussions">
        <div className="section-header">
          <div className="section-title">Discussions</div>
        </div>
        <div className="section-body">
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-9 md:pr-10">
              {/* Comment Form */}
              <div className="grid grid-cols-1">
                <div className="flex justify-center items-baseline">
                  <CommentForm replyFor={null}  item={item} ItemCommentStore={ItemCommentStore} />
                </div>
              </div>
              {/* Comment Threads */}
              <CommentThreads item={item} ItemCommentStore={ItemCommentStore} />
            </div>
            <SubSideBar />
          </div>
        </div>
      </div>
    </>
  )
}