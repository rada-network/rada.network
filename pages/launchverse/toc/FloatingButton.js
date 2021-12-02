import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

import TocSideBar from "./TocSidebar";

export default function FloatButton({ mainScroll }) {
  return (
    <div className="w-full px-4 fixed bottom-4 right-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : "text-opacity-90"}
                bg-primary-700 text-white rounded-full px-4 py-2 float-right shadow-lg`}
            >
              <span>TOC</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 h-full">
                  <div className="p-4 bg-gray-50 h-full h-full">
                    <TocSideBar mainScroll={mainScroll} />
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
