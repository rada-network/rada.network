import {observer} from "mobx-react";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import {data} from "autoprefixer";
export const LanguageSwitch = observer(({dataStore}) => {
  const router = useRouter()
  const [cookies, setCookie] = useCookies(['dhunt_language']);
  const handleChangeLanguage = (e) => {
    if (cookies.dhunt_language === "en"){
      setCookie('dhunt_language','vi',{path : "/"})
      router.push(router.pathname,undefined,{locale : "vi"})
    }
    else{
      setCookie('dhunt_language','en',{path : "/"})
      router.push(router.pathname,undefined,{locale : "en"})
    }

  }
  let langDisplay = ''
  if (dataStore.lang === 'vi' ){
    langDisplay = 'en'
  }
  else{
    langDisplay = 'vi'
  }
  return (
    <div className="btn nav-btn btn-switch-lang" data-tip="Change Language / Edition" onClick={(e) =>{handleChangeLanguage(e)}}>
      <div>
        <span className="icon"><i className="fal fa-globe"/></span>
        <span className="btn--text">{langDisplay.toUpperCase()}</span>
      </div>
      <span className="dropdown-arrow"><i className="fas fa-caret-up"/></span>
    </div>
  )
})