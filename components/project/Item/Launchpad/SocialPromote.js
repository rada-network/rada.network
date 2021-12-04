import { useTranslation } from "react-i18next"

const SocialPromote = ({}) => {
  const {t} = useTranslation("launchpad")
  return (
    <div className="max-w-md mx-auto">
      <p class="text-sm text-center mt-4 leading-7" dangerouslySetInnerHTML={{__html : t("coming soon note",
        {
          twitter : `<a class="link" target="_blank" rel="nofollow" href="https://twitter.com/rada_network">@rada_network</a>`,
          radanetwork : `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radanetwork">Telegram channel</a>`,
          radadao : `<a class="link" target="_blank" rel="nofollow" href="https://t.me/radadao">Telegram Community</a>`
        }
      )}} >
      </p>
    </div>
  )
}

export default SocialPromote