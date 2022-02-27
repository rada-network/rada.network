import ContentDescription from "@components/ContentDescription";
import { getFaqFeed } from "@data/query/faq";
import { Disclosure, Transition } from "@headlessui/react";
import { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";

const ProjectFaq = ({project, pool}) => {
  const {t,i18n} = useTranslation();
  const [listFaq,setListFaq] = useState([]);
  
  useEffect(() => {
    getFaqFeed({page_slug : `launchverse/${project.slug}`,lang : i18n.language}).then(function(feed) {
      setListFaq(feed)
    })
  },[]);
  
  return (
    <>
    {listFaq.length > 0 &&
      <div className="">
        <h3 className="text-lg md:text-xl text-center mb-4 font-medium mx-auto">
          {t("Frequently Asked Questions")}
        </h3>

        <div className="grid mx-auto max-w-screen-sm">
          <div>
            {listFaq.map(function(item){
              return (
                <div key={item.id}>
                  <Disclosure as="div" className="disclosure">
                  {({ open }) => (
                    <>
                      <Disclosure.Button as="div" className="disclosure--toggle">
                        <strong className="text-base">
                          {item.question}
                        </strong>
                        <span
                          className={`${open ? "open" : ""} disclosure--toggle-arrow`}
                        >
                          <i className="fas fa-angle-down"></i>
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-y-100 opacity-0"
                        enterTo="transform scale-y-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-y-100 opacity-100"
                        leaveTo="transform scale-y-0 opacity-0"
                      >
                        <Disclosure.Panel className="disclosure--panel">
                          <ContentDescription content={item.answer} />
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                  </Disclosure>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default ProjectFaq