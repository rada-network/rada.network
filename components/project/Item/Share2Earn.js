import React from "react";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import _ from "lodash"
import { useCookies } from "react-cookie";

import { Head } from "@components/Head";
import ReactTooltip from "react-tooltip";
import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"
import { useCallFunction } from "@utils/hooks/useCallFunction"
import { useShare2EarnContract, useReferralAdminContract } from "@utils/hooks/useContracts"
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React"
import { useStore } from "@lib/useStore"
import Share2EarnMainScreen from "../Item/share2earn/Share2EarnMainScreen"
import { useERC20 } from "@utils/hooks/useContracts";
import useChainConfig from "@utils/web3/useChainConfig";

export default function ProjectShare2Earn({
  project,
}) {
  const {getRIRAddress} = useChainConfig()
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
  const share2earnAddress = project.share2earn_contract
  const referralAdminAddress = project.referral_admin_contract

  const shareAddress = useERC20(share2earnAddress);

  const share2earnContract = useShare2EarnContract(share2earnAddress)
  const referralAdminContract = useReferralAdminContract(referralAdminAddress)

  const { callWithGasPrice } = useCallWithGasPrice()
  const { callFunction } = useCallFunction()

  const [confirm, setConfirm] = useState(false)
  const { isConfirmed, isConfirming, handleConfirm } =
    useApproveConfirmTransaction({
      onConfirm: () => {
        return callWithGasPrice(share2earnContract, 'joinProgram', [project.id.toString(), uid, referralCode])
      },
      onSuccess: async ({ receipt }) => {
        toast.success(`Subscribed successfully ${receipt.transactionHash}`)
      },
    })

  const handleJoinProgram = async () => {
    handleConfirm();
  };
  const [joined, setJoined] = useState('')
  const [share2EarnInfo, setShare2EarnInfo] = useState(null)

  React.useEffect(() => {
    if (account && user) {
      checkJoined()
    }
  }, [account, user]);

  React.useEffect(() => {
    const getInfoProgram = async () => {
      try {
        const p = await callFunction(share2earnContract, 'programs', [project.id.toString()])
        const pAdmin = await callFunction(referralAdminContract, 'programs', [project.id.toString()])
        setShare2EarnInfo({ ...p, incentiveL0: pAdmin.incentiveLevel1, incentiveL1: pAdmin.incentiveLevel2, incentiveL2: pAdmin.incentiveLevel3 });
        if (account) {
          checkJoined();
        }
      } catch (e) {
        console.log(e)
      }
    }

    if (!!library && !!share2earnContract) {
      getInfoProgram()
    }
  }, [share2earnContract, library, account]);



  const checkJoined = async () => {

    try {
      if (typeof window.ethereum !== undefined) {
        const addressJoined = await callFunction(share2earnContract, 'uidJoined', [project.id.toString(), uid])
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

  const openLoginPopUp = () => store.user.showConnect(true)


  const getMessage = () => {
    if (isConfirming) {
      return t("transcation confirm message");
    }
    else if (isConfirmed) {
      return t("joined message");
    } else if (joined) {
      return t("joined message");
    }

    return '';
  }
  const allowJoin = getMessage() == '' && joined == '' && account

  if ((joined != '' || isConfirmed) && !!account) {
    return <Share2EarnMainScreen project={project} user={user} share2earnAddress={share2earnAddress} referralAdminAddress={referralAdminAddress}/>;
  }

  const handleConnectWallet = () => {
    store.wallet.showConnect(true);
  }

  return (
    <>
      <Head />
      <div className="pane-content--sec--main grid scrollbar">

        <div className="page page-share2earn">

          <div className="section max-w-screen-sm mx-auto">

            <div className="section-body">
              <h1 className="mb-4">
                <span className="text-xl lg:text-2xl font-semibold text-color-title">
                ✨ Join The Parallel #Share2Earn Event ✨
                </span>
              </h1>

              <div className="box box--primary box-share2earn mb-4">
                <div className="box-body">
                  <div className="mb-4">
                    <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/logos/share2earn.png"} alt="RADA Share2Earn Program" />
                  </div>
                  <h2 className="flex flex-col font-altsans">
                    <strong className="text-4xl font-semibold flex items-center tracking-normal md:tracking-wider">
                      <span>Share</span>
                      <span className="text-3xl flex items-center justify-center bg-white w-9 h-9 rounded-full text-primary-500 mx-1 md:mx-2 font-bold">2</span>
                      <span>Earn</span>
                    </strong>
                    <span className="mt-1 text-lg font-medium tracking-wide">by RADA Network</span>
                  </h2>
                </div>
              </div>
              <p />
              {/* <p className="text-sm mb-8 text-gray-500 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: t("welcome description", { provider: `<span class="text-primary-700 dark:text-primary-400">RIR token</span>` }) }} /> */}
              <p className="text-sm mb-4 text-gray-500 dark:text-gray-400">
              {t("welcome des")}</p>
              
              <ul className="text-sm space-y-6">
                <li className="flex p-4 rounded-lg border border-gray-300 dark:border-gray-700">
                  <span className="icon shape--hexagon mr-4 !flex w-px-40 h-px-40 items-center justify-center flex-shrink-0 ">
                    <i className="fa-light fa-hexagon"></i>
                    <i className="fa-duotone fa-user-plus"></i>
                  </span>
                  <div className="flex flex-col">
                    <div>
                    {share2EarnInfo && share2EarnInfo.incentiveL0 > 0 &&<strong className="text-base text-color-title  flex items-center">Tier 1 <span className="ml-2 inline-block py-1 px-2 text-xs rounded-md bg-green-700 text-white">+{ethers.utils.formatEther(share2EarnInfo.incentiveL0)} RIR</span> </strong> }
                    </div>
                    {share2EarnInfo && share2EarnInfo.incentiveL0 > 0 && <p className="opacity-80 mt-2"> {t("welcome tier1 des", {rir: ethers.utils.formatEther(share2EarnInfo.incentiveL0)})} </p> }

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
                      {share2EarnInfo && share2EarnInfo.incentiveL1 > 0 && <span className="ml-2 inline-block py-1 px-2 text-xs rounded-md bg-green-700 text-white">+{ethers.utils.formatEther(share2EarnInfo.incentiveL1)} RIR</span> }
                      {/* {t("welcome lv2 title")} */}
                      </strong>
                    </div>
                    {share2EarnInfo && share2EarnInfo.incentiveL1 > 0 && <p className="opacity-80 mt-2">{t("welcome tier1 des", {rir: ethers.utils.formatEther(share2EarnInfo.incentiveL1)})}</p> }
                  </div>
                </li>
              </ul>

              {user?.id && <form className="mt-4">

                {allowJoin && <fieldset className="space-y-4 mb-4 text-gray-500 dark:text-gray-400">
                  <legend className="sr-only">Notifications</legend>
                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" onChange={e => setConfirm(e.target.checked)} />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="">
                        {t("welcome confirm")}
                      </label>
                    </div>
                  </div>
                </fieldset>}

                {_.isEmpty(account) ? (
                  <div className={"mt-4 btn btn-yellow w-full justify-center py-3 px-4 "} type="submit" onClick={() => handleConnectWallet()}>{t("welcome btn connect wallet")}</div>) :
                  (
                    <>
                      {
                        allowJoin ? <div className={"mt-4 btn btn-yellow w-full justify-center py-3 px-4 " + (confirm ? "" : "disabled")} type="submit"
                          onClick={() => handleJoinProgram()}
                        >{t("welcome btn connect wallet")}</div> : <div className={"mt-5 text-center w-full justify-center py-3 px-4 "}>{getMessage()}</div>
                      }
                    </>
                  )}
              </form>
              }
              { (user.id === "") ? (
                <form className="mt-4">
                  <btn className="mt-4 btn btn-yellow w-full justify-center py-3 px-4" type="submit"
                  onClick={openLoginPopUp}
                  ><i class="fa-duotone fa-hand-holding-heart"></i>{t("welcome btn login")}</btn>
                </form>
              ) : null }
               <a className="btn btn-default mt-4 !p-3 bg-gray-700 !text-base w-full block rounded-lg" onClick={e => {toast.info(t("Coming Soon"),{position : "top-center"})}} target="_blank"> {t("learn more")} </a>
            </div>

          </div>

        </div>

      </div>

    </>
  )
}
