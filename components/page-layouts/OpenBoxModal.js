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
  const numberBox = store?.box.numberBox;
  const isOpened = store?.box.boxOpened;
  const openSuccessfullyBoxs = store?.box.openSuccessfullyBoxs;
  const isError = store?.box.isError;
  const message = store?.box.message;

  const [numberOpenBox, setOpenBox] = useState(0);
  const [boxIsOpened, setBoxIsOpened] = useState(false);
  const [nftIds, setNftIds] = useState([]);
  const [openedBoxs, setNumberBoxOpened] = useState(0);

  const closeModal = () => {
    store.box.reset()
  }

  useEffect(() => {
    setIsOpen(isOpening);
    setOpenBox(numberBox);
    if (tokenids.length > 0) {
      setNftIds(tokenids);
    }
    setBoxIsOpened(isOpened);
  }, [isOpening, tokenids, numberBox, isOpened, isError, message]);

  useEffect(() => {
    if (openSuccessfullyBoxs.length > 0) {
      let numberBoxOpened = 0;
      for (let i = 0; i < tokenids.length; i++) {
        let openedId = parseInt(tokenids[i].id);
        for (let j = 0; j < openSuccessfullyBoxs.length; j++) {
          if (openedId === parseInt(openSuccessfullyBoxs[j].id)) {
            numberBoxOpened += 1;
            break;
          }
        }
      }
      setNumberBoxOpened(numberBoxOpened)
    }
  }, [store.box.openedNumberBox])

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
            onClose={()=> {}}
          >
            <div className="dialog-outside min-h-screen px-4">
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
                    className="dialog-header"
                  >
                    <div className="mx-auto inline-flex">
                      {t("Open your boxes")}
                    </div>
                  </Dialog.Title>

                  <div className="p-4 md:p-6 text-sm text-gray-600 dark:text-gray-300">
                    {!isBoxOpening &&
                      <div className="mx-auto text-center">
                        {!isError ? (
                          <p>{t("Please wait while we order the box for you")}</p>
                        ) : (
                          <p className="mb-4" >{message}</p>
                        )}
                      </div>
                    }

                    {isBoxOpening && !isError &&
                      <div className="mx-auto text-center">
                        <p className="text-base mx-auto text-green-500">
                          <span className="icon mr-2"><i class="fa-duotone fa-badge-check"></i></span>
                          {t(`Open ${openedBoxs}/${numberBox} box successfully`)}
                        </p>
                      </div>
                    }

                    {/*Box list */}
                    {!isError && (
                      <div className={`flex flex-wrap justify-center py-4`}>
                        {tokenids.map(function (nft) {
                          return <NftItem key={nft.tokenID} item={nft} />
                        })}

                        {tokenids.length == 0 && (
                          <>
                            {Array(numberOpenBox + 1).fill(null).map((_, i) => {
                              return (
                                <NftItem boxID={i} />
                              )
                            })}
                          </>
                        )}
                      </div>
                    )}


                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className={`btn btn-default-lg btn-primary ${((openedBoxs == numberOpenBox) || isError) ? "" : "disabled"}`}
                        onClick={closeModal}>
                        {t("Close")}
                      </button>
                    </div>

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

const OpeningText = function () {
  const [counter, setCounter] = useState(0);
  const [text, setText] = useState("Opening ")
  let interval
  useEffect(() => {
    interval = setInterval(() => {
      setCounter(prevCount => prevCount + 1)
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])
  useEffect(() => {
    if (counter % 4 === 0) {
      setText("")
    }
    if (counter % 4 === 1) {
      setText(" .")
    }
    if (counter % 4 === 2) {
      setText(" . . ")
    }
    if (counter % 4 === 3) {
      setText(" . . .")
    }
  }, [counter])
  return (
    <>
      {text}
    </>
  )
}

export default OpenBoxModal;