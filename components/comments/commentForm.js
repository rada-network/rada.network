import TextareaAutosize from "react-textarea-autosize";
import {CommentAvatar} from "./commentAvatar";
import useUser from "../../lib/useUser";
import createComment from "../../data/query/createComment";
import {useState} from "react";
import getClient from "../../data/client";
import { useStore } from "../../lib/useStore";
import {observer} from "mobx-react";
import {UserStore} from "../../lib/store";
import {useTranslation} from "next-i18next";
import _ from "lodash";

export const CommentForm = observer(({replyFor,item,ItemCommentStore,dataStore,detailStore}) => {
  const {t} = useTranslation("common")
  const [commentContent, setCommentContent] = useState('')
  const store = useStore()
  const access_token = store.user.access_token

  let currentUser;
  if (store.user.id === "") {
    currentUser = null
  } else {
    currentUser = store.user
  }
  let btnText = t("submit")
  if (replyFor !== null) {
    btnText = t("reply")
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
    if (!access_token){
      return store.user.showConnect(true)
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
    }

    const client = getClient()
    let {loading,errors,data} = await client.mutate({
      mutation : createComment,
      variables : comment
    })
    if (errors){
      setCommentContent("");
      return false;
    }
    if (loading) return <p>Loading...</p  >;
    let createdComment = data.createUserComment;
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
    window.Gleam = window.Gleam || [];
    window.Gleam.push(['comment', createdComment.content]);
    dataStore.tweets.forEach((el,index) => {
      if (el.id === item.item.id){
        dataStore.tweets[index].totalComment+=1
      }
    })
    if (!_.isEmpty(detailStore.data)){
      detailStore.data.item.totalComment+=1
    }
  }
  return (
    <>
      {
        currentUser == null
        ? <>
            <TextareaAutosize onClick={(e) => {store.user.showConnect(true);}}
              className="comment-textarea"
              row="1"
              title={t('comment input holder')}
              placeholder={t('comment login')}
              readonly="readonly"
            />
            <button onClick={submitComment} className="btn comment-btn ml-2">
              {btnText}
            </button>
          </>
          : <>
            <div className="avatar-sm">
              <CommentAvatar user={currentUser} size={replyFor === null ? 32 : 32} />
            </div>
            <TextareaAutosize
              className="comment-textarea"
              row="1"
              title={t('comment input holder')}
              placeholder={t('comment input holder')} value={commentContent}
              onChange={e => {
                setCommentContent(e.currentTarget.value);
              }}
              onKeyDown={handleKeydown}
            />
            <button onClick={submitComment} className="btn comment-btn ml-2">
              {btnText}
            </button>
          </>
      }
    </>
  )
},)