import {observer} from "mobx-react";
import {useCookies} from "react-cookie";
export const LanguageSwitch = observer(({dataStore}) => {
  const [cookies, setCookie] = useCookies(['dhunt_language']);
  const handleChangeLanguage = (e) => {
    if (cookies.dhunt_language === "en"){
      setCookie('dhunt_language','vi',{path : "/"})
      window.location.href = "/" + cookies.dhunt_language
    }
    else{
      setCookie('dhunt_language','en',{path : "/"})
      window.location.href = "/" + cookies.dhunt_language
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