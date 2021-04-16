import Link from 'next/link'
import { useState } from 'react'
import { useWallet } from 'use-wallet'

import {ChevronDoubleDownIcon, ChevronDownIcon} from "@heroicons/react/solid";


import { RiUploadLine } from "react-icons/ri";

import {Wallet} from "./Wallet"

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
                  <img className="block w-auto h-8" src="./images/dhunt.svg" alt="dhunt.io" />
                  <strong className="ml-2 text-gray-900 logo-text text-opacity-90">
                    <span>d</span><span>hunt</span><span>.io</span></strong>
                </a>
              </Link>
            </div>

            {/* Search */}
            <div className="relative w-full mx-6">
              <input type="search" className="w-full px-5 py-2 text-sm focus:text-base bg-gray-50 focus:bg-white border border-gray-100 rounded-md shadow-sm focus:shadow focus:border-primary-700 focus:outline-none focus:ring-0" placeholder="Search by address or name ..." />
            </div>

            {/* Main Nav */}
            {/* <div className="flex-1 hidden sm:block sm:ml-6">
              <div className="flex space-x-4 text-sm">
                <a href="/" className="px-3 py-2 font-medium rounded-md whitespace-nowrap text-primary-700" aria-current="page">Explore</a>
                <a href="/" className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap hover:text-primary-700">About Us</a>
                <a href="/" className="px-3 py-2 font-medium text-gray-700 whitespace-nowrap hover:text-primary-700">How It Work</a>
              </div>
            </div> */}

          </div>

          <div className="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto">
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