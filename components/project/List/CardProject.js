import React from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link"
import MiniCountdown from "./Countdown";
import { useState, useEffect, Fragment } from "react";
import useActiveWeb3React from "@utils/hooks/useActiveWeb3React";
import { useLaunchpadContractV2 } from "@utils/hooks/useContracts";
import { ethers, utils } from "ethers";
import fetcher from "@lib/fetchJson";
import numberFormatter from "@components/utils/numberFormatter";
import CardProjectProgress from "./CardProjectProgress";
import { Dialog, Transition } from "@headlessui/react";



export const CardProject = ({project,pool, status}) => {
  const {t,i18n} = useTranslation("launchpad");
  const [poolStatus, setPoolStatus] = useState("");
  const [poolContract, setPoolContract] = useState({"pool_id":'',"contract":null});
  const [showInfo, setShowInfo] = useState(true);
  useEffect(() => {
    if (pool.open_date !== null && Date.parse(pool.open_date) < Date.parse(pool.current_date) && Date.parse(pool.current_date) < Date.parse(pool.end_date)) {
      setPoolStatus("open")
    }

    if (Date.parse(pool.current_date) < Date.parse(pool.open_date)) {
      setPoolStatus("coming")
    }
    if (Date.parse(pool.current_date) > Date.parse(pool.end_date)){
      setPoolStatus("closed")
    }
    if (pool.open_date == null) {
      setPoolStatus("tba")
    }
    if (pool.type == "private"){
      setShowInfo(false)
    }
  }, [])

  useEffect(() => {
    if (pool !== null && !pool.is_hidden) {
      fetcher(`/api/pools/get-pools?slug=${project.slug}/${pool.slug}`).then(function(res){
        if (!!res.pool_id){
          setPoolContract(res)
        }
      })
    }
  }, []);

  const raise = pool.raise;
  let raise_token = "BUSD"
  let sale_token = project?.token?.symbol || "TBA"
  if (pool.token_sale == "fixed-swap" || pool.token_sale == "auction-swap"){
    raise_token = pool.token_name
    sale_token = pool.token_name
  }

  let [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  if (pool.is_hidden) return null
  return (
    // <Link href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`}>
    <div className={`card-project is-${project.status}`}>
      <div className="project-content relative">

        {!(project.status == "upcoming") && (
          <div className="block">
            <div className={`countdown-mini--wrapper top-0 !bottom-auto`}>
              {poolStatus == "open" && <div>{t("Pool closes in")}</div>}
              {poolStatus == "coming" && <div>{t("Sale start in")}</div>}
              {poolStatus == "closed" && <div>{t("pool closed")}</div>}
              {poolStatus == "tba" && <div>{t("Comming Soon")}</div>}
              {poolStatus == "coming" && <MiniCountdown pool={pool} isEndDate={false} />}
              {poolStatus == "open" && <MiniCountdown pool={pool} isEndDate={true} />}

            </div>
          </div>
        )}


        <div className="project-content--meta">
          <div className="project-title flex justify-between items-center">
            <div className="text-xl">
              <h5>{pool.title}</h5>
            </div>
            <div className="project-status -mt-1">
              <span className={`label label-${poolStatus}`}>{poolStatus}</span>
            </div>
          </div>

          <ul className="project-fields">
            <li className="list-pair mt-auto mb-0">
              <span className="list-key">
                {t("Raise")}
              </span>
              <span className="ml-auto list-value font-semibold">
                {pool.raise == 0 || !showInfo ? "TBA" : pool.raise.toLocaleString() + ` ${raise_token}`}
              </span>
            </li>
            <li className="list-pair">
              <span className="list-key">
                {t("Token Price")}
              </span>
              {pool.price ? 
              <span className="ml-auto list-value">
              1 {sale_token} = {pool.price} BUSD
              </span>
              :
              <span className="ml-auto list-value">
              TBA
              </span>
              }
              {/* <span className="list-value ml-auto"> {pool.price == 0 ? "TBA" : pool.price + " BUSD"}</span> */}
            </li>
          </ul>
          {poolContract.contract && <CardProjectProgress project={project} pool={{...pool,contract: poolContract.contract,pool_id : poolContract.pool_id}} />
          }
          <div className="project--cta">
            {pool.title.toLowerCase() !== "tba" &&  
            <Link href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`} >
            <a href={`/${i18n.language}/launchverse/${project.slug}/${pool.slug}`} className={`rounded-lg block mt-4 btn-default btn-lg text-center is-${status}`}>
              <span>
               {t("View Details")}
              </span>
            </a>
            </Link>
            }

            {pool.title.toLowerCase() === "tba" &&  
            <a href="#" onClick={openModal} className={`rounded-lg block mt-4 btn-default btn-lg text-center is-${status}`}>
              <span>
               {t("Learn More")}
              </span>
            </a>
            }
          </div>
          {/* End of project-cta */}
        </div>
      </div>
        {/* End of project--content */}
      {/* End of card--body */}
      {pool.title.toLowerCase() === "tba" &&  
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
                      <i className="fad fa-check"></i>
                    </span>
                  A Secret Flow</div>
                </Dialog.Title>
                <div className="p-4 md:p-6 text-sm text-gray-600 dark:text-gray-300">
                  <h2 className="text-sm md:text-lg text-center mt-4 mx-auto">
                    <p>secret content</p>
                  </h2>
                  
                </div>
                <div className="p-4 md:p-6">
                  <button  onClick={closeModal} className="btn btn-default btn-default-lg w-full md:w-md">Close</button>
                </div>
                <div className="absolute right-4 top-2 md:top-4">
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
      }
      {/* End of card--wrapper */}
    </div>
    // </Link>
  )
}

export default CardProject