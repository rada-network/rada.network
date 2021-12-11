import { observer } from "mobx-react";
import React from "react";
import { useEffect, useState, useReducer } from "react";
import { saveAs } from 'file-saver';
import { useTranslation } from "next-i18next";
import { useStore } from "@lib/useStore";
import { usePageStore } from "@lib/usePageStore";
import ShareLink from "./ShareLink"
import SelectBannerType from "./listbox-share2earn";
import { getShareLogById } from "../../../../data/query/getShareLog";
import { createOrUpdateShareLogById } from "../../../../data/query/createOrUpdateShareLog";
import mergeImages from 'merge-images';
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import Share2EarnStatus from "./Share2EarnStatus"
import { useCallFunction } from "@utils/hooks/useCallFunction"
import { useShare2EarnContract, useReferralAdminContract } from "@utils/hooks/useContracts"
import { toast } from "react-toastify"
import { ethers } from "ethers"
import useChainConfig from "@utils/web3/useChainConfig"
import { data } from "autoprefixer";



const Share2EarnMainScreen = observer(({ shareCampaign, shareType, shareSlug, user, share2earnAddress, referralAdminAddress, share2earnInfo, }) => {
  const store = useStore();
  const { detailStore } = usePageStore();
  const context = useActiveWeb3React();
  const { library, account } = context;
  const { t } = useTranslation('share2earn');
  const { callFunction } = useCallFunction();
  const { getRIRAddress, getBscScanURL } = useChainConfig()
  const riraddress = getRIRAddress()


  const [facebook, setFacebook] = useState({ disable: false, url: "" });
  const [twitter, setTwitter] = useState({ disable: false, url: "" });
  const [telegram, setTelegram] = useState({ disable: false, url: "" });
  // Merge image state
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [mergeImgs, setMergeImgs] = useState({});
  const [mergeUploadImgs, setMergeUploadImgs] = useState({});
  const [baseFrames, setBaseFrames] = useState({});
  const [userAvatar, setUserAvatar] = useState(null);
  const [referralInfo, setReferralInfo] = useState({ level1: '', level2: '', incentivePaid: '', isDeny: false, allowClaimValue: 0.0, claimableApproved: 0.0 })

  // Banner component 
  let bannerURL;
  if (detailStore.selectedBanner === "LinkedIn") {
    bannerURL = shareCampaign.linkedin_banner;
  } else if (detailStore.selectedBanner === "Twitter") {
    bannerURL = shareCampaign.twitter_banner;
  } else {
    bannerURL = shareCampaign.facebook_banner;
  }

  const handleDownload = () => {
    saveAs(bannerURL, detailStore.selectedBanner + ".png");
  }

  const uid = user?.id?.split("-")[user?.id?.split("-").length - 1]

  useEffect(() => {
    if (shareCampaign) {
      getShareLogById({ campaignId: shareCampaign.id }).then(function (
        res
      ) {
        if (res.data.getShareLog?.length) {
          let facebookURL = res.data.getShareLog[0].facebook;
          if (facebookURL) {
            setFacebook({ url: facebookURL, disable: facebookURL !== "" });
          }

          let twitterURL = res.data.getShareLog[0].twitter;
          if (twitterURL) {
            setTwitter({ url: twitterURL, disable: twitterURL !== "" });
          }

          let telegramURL = res.data.getShareLog[0].telegram;
          if (telegramURL) {
            setTelegram({ url: telegramURL, disable: telegramURL !== "" });
          }
        }
      });
    }
  }, []);

  const share2earnContract = useShare2EarnContract(share2earnAddress)
  const referralAdminContract = useReferralAdminContract(referralAdminAddress)
  useEffect(() => {
    const getInfo = async () => {
      const level1Incentive = await callFunction(share2earnContract, 'getTotalRefereesL1', [shareCampaign.program_id.toString(), account]);
      const level2Incentive = await callFunction(share2earnContract, 'getTotalRefereesL2', [shareCampaign.program_id.toString(), account]);
      const incentivePaid = await callFunction(referralAdminContract, 'incentivePaid', [shareCampaign.program_id.toString(), account]);
      const denyUser = await callFunction(referralAdminContract, 'denyUser', [shareCampaign.program_id.toString(), account]);
      const allowClaimValue = await callFunction(referralAdminContract, 'allowClaimValue', [shareCampaign.program_id.toString()]);
      const claimableApproved = await callFunction(referralAdminContract, 'claimableApproved', [riraddress, account]);

      setReferralInfo({
        level1: parseInt(level1Incentive.toString()),
        level2: parseInt(level2Incentive.toString()),
        incentivePaid: parseInt(incentivePaid.toString()),
        isDeny: denyUser,
        allowClaimValue: parseFloat(ethers.utils.formatEther(allowClaimValue)),
        claimableApproved: parseFloat(ethers.utils.formatEther(claimableApproved))
      })
    }
    if (!!library && !!share2earnContract) {
      getInfo()
    }
  }, []);

  // Create or update url
  function submitShareURL() {
    if (shareCampaign) {
      createOrUpdateShareLogById({ campaignId: parseInt(shareCampaign.id), walletAddress: account, twitter: twitter.url, facebook: facebook.url, telegram: telegram.url, linkedin: "" }).then(function (
        res
      ) {
        toast.success("Save successfuly", {})
        let facebookURL = res.data.createOrUpdateShareLog.facebook
        if (facebookURL) {
          setFacebook({ url: facebookURL, disable: true })
        }

        let telegramURL = res.data.createOrUpdateShareLog.telegram
        if (telegramURL) {
          setTelegram({ url: telegramURL, disable: true })
        }

        let twitterURL = res.data.createOrUpdateShareLog.twitter
        if (twitterURL) {
          setTwitter({ url: twitterURL, disable: true })
        }
      });
    }
  }

  useEffect(() => {
    let hightQualityURL = "";
    if (user) {
      const imgURL = user.image;
      if (imgURL.includes("google")) {
        const urls = imgURL.split('=');
        if (urls.length > 0) {
          hightQualityURL = urls[0] + "=s500-c";
        }
      } else if (imgURL.includes("fbsbx")) {
        const urls = imgURL.split('&');
        if (urls.length > 0) {
          const prefixWithID = urls[0];
          const idArr = prefixWithID.split('=');
          if (idArr.length > 1) {
            const id = idArr[1];
            hightQualityURL = "https://graph.facebook.com/" + id + "/picture?width=500&height=500";
          }
        }
      } else if (imgURL.includes("twimg")) {
        hightQualityURL = imgURL;
      }
    };

    getBase64FromUrl(hightQualityURL).then(b64 => {
      resizeImage(b64).then(result => {
        setUserAvatar(result)
      })
    })
  }, [user]);

  useEffect(() => {
    convertBase64Frames()
  }, []);

  useEffect(() => {
    convertBase64Img();
  }, [baseFrames, userAvatar]);

  useEffect(() => {
    if (!isUploadImage) {
      setIsUploaded(isUploadImage)
    }
  }, [isUploadImage])

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

  const convertBase64Frames = async function () {
    // Convert frame
    if (shareCampaign) {
      let tmpBaseFrames = {}
      for (let index = 0; index < shareCampaign.avatar_frame.length; ++index) {
        let url = shareCampaign.avatar_frame[index]
        const e = await getBase64FromUrl(url)
        tmpBaseFrames = { [index]: e, ...tmpBaseFrames }
      }
      setBaseFrames(tmpBaseFrames)
    }
  }

  const convertBase64Img = async () => {
    // Convert frame
    if (shareCampaign && userAvatar) {
      if (!isUploadImage) {
        let tmpMergeImgs = {}
        for (let index = 0; index < Object.keys(baseFrames).length; index++) {
          let result = await mergeImages([userAvatar, baseFrames[index]])
          tmpMergeImgs = { ...tmpMergeImgs, [index]: result }
        }
        setMergeImgs(tmpMergeImgs)
      }
      else {

      }
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files[0]) {
      return new Promise(() => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(e.target.files[0])
        fileReader.onload = () => {
          resizeImage(fileReader.result).then(result => {
            setIsUploaded(true)
            addFrameImageToUploadImg(result)
          })
        }

        fileReader.onerror = () => {
          console.log("Can not convert img")
        }
      })
    }
  }

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
        //Draw here
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(maxHeight / 2, maxHeight / 2, maxHeight / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        resolve(canvas.toDataURL())
      }
    })
  }

  const addFrameImageToUploadImg = async (fileUpload) => {
    let tmpMergeImgs = {}
    for (let index = 0; index < Object.keys(baseFrames).length; index++) {
      let result = await mergeImages([fileUpload, baseFrames[index]])
      tmpMergeImgs = { ...tmpMergeImgs, [index]: result }
    }
    setMergeUploadImgs(tmpMergeImgs)
  };
  const handleDownloadAvt = () => {
    shareCampaign.avatar_frame.map((data, index) => {
      var a = document.createElement("a");
      let dataImgs = isUploadImage ? mergeUploadImgs : mergeImgs
      a.href = dataImgs[index];
      a.download = "Avatar.png";
      a.click();
    })
  };


  let downloadAvtButton
  let mergedImage
  if (!isUploadImage || (isUploadImage && isUploaded)) {
    downloadAvtButton = (
      <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
        <button className="btn btn-default w-full !py-2"
          onClick={handleDownloadAvt}>
          <span className="icon"><i className="fa-duotone fa-download text-xs"></i></span>
          <span className="btn--text">{t("main button download")}</span>
        </button>
      </div>
    );

    let dataImgs = isUploadImage ? mergeUploadImgs : mergeImgs

    // todo: fix after
    mergedImage = (
      <>
        <div className="flex justify-center">
          <img className="" src={dataImgs[1]} alt="" />
        </div>
        <div className="flex justify-center">
          <img className="" src={dataImgs[0]} alt="" />
        </div>
        <div className="flex justify-center">
          <img className="" src={dataImgs[2]} alt="" />
        </div>
      </>
    );
  } else {
    downloadAvtButton = null
    mergedImage = null
  }
  return (
    <>
      {/* <Head /> */}

      <div className="section mx-auto">

        <div className="flex mb-4 flex-col md:flex-row">

          <div className="flex mb-2 w-12 md:mr-2 mt-1 flex-shrink-0 md:justify-center">
            <span className="icon text-3xl"><i className="fa-solid fa-check-circle text-green-500"></i></span>
          </div>

          {share2earnInfo.paused && (
            <div className="w-full">
              <div className="message success flex relative mb-2 ">
                <span className="message-icon">
                  <i class="mr-2 fas fa-star"></i>
                </span>

                <div className="message-content pr-2">
                  Share2earn for Parallel campaign has successfully ended.
                </div>
                <button onClick={e => { setIsWarning(false) }} className="flex items-center ml-auto w-4 h-4 ">
                  <i class="text-base fas fa-times"></i>
                </button>
              </div>

              {referralInfo.isDeny && (
                <div className="message error flex relative mb-2 ">
                  <span className="message-icon">
                    <i class="mr-2 fas fa-exclamation-triangle"></i>
                  </span>
                  <div className="message-content pr-2">
                    {t("ban_message")}
                  </div>
                  <button onClick={e => { setIsWarning(false) }} className="flex items-center ml-auto w-4 h-4 ">
                    <i class="text-base fas fa-times"></i>
                  </button>
                </div>
              )}
            </div>
          )}

          {!share2earnInfo.paused && (
            <div className="w-full">
              <h1 className="">
                <span className="text-xl lg:text-lg font-semibold text-color-title">
                  Welcome to {shareCampaign.title}
                </span>
              </h1>
              <p className="text-sm opacity-75">
                {t("main step des")}
              </p>
            </div>
          )}
        </div>


        <div className="section-body !pt-0">
          <Share2EarnStatus referralInfo={referralInfo}
            incentivePaid={referralInfo.incentivePaid}
            adminContract={referralAdminContract}
            walletAddress={account} share2earnAdress={share2earnAddress}
            share2earnInfo={share2earnInfo}
            shareCampaign={shareCampaign}
            shareType={shareType}
            shareSlug={shareSlug}
            uid={uid} />

          {(!share2earnInfo.paused) && (
            <ol className="text-sm space-y-8">

              {/* Step 1 */}
              <li className="flex flex-col md:flex-row items-start">

                <div className="flex w-12 mb-2 md:mb-0 mr-2 mt-1.5 flex-shrink-0 md:items-center md:justify-center">
                  <span className="icon !flex w-px-32 h-px-32 items-center justify-center rounded-full border-2 border-gray-300">
                    <strong className="text-base">
                      <span className="sr-only">Step</span>
                      1
                    </strong>
                  </span>
                </div>

                <div className="flex flex-col w-full">
                  <div className="flex flex-col">
                    <strong className="text-base text-color-title">{t("main step 1 banner title")}</strong>
                    <span className="text-gray-500 dark:text-gray-400">{t("main step 1 banner des")}</span>

                    <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <SelectBannerType />
                      <div className="p-0 pt-0 border-t border-gray-200 dark:border-gray-700">
                        <div className="">
                          <img class="" src={bannerURL} />
                        </div>
                      </div>

                      <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="btn btn-default w-full !py-2"
                          onClick={() => handleDownload()}>
                          <span className="icon"><i className="fa-duotone fa-download text-xs"></i></span>
                          <span className="btn--text">{t("main button download")}</span>
                        </button>
                      </div>
                      <a href="https://drive.google.com/drive/folders/1ax-AW2LXtZ9UkBjGNEAlPYzlDGsd24v8?usp=sharing"
                        target="_blank"
                        className="m-4 !mt-0 flex text-sm border border-gray-200 dark:border-gray-700 text-center rounded-lg p-2  items-center" >
                        <i className="fa-duotone fa-external-link text-xs ml-auto mr-2" />
                        <span className="mr-auto">{t("more image")}</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col mt-4">
                    <strong className="text-base text-color-title">{t("main step 1 avatar title")}</strong>
                    <span className="text-gray-500 dark:text-gray-400">{t("main step 1 avatar des")}</span>

                    <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">

                      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                        <div>
                          <span className="text-sm">Image Source</span>
                        </div>
                        <div className="flex flex-srink-0 items-center">

                          <div className="btn-group btn-group-toggle text-xs">
                            <a className={"btn " + (isUploadImage ? "btn-toggle" : "btn-toggle-active")} onClick={() => setIsUploadImage(!isUploadImage)}>
                              <span className="btn--text">Default</span>
                            </a>
                            <a className={"btn " + (isUploadImage ? "btn-toggle-active" : "btn-toggle")} onClick={() => setIsUploadImage(!isUploadImage)}>
                              <span className="btn--text">Your Image</span>
                            </a>
                          </div>
                        </div>
                      </div>

                      <form>
                        <div className="bg-gray-100 dark:bg-deepgray-50 grid gap-4 grid-cols-3 p-4">
                          {mergedImage}
                        </div>

                        {isUploadImage && !isUploaded &&
                          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                            <label className="btn btn-default w-full !py-2" type="submit">
                              <span className="icon"><i className="fa-duotone fa-upload text-xs" type="submit"></i></span>
                              <span className="btn--text">{t("main button upload")}</span>
                              <input type="file" accept="image/*" onChange={handleFileInput} hidden />
                            </label>
                          </div>
                        }

                        {downloadAvtButton}
                      </form>

                    </div>
                  </div>
                </div>

              </li>

              {/* Step 2 */}
              <li className="flex flex-col md:flex-row items-start">
                <ShareLink uid={uid} share_message={shareCampaign.share_message} shareSlug={shareSlug} />
              </li>

              {/* Step 3 */}
              <li className="flex flex-col md:flex-row items-start">

                <div className="flex w-12 mb-2 md:mb-0 mr-2 mt-1.5 flex-shrink-0 md:items-center md:justify-center">
                  <span className="icon !flex w-px-32 h-px-32 items-center justify-center rounded-full border-2 border-gray-300">
                    <strong className="text-base">
                      <span className="sr-only">Step</span>
                      3
                    </strong>
                  </span>
                </div>

                <div className="flex flex-col w-full">

                  <div className="flex flex-col">
                    <strong className="text-base text-color-title">{t("main step 3 title")}</strong>
                    <span className="text-gray-500 dark:text-gray-400">{t("main step 3 des")}</span>

                    <div className="mt-4">
                      <form>
                        {/* Telegram -- Disable for LV campaign */}
                        {/* <div className="mb-4">
                          <label for="telegram-post-url" className="sr-only block text-xs font-medium uppercase">Telegram's username</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--telegram"><span class="icon"><i class="fa-brands fa-telegram"></i></span></span>
                            <input type="text" name="telegram-post-url" id="telegram-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20"
                              placeholder="Telegram's username"
                              value={telegram.url}
                              onChange={(e) => { setTelegram({ url: e.target.value }) }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                            </div>
                          </div>
                        </div> */}

                        {/* Twitter */}
                        <div className="mb-4">
                          <label for="twitter-post-url" className="sr-only block text-xs font-medium uppercase">Your Twitter Username</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--Twitter"><span class="icon"><i class="fa-brands fa-twitter"></i></span></span>
                            <input type="text" name="twitter-post-url" id="twitter-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20"
                              placeholder="Twitter's profile"
                              value={twitter.url}
                              onChange={(e) => { setTwitter({ url: e.target.value }) }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                            </div>
                          </div>
                        </div>

                        {/* Facebook */}
                        <div className="mb-4">
                          <label for="fb-post-url" className="sr-only block text-xs font-medium uppercase">Your Facebook Profile Link</label>
                          <div className="mt-1 relative rounded-md shadow-sm">
                            <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--Facebook"><span class="icon"><i class="fa-brands fa-facebook-f"></i></span></span>
                            <input type="text" name="fb-post-url" id="fb-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20"
                              placeholder="Facebook's profile"
                              value={facebook.url}
                              onChange={(e) => { setFacebook({ disable: false, url: e.target.value }) }}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                            </div>
                          </div>
                        </div>
                      </form>

                    </div>
                    <div className="mb-4">
                      <p>
                        {t("checking links des")}</p>
                      <p className="pt-4">Any further question? Ask in our <a className="text-purple-400" target="_blank" href="https://t.me/radadao">Telegram</a></p>
                    </div>
                  </div>

                </div>

              </li>

            </ol>
          )}
          {!share2earnInfo.paused && (
            <div className="lg:pl-14">
              <button className="w-full mt-4 btn btn-yellow justify-center py-3 px-4" type="submit"
                onClick={submitShareURL}
              >Save</button>
            </div>
          )}

        </div>

      </div>

    </>
  )

})

export default Share2EarnMainScreen