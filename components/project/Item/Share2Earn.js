import React from "react";
import { useEffect, useState, useCallback } from 'react';
import { ethers } from 'ethers'
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import _ from "lodash"
import { useCookies } from "react-cookie";
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { useCallFunction } from "@utils/hooks/useCallFunction"
import { useShare2EarnContract, useReferralAdminContract } from "@utils/hooks/useContracts"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useStore } from "@lib/useStore"
import Share2EarnMainScreen from "../Item/share2earn/Share2EarnMainScreen"
import { useERC20 } from "@utils/hooks/useContracts";
import useChainConfig from "@utils/web3/useChainConfig";
import Share2EarnRequire from "./Share2EarnRequire";
import useSWR from "swr";
import fetchJson from "@lib/fetchJson";
import { data } from "autoprefixer";

const MIN_TOTTAL_TX = 5

export default function ProjectShare2Earn({
  shareCampaign,shareType,shareSlug
}) {
  const { getRIRAddress } = useChainConfig()
  const riraddress = getRIRAddress()
  const { t } = useTranslation('share2earn')
  const context = useActiveWeb3React()
  const { library, account } = context

  // Handle join program
  const [cookies] = useCookies(["ref"]);
  const referralCode = cookies.ref ?? '';
  const store = useStore()
  const user = store.user
  const uid = user?.id?.split("-")[user?.id?.split("-").length - 1]
  // TODO: Save in config file
  const share2earnAddress = shareCampaign.share2earn_contract
  const referralAdminAddress = shareCampaign.referral_admin_contract
  const shareAddress = useERC20(share2earnAddress);
  const share2earnContract = useShare2EarnContract(share2earnAddress)
  const referralAdminContract = useReferralAdminContract(referralAdminAddress)
  const { callWithGasPrice } = useCallWithGasPrice()
  const { callFunction } = useCallFunction()
  const [confirm, setConfirm] = useState(false)
  const [avtURL, setAvtURL] = useState("")
  const [transactionCount, setTransactionCount] = useState(0);

  const { isConfirmed, isConfirming, handleConfirm } =
    useApproveConfirmTransaction({
      onConfirm: () => {
        return callWithGasPrice(share2earnContract, 'joinProgram', [shareCampaign.program_id.toString(), uid, referralCode])
      },
      onSuccess: async ({ receipt }) => {
        toast.success(`Subscribed successfully ${receipt.transactionHash}`)
      },
    })

  const handleJoinProgram = async (e) => {
    if (!share2EarnInfo.paused) {
      e.preventDefault()
      e.stopPropagation()
      handleConfirm();
    }
  };
  const [joined, setJoined] = useState('')
  const [loading, setLoading] = useState(true)
  const [share2EarnInfo, setShare2EarnInfo] = useState(null)

  React.useEffect(() => {
    if (account && user) {
      checkJoined()
    }
  }, [account, user]);
  useEffect(() => {
    if (!!account){
      fetchJson("/api/transaction-count?wallet=" + account).then(function(res){
        if (res) {
          if (res.length > 2) {
            setTransactionCount(res[2])   
          }
        }
      })
    }
  },[account])
  React.useEffect(() => {
    const getInfoProgram = async () => {
      try {
        const p = await callFunction(share2earnContract, 'programs', [shareCampaign.program_id])
        const pAdmin = await callFunction(referralAdminContract, 'programs', [shareCampaign.program_id])
        setShare2EarnInfo({ ...p, incentiveL0: pAdmin.incentiveLevel1, incentiveL1: pAdmin.incentiveLevel2, incentiveL2: pAdmin.incentiveLevel3,maxPerReferral : pAdmin.maxPerReferral });
        if (account) {
          checkJoined();
        }
      } catch (e) {
        console.log(e)
      }
    }

    if (!!library && !!share2earnContract && !!shareCampaign.program_id) {
      setLoading(true)
      getInfoProgram().then(function () {
        setLoading(false);
      })
    }
  }, [share2earnContract, library, account]);
  const checkJoined = async () => {

    try {
      if (typeof window.ethereum !== undefined) {
        const addressJoined = await callFunction(share2earnContract, 'uidJoined', [shareCampaign.program_id.toString(), uid])
        if (addressJoined == '0x0000000000000000000000000000000000000000') {
          setJoined('');
        }
        else {
          setJoined(addressJoined);
          return addressJoined;
        }
      }
      return '';
    } catch (e) {
      return '';
    }
  };

  const getMessage = () => {
    if (isConfirming) {
      return t("transcation confirm message");
    }
    else if (isConfirmed) {
      return t("joined message");
    } else if (joined) {
      return t("wrong connect address", { address: joined })
    }

    return '';
  }
  const allowJoin = getMessage() == '' && joined == ''

  if (loading) return null;

  if ((joined == account || isConfirmed)  && !!account && !!share2EarnInfo && store.user.id !== "" && store.kyc.status) {
    return <Share2EarnMainScreen shareCampaign={shareCampaign} user={user} share2earnAddress={share2earnAddress} shareSlug={shareSlug} shareType={shareType} referralAdminAddress={referralAdminAddress} share2earnInfo={share2EarnInfo} />;
  }
  return (
    <>
      <div className="section mx-auto">
        
        <div className="section-header !flex-col">
          <h1 className="mb-2">
            <span className="text-xl lg:text-2xl font-semibold text-color-title">
              Join {shareCampaign.title}✨
            </span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("welcome des")}</p>
        </div>

        <div className="section-body">

          <div className="box box--primary box-share2earn relative mb-4">
            <div className="box-body">
              <div className="mb-2 md:mb-4">
                <img className="h-10" src="/placeholders/lv-logo.png" alt="Share2earn" />
              </div>
              <h2 className="flex flex-col font-altsans">
                <strong className="text-3xl md:text-4xl font-semibold flex items-center tracking-normal md:tracking-wider">
                  <span>Share2Earn</span>
                  {/* <span className="text-2xl md:text-3xl flex items-center justify-center bg-white w-9 h-9 rounded-full text-primary-500 mx-1 md:mx-2 font-bold">2</span> */}
                 
                </strong>
                <span className="mt-1 text-base md:text-lg font-medium tracking-wide">by RADA Network</span>
              </h2>
              <div className=" w-28 h-28 md:w-44 md:h-44 absolute right-2 bottom-0 md:right-12 lg:right-6">
                <img className="" src="/placeholders/s2e-rocket.png" alt="Share2earn" />
              </div> 
              {/* <div className=" w-28 h-28 md:w-44 md:h-44 absolute right-2 bottom-1 md:-bottom-1 md:right-12 lg:right-6">
                <img className="" src={shareCampaign.logo} alt="The Parallel" />
              </div> */}
            </div>
          </div>

          {/* <p className="text-sm mb-8 text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t("welcome description", { provider: `<span class="text-primary-700 dark:text-primary-400">RIR token</span>` }) }} /> */}

          <ul className="text-sm space-y-4">
            <li className="flex p-4 rounded-lg border border-gray-300 dark:border-gray-700">
              <span className="icon shape--hexagon mr-4 !flex w-px-40 h-px-40 items-center justify-center flex-shrink-0 ">
                <i className="fa-light fa-hexagon"></i>
                <i className="fa-duotone fa-user-plus"></i>
              </span>
              <div className="flex flex-col">
                <div>
                  {share2EarnInfo && share2EarnInfo.incentiveL0 > 0 && <strong className="text-base text-color-title  flex items-center">Tier 1 <span className="ml-2 inline-block py-1 px-2 text-xs rounded-md bg-green-700 text-white">+{ethers.utils.formatEther(share2EarnInfo.incentiveL0)} RIR</span> </strong>}
                </div>
                {share2EarnInfo && share2EarnInfo.incentiveL0 > 0 && <p className="opacity-80 mt-2"> {t("welcome tier1 des", { rir: ethers.utils.formatEther(share2EarnInfo.incentiveL0) })} </p>}

                {/* {share2EarnInfo && share2EarnInfo.incentiveL0 > 0 &&
                  <span className="text-gray-500 dark:text-gray-400"
                    dangerouslySetInnerHTML={{
                      __html: t("welcome incentive description", {
                        rir: `<span class="text-primary-700 dark:text-primary-400"> ${ethers.utils.formatEther(share2EarnInfo.incentiveL0)} RIR</span>`
                      })
                    }} />
                } */}
              </div>
            </li>

            <li className="flex p-4 rounded-lg border border-gray-300 dark:border-gray-700">
              <span className="icon shape--hexagon mr-4 !flex w-px-40 h-px-40 items-center justify-center flex-shrink-0">
                <i className="fa-light fa-hexagon"></i>
                <i className="fa-duotone fa-users"></i>
              </span>
              <div className="flex flex-col">
                <div>
                  <strong className="text-base flex items-center text-color-title">
                    Tier 2
                    {share2EarnInfo && share2EarnInfo.incentiveL1 > 0 && <span className="ml-2 inline-block py-1 px-2 text-xs rounded-md bg-green-700 text-white">+{ethers.utils.formatEther(share2EarnInfo.incentiveL1)} RIR</span>}
                    {/* {t("welcome lv2 title")} */}
                  </strong>
                </div>
                {share2EarnInfo && share2EarnInfo.incentiveL1 > 0 && <p className="opacity-80 mt-2">{t("welcome tier2 des", { rir: ethers.utils.formatEther(share2EarnInfo.incentiveL1) })}</p>}
              </div>
            </li>
          </ul>
          <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-400 bg-opacity-5 text-sm overflow-hidden">
            <div className="px-4 py-2 bg-yellow-400 bg-opacity-10 dark:bg-opacity-100 dark:bg-gray-800 flex items-center">
              <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
              <span className="font-semibold">{t("notice")}</span>
            </div>
            <ul className="p-4">
              <li className="mb-2">{t("notice line 1")}</li>
              {/* <li className="mb-2">{t("notice line 2")}</li> */}
              <li>{t("notice line 3")}</li>
            </ul>
          </div>
          <Share2EarnRequire shareCampaign={shareCampaign} />
          <form className="mt-4">

            {allowJoin && store.kyc.status && store.user.id !== "" && 
            <fieldset className="space-y-4 mb-4 text-gray-500 dark:text-gray-400">
              <legend className="sr-only">Term of Uses</legend>
              <div className="relative flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" aria-describedby="terms-description" name="terms" type="checkbox" className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" onChange={e => setConfirm(e.target.checked)} />
                </div>
                <div className="ml-3 text-sm">
                  <label className="" for="terms">
                    {t("welcome confirm")}.
                    {/* <a href="#" target="_blank" className="link ml-2">{t("Learn more")}</a>. */}
                  </label>
                </div>
              </div>
            </fieldset>}

            {!!account && transactionCount < MIN_TOTTAL_TX && 
            <div className={"mt-5 text-center w-full justify-center py-3 px-4 "} style={{ wordBreak: "break-word" }}>
              {t("The total amount of transactions in your wallet must be higher than or equal to " + MIN_TOTTAL_TX)}
            </div> 
            }
            {
              allowJoin && 
              <button className={"mt-4 btn btn-yellow w-full justify-center py-3 px-4 " + (!store.kyc.status || store.user.id == "" || !account || !confirm || transactionCount < MIN_TOTTAL_TX ? "disabled" : "" )} type="button" onClick={(e) => { handleJoinProgram(e) }}>
                {share2EarnInfo.paused ? "The campaign has ended" : t("join program")}
              </button>               
            }
            {!allowJoin && !account && 
              <button className={"mt-4 btn btn-yellow w-full justify-center py-3 px-4 " + (!store.kyc.status || store.user.id == "" || !account || !isConfirmed ? "disabled" : "" )} type="button" onClick={(e) => { handleJoinProgram(e) }}>
                {t("view incentive")}
              </button>
            }
            {!allowJoin && !!account && 
              <div className={"mt-5 text-center w-full justify-center py-3 px-4 "} style={{ wordBreak: "break-word" }}>
                {getMessage()}
              </div>              
            }
               
          </form>
          <div className="flex mt-5 text-center w-full justify-center">
            <a className="flex btn btn-default !p-3 bg-gray-700 !text-base w-1/2 block rounded-lg mr-1"
              target="_blank" href={t("learn more url")}>
              {t("learn more")} 
            </a>
            <a className="flext btn btn-default !p-3 bg-gray-700 !text-base w-1/2 block rounded-lg "target="_blank" href={shareCampaign.participation_guide}> 
              {t("Participation Guide")} 
            </a>
          </div>
          
        </div>

      </div>

    </>
  )
}


