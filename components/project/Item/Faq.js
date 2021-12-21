import { getFaqFeed } from "@data/query/faq";
import { Disclosure, Transition } from "@headlessui/react";
import { useState,useEffect } from "react";
import { useTranslation } from "react-i18next";

const ProjectFaq = ({project}) => {
  const {t,i18n} = useTranslation()
  const [listFaq,setListFaq] = useState([])
  useEffect(() => {
    getFaqFeed({page_slug : `launchverse/${project.slug}`,lang : i18n.language}).then(function(feed) {
      setListFaq(feed)
    })
  },[])
  return (
    <>
    {listFaq.length > 0 && <div className="card-default faqs launchverse-faqs mt-8">
      <div className="global-padding-lg">
        <h3 className="text-2xl text-center mb-4 font-semibold mx-auto">
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
                        <strong>
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
                          <div dangerouslySetInnerHTML={{ __html: item.answer }}>
                          </div>
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
    </div>
    }
    </>
  )
}

export default ProjectFaq