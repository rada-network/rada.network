import React from "react";
import { createPopper } from "@popperjs/core";
import styles from "../../styles/modules/Dropdown.module.css";

export const DropDown = ({ color }) => {
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
    ? (bgColor = "bg-white")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className={`dropdown ${styles.dropdown}`}>

        <button
          className={`btn dropdown-toggle ${styles.dropdown_toggle}`}
          type="button"
          ref={btnDropdownRef}
          onClick={() => {
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
        >
          <span className={`btn-text ${styles.dropdown_toggle__text}`}>Today</span>
          <span className={`caret ml-2 ${styles.caret}`}></span>
        </button>

        <div
          ref={popoverDropdownRef}
          className={
            (dropdownPopoverShow ? "block " : "hidden ") +
            (color === "white" ? "bg-white " : bgColor + " ") +
            "font-medium text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
          }
          style={{ minWidth: "12rem" }}
        >
          <a
            href="#handleEvent"
            className={
              "py-2 px-4 block w-full whitespace-nowrap bg-transparent " +
              (color === "white" ? " text-blueGray-700" : "text-white")
            }
            onClick={e => e.preventDefault()}
          >
            Yesterday
          </a>
          <a
            href="#handleEvent"
            className={
              "py-2 px-4 block w-full whitespace-nowrap bg-transparent " +
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
      </div>
    </>
  );
};
