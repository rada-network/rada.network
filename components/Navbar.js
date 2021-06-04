import Link from 'next/link'
import { useState } from 'react'
import { useWallet } from 'use-wallet'

import {ChevronDoubleDownIcon, ChevronDownIcon} from "@heroicons/react/solid";


import { RiUploadLine } from "react-icons/ri";

import {Wallet} from "./Wallet"
import SearchInput from "./search";

export const Navbar = () => {
  return (
    <nav className="navbar-main">
      <div className="container">
        
        <div className="relative flex items-center justify-between h-16">

          <div className="flex items-center justify-center flex-1 align-center">

            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link href={`/`}>
                <a className="flex items-center justify-center align-center" title="dhunt.io">
                  <img className="block w-auto h-8" src="/images/dhunt.svg" alt="dhunt.io" />
                  <strong className="hidden md:inline-flex ml-2 text-gray-900 logo-text text-opacity-90">
                    <span>d</span><span>hunt</span><span>.io</span></strong>
                </a>
              </Link>
            </div>

            {/* Search */}
            <SearchInput />

            {/* Main Nav */}
            {/* <div className="flex-1 hidden sm:block sm:ml-6">
              <div className="flex space-x-4 text-sm">
                <a href="/" className="px-3 py-2 font-medium rounded-md whitespace-nowrap text-primary-700" aria-current="page">Explore</a>
                <a href="/" className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap hover:text-primary-700">About Us</a>
                <a href="/" className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap hover:text-primary-700">How It Work</a>
              </div>
            </div> */}

          </div>

          <div className="flex items-center">
            {/* <div className="flex-1 hidden text-sm sm:block">
              <div className="flex space-x-4">
                <a href="/" className="flex items-center px-3 py-2 font-medium text-gray-700 whitespace-nowrap hover:text-primary-700">
                  <span className="mr-2 icon"><RiUploadLine /></span>
                  Submit
                </a>
              </div>
            </div> */}

            {/* Profile dropdown */}
            <div className="relative">
              <Wallet />
            </div>
          </div>

        </div>
      
      </div>
    </nav>
  );
}