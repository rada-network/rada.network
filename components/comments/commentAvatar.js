import Avatar from "boring-avatars";
export function CommentAvatar({user,size}){
  size = size || 40
  const text = user ?  user.walletAddress.substr(user.walletAddress.length - 3,1) + " " + user.walletAddress.substr(user.walletAddress.length - 2,1)  : 'a n';
  return (
      <>
        <Avatar
          size={size}
          name={text}
          variant="bauhaus"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      </>
  )
}