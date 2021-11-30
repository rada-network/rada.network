
import { useTranslation } from "next-i18next"
import { useState, useEffect } from "react"
import { createShortenLink } from "@data/query/createShortenLink"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import { useRef } from "react"
import PerfectScrollbar from 'perfect-scrollbar'
import "perfect-scrollbar/css/perfect-scrollbar.css"
import { useRouter } from "next/router"

const ShareLink = function ({ uid, share_message, project }) {
  const { t } = useTranslation("share2earn")
  const [shareUrl, setShareUrl] = useState("")
  const [textShare, setTextShare] = useState("")
  const [message, setMesage] = useState(share_message[0])
  const textRef = useRef()
  useEffect(() => {
    randomMessage()
    let url = window.location.origin + `/launchverse/${project.slug}/share2earn` + "?ref=" + uid;
    createShortenLink(url).then(({ data }) => {
      let shortenURL = "https://rada.to/" + data.createShortenLink.key
      setShareUrl(shortenURL)
      let combinedMessage = message + " " + "👉  Learn more here " + shortenURL
      setTextShare(combinedMessage)
    })
  }, [])

  const handleCopy = () => {
    toast.success("Copied to clipboard", {})
  };

  const randomMessage = () => {
    var item = share_message[Math.floor(Math.random() * share_message.length)]
    setMesage(item)
  }

  return (
    <>
      <div className="flex w-12 mb-2 md:mb-0 mr-2 mt-1.5 flex-shrink-0 md:items-center md:justify-center">
        <span className="icon !flex w-px-32 h-px-32 items-center justify-center rounded-full border-2 border-gray-300">
          <strong className="text-base">
            <span className="sr-only">Step</span>
            2
          </strong>
        </span>
      </div>

      <div className="flex flex-col w-full">

        <div className="flex flex-col  w-full">
          <strong className="text-base text-color-title">{t("main step 2 title")}</strong>
          <span className="text-gray-500 dark:text-gray-400">{t("main step 2 des")}</span>

          <div className="text-base mt-4 flex-shrink-0 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="p-4 h-32 scrollbar">
              <p className="mb-4 block" ref={textRef}>{message}</p>
              <p className="block">👉 &nbsp;Learn more here <a target="_blank" href={shareUrl} className="link">{shareUrl}</a></p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-3 px-4 border-t border-gray-200 dark:border-gray-700">
              <a className="btn btn-default !py-2"
                onClick={randomMessage}
              >
                <span className="icon"><i className="fa-duotone fa-refresh text-xs"></i></span>
                <span className="btn--text">Randomize</span>
              </a>
              <CopyToClipboard
                onCopy={handleCopy}
                text={textShare}
              >
                <button className="btn btn-default !py-2" href="" target="_blank">
                  <span className="icon"><i className="fa-duotone fa-copy text-xs"></i></span>
                  <span className="btn--text">Copy post</span>
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