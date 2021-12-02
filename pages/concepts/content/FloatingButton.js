import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

import Toc from "../_components/content/Toc";

export default function FAB() {
  return (
    <div className="fixed bottom-4 right-4">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`${open ? "" : "text-opacity-100"}
              active bg-primary-700 text-white rounded-full w-10 h-10 shadow-lg`}
            >
              <span className="icon"><i class="fal fa-bars"></i></span>
              <span className="sr-only">Table of Content</span>
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
              <Popover.Panel className="absolute z-10 transform right-full -mr-10 bottom-10 w-80">
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 max-h-96 overflow-x-hidden overflow-y-auto">
                    <Toc />
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
