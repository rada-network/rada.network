import timeDifference from "../../lib/util";

export function CommentHeader({comment,user, level, parent, ItemCommentStore}){
  const createWalletAddressDisplay = (address) => {
    return address.substr(0,4) + "..." + address.substr(address.length - 4,4)
  }
  return (
    <div className="comment-header">
      <div className="user-wallet_title flex items-baseline">
        {/*name of user: show up by wallet address*/}
        <span
          className="text-sm font-semibold whitespace-nowrap line-clamp-1">{createWalletAddressDisplay(user.walletAddress)}</span>
        {
          level > 1 ?
            <span className="text-xs ml-4 text-gray-900 text-opacity-50">
          {/*    reply to <span className="font-bold">{text.toUpperCase()}</span>*/}
              {/*reply to <span className="font-bold">{createWalletAddressDisplay(user.walletAddress)}</span>*/}
              reply to <span className="font-bold">{parent === null ?
              "" : createWalletAddressDisplay(ItemCommentStore.getUser(parent.userId).walletAddress)}</span>
        </span> :
            ""
        }
        <span className="text-xs ml-4 text-gray-900 text-opacity-50">
          {timeDifference(new Date().getTime(), comment.createdAt)}
        </span>
      </div>
    </div>
  )
}