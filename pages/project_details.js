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

            <div className="flex-1 page-header_main">
              <div className="flex items-center content-center page-title">
                <h1 className="project-title">SolaSystem</h1>
              </div>

              <div className="project-text_short">
                <p>SolaSystem is the world's first completely decentralized derivatives exchange with trustless cross-chain trading.</p>
              </div>

              <div className="mt-4 metadata-wrapper project-metadata-wrapper">
                <a href="#" className="metadata badge badge-dApp project-metadata_type">
                  <span className="metadata-value">dapp</span>
                </a>
                <a href="#" className="metadata badge badge-sol project-metadata_platform project-metadata_platform_sol">
                  <span className="icon"><i className="cf cf-sol"></i></span>
                  <span className="metadata-value">Solana</span>
                </a>
                <a href="#" className="metadata badge badge-sol project-metadata_platform project-metadata_platform_sol">
                  <span className="metadata-value">SOL</span>
                </a>
              </div>

            </div>

            <div className="page-header_r">
              <div className="flex justify-between cta-wrapper">
                <btn className="w-icon-104 md:w-full px-2 py-2 justify-center text-purple-700 bg-white border border-gray-300 rounded-md shadow-sm btn item-center md:px-3 md:py-3 hover:bg-primary-100 hover:border-primary-500">
                  <span className="text-2xl icon"><RiCompass3Fill /></span>
                  <span className="ml-2 uppercase btn-project-vote_total whitespace-nowrap">
                    <span className="inline-block text-sm font-medium">Visit</span> 
                  </span>
                </btn>
                <btn className="flex-1 px-2 py-2 ml-4 justify-center md:px-3 md:py-3 text-white transition-all rounded-md shadow btn item-center btn-project-vote bg-primary-700 bg-gradient-to-tr from-primary-700 to-primary-500 hover:bg-primary-600 hover:from-primary-600 hover:to-primary-400">
                  <span className="-mb-1 -ml-1 text-2xl icon"><RiArrowUpSFill /></span>
                  <span className="ml-1 uppercase btn-project-vote_total whitespace-nowrap">
                    <span className="inline-block text-sm font-medium">Upvote</span> 
                    <strong className="inline-block ml-2 text-base font-bold">1989</strong>
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
                      <div className="w-full h-full project-media-wrapper">
                        <div className="overflow-hidden rounded shadow-xl project-media aspect-w-16 aspect-h-9">
                          {/* <img className="project-img" alt="" src="https://picsum.photos/1024/768?random=2" /> */}
                          <iframe width="560" height="315" src="https://www.youtube.com/embed/qnkuBUAwfe0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                      </div>
                    </div>

                    <div className="md:flex mt-4 pt-4 md:mt-8">

                      <div className="w-full flex-1 md:pr-10 text-gray-900 text-opacity-100 project-text">
                        <p className="pb-4">Part of the Legendary Series, 99 ever minted, 2nd Edition. Rune Farm is aiming to be a leading NFT platform on Binance Smart Chain.</p>

                        <p className="">Rune will launch yield farms as a way to acquire NFTs that can be combined into other NFTs called Rune Words. Characters and Guilds on the platform will gain certain farm bonuses or NFT rewards depending on their attributes. We are a fair launch project with no pre-sale, no investor, and no pre-mine.</p>
                      </div>

                      <div className="w-full mt-4 md:w-64 md:pl-8 md:-mt-1 text-sm text-gray-900 text-opacity-50 list-group-sm project-info">
                          <div className="list-group-item">
                            <strong className="uppercas">Project Info</strong>
                          </div>
                          <div className="list-group-item">
                            <span className="flex-1 w-20">Featured</span>
                            <strong className="ml-2 font-medium text-right text-gray-900 text-opacity-90">2 hours ago</strong>
                          </div>
                          <div className="pb-1 list-group-item">
                            <span className="flex-1 w-20">Data 1</span>
                            <strong className="ml-2 font-medium text-gray-900 text-opacity-90">Combined</strong>
                          </div>
                          <div className="pb-1 border-none list-group-item">
                            <span className="flex-1 w-20">Data 2</span>
                            <strong className="ml-2 font-medium text-gray-900 text-opacity-90">Other</strong>
                          </div>
                      </div>

                    </div>

                  </div>

                </div>
              </div>


              <div className="pt-4 border-t border-gray-100 section section-project-discussions">

                <div className="section-header">
                  <div className="section-title">Discussions</div>
                </div>

                <div className="section-body">

                  <div className="flex pt-4 mt-8">

                    <div className="flex-1 pr-10 text-gray-900 text-opacity-100">
                    </div>

                    <div className="pl-8 text-gray-900 text-opacity-50 lw-64">
                    </div>

                  </div>

                </div>
              </div>

            </div>

            {/* <div className="page-sidebar">
              <div className="flex flex-col h-full project-details">
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

