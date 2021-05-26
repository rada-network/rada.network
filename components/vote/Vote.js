import {RiArrowUpSFill} from "react-icons/ri"
import getClient from "../../data/client"
import tgVote from "../../data/query/tgVote"
import {useState} from "react"
import { observer, inject } from "mobx-react"
import { useStore } from "../../lib/useStore"
import isVote from "../../data/query/isVoted";
import useSWR from "swr";

const getData = async (itemId, walletAddress) => {
  const client = getClient()
  const isVote_ = await client.query({
    query: isVote,
    variables: {walletAddress: walletAddress, itemId: itemId}
  })
  return isVote_.data.isVote
}

export const Vote = observer(({itemId, votes, page}) => {
  const store = useStore()
  const walletAddress = store.wallet.address
  const client = getClient();
  const totalVote = store.projects.item(itemId).totalVote || votes

  const {data, error} = useSWR([itemId, walletAddress], getData)
  //const [totalVote, setTotalVote] = useState(votes)
  const toggleVote = async () => {
    if (!walletAddress) {
      return store.wallet.showConnect(true)
    }

    const res = await client.mutate({
      mutation : tgVote,
      variables : {itemId: itemId, walletAddress}
    });
    // setTotalVote(res.data.toggleVote.totalVote)
    store.projects.update([{id: itemId, totalVote: res.data.toggleVote.totalVote}])

    const vote = await client.query({
      query: isVote,
      variables: {walletAddress: walletAddress, itemId: itemId}
    })
    const vote_ = vote.data.isVote
    console.log("isVoted", vote_ !== null)
  }

  if (page === "detail" ) return (
    <button className={`btn-project-vote flex-1 ml-4 text-black btn item-center hover:bg-primary-600 
    ${data == null ? "" : "bg-primary-700 text-white"}`}
          onClick={toggleVote}>
      <span className="-mb-1 -ml-1 text-2xl icon"><RiArrowUpSFill /></span>
      <span className="ml-1 uppercase btn-project-vote_total whitespace-nowrap">
        <span className="inline-block text-sm font-medium">Upvote</span>
        <strong className="inline-block ml-2 text-base font-bold">{`${totalVote}`}</strong>
      </span>
      </button>
    )
   return (
    <button className={`btn btn-project-vote bg-gray-50 hover:bg-primary-300 
    ${data == null ? "" : "bg-primary-700 text-white"}`}
        onClick={toggleVote}>
      <span className="text-xl transition-none icon"><RiArrowUpSFill /></span>
      <span className="ml-1 text-xs font-bold btn-project-vote_total whitespace-nowrap">
        {`${totalVote}`}
      </span>
    </button>
   )
  })