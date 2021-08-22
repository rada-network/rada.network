import Avatar from "boring-avatars";
export function CommentAvatar({user,size}){
  size = size || 32
  const text = user ?  user.walletAddress.substr(user.walletAddress.length - 3,1) + " " + user.walletAddress.substr(user.walletAddress.length - 2,1)  : 'a n';
  return (
      <>
        <Avatar
          size={size}
          name={text}
          variant="beam"
          colors={["#8B5CF6", "#34D399", "#FEF3C7", "#FBBF24", "#EF4444"]}
        />
      </>
  )
}