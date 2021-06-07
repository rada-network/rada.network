import { Fragment, useState, useRef } from "react"

import { Dialog, Transition } from "@headlessui/react"
import styles from '../styles/modules/Dialog.gallery.module.css'

import {IoChevronBackSharp} from "react-icons/io5";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Media = ({doClose, idx, items}) => {
  const focusRef = useRef();
    const open = idx != -1

    return (
    <Transition show={open} as={Fragment}>
      <Dialog
        as="div"
        id="modal"
        className={`${styles.dialog_outside_wrapper}`}
        initialFocus={focusRef}
        static
        open={open}
        onClose={doClose}
      >
        <div className={`min-h-screen ${styles.dialog_outside}`}>
        
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
            ref={focusRef}
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-0"
          >

            <div className={`inline-block w-full ${styles.dialog}`}>

              <button type="button" className={`btn ${styles.btn_back}`} onClick={doClose}>
                <span className="icon"><IoChevronBackSharp/></span>
                <span className="btn-text font-normal">Go back</span>
              </button>

              <div className={`${styles.dialog_wrapper}`}>


                {/* Dialog Body */}
                <div className={`${styles.dialog_body_wrapper}`}>

                  <div className={`${styles.dialog_body}`}>

                    <Carousel
                      className="gallery" 
                      selectedItem={idx} 
                      showArrows={true} 
                      showThumbs={false} 
                      showIndicators={false} 
                      dynamicHeight={false}
                    >
                      {items && items.map(url => (
                      <div className={`${styles.media}`}>
                        <img src={url} />
                      </div>
                      ))}
                    </Carousel>

                  </div>
                
                </div>
              
              </div>

            </div>
          </Transition.Child>

        </div>

      </Dialog>


    </Transition>  

  )
}

export default Media