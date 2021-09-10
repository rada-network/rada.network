/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/link-passhref */
import Link from "next/link"

import {RiExternalLinkLine} from "react-icons/ri";

export const WidgetPosts = ({title, widgetIcon, widgetIconColor}) => {
  return (

    <div className={`widget widget-posts`}>

      { title &&
      <div className={`widget-header`}>
        <div className={`widget-title`}>
          <span className="text-color-title">{title}</span>
        </div>
        <span className={`widget-icon`}>
          <i className={`fa-duotone fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} widget-icon-fa`}/>
        </span>
      </div> }

      <div className={`widget-body-p0`}>

        <div className={`widget-list`}>

          {/* Post Item */}
          <Link href="#" target="_blank">
          <div className={`card card-post`}>

            <div className={`card-media`}>
              <div className={`card-media-img`}>
                <img className={`card-img`} src="https://picsum.photos/300/300?random=1" alt="" />
              </div>
            </div>

            <div className="card-body">
              <div className={`widget-list--item--title card-title`}>
                <a href="#" target="_blank">
                  <span className="text-color-title">MakerDAO to dissolve Foundation and become truly decentralized again</span>
                </a>
              </div>

              <div className="metadata-wrapper justify-between mt-1">
                <div className="flex flex-shrink-0">
                  <div className="metadata metadata-source">
                    <span className="icon mr-1"><i className="fa-duotone fa-newspaper"></i></span>
                    <span className="metadata-value" title="CoinTelegraph">DailyHodl</span>
                  </div>
                  <div className="metadata metadata-date">
                    <span className="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div className="flex metadata-wrapper_nodivide">
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-comment"></i></span>
                    <span className="">107</span>
                  </div>
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-arrow-up"></i></span>
                    <span>280</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </Link>

          {/* Post Item */}
          <Link href="#" target="_blank">
          <div className={`card card-post`}>

            <div className={`card-media`}>
              <div className={`card-media-img`}>
                <img className={`card-img`} src="https://picsum.photos/300/300?random=2" alt="" />
              </div>
            </div>

            <div className="card-body">
              <div className={`widget-list--item--title card-title`}>
                <a href="#" target="_blank">
                  <span className="text-color-title">Gold or Bitcoin – Where can you park your funds?</span>
                </a>
              </div>

              <div className="metadata-wrapper justify-between mt-1">
                <div className="flex flex-shrink-0">
                  <div className="metadata metadata-source">
                    <span className="icon mr-1"><i className="fa-duotone fa-newspaper"></i></span>
                    <span className="metadata-value" title="CoinTelegraph">Project Catalyst</span>
                  </div>
                  <div className="metadata metadata-date">
                    <span className="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div className="flex metadata-wrapper_nodivide">
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-comment"></i></span>
                    <span className="">28</span>
                  </div>
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-arrow-up"></i></span>
                    <span>83</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </Link>

          {/* Post Item */}
          <Link href="#" target="_blank">
          <div className={`card card-post`}>

            <div className={`card-media`}>
              <div className={`card-media-img`}>
                <img className={`card-img`} src="https://picsum.photos/300/300?random=3" alt="" />
              </div>
            </div>

            <div className="card-body">
              <div className={`widget-list--item--title card-title`}>
                <a href="#" target="_blank">
                  <span className="text-color-title">Fake News, Propaganda? Surging Delta Variant Blamed For Bitcoin Sell-Off</span>
                </a>
              </div>

              <div className="metadata-wrapper justify-between mt-1">
                <div className="flex flex-shrink-0">
                  <div className="metadata metadata-source">
                    <span className="icon mr-1"><i className="fa-duotone fa-newspaper"></i></span>
                    <span className="metadata-value" title="CoinTelegraph">CryptoTalk</span>
                  </div>
                  <div className="metadata metadata-date">
                    <span className="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div className="flex metadata-wrapper_nodivide">
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-comment"></i></span>
                    <span className="">15</span>
                  </div>
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-arrow-up"></i></span>
                    <span>27</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </Link>

          {/* Post Item */}
          <Link href="#" target="_blank">
          <div className={`card card-post`}>

            <div className={`card-media`}>
              <div className={`card-media-img`}>
                <img className={`card-img`} src="https://picsum.photos/300/300?random=4" alt="" />
              </div>
            </div>

            <div className="card-body">
              <div className={`widget-list--item--title card-title`}>
                <a href="#" target="_blank">
                  <span className="text-color-title">Family/Groups join planning dAPP</span>
                </a>
              </div>

              <div className="metadata-wrapper justify-between mt-1">
                <div className="flex flex-shrink-0">
                  <div className="metadata metadata-source">
                    <span className="icon mr-1"><i className="fa-duotone fa-newspaper"></i></span>
                    <span className="metadata-value" title="CoinTelegraph">CoinTelegraph</span>
                  </div>
                  <div className="metadata metadata-date">
                    <span className="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div className="flex metadata-wrapper_nodivide">
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-comment"></i></span>
                    <span className="">2</span>
                  </div>
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-arrow-up"></i></span>
                    <span>88</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </Link>

          {/* Post Item */}
          <Link href="#" target="_blank">
          <div className={`card card-post`}>

            <div className={`card-media`}>
              <div className={`card-media-img`}>
                <img className={`card-img`} src="https://picsum.photos/300/300?random=5" alt="" />
              </div>
            </div>

            <div className="card-body">
              <div className={`widget-list--item--title card-title`}>
                <a href="#" target="_blank">
                  <span className="text-color-title">Here’s the catalyst for Bitcoin’s future growth you might not be aware of</span>
                </a>
              </div>

              <div className="metadata-wrapper justify-between mt-1">
                <div className="flex flex-shrink-0">
                  <div className="metadata metadata-source">
                    <span className="icon mr-1"><i className="fa-duotone fa-newspaper"></i></span>
                    <span className="metadata-value" title="CoinTelegraph">U.Today</span>
                  </div>
                  <div className="metadata metadata-date">
                    <span className="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div className="flex metadata-wrapper_nodivide">
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-comment"></i></span>
                    <span className="">15</span>
                  </div>
                  <div className="metadata">
                    <span className="icon mr-1"><i className="far fa-arrow-up"></i></span>
                    <span>57</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </Link>

        </div>

      </div>

      <div className={`widget-footer`}>
        <a className="btn btn-nav block">
          <span className="btn--text">Show more</span>
          <span className="btn--caret-right"></span>
        </a>
      </div>

    </div>

  );
};