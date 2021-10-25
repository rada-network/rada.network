import { Head } from "../../components/Head";

function Concept() {
  return (
    <>     
    <Head />

    <div className="pane-content--sec--main grid scrollbar">

    {/* NNTH: Remove 'max-w-screen-md mx-auto' on production */}
    <div className="page page-coininfo max-w-screen-md mx-auto">

      <div className="section section-coininfo--team">

        <div className="grid grid-cols-1">

          {/* Post Header */}
          <div className="flex flex-col">

            <div className="flex flex-wrap justify-between items-center w-full">
              <div className="flex flex-0 flex-shrink-0 mb-4">
                <span className="icon flex-shrink-0">
                  <img src="/images/coins/axs.png" className="mr-2 h-px-24 w-px-24" alt="AXS Symbol"/>
                </span>
                <h1 className="flex items-center">
                  <strong className="text-lg font-semibold">Axie Infinity</strong>
                  <span className="badge badge-coin ml-2">AXS</span>
                </h1>
                {/* Price */}
              </div>
              <div className="flex flex-wrap space-x-2 mb-4">
                <span className="badge badge-lg">GameFi</span>
                <span className="badge badge-lg">NFT</span>
                <span className="badge badge-lg">Play to Earn</span>
                <span className="badge badge-lg badge-red">Trending</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap md:flex-nowrap items-start w-full">

                {/* General Info */}
                <div className="flex flex-wrap md:flex-nowrap w-full md:space-x-2 md:divide-x divide-gray-400 divide-opacity-20">

                  <div className="md:text-center pr-8 md:pr-0 md:w-1/2 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">
                        Location
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong className="">
                        Vietnam
                      </strong>
                    </div>
                  </div>

                  <div className="md:text-center pr-8 md:pr-0 md:w-1/2 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">
                        Founded
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong className="">
                        2018
                      </strong>
                    </div>
                  </div>

                  <div className="md:text-center pr-8 md:pr-0 md:w-1/2 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">
                        Employees
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong className="">
                        11-50
                      </strong>
                    </div>
                  </div>

                  <div className="md:text-center pr-8 md:pr-0 md:w-1/2 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span
                        className="uppercase opacity-50 text-2xs md:text-xs"
                        title="Last Funding Type"
                      >
                        Last Funding
                      </span>
                    </div>
                    <div className="mb-2">
                      <strong className="">
                        Series A
                      </strong>
                    </div>
                  </div>

                  <div className="md:text-center md:w-1/2 lg:w-full">
                    <div className="w-full lg:w-auto">
                      <span className="uppercase opacity-50 text-2xs md:text-xs">
                        Headquarter
                      </span>
                    </div>
                    <div className="mb-2">
                      <a
                        href="https://skymavis.com/"
                        rel="nofollow"
                        target="_blank"
                      >
                        <strong className="">
                          Sky Mavis
                        </strong>
                        <span class="icon ml-1 relative -top-0.5"><i class="fa-duotone fa-external-link text-2xs"></i></span>
                      </a>
                    </div>
                  </div>

                </div>
                {/* END: General Info */}
              </div>
            </div>
              
          </div>
          {/* End: Post Header */}

          {/* Post Content - Team */}
          <div className="w-full mt-4"> 

            <div className="mt-8">

              <h2 className="md:text-center text-2xl font-semibold">Who is building Axie Infinity?</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">

                <div className="card card-team">
                  <div className="card-media">
                    <div className="avatar avatar-3xl">
                      <img src="https://skymavis.com/static/TrungNguyen.0c1b496e.png" />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-body-header">
                      <h3 className="">Trung Nguyen</h3>
                      <p>CEO &amp; Founder</p>
                    </div>
                    <div className="card-body-main">
                      <p className="">
                        Trung Nguyen is CEO of Sky Mavis. He is an entrepreneur who started 5 years on Wall Street in 2007 and left to create an open source community which grew to over 100,000 members.
                      </p>
                    </div>
                  </div>
                  <div className="card-body-footer">
                    <div className="cta-wrapper about-social">
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-twitter"></i>
                      </a>
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-facebook-f"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card card-team">
                  <div className="card-media">
                    <div className="avatar avatar-3xl">
                      <img src="https://skymavis.com/static/Alek.fb1be3cd.png" />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-body-header">
                      <h3 className="">Aleksander L. Larsen</h3>
                      <p>COO &amp; Co-Founder</p>
                    </div>
                    <div className="card-body-main">
                      <p className="">
                        Trung Nguyen is CEO of Sky Mavis. He is an entrepreneur who started 5 years on Wall Street in 2007 and left to create an open source community which grew to over 100,000 members.
                      </p>
                    </div>
                  </div>
                  <div className="card-body-footer">
                    <div className="cta-wrapper about-social">
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-twitter"></i>
                      </a>
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-facebook-f"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card card-team">
                  <div className="card-media">
                    <div className="avatar avatar-3xl">
                      <img src="https://skymavis.com/static/VietAnh.a8852a8b.png" />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-body-header">
                      <h3 className="">Viet Anh Ho</h3>
                      <p>CTO</p>
                    </div>
                    <div className="card-body-main">
                      <p className="">
                        Trung Nguyen is CEO of Sky Mavis. He is an entrepreneur who started 5 years on Wall Street in 2007 and left to create an open source community which grew to over 100,000 members.
                      </p>
                    </div>
                  </div>
                  <div className="card-body-footer">
                    <div className="cta-wrapper about-social">
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-twitter"></i>
                      </a>
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-facebook-f"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="card card-team">
                  <div className="card-media">
                    <div className="avatar avatar-3xl">
                      <img src="https://skymavis.com/static/TuDoan.7b832689.png" />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-body-header">
                      <h3 className="">Tu Doan</h3>
                      <p>Art Director</p>
                    </div>
                    <div className="card-body-main">
                      <p className="">
                        Trung Nguyen is CEO of Sky Mavis. He is an entrepreneur who started 5 years on Wall Street in 2007 and left to create an open source community which grew to over 100,000 members.
                      </p>
                    </div>
                  </div>
                  <div className="card-body-footer">
                    <div className="cta-wrapper about-social">
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-linkedin-in"></i>
                      </a>
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-twitter"></i>
                      </a>
                      <a className="btn" href="" rel="nofollow" target="_blank">
                        <i class="fa-brands fa-facebook-f"></i>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* END: Post Content - Team */}

          
          {/* Post Content - Partners */}
          <div className="w-full mt-8"> 

            <div className="mt-8">

              <h2 className="md:text-center text-2xl font-semibold">Axie Infinity's Partners</h2>

              <div className="flex flex-wrap mt-4 list-partners">
                <a href="" className="" rel="nofollow" target="_blank">
                  <img src="/images/examples/logo-samsung.png" />
                </a>
                <a href="" className="" rel="nofollow" target="_blank">
                  <img src="/images/examples/logo-binance.png" />
                </a>
                <a href="" className="" rel="nofollow" target="_blank">
                  <img src="/images/examples/logo-ubisoft.png" />
                </a>
                <a href="" className="" rel="nofollow" target="_blank">
                  <img src="/images/examples/logo-kyber.png" />
                </a>
                <a href="" className="" rel="nofollow" target="_blank">
                  <img src="/images/examples/logo-makerdao.png" />
                </a>
              </div>

            </div>

          </div>
          {/* END: Post Content - Partners */}

        </div>

      </div>

    </div>
    </div>

    </>
  )
}

export default Concept
