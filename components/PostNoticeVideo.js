import {observer} from "mobx-react"
import {usePageStore} from "../lib/usePageStore"
import _ from "lodash"
import { useTranslation } from "next-i18next"
const PostNoticeMedia = observer(({}) => {
  const {detailStore} = usePageStore()
  const {t} = useTranslation()
  if (_.isEmpty(detailStore.data)){
    return null
  }
  if (detailStore.data.websiteUri === null) return null

  const source = getSourceVideoFromUri(detailStore.data)

  let keywordText = detailStore.data.tokens.map((item) => {
    return `<a href="#" data-key="${item.slug}" rel="nofollow" target="_blank" class="link"><strong>${item.name.toUpperCase()}</strong></a>`
  })
  let startString = ` ${t("post notice video start")}
  <a href="${source.url}" rel="nofollow noreferrer" target="_blank" class="link ml-2">
    <strong>${source.name}</strong> 
    <span class="icon ml-1"><i class="fa-duotone fa-external-link text-2xs relative -top-0.5"></i></span>
  </a>`
  let about = `<span class="mx-2">${t("about video keyword")}</span> `
  keywordText = keywordText.join(", ")
  let text = detailStore.data.tokens.length > 0 ? startString + about + keywordText : startString
  return (
    <>
    <div className="post-notice">

      <div className="flex items-center">
        <p dangerouslySetInnerHTML={{__html: text}} />
      </div>

    </div>

    </>
  )
})
function getSourceVideoFromUri(item){
  if (item.grabTopic !== null){
    return {name : item.grabTopic.name,url : item.grabTopic.url}
  }
  return {name : "RADA",url : "https://rada.network"}
}

export default PostNoticeMedia