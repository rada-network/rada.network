import Avatar from 'react-avatar';

export function CommentAvatar({user}){
  const text = user ?  user.walletAddress.substr(user.walletAddress.length - 3,1) + " " + user.walletAddress.substr(user.walletAddress.length - 2,1)  : 'a n';
  return (
    <div className="user-wallet_avatar user-wallet_avatar_green">
      <Avatar name={`${text}`} maxInitials={2} textSizeRatio={6} />
      {/*<span className="text-sm font-semibold whitespace-nowrap line-clamp-1">{`${text}`}</span>*/}
    </div>
  )
}