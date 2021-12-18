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
  const {t,i18n} = useTranslation("launchpad");
  
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
                        <strong>
                          {t("How can we participate in IDOs on LaunchVerse?-question")}
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
                            <p>
                              {t("How can we participate in IDOs on LaunchVerse?-answer")}
                            </p>
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
                          {t("Are IDOs on LaunchVerse conducted on a FCFS basis, Overflow structure or is it lucky-based?-question")}
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
                            <p>
                              {t("Are IDOs on LaunchVerse conducted on a FCFS basis, Overflow structure or is it lucky-based?-answer")}
                            </p>
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
                          {t("What is RIR and how can I use it on LaunchVerse?-question")}
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
                            <p>
                            {t("What is RIR and how can I use it on LaunchVerse?-answer")}
                              {/* To understand what RIR means, refer to <a target="_blank" href=" https://rada.network/en/post/everything-you-need-to-know-about-rir-rada-investment-right">this article.</a> For any IDO on LaunchVerse, using RIR will get you a 99% guaranteed allocation (minimum: $100 BUSD). */}
                            </p>
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
                          {t("How many percentage for each pool is dedicated to RIR and how many for BUSD?-question")}
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
                            <p>
                            {t("How many percentage for each pool is dedicated to RIR and how many for BUSD?-answer")}
                            </p>
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
                          {t("Where can I find information on new IDOs on LaunchVerse?-question")}
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
                            <p>
                              {t("Where can I find information on new IDOs on LaunchVerse?-answer")}
                            </p>
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
                          {t("I don't have any RIR. Can I still participate in IDOs on LaunchVerse?-question")}
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
                            <p>
                              {t("I don't have any RIR. Can I still participate in IDOs on LaunchVerse?-answer")}
                            </p>
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
                          {t("What does prefunding mean?-question")}
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
                            <p>
                              {t("What does prefunding mean?-answer")}
                            </p>
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
                          {t("If I am in the final Whitelist, how can I claim my tokens?-question")}
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
                            <p>
                            {t("If I am in the final Whitelist, how can I claim my tokens?-answer")}
                            </p>
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
                          {t("Does LauchVerse support mobiles?-question")}
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
                            <p>
                              {t("Does LauchVerse support mobiles?-answer")}
                              {/* You can always participate via mobiles (with Metamask app installed), however it is advised that you use the desktop version for smoother experience. For more details, refer to <a href="https://rada.network/en/post/step-by-step-guide-joining-a-share2earn-event" target="_blank">this guide.</a> */}
                            </p>
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

      </div>


    </>
  );
};

export default ProjectLaunchpad;
