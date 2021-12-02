import { Popover, Transition } from "@headlessui/react";
import { Fragment,useRef } from "react";

import TocSideBar from "./TocSidebar";

export default function FloatButton({ mainScroll }) {
  const buttonRef = useRef();

  const closeChooser = () => {
    buttonRef.current?.click()
  }
  return (
    <div className="w-full px-4 fixed bottom-4 right-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button ref={buttonRef}
              className={`${open ? "" : "text-opacity-90"}
                bg-primary-700 text-white z-40 rounded-full px-4 py-2 float-right shadow-lg`}
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
              <Popover.Panel className="fixed inset-0 z-1 lg:hidden z-10 px-4 mt-3 sm:px-0  " >
                <div className="bg-gray-900 absolute inset-0 backdrop-filter backdrop-blur bg-opacity-50">
                    <TocSideBar mainScroll={mainScroll} closeChooser={closeChooser} />
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
}
