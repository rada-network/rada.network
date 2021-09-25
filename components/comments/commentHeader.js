import timeDifference from "../../lib/util";
import utils from "../../lib/util";

export function CommentHeader({comment,user, level, parent, ItemCommentStore}){
  const createWalletAddressDisplay = (user) => {
    if (user.walletAddress && user.walletAddress !== "")
      return user.walletAddress.substr(0,4) + "..." + user.walletAddress.substr(user.walletAddress.length - 4,4)

    return user.email.substr(0,3) + "..@.." + user.email.substr(user.email.length - 3,3)
  }
  return (
    <div className="comment-header">
      <div className="flex">
        {/*name of user: show up by wallet address*/}
        <span className="metadata user-wallet--title">
          {createWalletAddressDisplay(user)}
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
            "" : createWalletAddressDisplay(ItemCommentStore.getUser(parent.userId))}</span>
          </span>  
        </div>:
        ""
      }

    </div>
  )
}