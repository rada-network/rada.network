import {RiThumbUpFill} from "react-icons/ri";
import {CommentForm} from "./commentForm";
import {CommentAvatar} from "./commentAvatar";
import getClient from "../../data/client";
import itemComments from "../../data/query/itemComments";
import useSWR from "swr";
import {CommentMain} from "./commentMain";

const client = getClient();

async function getComments(itemId){
  console.log("getComment",itemId);
  let _comments = await client.query({
    query : itemComments,
    variables : {itemId : itemId,orderBy : {createAt : "desc"}}
  })
  return {
    comments : _comments.data.commentFeed
  }
}

export function CommentThreads({item}){
  const {data,error} = useSWR([item.id,"commentThread"],getComments,{revalidateOnMount : true})

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  const comments = data.comments
  return (
      <div className="comments-list grid grid-cols-1">
        <div className="comments-list-item flex flex-col items-stretch">
          {
            comments.map(function (comment) {
              return (
                <div className="comment group flex">
                  <div className="mr-3">
                    <CommentAvatar user={comment.user} />
                  </div>
                  <CommentMain comment={comment} />

                </div>
              )
            })
          }
        </div>
      </div>
  )
}