import {RiArrowUpSFill} from "react-icons/ri"
import getClient from "../../data/client"
import tgVote from "../../data/query/tgVote"
import {useState} from "react"
import { observer, inject } from "mobx-react"
import { useStore } from "../../lib/useStore"


export const Vote = observer(({itemId, votes, page}) => {
  const store = useStore()
  const walletAddress = store.wallet.address
  const client = getClient();
  const totalVote = store.projects.item(itemId).totalVote || votes

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
  }

  if (page === "detail" ) return (
    <button className="btn-project-vote flex-1 ml-4 text-white btn item-center bg-primary-700 hover:bg-primary-600"
          onClick={toggleVote}>
      <span className="-mb-1 -ml-1 text-2xl icon"><RiArrowUpSFill /></span>
      <span className="ml-1 uppercase btn-project-vote_total whitespace-nowrap">
        <span className="inline-block text-sm font-medium">Upvote</span>
        <strong className="inline-block ml-2 text-base font-bold">{`${totalVote}`}</strong>
      </span>
    </button>)
   return (
    <button className="btn btn-project-vote bg-gray-50"
        onClick={toggleVote}>
      <span className="text-xl transition-none icon"><RiArrowUpSFill /></span>
      <span className="ml-1 text-xs font-bold btn-project-vote_total whitespace-nowrap">
        {`${totalVote}`}
      </span>
    </button>
   )
  })