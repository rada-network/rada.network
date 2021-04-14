import Head from 'next/head';

import Link from 'next/link'
import dynamic from "next/dynamic";

// Components
import {Layout} from '../components/page-layouts/OneColumn';
import {Header} from '../components/Header';
import {ProjectsList} from '../components/card-layouts/ProjectsList';

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";
import { RiArrowUpSFill } from "react-icons/ri";
import { RiChat1Fill } from "react-icons/ri";

export default function ProjectDetails(props) {

  return (
    <Layout extraClass="page-project_details">
      <>
      <div className="container">
        <div className="flex flex-col justify-center">

          <div className="page-header">

            <div class="page-header_l">
              <Link href={`#`}>
                <a title="SolaSystem" class="project-icon">
                  <img className="project-icon_img" src="https://picsum.photos/80/80?random=1" />
                </a>
              </Link>
            </div>

            <div class="page-header_main flex-1">
              <h1 className="project-title">SolaSystem</h1>

              <div className="project-text_short">
                <p>"That is not a drug, it’s a leaf."</p>
              </div>
            </div>

            <div class="page-header_r">
              <btn className="btn flex-col justify-center w-icon-64 h-icon-64 btn-project-vote rounded-md bg-gray-50 group-hover:bg-primary-700 group-hover:text-white">
                <span className="icon text-xl"><RiArrowUpSFill /></span>
                <span className="btn-project-vote_total text-xs whitespace-nowrap font-bold">
                  198
                </span>
              </btn>
            </div>


          </div>

          <div className="page-main">
            <div className="project-media-viewer">
              <div className="project-media-wrapper">
                <div className="project-media aspect-w-16 aspect-h-9">
                  <img className="project-img" alt="" src="https://picsum.photos/1000/700?random=2" />
                </div>
              </div>
            </div>
          </div>

          <div className="page-sidebar">
            <div className="project-details flex flex-col h-full">

              <div className="project-text">
                <p>Part of the Legendary Series, 99 ever minted, 2nd Edition</p>

                <p>"That is not a drug, it’s a leaf."</p>

                <p>Owners of this collectible will get exclusive access to the world's first blockchain-powered trading card game "Beyond Humanity" which is expected to be released in 2022 + a rare legendary collectible after go-live.</p>

                <p>The proceeds of all collectibles will be used for the game development.</p>

                <p>This project means a lot to me, and I hope it finds its home in someone’s collection.</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
      </>
    </Layout>
  )
}

