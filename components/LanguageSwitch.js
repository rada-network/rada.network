import {observer} from "mobx-react";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import {Menu,Popover} from "@headlessui/react"
import { usePopper } from 'react-popper'
import {useRef, useState} from "react";

export const LanguageSwitch = observer(({dataStore}) => {
  const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);
  const router = useRouter()
  const handleChangeLanguage = (e) => {
    const lang = e.currentTarget.getAttribute("lang")
    dataStore.lang = lang
    setCookie("NEXT_LOCALE",lang,{path : "/",maxAge: 24*7*3600})
    router.push(router.asPath,undefined,{locale:lang})
    buttonRef.current?.click()
  }
  let langDisplay = ''
  if (dataStore.lang === 'vi' ){
    langDisplay = 'vi'
  }
  else{
    langDisplay = 'en'
  }
  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement)
  const buttonRef = useRef();

  return (
    <Popover className="relative">
      <Popover.Panel ref={setPopperElement}
                     style={styles.popper}
                     {...attributes.popper}>
        {({ close }) => (
          <div className={`bg-white `}>
            <button className="btn nav-btn btn-switch-lang " onClick={async (e) => {handleChangeLanguage(e)}} lang={'vi'}>VI-VN</button>
            <button className="btn nav-btn btn-switch-lang" onClick={async (e) => {handleChangeLanguage(e)}} lang={'en'}>EN-US</button>
          </div>
        )}

      </Popover.Panel>
      <Popover.Button ref={buttonRef} className="btn nav-btn btn-switch-lang" data-tip="Change Language / Edition">
          <div>
            <span className="icon"><i className="fal fa-globe"/></span>
            <span className="btn--text">{langDisplay.toUpperCase()}</span>
          </div>
          <span className="dropdown-arrow"><i className="fas fa-caret-up"/></span>
      </Popover.Button>
    </Popover>
  )
})