import {observer} from "mobx-react";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";
import {Transition,Popover} from "@headlessui/react"
import { usePopper } from 'react-popper'
import {useRef, useState} from "react";
import { usePageStore} from "../lib/usePageStore"
export const LanguageSwitch = observer(({}) => {
  const {dataStore,detailStore} = usePageStore()
  const [cookies, setCookie] = useCookies(['NEXT_LOCALE']);
  const router = useRouter()
  const handleChangeLanguage = (e) => {
    const lang = e.currentTarget.getAttribute("lang")
    ///dataStore.lang = lang
    setCookie("NEXT_LOCALE",lang,{path : "/",maxAge: 24*7*3600})
    buttonRef.current?.click()
    router.push(router.asPath,undefined,{locale:lang})
    //router.reload()
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
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-0"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-0"
          >
          <div className={`popper`}>
            <div className="popper-item" onClick={async (e) => {handleChangeLanguage(e)}} lang={'vi'}>
              <span className="popper-item--text">Tiếng Việt</span>
            </div>
            <div className="popper-item" onClick={async (e) => {handleChangeLanguage(e)}} lang={'en'}>
              <span className="popper-item--text">English</span>
            </div>
          </div>
          </Transition>
        )}
      </Popover.Panel>

      <Popover.Button ref={buttonRef} className="btn btn-default btn-switch-lang" title="Change Language">
        <div>
          <span className="icon"><i className="fal fa-globe"/></span>
          <span className="btn--text">{langDisplay.toUpperCase()}</span>
        </div>
      </Popover.Button>

    </Popover>

  )
})