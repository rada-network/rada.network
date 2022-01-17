import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "next-i18next";
import { signOut } from "next-auth/client";
import Link from "next/link";
import getClient from "../data/client";
import { useCookies } from "react-cookie";

export default function Usermenu({ user }) {
  const [, , removeCookie] = useCookies(["access_token"]);
  const { t, i18n } = useTranslation();
  // HieuNN: Example of Button when User Login
  const Button = ({ wallet }) => (
    <div
      className="btn btn-default btn-login"
      aria-expanded="false"
      aria-haspopup="true"
    >
      <span className="avatar leading-10 relative">
        <img src={user.image} alt={user.name} />
      </span>
      <span className="btn--text ml-2">{user.name}</span>
    </div>
  );

  const Logout = function (e) {
    const client = getClient();
    client.resetStore();
    signOut(true).then(() => {
      removeCookie("access_token", {
        path: "/",
        expires: -1,
      });
    });
  };

  return (
    <Menu as="div" className="dropdown-wrapper relative inline-block text-left">
      <Menu.Button>
        <Button />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="dropdown absolute right-0">
          <div className="dropdown-section">
            <Menu.Item as="div" className="dropdown-item">
              {({ active }) => (
                <>
                  <Link href={`/${i18n.language}/dashboard`}>
                    <a>
                      <span className="icon">
                        <i className="fa-duotone fa-user-gear"></i>
                      </span>
                      <span className="dropdown-item--text">LaunchVerse Profile</span>
                    </a>
                  </Link>
                </>
              )}
            </Menu.Item>
            <Menu.Item as="div" className="dropdown-item">
              {({ active }) => (
                <>
                  {/* <a
                  href="/p/how-to-invest-with-rada">
                  <span className="icon"><i className="fa-duotone fa-coins"></i></span>
                  <span className="dropdown-item--text">How to invest?</span>
                </a> */}
                </>
              )}
            </Menu.Item>
          </div>

          <div className="dropdown-section">
            <Menu.Item as="div" className="dropdown-item">
              {({ active }) => (
                <a onClick={() => Logout()}>
                  <span className="icon">
                    <i className="fa-duotone fa-arrow-right-from-bracket"></i>
                  </span>
                  <span className="dropdown-item--text">Logout</span>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
