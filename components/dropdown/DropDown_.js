import React, {useState} from "react";
import {Listbox, Transition} from "@headlessui/react";

const days = [
  "Today",
  "Yesterday",
  "2 days ago", "7 days ago"
];

// export default function DropDown_() {
export const DropDown_ = () => {
  const [selectedDay, setSelectedDay] = useState("Today");

  return (
    // <div className="flex items-center justify-center p-12">
    //   <div className="w-full max-w-xs mx-auto">
        <Listbox as="div" value={selectedDay} onChange={setSelectedDay}>
          {({open}) => (
            <>
              <div className="relative">
              <span className="inline-block w-full">
                <Listbox.Button className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue
                focus:border-blue-300 relative shadow-sm border-gray-300 rounded text-blue-700 font-bold uppercase">
                  <span className="block truncate">{selectedDay}</span>
                  {/*<span className="caret ml-2 -mt-0.5"/>*/}
                </Listbox.Button>
              </span>
                <Transition
                  show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    static
                    className="border border-gray-300 rounded mt-1"
                  >
                    {days.map((day) => (
                      <Listbox.Option key={day} value={day}>
                        {({selected, active}) => (
                          <div
                            className={`${
                              active
                                ? "text-white bg-indigo-600"
                                : "text-gray-900"
                            } cursor-default select-none relative py-2 pl-10 pr-4`}
                          >
                          <span
                            className={`${
                              selected ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {day}
                          </span>

                            {selected && (
                              <span
                                className={`${
                                  active ? "text-white" : "text-indigo-600"
                                } absolute inset-y-0 left-0 flex items-center pl-2`}
                              >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                {/*icon*/}
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      // </div>
    // </div>
  );
}