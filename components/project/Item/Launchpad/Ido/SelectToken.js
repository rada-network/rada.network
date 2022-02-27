import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { BusdSvg } from "@components/svg/SvgIcons";
import RadaSvg from "@components/svg/rada";

let tokenTypes = [
  {
    name: "RIR",
    icon: <RadaSvg />,
  },
  {
    name: "BUSD",
    icon: <BusdSvg />,
  },
];

export default function SelectTokenType({ setIsBusd, init, accountBalance }) {
  let initState = tokenTypes[init];
  if (accountBalance.rirBalance == 0) {
    delete tokenTypes[0];
    initState = tokenTypes[0];
  }
  const [selected, setSelected] = useState(tokenTypes[init]);
  const handleChangeCurrency = function (sel) {
    setSelected(sel);
    if (sel.name == "BUSD") {
      setIsBusd(true);
    } else {
      setIsBusd(false);
    }
  };
  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleChangeCurrency}>
        <div className="relative">
          <Listbox.Button className="flex items-center relative w-full border py-1.5 pl-2 pr-0 border-gray-200 dark:border-gray-700 rounded-l-md !border-r-transparent bg-white dark:bg-transparent">
            <span
              className={`flex justify-center items-center w-px-32 h-px-32 rounded-full mr-1 brand--${selected.name}`}
            >
              <span className="icon">{selected.icon}</span>
            </span>
            <span className="block truncate text-sm text-left">
              <strong className="block">{selected.name}</strong>
            </span>
            <span className="absolute inset-y-0 right-4 flex items-center pr-2 pointer-events-none">
              <i className="fa-solid fa-angle-down"></i>
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute top-0 border-gray-200 w-full overflow-hidden bg-white dark:bg-gray-700 border-b border-gray-300 dark:border-gray-700 z-10 rounded-lg shadow-xl">
              {tokenTypes.map((tokenType, tokenTypeIdx) => (
                <Listbox.Option
                  key={tokenTypeIdx}
                  className={({ active }) =>
                    `${
                      active
                        ? "text-primary-900 bg-primary-100"
                        : "text-gray-900"
                    }
                          cursor-default select-none relative flex items-center w-full py-3 pl-3 pr-10`
                  }
                  value={tokenType}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`flex justify-center items-center w-px-32 h-px-32 rounded-full mr-1 brand--${tokenType.name}`}
                      >
                        <span className="icon pointer-events-none">
                          {tokenType.icon}
                        </span>
                      </span>

                      <span className="block truncate text-sm text-left">
                        <strong
                          className={`${selected ? " " : " "} block truncate`}
                        >
                          {tokenType.name}
                        </strong>
                      </span>

                      {selected ? (
                        <span
                          className={`${active ? "" : ""}
                                hidden absolute inset-y-0 right-3 items-center`}
                        >
                          <i className="fa-solid fa-check"></i>
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
