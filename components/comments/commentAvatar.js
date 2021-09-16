import Avatar from "boring-avatars";
export function CommentAvatar({user,size}){
  size = size || 32
  let text = ""
  if (user.walletAddress && user.walletAddress !== ""){
    text = user ?  user.walletAddress.substr(user.walletAddress.length - 3,1) + " " + user.walletAddress.substr(user.walletAddress.length - 2,1)  : 'a n';
  }
  else{
    text = user ?  user.email.substr(user.email.length - 3,1) + " " + user.email.substr(user.email.length - 2,1)  : 'a n';
  }
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