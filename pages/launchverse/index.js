import { Layout } from "@components/page-layouts/Global";
import { usePageStore } from "@lib/usePageStore";
import { useRouter } from "next/router";
import utils from "@lib/util";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from "next/link"

const LaunchVerse = (props) => {

  const { dataStore } = usePageStore()
  dataStore.lang = props.lang
  const { locales, asPath } = useRouter();
  dataStore.page = "launchverse"
  let meta = utils.createSiteMetadata(
    {
      page: 'launchverse',
      data: {
        query: props.type == "all" ? props.query : props.type
      },
      dataStore: dataStore
    },
    locales,
    asPath
  );
  dataStore.meta = meta;
  return (
    <Layout meta={meta}>

      <div className="pane-content">
        <div className="pane-content--sec pane-content-active !w-full">

          <div className="pane-content--sec--main grid scrollbar">

            <div className="page page-full page-landing--parallel bg-white dark:bg-gray-900 !pt-0">
              <div className="w-limiter-lg py-8 lg:py-16 px-2 md:px-4 lg:px-8 xl:px-16">

                {/* LOGO */}
                <div className="">
                  <span className="page-logo"></span>
                  <h1 className="sr-only">
                    <span className="">LaunchVerse</span>
                  </h1>
                </div>
                {/* END: LOGO */}

                {/* HEADER */}
                <header className="hero flex flex-col md:flex-row py-8 mt-8">
                  <div className="">
                    <h2 className="text-3xl md:text-3xl lg:text-4xl leading-tight text-black dark:text-white font-semibold font-altsans">
                      Introducing
                      <strong className="block text-yellow-400">RADA Launchverse</strong>
                    </h2>

                    <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">
                      LaunchVerse is a product of RADA - The DAO-based AngelList for Blockchain. As a leading decentralized community-driven LaunchPad, we fund and launch the most promising Gamefi and Blockchain projects.
                    </p>
                  </div>

                  <span className="hero-deco mx-auto mt-4 md:-mt-16 lg:-mt-28 xl:-mt-24 xl:ml-16"></span>
                </header>
                {/* END: HEADER */}

                {/* SECTION 1 */}
                <div className="">
                  <div className="">
                    <h2 className="text-3xl md:text-3xl lg:text-4xl leading-tight text-black dark:text-white font-semibold font-altsans">
                      <strong className="block text-yellow-400">The first Metaverse Gamefi</strong>
                      is launching on RADA LaunchVerse
                    </h2>
                  </div>

                  <div className="mt-8 relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

                    <div className="flex-shrink-0">
                      {/* <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/media/the_parallel_screenshot.png"} alt="The Parallel" /> */}

                      <div className="media-player rounded-xl">
                        <div className="w-full h-full">
                          <div className={`aspect-w-16 aspect-h-9`}>
                            <iframe
                              src={"https://www.youtube.com/embed/DEWHvVE7xr4"}
                              title="Welcome to The Parallel - An Infinite Metaverse"
                              frameBorder="0"
                              rel="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen="allowFullScreen"
                            />
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="
                                flex flex-col md:flex-row md:items-center px-4 md:px-8 py-4 md:py-4
                                bg-gradient-to-br from-gray-100 to-gray-100
                                dark:from-gray-800 dark:to-gray-800
                                rounded-b-xl
                              "
                    >
                      {/* <div className="
                                flex items-center absolute bottom-0 left-0 right-0 px-8 py-4
                                bg-gray-700 bg-opacity-70 backdrop-filter backdrop-blur
                                rounded-b-xl
                              "
                            > */}
                      <div className="flex-shrink-0 w-24 md:w-auto mb-2 md:mb-0">
                        <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/logos/theparallel.png"} alt="The Parallel" />
                      </div>

                      <div className="flex flex-col lg:flex-row lg:items-center md:pl-8">
                        <div className="">
                          <h3>
                            <span className="text-3xl leading-tight text-black dark:text-white font-semibold font-altsans">The Parallel</span>
                          </h3>
                          <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">
                            The Parallel is an Infinite Metaverse where players can limitlessly create everything, enjoy the unexpected experience that only Parallel can make.
                          </p>
                        </div>

                        <div className="flex-shrink-0 mt-4 lg:mt-0 lg:ml-8">
                          <Link href={`/${props.lang}/launchverse/parallel`} >
                            <a href={`/${props.lang}/launchverse/parallel`} title="The parallel universe" className="btn btn-secondary btn-lg btn-rounded">
                              <span className="text-sm lg:text-base">Discover Now</span>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
                {/* END: SECTION 1 */}

                {/* SECTION 2 */}
                <div className="mt-8">

                  <div className="
                              flex flex-col md:flex-row items-center justify-between p-4 md:p-8
                              border border-gray-200 dark:border-gray-700
                              rounded-xl
                            "
                  >
                    <div className="">
                      <h3>
                        <span className="block text-secondary-400 text-sm mb-2 font-medium">
                          WHAT MAKE US DIFFERENT
                        </span>
                        <span className="block text-3xl leading-tight text-black dark:text-white font-semibold font-altsans">
                          We drive community <br />
                          by Share2Earn
                        </span>
                      </h3>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">
                        We make a unique tokenomic that encourage community to share projects and earn RIR token. The more you share, the more you earn. Both parties can archive their goals easily.
                      </p>
                      <div className="mt-4">
                        <Link href={`/${props.lang}/launchverse/parallel/share2earn`}>
                        <a href={`/${props.lang}/launchverse/parallel/share2earn`} className="group text-secondary-400">
                          <span className="text-sm lg:text-base">Join now</span>
                          <span className="icon text-sm lg:text-base relative left-2 group-hover:left-3 transition-all"><i class="fas fa-angle-right"></i></span>
                        </a>
                        </Link>
                      </div>
                    </div>

                    {/* <div className="flex-shrink-0 ml-16 mr-16">
                              <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/launchverse-s2e-dark.png"} alt="The Parallel" />
                            </div> */}
                    <span className="s2e-deco flex-shrink-0 mx-auto md:ml-16 md:mr-16"></span>
                  </div>

                </div>
                {/* END: SECTION 2 */}

                {/* SECTION 3 */}
                <div className="mt-16">

                  <div className="">
                    <h2 className="text-3xl md:text-3xl lg:text-4xl leading-tight text-black dark:text-white font-semibold font-altsans">
                      The Launchverse <strong className="block md:inline text-yellow-400">for Everyone</strong>
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-8">
                    <div className="
                                flex flex-col items-stretch justify-start p-4 md:p-8
                                border border-gray-200 dark:border-gray-700
                                rounded-xl h-full
                              "
                    >
                      <div className="flex-shrink-0">
                        <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/icons/shield-hexa-dark.svg"} alt="The Parallel" />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">
                        We review projects and kyc team carefully so you can invest safely
                      </p>
                    </div>

                    <div className="
                                flex flex-col items-stretch justify-start p-4 md:p-8
                                border border-gray-200 dark:border-gray-700
                                rounded-xl h-full
                              "
                    >
                      <div className="flex-shrink-0">
                        <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/icons/bolt-hexa-dark.svg"} alt="The Parallel" />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">
                        Tier system can help user that contribute most to project get more reward
                      </p>
                    </div>

                    <div className="
                                flex flex-col items-stretch justify-start p-4 md:p-8
                                border border-gray-200 dark:border-gray-700
                                rounded-xl h-full
                              "
                    >
                      <div className="flex-shrink-0">
                        <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/icons/net-hexa-dark.svg"} alt="The Parallel" />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">
                        LaunchVerse support multi chains: Ethereum, BSC and Polygon
                      </p>
                    </div>

                    <div className="
                                flex flex-col items-stretch justify-start p-4 md:p-8
                                border border-gray-200 dark:border-gray-700
                                rounded-xl h-full
                              "
                    >
                      <div className="flex-shrink-0">
                        <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/icons/scale-hexa-dark.svg"} alt="The Parallel" />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">
                        A Distribution Portal for projects to vest project sold tokens
                      </p>
                    </div>

                    <div className="
                                flex flex-col items-stretch justify-start p-4 md:p-8
                                border border-gray-200 dark:border-gray-700
                                rounded-xl h-full
                              "
                    >
                      <div className="flex-shrink-0">
                        <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/icons/incubate-hexa-dark.svg"} alt="The Parallel" />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">
                        Help to incubate early stage project with our professional experts
                      </p>
                    </div>

                    <div className="
                                flex flex-col items-stretch justify-start p-4 md:p-8
                                border border-gray-200 dark:border-gray-700
                                rounded-xl h-full
                              "
                    >
                      <div className="flex-shrink-0">
                        <img className="" src={process.env.NEXT_PUBLIC_CDN + "/images/icons/dao-hexa-dark.svg"} alt="The Parallel" />
                      </div>
                      <p className="text-sm lg:text-base leading-relaxed text-black dark:text-white text-opacity-70 dark:text-opacity-70 mt-4">
                        Fully function DAO with Governance model and Permissionless listing
                      </p>
                    </div>
                  </div>

                </div>
                {/* END: SECTION 3 */}

                <div className="footer mt-16 md:mt-24 pb-32 md:pb-24">

                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <small className="text-sm leading-relaxed font-light text-black dark:text-white text-opacity-70 dark:text-opacity-70 max-w-md">
                      &copy; Copyright Rada Network 2021. All rights reserved.
                    </small>

                    <a href="https://form.jotform.com/213272840844456" rel="nofollow" target="_blank"
                      className="
                               text-sm leading-relaxed max-w-md py-2 px-4 mt-4 md:mt-0 rounded-lg
                               bg-gray-100 dark:bg-gray-800 hover:bg-primary-500 dark:hover:bg-primary-900
                               font-light text-black dark:text-white text-opacity-70 dark:text-opacity-70
                               hover:text-opacity-100 hover:text-white dark:hover:text-opacity-100
                              "
                    >
                      Launch your project on RADA ?
                    </a>
                  </div>

                  <span className="footer-deco"></span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </Layout>
  );
}


export async function getStaticProps(context) {
  let props = {
    lang: context.locale
  }
  props = Object.assign(props, {
    ...await serverSideTranslations(context.locale, ['common', 'navbar', 'invest','launchpad','share2earn']),
  })
  return {
    props
  }
}

export default LaunchVerse;
