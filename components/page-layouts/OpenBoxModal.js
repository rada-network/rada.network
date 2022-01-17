import { useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { observer } from "mobx-react";
import useStore from "@lib/useStore";
import { useTranslation } from "react-i18next";
import { CheckSvg } from "@components/svg/SvgIcons"
import useChainConfig from "@utils/web3/useChainConfig";
import NftItem from "@components/project/Item/Launchpad/AuctionSwap/openbox/NftItem";

const OpenBoxModal = observer(({ }) => {
  const store = useStore();
  const { t } = useTranslation("common");
  const { getBscTransactionURL } = useChainConfig();
  const [isOpen, setIsOpen] = useState(false);
  const isOpening = store?.box.isOpening;
  const tokenids = store?.box.tokenIds;
  const isBoxOpening = store?.box.isBoxOpening;

  const [nftIds, setNftIds] = useState([]);

  const closeModal = () => {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(isOpening);
    if (tokenids.length > 0) {
      setNftIds(tokenids);
    }
  }, [isOpening,tokenids]);

  

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <>
    {isOpen ? (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="dialog-outside-wrapper fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="dialog-outside min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="dialog-overlay fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-2xl my-8 overflow-hidden relative
          text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-md md:text-lg flex border-b dark:border-gray-00 border-gray-200
               font-medium p-4 md:p-6 leading-6 text-gray-900 dark:bg-gray-900 bg-opacity-50 
               dark:border-gray-800 dark:text-gray-300"
                >
                  <div className="mx-auto inlie-flex">
                    <span className="text-yellow-500 mr-2">
                      <i className="fad fa-exclamation-triangle"></i>
                    </span>
                    Box is opening
                  </div>
                </Dialog.Title>

                <div className="p-4 md:p-6 text-sm text-gray-600 dark:text-gray-300">
                  {!isBoxOpening && 
                    <span className="spinner-xl mx-auto"></span>
                  }

                  {/*Box list */}
                  <div className="grid grid-cols-3 gap-4 p-4">
                    {tokenids.map(function(nft){
                      return <NftItem key={nft.tokenID}  item={nft} />
                    })}
                  </div>
                </div>

                <div className="absolute right-4 top-2 md:top-4">
                  <button
                    type="button"
                    className={`inline-flex justify-center px-4 bg-transparent py-2 text-sm font-medium 
                    text-gray-500 border border-transparent rounded-md
                    hover:bg-gray-200 
                    dark:hover:bg-gray-700 focus:outline-none 
                    focus-visible:ring-2 focus-visible:ring-offset-2 
                    focus-visible:ring-blue-500"   `}

                    onClick={closeModal}
                  >
                    <i className="fa-duotone fa-close text-base"></i>
                  </button>
                </div>
              </div>

            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    ) : null}
    </>
  )
});


export default OpenBoxModal;