import ProjectTimeline from "../../steps/projectTimeline";
import SwapTokens from "../../modules/boxPrefundFixed";
import Winners from "./Winners";
import { useState } from 'react'
import { CheckSvg } from "../../../../../components/svg/SvgIcons";

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
                  <div className="box-header !px-0">How to buy boxes</div>
                  <ul className="mt-4 flex-shrink-0 flex-grow">
                    <li className="list-pair mb-2">
                      <span className="list-key !w-3/4">Minimum boxes per order</span>
                      <span className="ml-auto list-value font-semibold tabular-nums">
                        1
                      </span>
                    </li>
                    <li className="list-pair mb-2">
                      <span className="list-key !w-3/4">Maximum boxes per order </span>
                      <span className="ml-auto list-value font-semibold tabular-nums">
                        10
                      </span>
                    </li>
                   
                  </ul>
                  <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-300 dark:border-gray-800">
                    <li className="flex mb-2 relative pl-6">
                      <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
                        <CheckSvg />  
                      </span>
                      <div className="">Some notice</div>
                    </li>
                  </ul>
                </div>
                <div className="box box--gray">
                  <div className="box-header relative flex">Bid </div>
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