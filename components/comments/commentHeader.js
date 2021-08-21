import timeDifference from "../../lib/util";
import utils from "../../lib/util";

export function CommentHeader({comment,user, level, parent, ItemCommentStore}){
  const createWalletAddressDisplay = (address) => {
    return address.substr(0,4) + "..." + address.substr(address.length - 4,4)
  }
  return (
    <div className="comment-header">
      <div className="flex">
        {/*name of user: show up by wallet address*/}
        <span className="metadata user-wallet--title">
          {createWalletAddressDisplay(user.walletAddress)}
        </span>
        <span className="metadata metadata-date text-xs text-color-desc">
          <span className="metadate-value">
            {utils.timeDifference(new Date().getTime(), comment.createdAt)}
          </span>
        </span>
      </div>

      {
        level > 1 ?
        <div className="flex items-baseline">
          <span className="text-xs text-gray-400 leading-6">
            {/* reply to <span className="font-bold">{text.toUpperCase()}</span>*/}
            {/*reply to <span className="font-bold">{createWalletAddressDisplay(user.walletAddress)}</span>*/}
            reply to <span className="font-bold">{parent === null ?
            "" : createWalletAddressDisplay(ItemCommentStore.getUser(parent.userId).walletAddress)}</span>
          </span>  
        </div>:
        ""
      }

    </div>
  )
}