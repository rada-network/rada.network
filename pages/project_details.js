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
        {/* Page Header */}
        <div className="page-header">
          <div className="container">

            <div className="page-header_l">
              <Link href={`#`}>
                <a title="SolaSystem" className="project-icon">
                  <img className="project-icon_img" src="https://picsum.photos/300/300?random=1" />
                </a>
              </Link>
            </div>

            <div className="page-header_main flex-1">
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
                  <span className="icon mr-2"><i className="cf cf-sol"></i></span>
                  <span className="metadata-value">Solana</span>
                </a>
                <a href="#" className="metadata badge badge-sol project-metadata_platform project-metadata_platform_sol">
                  <span className="metadata-value">SOL</span>
                </a>
              </div>

            </div>

            <div className="page-header_r">
              <div className="cta-wrapper flex">
                <btn className="btn item-center justify-center px-3 py-3 border border-gray-300 rounded-md bg-white hover:bg-primary-100 hover:border-primary-500 text-purple-700 shadow-sm">
                  <span className="icon text-2xl"><RiCompass3Fill /></span>
                  <span className="btn-project-vote_total whitespace-nowrap ml-2 uppercase">
                    <span className="inline-block text-sm font-medium">Visit</span> 
                  </span>
                </btn>
                <btn className="btn item-center justify-center px-3 py-3 btn-project-vote rounded-md bg-primary-700 bg-gradient-to-tr from-primary-700 to-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-400 text-white shadow transition-all">
                  <span className="icon text-2xl -mb-1 -ml-1"><RiArrowUpSFill /></span>
                  <span className="btn-project-vote_total whitespace-nowrap ml-1 uppercase">
                    <span className="inline-block text-sm font-medium">Upvote</span> 
                    <strong className="inline-block text-base font-bold ml-2">1989</strong>
                  </span>
                </btn>
              </div>
            </div>

          </div>
        </div>

        {/* Page Main */}
        <div className="container">

          <div className="flex flex-row justify-center">

            <div className="page-main">

              <div className="section">
                <div className="section-body">
                  <div className="flex-col">

                    <div className="project-media-viewer">
                      <div className="project-media-wrapper h-full w-full">
                        <div className="project-media rounded overflow-hidden shadow-xl aspect-w-16 aspect-h-9">
                          {/* <img className="project-img" alt="" src="https://picsum.photos/1024/768?random=2" /> */}
                          <iframe width="560" height="315" src="https://www.youtube.com/embed/qnkuBUAwfe0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 flex">

                      <div className="project-text flex-1 text-gray-900 text-opacity-100 pr-10">
                        <p className="pb-4">Part of the Legendary Series, 99 ever minted, 2nd Edition. Rune Farm is aiming to be a leading NFT platform on Binance Smart Chain.</p>

                        <p className="">Rune will launch yield farms as a way to acquire NFTs that can be combined into other NFTs called Rune Words. Characters and Guilds on the platform will gain certain farm bonuses or NFT rewards depending on their attributes. We are a fair launch project with no pre-sale, no investor, and no pre-mine.</p>
                      </div>

                      <div className="list-group-sm project-info text-sm w-64 pl-8 text-gray-900 text-opacity-50">
                          <div className="list-group-item">
                            <strong className="uppercas">Project Info</strong>
                          </div>
                          <div className="list-group-item">
                            <span className="w-20 flex-1">Featured</span>
                            <strong className="font-medium ml-2 text-gray-900 text-opacity-90 text-right">2 hours ago</strong>
                          </div>
                          <div className="list-group-item pb-1">
                            <span className="w-20 flex-1">Data 1</span>
                            <strong className="font-medium ml-2 text-gray-900 text-opacity-90">Combined</strong>
                          </div>
                          <div className="list-group-item pb-1 border-none">
                            <span className="w-20 flex-1">Data 2</span>
                            <strong className="font-medium ml-2 text-gray-900 text-opacity-90">Other</strong>
                          </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>


              <div className="section section-project-discussions border-t border-gray-100 pt-4">

                <div className="section-header">
                  <div className="section-title">Discussions</div>
                </div>

                <div className="section-body">

                  <div className="mt-8 pt-4 flex">

                    <div className="flex-1 text-gray-900 text-opacity-100 pr-10">
                    </div>

                    <div className="lw-64 pl-8 text-gray-900 text-opacity-50">
                    </div>

                  </div>

                </div>
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

