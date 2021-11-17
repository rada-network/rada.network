import React from "react";
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { toast } from "react-toastify";
import {useTranslation} from "next-i18next";
import _ from "lodash"
import { useCookies } from "react-cookie";

import { Head } from "../../components/Head";
import Share2EarnMainScreen from "../../components/share2earn/Share2EarnMainScreen";

import useApproveConfirmTransaction from "@utils/hooks/useApproveConfirmTransaction"
import {useCallWithGasPrice} from "@utils/hooks/useCallWithGasPrice"
import {useCallFunction} from "@utils/hooks/useCallFunction"

import { useShare2EarnContract } from "@utils/hooks/useContracts"

import useActiveWeb3React from "../../utils/hooks/useActiveWeb3React"
import useChainConfig from "../../utils/web3/useChainConfig"

import { useEagerConnect, useInactiveListener } from "../../utils/hooks/useShare2Earn";

import { useStore } from "../../lib/useStore";
import { getCurrentUser } from "../../data/query/user";

import { getErrorMessage } from "../../utils"

export default function TokenInfoShare2Earn({
  tokenData,
}) {
  const {injected,walletconnect, getChainId} = useChainConfig()

    const {t} = useTranslation()

    const context = useActiveWeb3React()
    const { connector, library, account, activate, deactivate, active, error } = context

    // handle logic to recognize the connector currently being activated
    const [activatingConnector, setActivatingConnector] = React.useState();
    React.useEffect(() => {
      if (activatingConnector && activatingConnector === connector) {
        setActivatingConnector(undefined);
      }
    }, [activatingConnector, connector]);

    // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
    const triedEager = useEagerConnect();
    // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
    useInactiveListener(!triedEager || !!activatingConnector);


    useEffect(() => {
      setTimeout(()=>{
        injected.isAuthorized().then(isAuthorized => {

          if (isAuthorized) {
            activate(injected)
          }
        });
      }, 1000)

    }, [activate]);

    // Handle join program
    const [cookies] = useCookies(["ref"]);

    const referralCode = cookies.ref ?? '';

    const [user, setUser] = useState({});
    const store = useStore()
    useEffect(() => {
      if (store.user.access_token !== "") {
        getCurrentUser().then((res) => {
          getBase64FromUrl(res.image).then(b64 => {
            resizeImage(b64).then(result => {
              localStorage.setItem("user_avatar", result)
            })
          })
          setUser(res);
        });
      }
    }, [store.user.access_token]);

    function resizeImage(base64Str, maxWidth = 512, maxHeight = 512) {
      return new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
          let canvas = document.createElement('canvas')
          canvas.width = maxWidth
          canvas.height = maxHeight
          let ctx = canvas.getContext('2d')
          ctx.drawImage(img, 0, 0, maxWidth, maxHeight)
          resolve(canvas.toDataURL())
        }
      })
    }

    const getBase64FromUrl = async (url) => {
      const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
          }
        });
    }

    const uid = user?.id?.split("-")[user?.id?.split("-").length - 1]

    // TODO: Save in config file
    // const share2earnAddress = "0x7b9AEeD27F291625CbaED61Ac178D61709d62dCC"
    const share2earnAddress = "0x998353AfD99A73262337974e2E732118ed557600"
    const share2earnContract = useShare2EarnContract(share2earnAddress)
    const {callWithGasPrice} = useCallWithGasPrice()
    const {callFunction} = useCallFunction()

    const [confirm, setConfirm] = useState(false)
    const { isConfirmed, isConfirming, handleConfirm } =
    useApproveConfirmTransaction({
      onConfirm: () => {
        return callWithGasPrice(share2earnContract, 'joinProgram', [tokenData.id, uid, referralCode])
      },
      onSuccess: async ({ receipt }) => {
        toast.success(`Subscribed successfully ${receipt.transactionHash}`)
      },
    })

    const handleJoinProgram = async () => {
          handleConfirm();
    };
    const [joined, setJoined] = useState('')
    const [incentive1, setIncentive1] = useState(0)
    const [incentive2, setIncentive2] = useState(0)

    React.useEffect(() => {
      if (account && user) {
        checkJoined()
      }
    }, [account,user]);

    React.useEffect(() => {
      if (active)
        getInfoProgram()
    }, [active, library]);


    const checkJoined = async () => {

      try {
        if (typeof  window.ethereum !== undefined) {
          const addressJoined = await callFunction(share2earnContract, 'uidJoined', [tokenData.id, uid])
          if (addressJoined=='0x0000000000000000000000000000000000000000') {
            setJoined('');
          }
          else {
            setJoined(addressJoined);
            return addressJoined;
          }
        }
        return '';
      }catch(e) {
        return '';
      }
    }

    const getInfoProgram = async () => {

      try {
          const p = await callFunction(share2earnContract, 'programs', [tokenData.id])
          if (p) {
            setIncentive1(ethers.utils.formatEther(p.incentiveL0));
            setIncentive2(ethers.utils.formatEther(p.incentiveL1));
            checkJoined();
          }
      }catch(e) {
        if (injected) {
          activate(injected);
        }
      }
    }

    const getMessage = () => {
      if (isConfirming) {
        return 'Vui lòng xác nhận Transaction và chờ  khoảng 15-30 giây';
      }
      else if (isConfirmed) {
        return 'Đã tham gia chương trình';
      }else if (joined) {
        return 'Đã tham gia chương trình';
      }
      return '';
    }
    const allowJoin = getMessage() == '' && joined==''
    const handleConnectWallet =  () => {
      activate(injected);
      setActivatingConnector(injected);
      if (error){
        toast.error(getErrorMessage(error,store.network))
      }
    }

    if (joined !='' || isConfirmed) {
      return <Share2EarnMainScreen tokenData={tokenData} user={user}/>;
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
                Join program now. Earn RIR token ✨
              </span>
            </h1>

            <div className="box box--primary box-share2earn mb-4">
              <div className="box-body">
                <div className="mb-4">
                  <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/logos/share2earn.png"} alt="RADA Share2Earn Program" />
                </div>
                <h2 className="flex flex-col font-altsans">
                  <strong className="text-4xl font-semibold flex items-center tracking-wider">
                    <span>Share</span>
                    <span className="text-3xl flex items-center justify-center bg-white w-9 h-9 rounded-full text-primary-500 mx-2 font-bold">2</span>
                    <span>Earn</span>
                  </strong>
                  <span className="mt-1 text-lg font-medium tracking-wide">by RADA Network</span>
                </h2>
              </div>
            </div>

            <p className="text-sm mb-8 text-gray-500 dark:text-gray-400">To encourage our members to share and help our project’s community grow farther, Rada will reward <span className="text-primary-700 dark:text-primary-400">RIR token</span> for each person visit through your refferal link and make these actions below:</p>

            <ul className="text-sm space-y-6">
              <li className="flex items-center">
                <span className="icon shape--hexagon mr-4 !flex w-px-40 h-px-40 items-center justify-center">
                  <i className="fa-light fa-hexagon"></i>
                  <i className="fa-duotone fa-user-plus"></i>
                </span>
                <div className="flex flex-col">
                  <strong className="text-base text-color-title">A Refferal Person join Share2Earn program</strong>
                  {incentive1>0 && <span className="text-gray-500 dark:text-gray-400">You get <span className="text-primary-700 dark:text-primary-400">+{incentive1} RIR</span> for each</span>}
                </div>
              </li>
              <li className="flex items-center">
                <span className="icon shape--hexagon mr-4 !flex w-px-40 h-px-40 items-center justify-center">
                  <i className="fa-light fa-hexagon"></i>
                  <i className="fa-duotone fa-hand-holding-heart"></i>
                </span>
                <div className="flex flex-col">
                  <strong className="text-base text-color-title">A Refferal Person join IDO and buy allocation</strong>
                  <span className="text-gray-500 dark:text-gray-400">You get <span className="text-primary-700 dark:text-primary-400" style={{textDecoration: "line-through"}}>+0 RIR</span> for each</span>
                </div>
              </li>
              <li className="flex items-center">
                <span className="icon shape--hexagon mr-4 !flex w-px-40 h-px-40 items-center justify-center">
                  <i className="fa-light fa-hexagon"></i>
                  <i className="fa-duotone fa-users"></i>
                </span>
                <div className="flex flex-col">
                  <strong className="text-base text-color-title">Get refferal bonus for each new refferal level 2 member</strong>
                  {incentive2>0 && <span className="text-gray-500 dark:text-gray-400">You get <span className="text-primary-700 dark:text-primary-400">+{incentive2} RIR</span> for each</span>}
                </div>
              </li>
            </ul>

            {user?.id && <form className="mt-4">

              {allowJoin && <fieldset className="space-y-4 mb-4 text-gray-500 dark:text-gray-400">
                <legend className="sr-only">Notifications</legend>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded" onChange={e => setConfirm(e.target.checked)}/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="">
                      I confirm that I have to finish all missions to be eligible to receive rewards from Rada Network
                    </label>
                  </div>
                </div>
              </fieldset>}
              {_.isEmpty(account) ? (
                  <span>
                    {t("no connection", { provider: "wallet" })} <button onClick={() => handleConnectWallet()}>Kết nối lại</button>
                  </span>
                ) : (
              <>
              {allowJoin ? <div className={ "mt-4 btn btn-yellow w-full justify-center py-3 px-4 " + (confirm ? "" : "disabled")} type="submit"
                onClick={() => handleJoinProgram()}
              >Join Program</div> : <div className={ "mt-5 text-center w-full justify-center py-3 px-4 "}>{getMessage()}</div>
                }
            </>
            )}
            </form>}

          </div>

        </div>

      </div>

    </div>

    </>
  )
}
