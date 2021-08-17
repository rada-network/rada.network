import {observer} from "mobx-react";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
export const LanguageSwitch = observer(({dataStore}) => {
  const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);
  const router = useRouter()
  const handleChangeLanguage = (e) => {
    if (cookies.NEXT_LOCALE === "en"){
      setCookie('NEXT_LOCALE','vi',{path : "/",maxAge: 3600*7*24})
      router.push("/vi",'/vi',{locale: false})
    }
    else{
      setCookie('NEXT_LOCALE','en',{path : "/",maxAge: 3600*7*24})
      router.push("/en",'/en',{locale: false})
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