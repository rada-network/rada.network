import {RiArrowUpSFill} from "react-icons/ri";

export const Vote = ({totalVote, toggleVote}) => {
  return (
    <btn className="justify-center flex-1 px-2 py-2 ml-4 text-white transition-all rounded-md md:px-3 md:py-3 btn item-center btn-project-vote bg-primary-700 hover:bg-primary-600">
      <span className="-mb-1 -ml-1 text-2xl icon"><RiArrowUpSFill /></span>
      <span className="ml-1 uppercase btn-project-vote_total whitespace-nowrap">
                    <span className="inline-block text-sm font-medium" onClick={toggleVote}>Upvote</span>
                    <strong className="inline-block ml-2 text-base font-bold">{`${totalVote}`}</strong>
                  </span>
    </btn>
  )
}