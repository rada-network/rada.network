import { useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { observer } from "mobx-react";
import useStore from "@lib/useStore";
import { useTranslation } from "react-i18next";
import { CheckSvg } from "@components/svg/SvgIcons"
import useChainConfig from "@utils/web3/useChainConfig";

const TransactionModal = observer(({ }) => {
  const store = useStore();
  const { t } = useTranslation("common");
  const { getBscTransactionURL } = useChainConfig();
  const [isOpen, setIsOpen] = useState(false);

  const isOpening = store?.transaction.isOpening;
  const transactionHash = store?.transaction.transactionHash;
  const isError = store?.transaction.isError;
  const message = store?.transaction.message;
  const isStartTransaction = store?.transaction.isStartTransaction;

  function closeModal() {
    if (transactionHash !== "" || isError) {
      setIsOpen(false);
      store.transaction.showTransaction(false);
    }
  }

  useEffect(() => {
    setIsOpen(isOpening);
  }, [isOpening])
  let timeoutShowBscWarning
  useEffect(() => {
    if (isStartTransaction) {
      timeoutShowBscWarning = setTimeout(function() {
        if (transactionHash == "") {
          store?.transaction.updateMessage(t("bsc warning"));
        }
      }, 5000);
    }
    else{
      clearTimeout(timeoutShowBscWarning);
    }
    
  }, [isStartTransaction]);

  function openModal() {
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
                <div className="inline-block w-full max-w-xl my-8 overflow-hidden relative
            text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-lg">
                  <Dialog.Title
                    as="h3"
                    className="dialog-header"
                  >
                    <div className="mx-auto inlie-flex">
                      {/* <span className="icon text-yellow-500 mr-2">
                        <i class="fa-solid fa-circle-info"></i>
                      </span> */}
                      {isError ? t("transaction error") : transactionHash !== "" ? t("transaction completed") : t("transaction in progress")}
                    </div>
                  </Dialog.Title>
                  <div className="p-4 md:p-6 text-sm text-gray-600 dark:text-gray-300">
                    {transactionHash !== "" && !isError ? (
                      <div className="w-full flex justify-center">
                        <span class="icon text-5xl">
                          <i class="fa-solid fa-check-circle text-green-500"></i>
                        </span>
                      </div>
                    ) : (
                      <>
                        {transactionHash == "" && !isError && isStartTransaction && (
                          <span className="spinner-xl mx-auto"></span>
                        )}
                      </>
                    )}

                    <div className="text-center my-4 mx-auto">
                      {transactionHash !== "" && !isError ? (
                        <div>
                          <span className="block mb-1">
                            {t("View more details")}
                          </span>
                          <a className="link" href={getBscTransactionURL(transactionHash)} target="_blank">
                            {`${transactionHash.substr(0, 8)}...${transactionHash.substr(-8)}`}
                          </a>
                        </div>

                      ) : (
                        <>
                        <span className="text-5xl block icon mb-4 text-yellow-500">
                          <i class="fa-duotone fa-circle-info"></i>
                        </span>
                        <p>
                          {message}
                        </p>
                        </>
                      )}
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        className={`btn btn-lg btn-primary 
                        ${transactionHash == "" && !isError ? "disabled" : ""}`}

                        onClick={closeModal}
                      >
                        {t("Close")}
                      </button>
                    </div>

                  </div>

                  <div className="absolute right-4 top-3">
                    <button
                      type="button"
                      className={`btn-close--boxes
                      ${transactionHash == "" && !isError ? "disabled" : ""}`}

                      onClick={closeModal}
                    >
                      <i className="fa-solid fa-close text-base"></i>
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

export default TransactionModal;
