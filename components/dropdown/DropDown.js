import React from "react";
import { createPopper } from "@popperjs/core";
import styles from "../../styles/modules/Dropdown.module.css";

export const DropDown = ({ color }) => {
  // let bgColor;
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
  // color === "white"
  //   ? (bgColor = "bg-white")
  //   : (bgColor = "bg-" + color + "-500");
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
          className={`dropdown_menu ${styles.dropdown_menu} ${dropdownPopoverShow ? "block " : "hidden "}`}
        >
          <a
            href="#handleEvent"
            className={`dropdown_menu__item ${styles.dropdown_menu__item}`}
            onClick={e => e.preventDefault()}
          >
            Yesterday
          </a>
          <a
            href="#handleEvent"
            className={`dropdown_menu__item ${styles.dropdown_menu__item}`}
            onClick={e => e.preventDefault()}
          >
            2 days ago
          </a>
          <div className={`dropdown_menu__divider ${styles.dropdown_menu__divider}`} />
          <a
            href="#handleEvent"
            className={`dropdown_menu__item ${styles.dropdown_menu__item}`}
            onClick={e => e.preventDefault()}
          >
            7 days ago
          </a>
        </div>
      </div>
    </>
  );
};
