import { Popover } from '@headlessui/react'
import {useTranslation} from "next-i18next";

export default function Usermenu() {
    const {t} = useTranslation()

    const Button = ({wallet}) => (
        <div className="btn nav-btn" aria-expanded="false" aria-haspopup="true">
            <span className="icon"><i className="fa-solid fa-user" /></span>
            <span className="btn--text">{t("User")}</span>
        </div>
    )
    return (
        <Popover className="relative">
          <Popover.Button><Button /></Popover.Button>
    
          <Popover.Panel className="absolute z-10">
            <div className="grid grid-cols-2">
                Whatever here
            </div>
          </Popover.Panel>
        </Popover>
      )
}