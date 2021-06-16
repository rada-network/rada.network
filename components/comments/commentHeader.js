import timeDifference from "../../lib/util";
import utils from "../../lib/util";

export function CommentHeader({comment,user, level, parent, ItemCommentStore}){
  const createWalletAddressDisplay = (address) => {
    return address.substr(0,4) + "..." + address.substr(address.length - 4,4)
  }
  return (
    <div className="comment-header">
      <div className="user-wallet_title flex items-baseline">
        {/*name of user: show up by wallet address*/}
        <span className="text-sm font-semibold whitespace-nowrap leading-4">
          {createWalletAddressDisplay(user.walletAddress)}
        </span>
        <span className="text-xs ml-2 text-gray-400">
          <span className="mr-2"> ·</span>
          {utils.timeDifference(new Date().getTime(), comment.createdAt)}
        </span>
      </div>
      <div className="flex items-baseline">
        {
          level > 1 ?
            <span className="text-xs text-gray-400 leading-6">
          {/*    reply to <span className="font-bold">{text.toUpperCase()}</span>*/}
              {/*reply to <span className="font-bold">{createWalletAddressDisplay(user.walletAddress)}</span>*/}
              reply to <span className="font-bold">{parent === null ?
              "" : createWalletAddressDisplay(ItemCommentStore.getUser(parent.userId).walletAddress)}</span>
        </span> :
            ""
        }
      </div>
    </div>
  )
}