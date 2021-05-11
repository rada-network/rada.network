import Avatar from 'react-avatar';

export function CommentAvatar({user}){
  const text = user ?  user.walletAddress.substr(user.walletAddress.length - 3,1) + " " + user.walletAddress.substr(user.walletAddress.length - 2,1)  : 'a n';
  return (
      <>
        <Avatar name={`${text}`} maxInitials={2} textSizeRatio={6} />
      </>
  )
}