import React from "react";
import { createPopper } from "@popperjs/core";

export const Dropdown = ({ color }) => {
  let bgColor;
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start"
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  // custom colors
  color === "white"
    ? (bgColor = "bg-blueGray-700")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
        <button
          className={ "text-blue-700 font-bold uppercase text-sm px-6 py-3 rounded  " +
          " outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "}
          type="button"
          ref={btnDropdownRef}
          onClick={() => {
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
        >
          <span className={`text-${color}-700 caret`}>Today</span>
        </button>
        <div
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            (color === "white" ? "bg-white " : bgColor + " ") +
            "font-bold text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
          }
          style={{ minWidth: "12rem" }}
        >
          <a
            href="#handleEvent"
            className={
              "text-sm py-2 px-4 block w-full whitespace-nowrap bg-transparent " +
              (color === "white" ? " text-blueGray-700" : "text-white")
            }
            onClick={e => e.preventDefault()}
          >
            Yesterday
          </a>
          <a
            href="#handleEvent"
            className={
              "text-sm py-2 px-4 block w-full whitespace-nowrap bg-transparent " +
              (color === "white" ? " text-blueGray-700" : "text-white")
            }
            onClick={e => e.preventDefault()}
          >
            2 days ago
          </a>
          <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
          <a
            href="#handleEvent"
            className={
              "text-sm py-2 px-4 block w-full whitespace-nowrap bg-transparent " +
              (color === "white" ? " text-blueGray-700" : "text-white")
            }
            onClick={e => e.preventDefault()}
          >
            7 days ago
          </a>
        </div>
    </>
  );
};
