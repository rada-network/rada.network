import { observer } from "mobx-react";
import React from "react";
import { useEffect, useState, useReducer } from "react";
import { useTranslation } from "next-i18next";
import { getCurrentUser } from "../../data/query/user";
import { useStore } from "../../lib/useStore";
import mergeImages from 'merge-images';

const AvatarGenerator = observer(() => {
  const { t } = useTranslation('share2earn');
  const [user, setUser] = useState({});
  const [session, setSession] = useState();
  const store = useStore();
  const [isUploadImage, setIsUploadImage] = useState(false);
  const [mergeImgs, setMergeImgs] = useState(null);
  const [mergeUploadImgs, setMergeUploadImgs] = useState({});
  const [baseFrames, setBaseFrames] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  useEffect(() => {
    getCurrentUser().then((res) => {
      setUser(res);
      getHightQualityImage(res);
    });
    // If session exists, display content
  }, [session]);

  useEffect(() => {
    convertBase64Frames()
  }, []);

  useEffect(() => {
    convertBase64Img();
  }, [baseFrames, userAvatar]);

  function getHightQualityImage(user) {
    let hightQualityURL = "";
    if (user) {
      console.log(user);
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
    }

    getBase64FromUrl(hightQualityURL).then(b64 => {
      resizeImage(b64).then(result => {
        setUserAvatar(result)
      })
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


  const convertBase64Frames = async function () {
    const e = await getBase64FromUrl("/icons/lv.png")
    const resultResize = await resizeImage(e)
    setBaseFrames(resultResize)
  }

  const  resizeImage = async (base64Str, maxWidth = 512, maxHeight = 512) => {
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
        resolve(canvas.toDataURL())
      }
    })
  }

  const handleDownloadAvt = () => {
    var a = document.createElement("a");
      a.href = mergeImgs;
      a.download = "Avatar.png";
      a.click();
  };

  const convertBase64Img = async () => {
    let result = await mergeImages([userAvatar, baseFrames])
    setMergeImgs(result)
  }

  return (
    <>
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
                    Welcome to #Share2Earn event.
                  </span>
                </h1>
                <div className="px-4 py-2 border border-gray-800 w-full mt-4 rounded-lg">
                  Please complete all following steps to earn RIR.
                </div>
              </div>

            </div>

            <div className="section-body !pt-0">
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
                      <strong className="text-base text-color-title">Create Avatar</strong>
                      <span className="text-gray-500 dark:text-gray-400">Download &amp; change your avatar on your social chanels</span>

                      <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">

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

                        <div className="bg-gray-100 dark:bg-deepgray-50 grid gap-4 grid-cols-3 p-4">
                          <div className="flex justify-center">
                            <img className="" src="" alt="" />
                          </div>

                          <div className="flex justify-center">
                            <img className="" src={mergeImgs} alt="" />
                          </div>
                        </div>
                        <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
                          <button className="btn btn-default w-full !py-2"
                            onClick={handleDownloadAvt}
                          >
                            <span className="icon"><i className="fa-duotone fa-download text-xs"></i></span>
                            <span className="btn--text">Download</span>
                          </button>

                        </div>

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
  );
})

export default AvatarGenerator;
