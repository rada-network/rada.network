import ProjectTimeline from "../../../concepts/steps/projectTimeline";
import SwapTokens from "../../../concepts/modules/swapTokens";
import Toggle from "../../../concepts/toggle"
import Winners from "./Winners";
import { useState } from 'react'
import { Switch } from '@headlessui/react'

const MainActions = ({}) => {
  return (
    <>
      <div className="card-default project-main-actions no-padding overflow-hidden">
        <div className="card-header text-center sr-only">
          <h3>Public Sale</h3>
         
        </div>

        <div className="card-body no-padding">
          <div className="flex flex-col">
            <div className="">
              <ProjectTimeline step="2" />
            </div>

            <div className="project-card--container">
              <div className="mb-8 sr-only">
                <h3 className="text-3xl text-center font-normal">
                  <span className="text-color-title">Swap tokens</span>
                </h3>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="box box--transparent">
                  <div className="box-header !px-0">Your allocation</div>
                  <ul class="mt-4 flex-shrink-0 flex-grow">
                    <li class="list-pair mb-2">
                      <span class="list-key">Your maximum allocation</span>
                      <span class="ml-auto list-value font-semibold tabular-nums">
                        500 BUSD (5 RIR)
                      </span>
                    </li>
                    <li class="list-pair mb-2">
                      <span class="list-key">Your minimum allocation </span>
                      <span class="ml-auto list-value font-semibold tabular-nums">
                        100 BUSD (1 RIR)
                      </span>
                    </li>
                  </ul>
                  <div className="pt-4 mb-4 border-t border-gray-400 border-opacity-20">
                    <p>
                      <span className="icon mr-2 text-base">
                        <i class="fas fa-info-circle text-yellow-500"></i>
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