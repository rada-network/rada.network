export function CommentAvatar({user}){
  const text = user ?  user.walletAddress.substr(user.walletAddress.length - 3,2) : 'an';
  return (
    <div className="user-wallet_avatar user-wallet_avatar_green">
      <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">{`${text}`}</span>
    </div>
  )
}