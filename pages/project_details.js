import Head from 'next/head';

import Link from 'next/link'
import dynamic from "next/dynamic";
import TextareaAutosize from 'react-textarea-autosize';

// Components
import {Layout} from '../components/page-layouts/OneColumn';
import {Header} from '../components/Header';
import {ProjectsList} from '../components/card-layouts/ProjectsList';

//ReactIcons
import { IoChevronForwardSharp } from "react-icons/io5";
import { RiArrowUpSFill } from "react-icons/ri";
import { RiCompass3Fill } from "react-icons/ri";
import { RiChat1Fill } from "react-icons/ri";
import { RiThumbUpLine } from "react-icons/ri";
import { RiThumbUpFill } from "react-icons/ri";

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

              <div className="mt-2 metadata-wrapper project-metadata-wrapper">
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
                <btn className="justify-center px-2 py-2 text-purple-700 bg-white border border-gray-200 rounded-md w-icon-104 md:w-full btn item-center md:px-3 md:py-3 hover:bg-primary-100 hover:border-primary-500">
                  <span className="text-2xl icon"><RiCompass3Fill /></span>
                  <span className="ml-2 uppercase btn-project-vote_total whitespace-nowrap">
                    <span className="inline-block text-sm font-medium">Visit</span> 
                  </span>
                </btn>
                <btn className="justify-center flex-1 px-2 py-2 ml-4 text-white transition-all rounded-md md:px-3 md:py-3 btn item-center btn-project-vote bg-primary-700 hover:bg-primary-600">
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

                    <div className="grid grid-cols-1 md:grid-cols-12 pt-4 mt-4 md:mt-8">

                      <div className="md:col-span-9 w-full text-gray-900 text-opacity-100 md:pr-10 project-text">
                        <p className="pb-4">Part of the Legendary Series, 99 ever minted, 2nd Edition. Rune Farm is aiming to be a leading NFT platform on Binance Smart Chain.</p>

                        <p className="">Rune will launch yield farms as a way to acquire NFTs that can be combined into other NFTs called Rune Words. Characters and Guilds on the platform will gain certain farm bonuses or NFT rewards depending on their attributes. We are a fair launch project with no pre-sale, no investor, and no pre-mine.</p>
                      </div>

                      <div className="md:col-span-3 w-full mt-4 text-sm text-gray-900 text-opacity-50 md:pl-8 md:-mt-1 list-group-sm project-info">
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


              <div className="pt-8 border-t border-gray-100 section section-project-discussions">

                <div className="section-header">
                  <div className="section-title">Discussions</div>
                </div>

                <div className="section-body">

                  <div className="grid grid-cols-1 md:grid-cols-12">

                    <div className="md:col-span-9 md:pr-10">

                      {/* Comment Form */}
                      <div className="grid grid-cols-1">

                        <div className="flex justify-center items-baseline">

                          <div className="mr-2">
                            <div className="user-wallet_avatar user-wallet_avatar_green">
                              <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">xa</span>
                            </div>
                          </div>

                          <TextareaAutosize className="w-full px-4 py-2 text-base border border-gray-100 rounded-md shadow-sm resize-none bg-gray-50 focus:bg-white focus:shadow focus:border-primary-700 focus:outline-none focus:ring-0"  row="1" title="Write a comment" placeholder="What do you think of this project?" />

                          <div className="text-sm text-gray-900 text-opacity-50 pl-2 md:mt-0">
                            <btn className="w-full justify-center flex-1 px-3 py-3 text-gray-500 transition-all rounded-md btn item-center btn-project-vote bg-gray-100 hover:bg-primary-100 hover:text-primary-700">Submit</btn>
                          </div>
                        </div>

                      </div>

                      {/* Comment Threads */}
                      <div className="comments-list grid grid-cols-1">

                        {/* Comment that you liked */}
                        <div className="comments-list-item flex flex-col items-stretch">

                          <div className="comment group flex">                        
                            <div className="mr-6">
                              <div className="user-wallet_avatar user-wallet_avatar_red">
                                <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">5e</span>
                              </div>
                            </div>
                            <div className="comment-main">
                              <div className="comment-header">
                                <div className="user-wallet_title flex items-baseline">
                                  <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">0x495f...7b5e</span>
                                  <span className="text-xs ml-4 text-gray-900 text-opacity-50">
                                  <span>4 hours</span> ago
                                  </span>
                                </div>
                              </div>
                              <div className="comment-text mt-1">
                                <p>Good math, active developers and admins. Service at the highest level. Cheap loot. Long term planning right from the start. I advise everyone?</p>
                              </div>
                              <div className="comment-footer mt-3 flex flex-wrap items-center justify-between text-xs text-gray-900 text-opacity-50">
                                <div className="flex items-center">
                                  <btn className="btn py-1 px-2 border border-primary-500 text-primary-700 bg-primary-100 rounded">
                                    <span className="icon mr-2"><RiThumbUpFill /></span>
                                    <span className="font-bold mr-2">1983</span> <span>Likes</span>
                                  </btn>
                                  <btn className="btn py-1 px-2 ml-2 hover:text-primary-700 rounded">
                                    <span className="icon mr-2"><i class="fa fa-reply"></i></span>
                                    <span>Reply</span>
                                  </btn>
                                </div>
                                <btn className="btn py-1 px-2 ml-2 hover:text-red-700 rounded opacity-0 group-hover:opacity-100">
                                  <span className="icon mr-2"><i class="fas fa-exclamation"></i></span>
                                  <span>Report</span>
                                </btn>
                              </div>
                            </div>
                          </div>

                          {/* Reply */}
                          <div className="comment comment_reply group flex">
                            <div className="mr-3">
                              <div className="user-wallet_avatar_sm user-wallet_avatar_yellow">
                                <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">ab</span>
                              </div>
                            </div>
                            <div className="comment-main">
                              <div className="comment-header">
                                <div className="user-wallet_title flex items-baseline">
                                  <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">0x678f...2xab</span>
                                  <span className="text-xs ml-4 text-gray-900 text-opacity-50">
                                  <span>8 hours</span> ago
                                  </span>
                                </div>
                              </div>
                              <div className="comment-text mt-1">
                                <p>So awesome! Takes NFT's to a new level ! Good job guys!</p>
                              </div>
                              <div className="comment-footer mt-3 flex flex-wrap items-center justify-between text-xs text-gray-900 text-opacity-50">
                                <div className="flex items-center">
                                  <btn className="btn py-1 px-2 border border-gray-200 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-100 rounded">
                                    <span className="icon mr-2"><RiThumbUpFill /></span>
                                    <span>Likes</span>
                                  </btn>
                                  <btn className="btn py-1 px-2 ml-2 hover:text-primary-700 rounded">
                                    <span className="icon mr-2"><i class="fa fa-reply"></i></span>
                                    <span>Reply</span>
                                  </btn>
                                </div>
                                <btn className="btn py-1 px-2 ml-2 hover:text-red-700 rounded opacity-0 group-hover:opacity-100">
                                  <span className="icon mr-2"><i class="fas fa-exclamation"></i></span>
                                  <span>Report</span>
                                </btn>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Comment */}
                        <div className="comments-list-item flex flex-col items-stretch">
                          <div className="comment group flex">
                            <div className="mr-6">
                              <div className="user-wallet_avatar user-wallet_avatar_blue">
                                <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">9x</span>
                              </div>
                            </div>
                            <div className="comment-main">
                              <div className="comment-header">
                                <div className="user-wallet_title flex items-baseline">
                                  <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">0x222f...8b9x</span>
                                  <span className="text-xs ml-4 text-gray-900 text-opacity-50">
                                  <span>4 hours</span> ago
                                  </span>
                                </div>
                              </div>
                              <div className="comment-text mt-1">
                                <p>This smart is very good choice for everyone! Recommend to join. No backdoor and fully verified by HazeCrypto!</p>
                              </div>
                              <div className="comment-footer mt-3 flex flex-wrap items-center justify-between text-xs text-gray-900 text-opacity-50">
                                <div className="flex items-center">
                                  <btn className="btn py-1 px-2 border border-gray-200 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-100 rounded">
                                    <span className="icon mr-2"><RiThumbUpFill /></span>
                                    <span className="font-bold mr-2">20</span> <span>Likes</span>
                                  </btn>
                                  <btn className="btn py-1 px-2 ml-2 hover:text-primary-700 rounded">
                                    <span className="icon mr-2"><i class="fa fa-reply"></i></span>
                                    <span>Reply</span>
                                  </btn>
                                </div>
                                <btn className="btn py-1 px-2 ml-2 hover:text-red-700 rounded opacity-0 group-hover:opacity-100">
                                  <span className="icon mr-2"><i class="fas fa-exclamation"></i></span>
                                  <span>Report</span>
                                </btn>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Comment */}
                        <div className="comments-list-item flex flex-col items-stretch">
                          <div className="comment group flex">
                            <div className="mr-6">
                              <div className="user-wallet_avatar user-wallet_avatar_yellow">
                                <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">ab</span>
                              </div>
                            </div>
                            <div className="comment-main">
                              <div className="comment-header">
                                <div className="user-wallet_title flex items-baseline">
                                  <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">0x678f...2xab</span>
                                  <span className="text-xs ml-4 text-gray-900 text-opacity-50">
                                  <span>8 hours</span> ago
                                  </span>
                                </div>
                              </div>
                              <div className="comment-text mt-1">
                                <p>So awesome! Takes NFT's to a new level ! Good job guys!</p>
                              </div>
                              <div className="comment-footer mt-3 flex flex-wrap items-center justify-between text-xs text-gray-900 text-opacity-50">
                                <div className="flex items-center">
                                  <btn className="btn py-1 px-2 border border-gray-200 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-100 rounded">
                                    <span className="icon mr-2"><RiThumbUpFill /></span>
                                    <span className="font-bold mr-2">1</span> <span>Likes</span>
                                  </btn>
                                  <btn className="btn py-1 px-2 ml-2 hover:text-primary-700 rounded">
                                    <span className="icon mr-2"><i class="fa fa-reply"></i></span>
                                    <span>Reply</span>
                                  </btn>
                                </div>
                                <btn className="btn py-1 px-2 ml-2 hover:text-red-700 rounded opacity-0 group-hover:opacity-100">
                                  <span className="icon mr-2"><i class="fas fa-exclamation"></i></span>
                                  <span>Report</span>
                                </btn>
                              </div>
                            </div>
                          </div>
                        </div>

                       {/* Comment that you reported */}
                       <div className="comments-list-item flex flex-col items-stretch">
                          <div className="comment group flex">
                            <div className="mr-6">
                              <div className="user-wallet_avatar user-wallet_avatar_purple">
                                <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">2h</span>
                              </div>
                            </div>
                            <div className="comment-main">
                              <div className="comment-header">
                                <div className="user-wallet_title flex items-baseline">
                                  <span className="text-sm font-semibold whitespace-nowrap line-clamp-1">0x268a...1z2h</span>
                                  <span className="text-xs ml-4 text-gray-900 text-opacity-50">
                                  <span>1 day</span> ago
                                  </span>
                                </div>
                              </div>
                              <div className="comment-text mt-1">
                                <p>This is a bad comment and you already reported!</p>
                              </div>
                              <div className="comment-footer mt-3 flex flex-wrap items-center justify-between text-xs text-gray-900 text-opacity-50">
                                <div className="flex items-center">
                                  <btn className="btn py-1 px-2 border border-gray-200 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-100 rounded">
                                    <span className="icon mr-2"><RiThumbUpFill /></span>
                                    <span>Likes</span>
                                  </btn>
                                  <btn className="btn py-1 px-2 ml-2 hover:text-primary-700 rounded">
                                    <span className="icon mr-2"><i class="fa fa-reply"></i></span>
                                    <span>Reply</span>
                                  </btn>
                                </div>
                                <btn className="btn py-1 px-2 ml-2 border border-red-500 text-red-700 rounded">
                                  <span className="icon mr-2"><i class="fas fa-exclamation"></i></span>
                                  <span>Report</span>
                                </btn>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>

                    <div className="w-full mt-4 text-sm text-gray-900 text-opacity-50 md:col-span-3 md:pl-8 md:-mt-1 list-group-sm">
                      <div>This is a sub-sidebar placeholder</div>
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

