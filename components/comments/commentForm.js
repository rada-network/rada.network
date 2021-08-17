import TextareaAutosize from "react-textarea-autosize";
import {CommentAvatar} from "./commentAvatar";
import useUser from "../../lib/useUser";
import createComment from "../../data/query/createComment";
import {useState} from "react";
import getClient from "../../data/client";
import {UserStore} from "./commentList";
import { useStore } from "../../lib/useStore";
import {observer} from "mobx-react";
import useSWR, {mutate} from "swr";

const client = getClient()

export const CommentForm = observer(({replyFor,item,ItemCommentStore}) => {
  const [commentContent, setCommentContent] = useState('')
  const user = useUser()
  const store = useStore()
  const walletAddress = store.wallet.address

  let currentUser;
  if (!user?.address()) {
    currentUser = null
  } else {
    currentUser = {walletAddress: user.address()}
  }
  let btnText = "Submit"
  if (replyFor !== null) {
    btnText = "Reply"
  }
  const handleKeydown = async (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === 13 && !event.shiftKey) {
      // Don't generate a new line
      event.preventDefault();

      // Do something else such as send the message to back-end
      // ...
      await submitComment(event)
    }
  }

  const submitComment = async (event) => {
    if (!walletAddress){
      return store.wallet.showConnect(true)
    }
    if (commentContent === ""){
      return false
    }
    let _commentContent = commentContent
    setCommentContent("")
    const comment = {
      itemId: item.item.id,
      content: _commentContent,
      parentId: replyFor,
      walletAddress: user.address()
    }
    let {loading,errors,data} = await client.mutate({
      mutation : createComment,
      variables : comment
    })
    if (errors){
      setCommentContent("");
      return false;
    }
    if (loading) return <p>Loading...</p  >;
    let createdComment = data.createComment;
    let curUser = UserStore.create(createdComment.user)
    ItemCommentStore.addUser(curUser)
    let createdAt = new Date(createdComment.createdAt)
    ItemCommentStore.addComment({
      id : createdComment.id,
      createdAt: createdAt.getTime(),
      content : createdComment.content,
      parent : createdComment.parent,
      itemId : createdComment.itemId,
      userId : createdComment.user.id
    })


  }
  return (
    <>
      {
        currentUser == null
        ? <>
            <TextareaAutosize onClick={(e) => {store.wallet.showConnect(true);}}
              className="comment-textarea"
              row="1"
              title="Write a comment"
              placeholder="Connect wallet to discuss"
            />
            <div className="pl-2 md:mt-0">
              <button onClick={submitComment}
                      className="text-sm w-full justify-center flex-1 px-3 py-3 text-gray-500 transition-all rounded btn item-center bg-gray-100 hover:bg-primary-100 hover:text-primary-700 border border-transparent hover:border-primary-500 leading-4"
                      >
                {btnText}
              </button>
            </div>
          </>
          : <>
            <div className="mr-2 md:mr-3">
              <CommentAvatar user={currentUser} size={replyFor === null ? 40 : 32} />
            </div>
            <TextareaAutosize
              className="comment-textarea"
              row="1"
              title="Write a comment"
              placeholder="Write your comment..." value={commentContent}
              onChange={e => {
                setCommentContent(e.currentTarget.value);
              }}
              onKeyDown={handleKeydown}
            />

            <div className="pl-2 md:mt-0">
              <button onClick={submitComment} className="text-sm w-full justify-center flex-1 px-3 py-3 text-gray-500 transition-all rounded btn item-center bg-gray-100 hover:bg-primary-100 hover:text-primary-700 border border-transparent  hover:border-primary-500 leading-4">
                {btnText}
              </button>
            </div>
          </>
      }
    </>
  )
})