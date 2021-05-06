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
  const totalVote = store.projects.item(itemId).totalVote

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

  if (page === "detail" ){
    return (
      <btn className="justify-center flex-1 px-2 py-2 ml-4 text-white transition-all rounded-md md:px-3 md:py-3 btn item-center btn-project-vote bg-primary-700 hover:bg-primary-600"
           onClick={toggleVote}>
        <span className="-mb-1 -ml-1 text-2xl icon"><RiArrowUpSFill /></span>
        <span className="ml-1 uppercase btn-project-vote_total whitespace-nowrap">
                    <span className="inline-block text-sm font-medium">Upvote</span>
                    <strong className="inline-block ml-2 text-base font-bold">{`${totalVote}`}</strong>
                  </span>
      </btn>
    )
  }else{
   return (
     <btn className="flex-col justify-center transition-all rounded-md btn w-px-64 h-px-64 btn-project-vote bg-gray-50 group-hover:bg-primary-700 group-hover:text-white bg-gradient-to-tr from-gray-50 to-gray-50 group-hover:from-primary-700 group-hover:to-primary-600"
          onClick={toggleVote}>
          <span className="text-xl transition-none icon"><RiArrowUpSFill /></span>
       <span className="text-xs font-bold btn-project-vote_total whitespace-nowrap">
         {`${totalVote}`}
          </span>
     </btn>
   )
  }
})