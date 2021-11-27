import ProjectTimeline from "../../../../pages/concepts/_components/steps/projectTimeline";
import CountDownLg from "../../../../pages/concepts/_components/timers/countdownLg-whitelist";
import Media from "../../../../components/Media";
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

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
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 blur-md bg-black opacity-70" />
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
                  className="text-lg border-b dark:border-gray-800 border-gray-200
                   font-medium p-4 md:p-6 leading-6 text-gray-900 dark:text-gray-300"
                >
                  Connect your wallet
                </Dialog.Title>
                <div className="p-4 md:p-6 text-sm text-gray-600 dark:text-gray-300">
                  <div className="wallet-section pb-4 mb-4 border-b border-gray-200 dark:border-gray-800">
                    <div className="wallet-step">
                      <div className="icon mr-2 !flex w-px-24 h-px-24 items-center justify-center 
                      rounded-full border-2 border-gray-300 dark:border-gray-600">
                        <strong className="text-sm">
                          <span className="sr-only">Step</span>
                          1
                        </strong>
                      </div>
                      <h3>Choose a network</h3>
                    </div>
                    <ul className="flex mt-4 lg:ml-4">
                      <li className="wallet-item checked">
                        <button className="wallet-option ">
                          <img className="wallet-icon-img w-14 h-14" src="/wallet-icons/bsc.svg" alt="Binance Smart Chian" />
                          <span className="w-4 h-4 text-center bg-green-500 text-white rounded-full 
                                           absolute rounded-full top-0 right-0 flex items-center">
                            <i className="fa-duotone mx-auto font-bold fa-check text-2xs"></i>
                          </span>
                        </button>
                        
                        <div>Binance</div>
                      </li>
                      <li className="wallet-item">
                        <button className="wallet-option checked">
                          <img className="w-14 h-14" src="/wallet-icons/ethereum.svg" alt="Ethereum" />
                        </button>
                        <div>Ethereum</div>
                      </li>
                      <li className="wallet-item">
                        <button className="wallet-option checked">
                          <img className="w-14 h-14" src="/wallet-icons/polygon.svg" alt="Polygon" />
                        </button>
                        <div>Polygon</div>
                      </li>

                      <li className="wallet-item">
                        <button className="wallet-option checked">
                          <img className="w-14 h-14" src="/wallet-icons/solana.svg" alt="Solana" />
                        </button>
                        <div>Solana</div>
                      </li>

                    
                    </ul> 
                  </div>
                  {/* end of wallet-section */}
                  <div className="wallet-section">
                    <div className="wallet-step">
                      <div className="icon mr-2 !flex w-px-24 h-px-24 items-center justify-center 
                      rounded-full border-2 border-gray-300 dark:border-gray-600">
                        <strong className="text-sm">
                          <span className="sr-only">Step</span>
                          2
                        </strong>
                      </div>
                      <h3>Choose a wallet</h3>
                    </div>
                    <ul className="flex mt-4 lg:ml-4">
                      <li className="wallet-item checked">
                        <button className="wallet-option ">
                          <img className="wallet-icon-img w-14 h-14" src="/wallet-icons/metamask.svg" alt="Metamask" />
                          <span className="w-4 h-4 text-center bg-green-500 text-white rounded-full 
                                           absolute rounded-full top-0 right-0 flex items-center">
                            <i className="fa-duotone mx-auto font-bold fa-check text-2xs"></i>
                          </span>
                        </button>
                        
                        <div>Metamask</div>
                      </li>
                      <li className="wallet-item">
                        <button className="wallet-option checked">
                          <img className="w-14 h-14" src="/wallet-icons/ledger.svg" alt="Ledger" />
                        </button>
                        <div>Ledger</div>
                      </li>
                      <li className="wallet-item">
                        <button className="wallet-option checked">
                          <img className="w-14 h-14" src="/wallet-icons/wallet-connect.svg" alt="WalletConnect" />
                        </button>
                        <div>Wallet Connect</div>
                      </li>
                      <li className="wallet-item">
                        <button className="wallet-option checked">
                          <img className="w-14 h-14" src="/wallet-icons/trezor.svg" alt="Trezor" />
                        </button>
                        <div>Trezor</div>
                      </li>
                    </ul> 
                  </div>
                  {/* end of wallet section */}
                </div>

                <div className="absolute right-4 top-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 bg-transparent 
                    py-2 text-sm font-medium text-gray-500 border border-transparent rounded-md
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

        <div className="card-header text-center sr-only">
          <h3>Public Sale</h3>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="">
              <ProjectTimeline step="1" />
            </div>

            <div className="global-padding-lg !px-4 min-h-full max-w-xl w-full mx-auto">

              <div className="mb-8">
                <h3 className="text-3xl text-center font-normal">
                  <span className="text-color-title">Paralel's Whitelist</span>
                </h3>
                <p className="text-center mt-2 font-normal">
                  Đăng ký để được xét duyệt tham gia dự án
                </p>
              </div>

              <div className="list-group">
                <div className="list-group--item md:!pb-4">
                  <div className="list-group--item--title w-full md:w-1/4">
                    <div className="list-group--item--media">
                      <span className="icon"><i className="fa-solid fa-wallet"></i></span>
                    </div>
                    <label for="blockchain-wallet" className="text-color-desc">Wallet</label>
                  </div>
                  <div className="flex-1 md:mt-0">
                    <div className="relative pl-8 md:pl-0 w-full flex items-center">
                      <span>Chưa kết nối tài khoản ví</span>
                    </div>
                  </div>
                  <div className="text-right -mt-2 md:mt-0 w-1/5">
                    <button onClick={openModal} className="btn btn-default w-full">Kết nối</button>
                  </div>
                </div>

                <div className="list-group--item md:!pb-4">
                  <div className="list-group--item--title w-full md:w-1/4">
                    <div className="list-group--item--media">
                      <span className="icon"><i className="fas fa-user-check"></i></span>
                    </div>
                    <label for="blockchain-wallet" className="text-color-desc">KYC</label>
                  </div>
                  <div className="flex-1 md:mt-0">
                    <div className="relative pl-8 md:pl-0 w-full flex items-center">
                      <span>Chưa hoàn thành KYC</span>
                    </div>
                  </div>
                  <div className="text-right -mt-2 md:mt-0 w-1/5">
                    <button className="btn btn-default w-full">KYC</button>
                  </div>
                </div>
              </div>

            </div>

          </div>
            
        </div>

      </div>

      <div className="card-default project-main-actions no-padding overflow-hidden mt-8">

        <div className="card-header items-center">
          <h3>Winners (1000)</h3>
          <div className="search-wrapper">
            <div className="form-search rounded-full">
              <span className="icon form-search--icon">
                <i className="fa fa-search"></i>
              </span>
              <input type="text" value="" className="form-search--input" placeholder="Search for winner" />
            </div>
          </div>
        </div>

        <div className="card-body no-padding">

          <div className="flex flex-col">

            <div className="global-padding-lg min-h-full">

              <div className="">

                <h3 className="text-2xl text-center mb-8 font-normal"><span className="text-color-title">List of Winners Here</span></h3>

              </div>

            </div>

          </div>
            
        </div>

      </div>

     


    </>
  );
}

export default MainActions