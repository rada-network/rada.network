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
import { RiCompass3Fill } from "react-icons/ri";
import { RiChat1Fill } from "react-icons/ri";

export default function ProjectDetails(props) {

  return (
    <Layout extraClass="page-project_details">
      <>
      <div className="container">

        <div className="page-header">

          <div class="page-header_l">
            <Link href={`#`}>
              <a title="SolaSystem" class="project-icon">
                <img className="project-icon_img" src="https://picsum.photos/300/300?random=1" />
              </a>
            </Link>
          </div>

          <div class="page-header_main flex-1">
            <div className="page-title flex items-center content-center">
              <h1 className="project-title">SolaSystem</h1>
            </div>

            <div className="project-text_short">
              <p>SolaSystem is the world's first completely decentralized derivatives exchange with trustless cross-chain trading.</p>
            </div>

            <div className="metadata-wrapper project-metadata-wrapper mt-4">
              <a href="#" className="metadata badge badge-dApp project-metadata_type">
                <span className="metadata-value">dapp</span>
              </a>
              <a href="#" className="metadata badge badge-sol project-metadata_platform project-metadata_platform_sol">
                <span className="icon mr-2"><i class="cf cf-sol"></i></span>
                <span className="metadata-value">Solana</span>
              </a>
              <a href="#" className="metadata badge badge-sol project-metadata_platform project-metadata_platform_sol">
                <span className="metadata-value">SOL</span>
              </a>
            </div>

          </div>

          <div class="page-header_r">
            <div class="cta-wrapper flex">
              <btn className="btn item-center justify-center px-3 py-3 border border-gray-300 rounded-md bg-white hover:bg-primary-100 hover:border-primary-500 text-purple-700">
                <span className="icon text-2xl"><RiCompass3Fill /></span>
                <span className="btn-project-vote_total whitespace-nowrap ml-2 uppercase">
                  <span className="inline-block text-sm font-medium">Visit</span> 
                </span>
              </btn>
              <btn className="btn item-center justify-center px-3 py-3 btn-project-vote rounded-md bg-primary-700 hover:bg-primary-600 text-white">
                <span className="icon text-2xl -mb-1"><RiArrowUpSFill /></span>
                <span className="btn-project-vote_total whitespace-nowrap ml-1 uppercase">
                  <span className="inline-block text-sm font-medium">Upvote</span> 
                  <strong className="inline-block text-base font-bold ml-2">1989</strong>
                </span>
              </btn>
            </div>
          </div>
        </div>


        <div className="flex flex-row justify-center">
          <div className="page-main">

            <div className="card flex-col p-6 bg-white shadow-sm">

              <div className="project-media-viewer">
                <div className="project-media-wrapper h-full w-full">
                  <div className="project-media rounded overflow-hidden shadow-lg aspect-w-16 aspect-h-9">
                    {/* <img className="project-img" alt="" src="https://picsum.photos/1024/768?random=2" /> */}
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/qnkuBUAwfe0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex">

                <div className="project-text flex-1 text-gray-900 text-opacity-75 pr-10">
                  <p className="pb-4">Part of the Legendary Series, 99 ever minted, 2nd Edition</p>

                  <p className="">Rune Farm is aiming to be a leading NFT platform on Binance Smart Chain. Rune will launch yield farms as a way to acquire NFTs that can be combined into other NFTs called Rune Words. Characters and Guilds on the platform will gain certain farm bonuses or NFT rewards depending on their attributes. We are a fair launch project with no pre-sale, no investor, and no pre-mine.</p>
                </div>

                <div className="project-info text-sm border-l border-gray-100 w-64 pl-8 text-gray-900 text-opacity-75">
                    <div className="pb-2 mb-2">
                      <strong>Project Info</strong>
                    </div>
                    <div className="pb-2 mb-2">
                      Featured: 2 hours ago
                    </div>
                    <div className="pb-2 mb-2">
                      Category: DeFi
                    </div>
                    <div className="pb-4">
                      Token: SOL
                    </div>
                </div>

              </div>

            </div>

            <div className="card">

            </div>

          </div>

          {/* <div className="page-sidebar">
            <div className="project-details flex flex-col h-full">
              <div className="project-text">
                <p>Part of the Legendary Series, 99 ever minted, 2nd Edition</p>
                <p>Rune Farm is aiming to be a leading NFT platform on Binance Smart Chain. Rune will launch yield farms as a way to acquire NFTs that can be combined into other NFTs called Rune Words. Characters and Guilds on the platform will gain certain farm bonuses or NFT rewards depending on their attributes. We are a fair launch project with no pre-sale, no investor, and no pre-mine.</p>
              </div>
            </div>
          </div> */}
          
        </div>
      </div>
      </>
    </Layout>
  )
}

