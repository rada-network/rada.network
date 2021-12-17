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

          {/* FAQ */}
          <div className="">
            <h3 className="">Current Projects</h3>
            <div className="w-full">
              <Disclosure
                as="div"
                className="disclosure"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      as="div"
                      className="disclosure--toggle"
                    >
                      FAQ
                      <span
                        className={`${
                          open ? "open" : ""
                        } disclosure--toggle-arrow`}
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                          sssss
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
              {/* END: FAQ */}
            </div>
          </div>
          {/* End: FAQ */}

        </div>
      </div>
    </>
  );
};

export default ProjectLaunchpad;
