import { observer } from "mobx-react";
import React from "react";
import { useEffect, useState, useReducer } from "react";
import { saveAs } from 'file-saver';
import { useTranslation } from "next-i18next";
import { useStore } from "@lib/useStore";
import { usePageStore } from "@lib/usePageStore";
import { Head } from "@components/Head"
import ShareLink from "./ShareLink"
import SelectBannerType from "./listbox-share2earn";
import { getShareLogById } from "../../../../data/query/getShareLog";
import { createOrUpdateShareLogById } from "../../../../data/query/createOrUpdateShareLog";
import mergeImages from 'merge-images';
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { toast } from "react-toastify"
import Share2EarnStatus from "./Share2EarnStatus"


const Share2EarnMainScreen = observer(({ project, user }) => {
  const { t } = useTranslation('share2earn')
  const { account } = useActiveWeb3React()
  const store = useStore()
  const { detailStore } = usePageStore();
  const [facebook, setFacebook] = useState({ url: '', disable: false });
  const [twitter, setTwitter] = useState({ url: '', disable: false });
  // Merge image state
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [mergeImgs, setMergeImgs] = useState({});
  const [mergeUploadImgs, setMergeUploadImgs] = useState({});
  const [baseFrames, setBaseFrames] = useState({});
  const [userAvatar, setUserAvatar] = useState(null);


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
          if (res.data.getShareLog.length) {
            setFacebook({ disable: true, url: facebookURL });
          }

          let twitterURL = res.data.getShareLog[0].twitter;
          if (twitterURL) {
            setTwitter({ disable: true, url: twitterURL });
          }
        }
      });
    }
  }, []);


  // Create or update url
  const facebookSubmit = async (e) => {
    if (!facebook.disable) {
      submitShareURL(e)
    }
    setFacebook({ disable: !facebook.disable, url: facebook.url })
  }

  const twitterSubmit = async (e) => {
    if (!twitter.disable) {
      submitShareURL(e)

    }
    setTwitter({ disable: !twitter.disable, url: twitter.url })
  }

  function submitShareURL(e) {
    if (project.share_campaign?.length) {
      createOrUpdateShareLogById({ campaignId: parseInt(1), walletAddress: account, twitter: twitter.url, facebook: facebook.url, linkedin: "" }).then(function (
        res
      ) {
        if (e.target.id === "facebook") {
          setFacebook({ disable: true, url: facebook.url })
        } else if (e.target.id === "twitter") {
          setTwitter({ disable: true, url: twitter.url })
        }
      });
    }
  }
  useEffect(() => {
    getBase64FromUrl(user.image).then(b64 => {
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
  }, [baseFrames,userAvatar]);

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
      <div className="pane-content--sec--main grid scrollbar">

        <div className="page page-share2earn fadein">

          <div className="section max-w-screen-sm mx-auto">

            <div className="flex mb-4 items-center">

              <div className="flex w-12 mr-2 mt-1 flex-shrink-0 items-center justify-center">
                <span className="icon text-4xl"><i className="fa-solid fa-check-circle text-green-500"></i></span>
              </div>

              <div>
                <h1 className="">
                  <span className="text-xl lg:text-lg font-semibold text-color-title">
                    {t("main result title")}
                  </span>
                </h1>
              </div>

            </div>

            <div className="section-body !pt-0">

              <Share2EarnStatus />


              <ol className="text-sm space-y-8">

                {/* Step 1 */}
                <li className="flex items-start">

                  <div className="flex w-12 mr-2 mt-1.5 flex-shrink-0 items-center justify-center">
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
                <li className="flex items-start">
                  <ShareLink uid={uid} share_message={project.share_campaign[0].share_message}/>
                </li>

                {/* Step 3 */}
                <li className="flex items-start">

                  <div className="flex w-12 mr-2 mt-1.5 flex-shrink-0 items-center justify-center">
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

                          {/* Facebook */}
                          <div className="mb-4">
                            <label for="fb-post-url" className="sr-only block text-xs font-medium uppercase">Facebook's post link</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--Facebook"><span class="icon"><i class="fa-brands fa-facebook-f"></i></span></span>

                              <input type="text" name="fb-post-url" id="fb-post-url"
                                className="!text-sm inputbox inputbox-lg !pl-12 !pr-20"
                                disabled={facebook.url === "" ? "" : (facebook.disable ? "disabled" : "")}
                                placeholder={facebook.url ? (facebook.disable ? facebook.url : "") : "Facebook's post link"}
                                value={!facebook.disable ? facebook.url : ""}
                                onChange={(e) => { setFacebook({ disable: false, url: e.target.value }) }} />

                              {facebook.url &&
                                <div className="absolute inset-y-0 right-1 flex items-center">
                                  <btn className={"btn py-1 px-2 w-16 " + (facebook.disable ? "btn-gray justify-center" : "btn-primary")}
                                    onClick={facebookSubmit}
                                  >{facebook.disable ? "Edit" : "Submit"}</btn>
                                </div>
                              }

                            </div>
                          </div>

                          {/* Twitter */}
                          <div className="mb-4">
                            <label for="twitter-post-url" className="sr-only block text-xs font-medium uppercase">Twitter's post link</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <span class="absolute top-2 left-3 flex justify-center items-center w-px-24 h-px-24 rounded-full mr-4 brand--Twitter"><span class="icon"><i class="fa-brands fa-twitter"></i></span></span>
                              <input type="text" name="fb-post-url" id="fb-post-url"
                                className="!text-sm inputbox inputbox-lg !pl-12 !pr-20"
                                disabled={twitter.url === "" ? "" : (twitter.disable ? "disabled" : "")}
                                placeholder={twitter.url ? (twitter.disable ? twitter.url : "") : "Facebook's post link"}
                                value={!twitter.disable ? twitter.url : ""}
                                onChange={(e) => { setTwitter({ disable: false, url: e.target.value }) }} />


                              {twitter.url &&
                                <div className="absolute inset-y-0 right-1 flex items-center">
                                  <btn className={"btn py-1 px-2 w-16 " + (twitter.disable ? "btn-gray justify-center" : "btn-primary")}
                                    onClick={twitterSubmit}
                                  >{twitter.disable ? "Edit" : "Submit"}</btn>
                                </div>
                              }
                            </div>
                          </div>

                        </form>
                      </div>
                    </div>

                  </div>

                </li>

              </ol>

            </div>

          </div>

        </div>

      </div>

    </>
  )

})

export default Share2EarnMainScreen

