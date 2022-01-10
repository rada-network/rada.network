import { Disclosure, Transition } from "@headlessui/react";
import { data } from "autoprefixer";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const NftInfo = function({project,pool}){
  const {t} = useTranslation("launchpad")
  const [showMore,setShowMore] = useState(false)
  const toggleShow = function(e){
    setShowMore(!showMore)
  }
  if (pool.project_pool_nft.length === 0) {
    return null
  }
  let project_pool_nft = pool.project_pool_nft.slice(0)
  project_pool_nft.sort(function(a, b){
    return b.sort - a.sort
  })
  return (
    <div className="card card-default">
      <div className="card-header">
        <h3>{pool.token_name} NFT Rarity</h3>  
        <a className="btn btn-default">
          <span className="btn--text text-xs">
            Learn more
          </span>
        </a>      
      </div>
      <div className="card-body !py-0">
      {project_pool_nft.map(function(item,index){
        if (!showMore && index > 4) return null
        let defaultOpen = false;
        if (index === 0){
          defaultOpen = true;
        }
        return (
          <div key={item.id}>
            <Disclosure as="div" defaultOpen={defaultOpen} className="disclosure">
            {({ open }) => (
              <>
                <Disclosure.Button as="div" className="disclosure--toggle">
                  <strong className="!text-sm">
                    {item.title}
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
                    <div dangerouslySetInnerHTML={{ __html: item.description }}>
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
      <div className="card-footer">
        <button onClick={toggleShow} className="btn btn-default">{!showMore ? t("Show more rarity") : t("Show less rarity")}</button>
      </div>
    </div>
  )
}

export default NftInfo