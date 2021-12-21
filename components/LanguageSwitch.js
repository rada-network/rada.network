import { observer } from "mobx-react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { Transition, Popover } from "@headlessui/react";
import { usePopper } from "react-popper";
import { useRef, useState } from "react";
import { usePageStore } from "../lib/usePageStore";

const LanguageSwitch = observer(({}) => {
  const { dataStore, detailStore } = usePageStore();
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);
  const router = useRouter();
  const handleChangeLanguage = (lang) => {
    // const lang = e.currentTarget.getAttribute("lang")
    ///dataStore.lang = lang
    setCookie("NEXT_LOCALE", lang, { path: "/", maxAge: 24 * 7 * 3600 });
    // buttonRef.current?.click()
    closeChooser();

    if (dataStore.page === "item") {
      if (detailStore.data && detailStore.data.multilang !== null) {
        let targetObj = null;
        targetObj = detailStore.data.multilang?.news[lang];
        if (!targetObj) {
          targetObj = detailStore.data.multilang?.video[lang];
        }
        if (targetObj) {
          detailStore.data = {};
          router.push("/post/" + targetObj.slug, "/post/" + targetObj.slug, {
            locale: lang,
          });
        } else {
          detailStore.data = {};
          router.push("/explore/" + dataStore.type, undefined, {
            locale: lang,
          });
        }
      } else {
        if (detailStore.data) {
          detailStore.data = {};
          router.push("/explore/" + dataStore.type, undefined, {
            locale: lang,
          });
        } else {
          router.push(router.asPath, undefined, { locale: lang });
        }
      }
    } else {
      router.push(router.asPath, undefined, { locale: lang });
    }

    //router.reload()
  };

  const closeChooser = () => {
    buttonRef.current?.click();
  };


  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  const buttonRef = useRef();

  const Lang = ({ lang, title }) => {
    return dataStore.lang == lang ? (
      <div className="popper-item active" lang={lang} onClick={closeChooser}>
        <span className="popper-item--text">{title}</span>
      </div>
    ) : (
      <div
        className="popper-item"
        onClick={() => {
          handleChangeLanguage(lang);
        }}
        lang={lang}
      >
        <span className="popper-item--text">{title}</span>
      </div>
    );
  };

  return (
    <Popover className="relative">
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
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
              <Lang lang="vi" title="Tiếng Việt" />
              <Lang lang="en" title="English" />
              <Lang lang="fr" title="Français" />
              <Lang lang="es" title="Español" />
              <Lang lang="dk" title="Dansk" />

              {/* <div className="popper-item" onClick={async (e) => {handleChangeLanguage(e)}} lang={'vi'}>
              <span className="popper-item--text">Tiếng Việt</span>
            </div>
            <div className="popper-item" onClick={async (e) => {handleChangeLanguage(e)}} lang={'en'}>
              <span className="popper-item--text">English</span>
            </div> */}
            </div>
          </Transition>
        )}
      </Popover.Panel>

      <Popover.Button
        ref={buttonRef}
        className="btn btn-default btn-switch-lang"
        title="Change Language"
      >
        <div>
          <span className="icon">
            <i className="fal fa-globe" />
          </span>
          <span className="btn--text">{dataStore.lang.toUpperCase()}</span>
        </div>
      </Popover.Button>
    </Popover>
  );
});

export default LanguageSwitch;
