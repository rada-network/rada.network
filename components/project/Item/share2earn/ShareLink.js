
import {useTranslation} from "next-i18next"
import {useState, useEffect} from "react"
import {createShortenLink} from "@data/query/createShortenLink"
import { CopyToClipboard } from "react-copy-to-clipboard"
import {toast} from "react-toastify"
import {useRef} from "react"
const ShareLink = function({uid}){
  const {t} = useTranslation("share2earn")
  const [shareUrl,setShareUrl] = useState("")
  const [textShare,setTextShare] = useState("")
  const textRef = useRef()
  useEffect(() => {
    let url = window.location.origin + window.location.pathname + "?ref=" + uid;
    createShortenLink(url).then(({data}) => {
      setShareUrl("https://rada.to/"+data.createShortenLink.key)
    })
  },[])

  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  };
  
  return (
    <>
      <div className="flex w-12 mr-2 mt-1.5 flex-shrink-0 items-center justify-center">
        <span className="icon !flex w-px-32 h-px-32 items-center justify-center rounded-full border-2 border-gray-300">
          <strong className="text-base">
            <span className="sr-only">Step</span>
            2
          </strong>
        </span>
      </div>

      <div className="flex flex-col">

        <div className="flex flex-col">
          <strong className="text-base text-color-title">{t("main step 2 title")}</strong>
          <span className="text-gray-500 dark:text-gray-400">{t("main step 2 des")}</span>

          <div className="text-base mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="p-4">
              <p className="mb-4" ref={textRef}>This game is whole new generation metaverse. Never seen anything like this!
                I can play and earn so well 💰✨✨</p>
              <p>👉 &nbsp;Learn more here <a target="_blank" href={shareUrl} className="link">{shareUrl}</a></p>
            </div>

            <div className="py-3 px-4 border-t border-gray-200 dark:border-gray-700">
              <CopyToClipboard
                onCopy={handleCopy}
                text={shareUrl}
              >
                <button className="btn btn-default  w-full !py-2">
                <span className="icon"><i className="fa-duotone fa-copy text-xs"></i></span>
                <span className="btn--text">Copy to clipboard</span>
                </button>
              </CopyToClipboard>
              
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default ShareLink