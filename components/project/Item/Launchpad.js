import { BscSvg, UsdtSvg, LaunchSvg } from "../../svg/SvgIcons";
import MainActions from "../../../pages/concepts/_components/cards/launchpad/MainActions";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { usePageStore } from "../../../lib/usePageStore";
import LaunchpadOverview from "./Launchpad/Overview";
import LaunchpadContent from "./Launchpad/Content";
import LaunchpadActions from "./Launchpad/Actions/Index";

import { Disclosure, Transition } from "@headlessui/react";

const ProjectLaunchpad = ({ project, pool }) => {
  return (
    <>
      <div className="section">
        <LaunchpadOverview project={project} pool={pool} />

        <div className="section-body">
          <LaunchpadContent project={project} pool={pool} />

          {/* Main Action Card */}
          <div className="grid grid-cols-1 mt-4">
            <LaunchpadActions project={project} pool={pool} />
          </div>
          {/* END: Main Action Card */}
        </div>

        {/* FAQ */}
        {process.env.NEXT_PUBLIC_CHAIN == "dev" && 
        <div className="mt-8 card-default faqs launchverse-faqs">
          <div className="global-padding-lg">
            <h3 className="text-2xl text-center mb-4 font-semibold mx-auto">
              Frequenly Ask Questions
            </h3>

            <div className="grid mx-auto max-w-screen-sm">
              <div>
                <Disclosure as="div" className="disclosure">
                  {({ open }) => (
                    <>
                      <Disclosure.Button as="div" className="disclosure--toggle">
                        <strong className="">
                          How should I do prefunding?
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
                          <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>

                <Disclosure as="div" className="disclosure">
                  {({ open }) => (
                    <>
                      <Disclosure.Button as="div" className="disclosure--toggle">
                        <strong>
                          What's RIR?</strong>
                        <span
                          className={`${open ? "open" : ""} disclosure--toggle-arrow`}
                        >
                          <i className="fas fa-angle-down"></i>
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform origin-top scale-y-100 opacity-0"
                        enterTo="transform origin-top scale-y-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform origin-top scale-y-100 opacity-100"
                        leaveTo="transform origin-top scale-y-0 opacity-0"
                      >
                        <Disclosure.Panel className="disclosure--panel">
                          <div>
                            <p>RIR stands for RADA Investment Right. We share our investment opportunities with all investors (Community Members) through RIR. RIR is a smart contract running on BSC Network (Binance Smart Chain Network).</p>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>

              <div>
                <Disclosure as="div" className="disclosure">
                  {({ open }) => (
                    <>
                      <Disclosure.Button as="div" className="disclosure--toggle">
                        <strong>
                          If I'm not selected, can I get my money back?
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
                          <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>

                <Disclosure as="div" className="disclosure">
                  {({ open }) => (
                    <>
                      <Disclosure.Button as="div" className="disclosure--toggle">
                        <strong>
                          Is using RIR guarantee me 100% chance to win?
                        </strong>
                        <span
                          className={`${open ? "open" : ""} disclosure--toggle-arrow`}
                        >
                          <i className="fas fa-angle-down"></i>
                        </span>
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform origin-top scale-y-100 opacity-0"
                        enterTo="transform origin-top scale-y-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform origin-top scale-y-100 opacity-100"
                        leaveTo="transform origin-top scale-y-0 opacity-0"
                      >
                        <Disclosure.Panel className="disclosure--panel">
                          <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          </div>
        </div>
        }

      </div>


    </>
  );
};

export default ProjectLaunchpad;
