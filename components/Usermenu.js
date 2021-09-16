import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react'


export default function Usermenu() {

    // HieuNN: Example of Button when User Login
    const Button = ({ wallet }) => (
      <div className="btn nav-btn btn-login" aria-expanded="false" aria-haspopup="true">
        <span className="avatar-xxs">
          <img src="https://picsum.photos/64" alt="User Name Here"/>
        </span>
        <span className="hidden md:block btn--text ml-2">Hieu Nguyen</span>
      </div>
    );

    return (
      <Menu as="div" className="relative inline-block text-left">

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
              <Menu.Item className="dropdown-item">
              {({ active }) => 
                <span className="dropdown-item--text">Profile</span>
              }
              </Menu.Item>
              <Menu.Item className="dropdown-item">
              {({ active }) => 
                <span className="dropdown-item--text">Profile</span>
              }
              </Menu.Item>
            </div>

            <div className="dropdown-section">
              <Menu.Item className="dropdown-item">
              {({ active }) => 
                <span className="dropdown-item--text">Logout</span>
              }
              </Menu.Item>
            </div>

          </Menu.Items>
        </Transition>
      </Menu>
    );
}