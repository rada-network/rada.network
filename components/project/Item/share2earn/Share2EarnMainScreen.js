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
import { useShare2EarnContract } from "@utils/hooks/useContracts"



const Share2EarnMainScreen = observer(({ project, user, share2earnAddress, referralAdminAddress }) => {
  const store = useStore()
  const { detailStore } = usePageStore();
  const context = useActiveWeb3React()
  const { library, account } = context
  const { t } = useTranslation('share2earn')
  const { callFunction } = useCallFunction()


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
  const [referralInfo, setReferralInfo] = useState({ level1: '', level2: '' })


  // Banner component 
  let bannerURL;
  if (detailStore.selectedBanner === "LinkedIn") {
    bannerURL = project.share_campaign[0].linkedin_banner;
  } else if (detailStore.selectedBanner === "Twitter") {
    bannerURL = project.share_campaign[0].twitter_banner;
  } else {
    bannerURL = project.share_campaign[0].facebook_banner;
  }

  const handleDownload = () => {
    saveAs(bannerURL, detailStore.selectedBanner + ".png");
  }

  const uid = user?.id?.split("-")[user?.id?.split("-").length - 1]

  useEffect(() => {
    if (project.share_campaign?.length) {
      getShareLogById({ campaignId: project.share_campaign[0].id }).then(function (
        res
      ) {
        if (res.data.getShareLog?.length) {
          let facebookURL = res.data.getShareLog[0].facebook;
          if (facebookURL) {
            setFacebook({ url: facebookURL, disable: true });
          }

          let twitterURL = res.data.getShareLog[0].twitter;
          if (twitterURL) {
            setTwitter({ url: twitterURL, disable: true });
          }

          let telegramURL = res.data.getShareLog[0].telegram;
          if (telegramURL) {
            setTelegram({ url: telegramURL, disable: true });
          }
        }
      });
    }
  }, []);

  const share2earnContract = useShare2EarnContract(share2earnAddress)
  useEffect(() => {
    const getInfo = async () => {
      const level1Incentive = await callFunction(share2earnContract, 'getTotalRefereesL1', [project.id.toString(), account])
      const level2Incentive = await callFunction(share2earnContract, 'getTotalRefereesL2', [project.id.toString(), account])
      setReferralInfo({ level1: parseInt(level1Incentive.toString()), level2: parseInt(level2Incentive.toString()) })
    }
    if (!!library && !!share2earnContract) {
      getInfo()
    }
  }, [])

  // Create or update url

  function submitShareURL() {
    if (project.share_campaign?.length) {
      createOrUpdateShareLogById({ campaignId: parseInt(project.share_campaign[0].id), walletAddress: account, twitter: twitter.url, facebook: facebook.url, telegram: telegram.url, linkedin: "" }).then(function (
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
    getBase64FromUrl("/icons/RADA Symbol.png").then(b64 => {
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
    if (project.share_campaign.length) {
      let tmpBaseFrames = {}
      for (let index = 0; index < project.share_campaign[0].avatar_frame.length; ++index) {
        let url = project.share_campaign[0].avatar_frame[index]
        const e = await getBase64FromUrl(url)
        tmpBaseFrames = { [index]: e, ...tmpBaseFrames }
      }
      setBaseFrames(tmpBaseFrames)
    }
  }

  const convertBase64Img = async () => {
    // Convert frame
    if (project.share_campaign.length && userAvatar) {
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
    console.log("Upload image button clicked")
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
    project.share_campaign[0].avatar_frame.map((data, index) => {
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
        <btn className="btn btn-default w-full !py-2"
          onClick={handleDownloadAvt}>
          <span className="icon"><i className="fa-duotone fa-download text-xs"></i></span>
          <span className="btn--text">Download</span>
        </btn>
      </div>
    );

    let dataImgs = isUploadImage ? mergeUploadImgs : mergeImgs
    mergedImage = (
      <div className="bg-gray-100 dark:bg-deepgray-50 grid gap-4 grid-cols-3 p-4">
        <div className="flex justify-center">
          <img className="" src={dataImgs[0]} alt="" />
        </div>

        <div className="flex justify-center">
          <img className="" src={dataImgs[1]} alt="" />
        </div>

        <div className="flex justify-center">
          <img className="" src={dataImgs[2]} alt="" />
        </div>
      </div>
    );
  } else {
    downloadAvtButton = null
    mergedImage = null
  }
  return (
    <>
      {/* <Head /> */}

      <div className="pane-content--sec--main grid scrollbar">

        <div className="page page-share2earn fadein">

          <div className="section max-w-screen-sm mx-auto">

            <div className="flex mb-4 items-center">

              <div className="flex w-12 md:mr-2 mt-1 flex-shrink-0 md:items-center md:justify-center">
                <span className="icon text-4xl"><i className="fa-solid fa-check-circle text-green-500"></i></span>
              </div>

              <div className="w-full">
                <h1 className="">
                  <span className="text-xl lg:text-lg font-semibold text-color-title">
                    Welcome to The Parallel #Share2Earn event.
                  </span>
                </h1>
                <div className="px-4 py-2 border border-gray-800 w-full mt-4 rounded-lg">
                  Please complete all following steps to earn RIR.
                </div>
              </div>

            </div>

            <div className="section-body !pt-0">
              <Share2EarnStatus level1={referralInfo.level1} level2={referralInfo.level2} />

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
                      <strong className="text-base text-color-title">Create banner</strong>
                      <span className="text-gray-500 dark:text-gray-400">Download &amp; use this banner on your social chanels</span>

                      <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <SelectBannerType />
                        <div className="p-0 pt-0 border-t border-gray-200 dark:border-gray-700">
                          <div className="">
                            <img class="" src={bannerURL} />
                          </div>
                        </div>

                        <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                          <btn className="btn btn-default w-full !py-2"
                            onClick={() => handleDownload()}>
                            <span className="icon"><i className="fa-duotone fa-download text-xs"></i></span>
                            <span className="btn--text">{t("main button download")}</span>
                          </btn>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col mt-4">
                      <strong className="text-base text-color-title">{t("create avatar title")}</strong>
                      <span className="text-gray-500 dark:text-gray-400">{t("create avatar des")}</span>

                      <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">

                        <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-gray-700">
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
                          {mergedImage}

                          {isUploadImage && !isUploaded &&
                            <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
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
                  <ShareLink uid={uid} share_message={project.share_campaign[0].share_message} />
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
                          {/* Telegram */}
                          <div className="mb-4">
                            <label for="telegram-post-url" className="sr-only block text-xs font-medium uppercase">Telegram's post link</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--telegram"><span class="icon"><i class="fa-brands fa-telegram"></i></span></span>
                              <input type="text" name="telegram-post-url" id="telegram-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20"
                                placeholder="Telegram's post link"
                                disabled={telegram.url === "" ? "" : (telegram.disable ? "disabled" : "")}
                                value={telegram.url}
                                onChange={(e) => { setTelegram({ url: e.target.value }) }}
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center">
                              </div>
                            </div>
                          </div>

                          {/* Twitter */}
                          <div className="mb-4">
                            <label for="twitter-post-url" className="sr-only block text-xs font-medium uppercase">Twitter's post link</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--Twitter"><span class="icon"><i class="fa-brands fa-twitter"></i></span></span>
                              <input type="text" name="twitter-post-url" id="twitter-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20"
                                placeholder="Twitter's post link"
                                disabled={twitter.url === "" ? "" : (twitter.disable ? "disabled" : "")}
                                value={twitter.url}
                                onChange={(e) => { setTwitter({ url: e.target.value }) }}
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center">
                              </div>
                            </div>
                          </div>

                          {/* Facebook */}
                          <div className="mb-4">
                            <label for="fb-post-url" className="sr-only block text-xs font-medium uppercase">Facebook's post link</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--Facebook"><span class="icon"><i class="fa-brands fa-facebook-f"></i></span></span>
                              <input type="text" name="fb-post-url" id="fb-post-url" className="!text-sm inputbox inputbox-lg !pl-12 !pr-20"
                                placeholder="Facebook's post link"
                                disabled={facebook.url === "" ? "" : (facebook.disable ? "disabled" : "")}
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
                          To avoid exploitation, we will manually approve RIR earning by checking your links submission, please make sure all links are <strong>public</strong>.</p>
                        <p className="pt-4">Any further question? Ask in our <a className="text-purple-400" href="t.me/radadao">Telegram</a></p>
                      </div>
                    </div>

                  </div>

                </li>

              </ol>

              <div className="lg:pl-14">
                <btn className={"w-full mt-4 btn btn-yellow justify-center py-3 px-4" + (facebook.disable && twitter.disable && telegram.disable) ? " disabled " : ""} type="submit"
                  onClick={submitShareURL}
                >Save</btn>
              </div>
            </div>

          </div>

        </div>

      </div>

    </>
  )

})

export default Share2EarnMainScreen

