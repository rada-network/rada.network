import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { observer } from "mobx-react";
import { usePageStore } from "@lib/usePageStore";

const bannerTypes = [
  { 
    name: 'Facebook',
    desc: '820 x 312 px',
    icon: <i class="fa-brands fa-facebook-f"></i>,
  },
  { 
    name: 'Twitter',
    desc: '1500 x 500 px',
    icon: <i class="fa-brands fa-twitter"></i>,
  },
]

const SelectBannerType  = observer( () => {
  const [selected, setSelected] = useState(bannerTypes[0])
  const { detailStore } = usePageStore();
  const handleOnchange = (e) => {
     detailStore.selectedBanner = e.name;
     if (e.name === "Facebook") {
        setSelected(bannerTypes[0]);
     } else if (e.name === "Twitter") {
        setSelected(bannerTypes[1]);
     }
  };


  return (
    <div className="w-full">
      <Listbox value={selected} onChange={handleOnchange}>
        <div className="relative">
          
          <Listbox.Button className="flex items-center relative w-full py-3 pl-3 pr-10">
            <span class={`flex justify-center items-center w-px-32 h-px-32 rounded-full mr-4 brand--${selected.name}`}>
              <span class="icon">{selected.icon}</span>
            </span>
            <span className="block truncate text-sm text-left">
              <strong className="block">{selected.name}</strong>
              <span className="text-gray-500 dark:text-gray-400">{selected.desc}</span>
            </span>
            <span className="absolute inset-y-0 right-4 flex items-center pr-2 pointer-events-none">
              <i class="fa-solid fa-angle-down"></i>
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
            <Listbox.Options className="absolute top-0 w-full overflow-hidden bg-white dark:bg-gray-700 border-b border-gray-300 dark:border-gray-700 z-10 rounded-lg shadow-xl">
              {bannerTypes.map((bannerType, bannerTypeIdx) => (
                <Listbox.Option
                  key={bannerTypeIdx}
                  className={({ active }) =>
                    `${active ? 'text-primary-900 bg-primary-100 dark:bg-primary-900 dark:text-white' : ''}
                          cursor-default select-none relative flex items-center w-full py-3 pl-3 pr-10`
                  }
                  value={bannerType}
                >
                  {({ selected, active }) => (
                    <>
                      <span class={`flex justify-center items-center w-px-32 h-px-32 rounded-full mr-4 brand--${bannerType.name}`}>
                        <span class="icon">{bannerType.icon}</span>
                      </span>

                      <span className="block truncate text-sm text-left">
                        <strong
                          className={`${
                            selected ? ' ' : ' '
                          } block truncate`}
                        >
                          {bannerType.name}
                        </strong>
                        <span className="text-gray-500 dark:text-gray-400">
                          {bannerType.desc}
                        </span>
                      </span>

                      {selected ? (
                        <span
                          className={`${
                            active ? '' : ''
                          }
                                hidden absolute inset-y-0 right-3 items-center`}
                        >
                          <i class="fa-solid fa-check"></i>
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
  )

})

export default SelectBannerType;