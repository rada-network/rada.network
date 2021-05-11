import timeDifference from "../../lib/util";

export function CommentHeader({comment,user}){
  const createWalletAddressDisplay = (address) => {
    return address.substr(0,4) + "..." + address.substr(address.length - 4,4)
  }
  return (
    <div className="comment-header">
      <div className="user-wallet_title flex items-baseline">
        {/*name of user: show up by wallet address*/}
        <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">{createWalletAddressDisplay(user.walletAddress)}</span>
        <span className="text-xs ml-4 text-gray-900 text-opacity-50">
          {/*date time*/}
          {timeDifference(new Date().getTime(),comment.createdAt)}
        </span>
      </div>
    </div>
  )
}