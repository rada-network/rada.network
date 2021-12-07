import useChainConfig from "@utils/web3/useChainConfig"
import CopyToClipboard from "react-copy-to-clipboard"
import RadaSvg from "@components/svg/rada"
import { toast } from "react-toastify"
import { useCallFunction } from "@utils/hooks/useCallFunction"
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { ethers } from "ethers"
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ReactTooltip from 'react-tooltip';
import { createShortenLink } from "@data/query/createShortenLink"
import { SHORT_SHARE2EARN_URL } from "@config/links"
import { useCallWithGasPrice } from "@utils/hooks/useCallWithGasPrice"

const Share2EarnStatus = ({ referralInfo, adminContract, projectID, walletAddress, incentivePaid, share2earnAdress, share2earnInfo, project, uid }) => {
  const { t } = useTranslation('share2earn')
  const { callFunction } = useCallFunction()
  const { getRIRAddress, getBscScanURL } = useChainConfig()
  const { callWithGasPrice } = useCallWithGasPrice();
  const bscURL = getBscScanURL(share2earnAdress)
  const riraddress = getRIRAddress()
  const [earnedRIR, setEarnedRIR] = useState(0.0)
  const [total, setTotal] = useState(0.0)
  const [shareLink, setShareLink] = useState('')
  const [claimDisbaled, setClaimDisbaled] = useState(false);

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  };

  useEffect(() => {
    let url = window.location.origin + `/launchverse/${project.slug}/share2earn` + "?ref=" + uid;
    createShortenLink(url).then(({ data }) => {
      let shortenURL = SHORT_SHARE2EARN_URL + data.createShortenLink.key
      setShareLink(shortenURL)
    })
  }, [])

  useEffect(() => {
    const getInfo = async () => {
      try {
        const earnedRIR = await callFunction(adminContract, 'incentivePaid', [projectID.toString(), walletAddress.toString()])
        setEarnedRIR(parseFloat(ethers.utils.formatEther(earnedRIR)))
      } catch (e) {
        console.log(e)
      }
    }

    getInfo()
  }, []);
  function getOffset(el) {
    console.log()
    return {
      left: el.offsetLeft,
      top: el.offsetTop
    };
  }
  const overridePosition = function ({ left, top }, currentEvent, currentTarget, node, place, desiredPlace, effect, offset) {
    const scrollTop = document.querySelector(".pane-content--sec--main").scrollTop
    const pageOffset = getOffset(document.querySelector(".page-project-share2earn"))
    const rect = document.querySelector(".page-project-share2earn").getBoundingClientRect()
    return { left: getOffset(currentTarget.parentElement).left + rect.x - document.querySelector(".pane-content--sec--main").getBoundingClientRect().x, top: getOffset(currentTarget).top + pageOffset.top - scrollTop + 48 }
  }

  useEffect(() => {
    const rirLevel1 = ethers.utils.formatEther(share2earnInfo.incentiveL0).toString()
    const rirLevel2 = ethers.utils.formatEther(share2earnInfo.incentiveL1).toString()
    let level1 = referralInfo.level1
    let level2 = referralInfo.level2

    let total = parseFloat(level1) * parseFloat(rirLevel1) + parseFloat(level2) * parseFloat(rirLevel2)
    setTotal(total)
  }, [referralInfo]);

  const handleClaimRIRToken = async function (e) {
    try {
      setClaimDisbaled(true)
      const tx = await callWithGasPrice(adminContract, "claim", [projectID.toString()])
      const receipt = await tx.wait()
      if (receipt.status) {
        toast.success(t("Claim success!"))
      }
    } catch (error) {
      setClaimDisbaled(false)
      console.log(error)
      if (!!error?.data?.message) {
        toast.error(t(error?.data?.message?.replace("execution reverted: ", "")))
      }
      else if (!!error?.message) {
        toast.error(t(error?.message))
      }
      else {
        toast.error(t(error))
      }
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 blur-md bg-black opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md my-8 overflow-hidden relative
              text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-lg items-center flex border-b dark:border-gray-800 border-gray-200
                   font-medium p-4 md:p-6 leading-6 text-gray-900 dark:text-gray-300"
                >
                  <i className="fa-duotone text-yellow-400 mr-2 fa-trophy text-base" />Leaderboard
                </Dialog.Title>
                <div className="p-4 md:p-6 text-sm text-gray-600 dark:text-gray-300">

                  <ul>
                    <li className="list-pair !items-center  pb-2 border-b border-gray-200 dark:border-gray-800 mt-auto mb-0">
                      <div className="list-key !w-16 !items-center flex-grow-0 flex-shrink-0 !opacity-100">
                        Ranking
                      </div>
                      <span className="opacity-60 text-right px-1 w-12 md:px-2 md:w-20 list-value">
                        Tier 1
                      </span>
                      <span className="opacity-60 text-right px-1 w-12 md:px-2 md:w-20 list-value">
                        Tier 2
                      </span>
                      <span className="opacity-60 ml-auto list-value">
                        Wallet
                      </span>
                    </li>
                  </ul>

                </div>

                <div className="absolute right-4 top-2 md:top-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 bg-transparent 
                    py-2 text-sm font-medium text-gray-500 border border-transparent rounded-md
                     hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none 
                     focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    <i className="fa-duotone fa-close text-base"></i>
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>



      <div className="mb-8 items-center text-base mt-4 bg-gray-50 
              dark:bg-gray-900 dark:bg-border-800 border border-gray-200 dark:border-gray-700 rounded-lg md:ml-14">
        <div className="p-4  border-b border-gray-200 dark:border-gray-700">
          {t("share2earn status")}
        </div>
        <div className="p-4">
          <div>
            <ReactTooltip type="info" multiline={true} globalEventOff="click" clickable={true} html={true} place={`top`} overridePosition={overridePosition} />
          </div>
          <ul className="mb-0 mt-auto flex-shrink-0 flex-grow">
            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                Share2Earn Contract
              </div>
              <div className="w-32 px-2 py-1 rounded-lg flex justify-between bg-gray-200 dark:bg-gray-800 ml-auto list-value hover:bg-gray-300 dark:hover:bg-gray-700">
                <div>
                  <a target="_blank" href={bscURL}>{`${share2earnAdress.substr(0, 5)}...${share2earnAdress.substr(-4)}`}</a></div>
                <CopyToClipboard
                  onCopy={handleCopy}
                  text={share2earnAdress}
                >
                  <button class="btn ml-2">
                    <i className="fa-duotone fa-copy text-2xs"></i>
                  </button>
                </CopyToClipboard>
              </div>
            </li>

            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                RIR Contract
                <span
                  className="hasTooltip"
                  data-tip={t("tooltip")}
                  data-event="click"
                ><i className="fa-duotone fa-info-circle text-base" />
                </span>
              </div>
              <div className="w-32 px-2 py-1 rounded-lg flex justify-between bg-gray-200 dark:bg-gray-800 ml-auto list-value hover:bg-gray-300 dark:hover:bg-gray-700">
                <div>
                  <a target="_blank" href={getBscScanURL(riraddress)}>{`${riraddress.substr(0, 5)}...${riraddress.substr(-4)}`}</a></div>
                <CopyToClipboard
                  onCopy={handleCopy}
                  text={riraddress}
                >
                  <button class="btn ml-2">
                    <i className="fa-duotone fa-copy text-2xs"></i>
                  </button>
                </CopyToClipboard>
              </div>
            </li>

            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                Share Link
              </div>
              <div className="w-auto px-2 py-1 rounded-lg flex justify-between bg-gray-200 dark:bg-gray-800 ml-auto list-value hover:bg-gray-300 dark:hover:bg-gray-700">
                <div>
                  <a target="_blank" href={shareLink}>{shareLink}</a>
                </div>
                <CopyToClipboard
                  onCopy={handleCopy}
                  text={shareLink}
                >
                  <button class="btn ml-2">
                    <i className="fa-duotone fa-copy text-2xs"></i>
                  </button>
                </CopyToClipboard>
              </div>
            </li>

            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                Tier 1
                <span
                  className="hasTooltip"
                  data-tip={t("tooltip")}
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
              </div>
              <div className="ml-auto flex items-center list-value">
                {referralInfo.level1}
              </div>
            </li>

            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                Tier 2
                <span
                  className="hasTooltip"
                  data-tip={t("tooltip")}
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
              </div>
              <span className="ml-auto">{referralInfo.level2}</span>
            </li>

            {/* Under ReviewRIR */}
            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                {t("under review")}
                <span
                  className="hasTooltip"
                  data-tip={t("under review tooltip")}
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
              </div>
              <div className="ml-auto flex items-center">
                <span class="icon w-4 h-4 mr-1">
                  <RadaSvg />
                </span>
                {((total - earnedRIR) > 0 ? (total - earnedRIR) : 0).toFixed(3)} RIR
              </div>
            </li>

            {/* Approved RIR */}
            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                {t("approve earning")}
                <span
                  className="hasTooltip"
                  data-tip={t("approve earning tooltip")}
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
              </div>
              <div className="ml-auto flex items-center">
                <span class="icon w-4 h-4 mr-1">
                  <RadaSvg />
                </span>
                {earnedRIR.toFixed(3)} RIR
              </div>
            </li>

            {/* Max RIR per user */}
            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                {t("max rir")}
                <span
                  className="hasTooltip"
                  data-tip={t("max rir tooltip")}
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
              </div>
              <div className="ml-auto flex items-center">
                <span class="icon w-4 h-4 mr-1">
                  <RadaSvg />
                </span>
                2 RIR
              </div>
            </li>


            {/* Số RIR có thể claim */}
            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                Claimable RIR
                <span
                  className="hasTooltip"
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
              </div>
              <div className="ml-auto flex items-center">
                <span class="icon w-4 h-4 mr-1">
                  <RadaSvg />
                </span>
                {referralInfo.claimableApproved} RIR
                <div>
                  {!referralInfo.isDeny && !claimDisbaled && referralInfo.claimableApproved > referralInfo.allowClaimValue && (
                    <button className="btn btn-primary px-2 py-1 ml-4"
                      onClick={handleClaimRIRToken}
                    >Claim</button>
                  )}
                </div>

              </div>

            </li>

            {/* Feedback URL */}
            <li className="list-pair !items-center mb-2">
              <div className="list-key">
                Feedback URL
              </div>
              <div className="w-auto px-2 py-1 rounded-lg flex justify-between bg-gray-200 dark:bg-gray-800 ml-auto list-value hover:bg-gray-300 dark:hover:bg-gray-700">
                <div>
                  <a target="_blank" href={t("feedback")}>{t("feedback")}</a>
                </div>
              </div>
            </li>

            <li>
              <div className="message warning flex relative mb-2 ">
                <span className="message-icon">
                  <i class="mr-2 fas fa-bullhorn"></i>
                </span>
                <div className="message-content pr-2">
                  {t("rir_not_enough")}
                </div>
                <button className="flex items-center ml-auto w-4 h-4 ">
                  <i class="text-base fas fa-times"></i>
                </button>
              </div>
            </li>

            {/*<li className="list-pair !items-center mb-2">
              <div className="list-key">
                {t("main status ranking")}
                <span
                  className="hasTooltip"
                  data-tip="When your referred user successfully invited someone to join this #Share2Earn event through their links, you get 0.01 RIR"
                  data-event="click"
                > <i className="fa-duotone fa-info-circle text-base" />
                </span>
              </div>
              <div className="ml-auto flex items-center">
                
                <div>45<span className="font-normal opacity-70">/850</span></div>
                <button  onClick={openModal} className="!text-xs btn btn-default ml-2">
                  {t("main status leaderboard")}
                </button> 
              </div>
            </li>  */}

          </ul>
        </div>
      </div>
    </>
  )
}

export default Share2EarnStatus