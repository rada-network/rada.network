import TextareaAutosize from "react-textarea-autosize";
import {CommentAvatar} from "./commentAvatar";
import useUser from "../../lib/useUser";
import createComment from "../../data/query/createComment";
import {useState} from "react";
import getClient from "../../data/client";

const showLoginForm = function() {
  const btn = document.getElementById('connect-wallet-btn')
  if (btn) btn.click()
}

const client = getClient()

export function CommentForm({replyFor,item}) {
  const [commentContent, setCommentContent] = useState('')
  const user = useUser()
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

  const handleSubmit = async (event) => {
    if (!user.address()){
      return showLoginForm();
    }
    if (event.target.className.indexOf("disabled") >= 0) return false;
    if (commentContent == ""){
      return false
    }
    event.target.className = event.target.className + " disabled";
    const comment = {
      itemId: item.id,
      content: commentContent,
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
    event.target.className = event.target.className.replace("disabled","");
    setCommentContent("");
    console.log(data);

  }
  return (
    <>
      <div className="mr-2">
        <CommentAvatar user={currentUser} />
      </div>
      <TextareaAutosize
        className="w-full px-4 py-2 text-base border border-gray-100 rounded-md shadow-sm resize-none bg-gray-50 focus:bg-white focus:shadow focus:border-primary-700 focus:outline-none focus:ring-0"
        row="1"
        title="Write a comment"
        placeholder="What do you think of this project?" value={commentContent}
        onChange={e => {
          setCommentContent(e.currentTarget.value);
        }}/>

      <div className="text-sm text-gray-900 text-opacity-50 pl-2 md:mt-0">
        <btn onClick={handleSubmit} className="w-full justify-center flex-1 px-3 py-3 text-gray-500 transition-all rounded-md btn item-center btn-project-vote bg-gray-100 hover:bg-primary-100 hover:text-primary-700">
          {btnText}
        </btn>
      </div>
    </>
  )
}