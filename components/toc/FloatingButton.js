import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Toc from "./Toc";
import { useEffect, useState, useRef } from "react";

export default function FloatButton({ mainScroll }) {
  const [headers, setHeadings] = useState([]);

  useEffect(() => {
    setHeadings(mainScroll.current.querySelectorAll("h2, h3"));
  }, []);

  const buttonRef = useRef();

  const handleCloseFloatButton = () => {
    buttonRef?.current.click();
  };

  return (
    <>
      <div className="floating-btn--container">
        <Popover className="relative rounded-full shadow-lg">
          {({ open }) => (
            <>
              <Popover.Button
                ref={buttonRef}
                className={`${open ? "active" : ""}
              floating-btn z-20`}
              >
                <span className="icon">
                  <i className="fa-solid fa-bars"></i>
                  <i className="fa-solid fa-times"></i>
                </span>
                <span className="btn--text">TOC</span>
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform origin-bottom-right opacity-100 scale-0"
                enterTo="transform origin-bottom-right opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform origin-top-left opacity-100 scale-100"
                leaveTo="transform origin-bottom-right opacity-0 scale-0"
              >
                <Popover.Panel className="popper-toc--container">
                  <div className="overflow-hidden rounded-lg shadow-lg">
                    <div className="popper popper-toc p-4 !mt-0">
                      <Toc
                        mainScroll={mainScroll}
                        handleCloseFloatButton={handleCloseFloatButton}
                      />
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </>
  );
}
