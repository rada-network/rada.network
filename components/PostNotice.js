import {observer} from "mobx-react"
import {usePageStore} from "../lib/usePageStore"
import _ from "lodash"
import { useTranslation } from "next-i18next"
import { DISPLAY_SOURCES, LIST_SOURCE, LIST_URLS } from "../config/links"
const PostNotice = observer(({}) => {
  const {detailStore} = usePageStore()
  const {t} = useTranslation()
  if (_.isEmpty(detailStore.data)){
    return null
  }
  if (detailStore.data.websiteUri === null) return null

  const source = getSourceNewsFromUri(detailStore.data)
  let keywords,keywordMap = []
  if (detailStore.data.keywords !== null){ 
    try{
      keywords = JSON.parse(detailStore.data.keywords);
      keywords = Object.entries(keywords)
      keywordMap = keywords.map(function(item){
        return item[0]
      })
    }
    catch(e){
      keywordMap = detailStore.data.keywords !== null ? data.keywords.split(",") : [];
    }
  }
  let keywordText = keywordMap.map((item) => {
    return `<a href="/tags/${item.toLowerCase()}" rel="nofollow" target="_blank" class="link"><strong>${item.toUpperCase()}</strong></a>`
  })
  let startString = ` ${t("post notice start")}
  <a href="${source.url}" rel="nofollow noreferrer" target="_blank" class="link ml-2">
    <strong>${source.name}</strong> 
    <span class="icon ml-1"><i class="fa-duotone fa-external-link text-2xs relative -top-0.5"></i></span>
  </a>`
  let about = `<span class="mx-2">${t("about keyword")}</span> `
  keywordText = keywordText.join(", ")
  let text = keywordMap.length > 0 ? startString + about + keywordText : startString
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
function getSourceNewsFromUri(item){
  if (item.grabTopic !== null){
    return {name : item.grabTopic.website.name,url : item.grabTopic.website.url}
  }
  const websiteUri = item.websiteUri !== null ? item.websiteUri : ""
  const displaySources = DISPLAY_SOURCES
  const listSources = LIST_SOURCE
  const listUrl = LIST_URLS
  for (const [i, value] of listSources.entries()) {
    if (websiteUri.toLowerCase().includes(value)) {
      return {name : displaySources[i],url : listUrl[i]}
    }
  }
  return ""
}

export default PostNotice