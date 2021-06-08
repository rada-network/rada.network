import {RiArrowUpSFill} from "react-icons/ri"
import getClient from "../../data/client"
import tgVote from "../../data/query/tgVote"
import {useState} from "react"
import { observer, inject } from "mobx-react"
import { useStore } from "../../lib/useStore"
import isVote from "../../data/query/isVoted";


export const Vote = observer(({itemId, page,voteStore}) => {
  const store = useStore()
  const walletAddress = store.wallet.address
  const client = getClient();
  let totalVote = 0
  let isVote = false
  let vote = voteStore.votes.filter(el =>{
    return el.id === itemId
  })
  if (vote.length > 0){
    totalVote = vote[0].totalVote
    isVote = vote[0].isVoted
  }
  const [rqToggleVote,setRqToggleVote] = useState(false)
  const toggleVote = async (e) => {
    if (!walletAddress) {
      return store.wallet.showConnect(true)
    }
    if (rqToggleVote){
      return false;
    }
    setRqToggleVote(true)
    const res = await client.mutate({
      mutation : tgVote,
      variables : {itemId: itemId, walletAddress}
    });
    voteStore.updateVote({
      id : itemId,
      isVoted : res.data.toggleVote.isVoted,
      totalVote : res.data.toggleVote.totalVote
    })
    setRqToggleVote(false)
  }

  if (page === "detail" ) return (
    <button className={`btn btn-project-vote
    ${!isVote ? "" : "active"}`}
          onClick={toggleVote}>
      <span className="-mb-0.5 -ml-1 text-2xl icon"><RiArrowUpSFill /></span>
      <span className="ml-1 btn-project-vote_total whitespace-nowrap">
        <span className="inline-block font-medium">{isVote? "Upvoted" : "Upvote"}</span>
        <strong className="inline-block ml-2 font-bold">{`${totalVote}`}</strong>
      </span>
      </button>
    )
   return (
    <button title={isVote? "Upvoted" : "Upvote"} className={`btn btn-project-vote 
    ${!isVote ? "" : "active"}`}
        onClick={toggleVote}>
      <span className="text-xl -mb-0.5 transition-none icon"><RiArrowUpSFill /></span>
      <span className="ml-1 btn-project-vote_total whitespace-nowrap">
        <strong className="inline-block text-xs">{`${totalVote}`}</strong>
      </span>
    </button>
   )
  })