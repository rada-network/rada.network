import dynamic from "next/dynamic";
const WalletProfile = dynamic(import("@components/Wallet"));
const ProjectShare2Earn = dynamic(import("./Share2Earn"));

export default function ProjectShare2EarnWrapper({shareCampaign,shareSlug,shareType}){
  return  (
    <>
    {/* <div className="flex w-limiter-lg relative xl:px-4">
      <WalletProfile type="hidden" />
    </div> */}
    
    <ProjectShare2Earn shareCampaign={shareCampaign} shareType={shareType} shareSlug={shareSlug} />
    </>
  )
}