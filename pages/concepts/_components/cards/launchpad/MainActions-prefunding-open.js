import ProjectTimeline from "../../steps/projectTimeline";
import SwapTokens from "../../modules/swapTokens";
import Winners from "./Winners";
import { useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

const MainActions = ({}) => {
  let [isOpen, setIsOpen] = useState(true)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
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
              <div className="inline-block w-full max-w-2xl my-8 overflow-hidden relative
              text-left align-middle transition-all transform bg-white dark:bg-gray-900 shadow-xl rounded-lg">
                <Dialog.Title
                  as="h3"
                  className="text-base flex border-b border-gray-200
                  font-medium p-4 md:p-6 leading-6 text-gray-900 dark:bg-gray-900 bg-opacity-50 
                  dark:border-gray-800 dark:text-gray-300"
                >
                  <div className="mx-auto inlie-flex">
                    {/* <span className="icon text-yellow-500 mr-2">
                      <i class="fa-solid fa-circle-info"></i>
                    </span> */}
                  Transaction is in progress</div>
                </Dialog.Title>
                <div className="p-4 md:p-6 text-sm text-gray-600 dark:text-gray-300">
                  <span className="spinner-xl mx-auto"></span>
                  <h2 className="text-base text-center my-4 mx-auto">
                    <p>BSC network is under heavy load. It may take up to 5 minutes to complete the transaction.Thanks for your patience!</p>
                  </h2>
                  
                </div>
                <div className="p-4 md:p-6">
                  <button  onClick={closeModal} className="btn btn-default btn-default-lg w-full md:w-md">Close</button>
                </div>
                <div className="absolute right-4 top-2 md:top-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 bg-transparent 
                    py-2 text-sm font-medium text-gray-500 border border-transparent rounded-full
                     hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none 
                     focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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

      <div className="card-default project-main-actions no-padding overflow-hidden">

        <div className="card-body no-padding">
          <div className="flex flex-col">
            <div className="">
              <ProjectTimeline step="2" />
            </div>

            <div className="project-card--container">
              <div className="mb-8 sr-only">
                <h3 className="text-2xl text-center font-normal">
                  <span className="text-color-title">Swap tokens</span>
                </h3>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="box box--transparent">
                  <div className="box-header !px-0">Your allocation</div>
                  <ul className="mt-4 flex-shrink-0 flex-grow">
                    <li className="list-pair mb-2">
                      <span className="list-key">Your maximum allocation</span>
                      <span className="ml-auto list-value font-semibold tabular-nums">
                        500 BUSD (5 RIR)
                      </span>
                    </li>
                    <li className="list-pair mb-2">
                      <span className="list-key">Your minimum allocation </span>
                      <span className="ml-auto list-value font-semibold tabular-nums">
                        100 BUSD (1 RIR)
                      </span>
                    </li>
                  </ul>
                  <div className="pt-4 mb-4 border-t border-gray-400 border-opacity-20">
                    <p>
                      <span className="icon mr-2 text-base">
                        <i className="fas fa-info-circle text-yellow-500"></i>
                      </span>
                      <span>
                        If you already have RIR, it's recommended to use RIR instead of 
                        BUSD to quarantee your application.
                      </span>
                    </p>
                  </div>
                </div>
                <div className="box box--gray">
                  <div className="box-header relative flex">Prefund</div>
                  <SwapTokens />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainActions