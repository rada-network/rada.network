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

        <div className="page-header flex flex-row justify-center">

          <div class="page-header_l">
            <Link href={`#`}>
              <a title="SolaSystem" class="project-icon">
                <img className="project-icon_img" src="https://picsum.photos/80/80?random=1" />
              </a>
            </Link>
          </div>

          <div class="page-header_main flex-1">
            <h1 className="page-title project-title">SolaSystem</h1>

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


        <div className="flex flex-row justify-center">
          <div className="page-main">

            <div className="card flex-col p-6 bg-white shadow-sm">

              <div className="project-media-viewer">
                <div className="project-media-wrapper h-full w-full">
                  <div className="project-media aspect-w-16 aspect-h-9">
                    <img className="project-img" alt="" src="https://picsum.photos/1024/768?random=2" />
                  </div>
                </div>
              </div>

              <div className="project-text">
                <p>Part of the Legendary Series, 99 ever minted, 2nd Edition</p>

                <p>Rune Farm is aiming to be a leading NFT platform on Binance Smart Chain. Rune will launch yield farms as a way to acquire NFTs that can be combined into other NFTs called Rune Words. Characters and Guilds on the platform will gain certain farm bonuses or NFT rewards depending on their attributes. We are a fair launch project with no pre-sale, no investor, and no pre-mine.</p>
              </div>

            </div>

            <div className="card">

            </div>

          </div>

          <div className="page-sidebar">
            <div className="project-details flex flex-col h-full">
            <div className="project-text">
                <p>Part of the Legendary Series, 99 ever minted, 2nd Edition</p>

                <p>Rune Farm is aiming to be a leading NFT platform on Binance Smart Chain. Rune will launch yield farms as a way to acquire NFTs that can be combined into other NFTs called Rune Words. Characters and Guilds on the platform will gain certain farm bonuses or NFT rewards depending on their attributes. We are a fair launch project with no pre-sale, no investor, and no pre-mine.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      </>
    </Layout>
  )
}

