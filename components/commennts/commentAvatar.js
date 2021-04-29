export function CommentAvatar({user}){
  const text = user ?  user.walletAddress.substr(0,2) : 'ano';
  return (
    <div className="user-wallet_avatar user-wallet_avatar_green">
      <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">{`${text}`}</span>
    </div>
  )
}