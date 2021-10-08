import {RiArrowUpSFill} from "react-icons/ri"
import {toggleUserVote} from "../../data/query/tgVote"
import React, {useState} from "react"
import { observer } from "mobx-react"
import { useStore } from "../../lib/useStore"
import { useEffect } from "react"


export const Vote = observer(({itemId, page,voteStore}) => {
  const store = useStore()
  const access_token = store.user.access_token
  let totalVote = 0
  let isVote = false
  let vote = voteStore.votes.filter(el =>{
    return el.id === itemId
  })
  if (vote.length > 0){
    totalVote = vote[0].totalVote
    isVote = vote[0].isVoted
  }
  useEffect(() => {
    if (isVote){
      window.Gleam = window.Gleam || [];
      window.Gleam.push(['vote', true]);
    }
  },[isVote])
  const [rqToggleVote,setRqToggleVote] = useState(false)
  const toggleVote = async (e) => {
    if (!access_token) {
      return store.user.showConnect(true)
    }
    if (rqToggleVote){
      return false;
    }
    if (isVote){
      return false;
    }
    setRqToggleVote(true)
    const res = await toggleUserVote(itemId)
    if (res && res.data.toggleUserVote !== null) {
      window.Gleam = window.Gleam || [];
      window.Gleam.push(['vote', res.data.toggleUserVote.isVoted]);
      voteStore.updateVote({
        id : itemId,
        isVoted : res.data.toggleUserVote.isVoted,
        totalVote : res.data.toggleUserVote.totalVote
      })
    }
    setRqToggleVote(false)
  }

  if (page === "detail" ) return (
    <button className={`btn btn-post-vote
    ${!isVote ? "" : "active"}`}
          onClick={toggleVote}>
      <span className="icon mr-1.5 text-lg leading-none relative -bottom-0.5">
        <i class="fa-solid fa-caret-up"></i>
      </span>
      <span className="btn-post-vote_total ml-1 whitespace-nowrap">
        <span className="inline-block font-medium">{isVote? "Upvoted" : "Upvote"}</span>
        <strong className="inline-block ml-2 font-bold">{`${totalVote}`}</strong>
      </span>
      </button>
    )
  if (page === "postDetail" ) return (
    <button className={`btn btn-post-vote
    ${!isVote ? "" : "active"}`}
            onClick={toggleVote}>
                          <span className="icon mr-1.5 text-lg leading-none relative -bottom-0.5">
                            <i class="fa-solid fa-caret-up"></i>
                          </span>
                          <span className="btn-post-vote_total ml-1 whitespace-nowrap">
                            <span className="inline-block">{isVote? "Upvoted" : "Upvote"}</span>
                            <strong className="inline-block ml-2 font-bold">
                              {totalVote}
                            </strong>
                          </span>
    </button>
  )
   return (
    <button title={isVote? "Upvoted" : "Upvote"} className={`btn btn-post-vote_sm flex flex-col  
    ${!isVote ? "" : "active"}`}
        onClick={toggleVote}>
      <span className="icon mr-1.5 text-lg leading-none relative -bottom-0.5">
        <i class="fa-solid fa-caret-up"></i>
      </span>
      <span className="btn-post-vote_total whitespace-nowrap">
        <strong className="inline-block text-sm">{`${totalVote}`}</strong>
      </span>
    </button>
   )
  })