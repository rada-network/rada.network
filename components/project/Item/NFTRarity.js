
import { useEffect, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";


const NFTRarity = ({ project, pool }) => {


  return (
    <div className="card card-default">
      <div className="card-header">
        <h3>RADA NFT Rarity</h3>
        <a className="btn btn-default">
          <span className="btn--text text-xs">
            Learn more
          </span>
        </a>
      </div>
      <div className="card-body">
        <Disclosure as="div" className="disclosure">
          {({ open }) => (
            <>
              <Disclosure.Button as="div" className="disclosure--toggle">
                <strong>
                  Legendary
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
                  <div className="grid grid-cols-2 ">
                    <img className="h-12 w-24 object-cover rounded-lg" 
                    src="https://gql.dhunt.io/adminstaging/assets/ee76b828-f5f3-4d08-9775-7ddb420e8433?format=webp&width=128">
                    </img>
                    <div dangerouslySetInnerHTML={{ __html: "Description of legendary NFT" }}>
                    </div>  
                  </div>
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}


export default NFTRarity;
