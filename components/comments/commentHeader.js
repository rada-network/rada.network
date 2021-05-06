export function CommentHeader({comment,user}){
  const createWalletAddressDisplay = (address) => {
    return address.substr(0,4) + "..." + address.substr(address.length - 4,4)
  }
  function timeDifference(current, previous) {

    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed/1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
      return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }

    else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
      return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
      return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';
    }

    else {
      return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';
    }
  }
  return (
    <div className="comment-header">
      <div className="user-wallet_title flex items-baseline">
        <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">{createWalletAddressDisplay(user.walletAddress)}</span>
        <span className="text-xs ml-4 text-gray-900 text-opacity-50">
          {timeDifference(new Date().getTime(),comment.createdAt)}
        </span>
      </div>
    </div>
  )
}