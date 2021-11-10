import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

const type = [
  { name: 'Facebook' },
  { name: 'Twitter' },
  { name: 'Devon Webb' },
]

export default function SelectBannerType() {
  const [selected, setSelected] = useState(type[0])

  return (
    <div className="w-full">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          
          <Listbox.Button className="flex items-center relative w-full py-2 pl-3 pr-10">
            <span class="flex justify-center items-center w-px-32 h-px-32 brand--facebook rounded-full">
              <span class="icon"><i class="fa-brands fa-facebook-f"></i></span>
            </span>
            <span className="block truncate">{selected.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <i class="fa-solid fa-angle-down"></i>
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full -top-2 py-1 mt-1 overflow-auto bg-white dark:bg-gray-700 border-b border-gray-300 dark:border-gray-700 z-10 rounded-lg shadow-xl">
              {type.map((bannerType, bannerTypeIdx) => (
                <Listbox.Option
                  key={bannerTypeIdx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'}
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={bannerType}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected ? 'font-medium' : 'font-normal'
                        } block truncate`}
                      >
                        {bannerType.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active ? 'text-amber-600' : 'text-amber-600'
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
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
}
