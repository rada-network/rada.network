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
          <i className={`fad fa-${widgetIcon || ''} text-${widgetIconColor || 'gray-400'} widget-icon-fa`}/>
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

              <div class="metadata-wrapper justify-between mt-1 md:mt-2">
                <div class="flex flex-shrink-0">
                  <div class="metadata metadata-source">
                    <span class="icon mr-1"><i class="fad fa-newspaper"></i></span>
                    <span class="metadata-value" title="CoinTelegraph">DailyHodl</span>
                  </div>
                  <div class="metadata metadata-date">
                    <span class="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div class="flex metadata-wrapper_nodivide">
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-comment-alt"></i></span>
                    <span class="">107</span>
                  </div>
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-arrow-up"></i></span>
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

              <div class="metadata-wrapper justify-between mt-1 md:mt-2">
                <div class="flex flex-shrink-0">
                  <div class="metadata metadata-source">
                    <span class="icon mr-1"><i class="fad fa-newspaper"></i></span>
                    <span class="metadata-value" title="CoinTelegraph">Project Catalyst</span>
                  </div>
                  <div class="metadata metadata-date">
                    <span class="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div class="flex metadata-wrapper_nodivide">
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-comment-alt"></i></span>
                    <span class="">28</span>
                  </div>
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-arrow-up"></i></span>
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

              <div class="metadata-wrapper justify-between mt-1 md:mt-2">
                <div class="flex flex-shrink-0">
                  <div class="metadata metadata-source">
                    <span class="icon mr-1"><i class="fad fa-newspaper"></i></span>
                    <span class="metadata-value" title="CoinTelegraph">CryptoTalk</span>
                  </div>
                  <div class="metadata metadata-date">
                    <span class="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div class="flex metadata-wrapper_nodivide">
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-comment-alt"></i></span>
                    <span class="">15</span>
                  </div>
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-arrow-up"></i></span>
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

              <div class="metadata-wrapper justify-between mt-1 md:mt-2">
                <div class="flex flex-shrink-0">
                  <div class="metadata metadata-source">
                    <span class="icon mr-1"><i class="fad fa-newspaper"></i></span>
                    <span class="metadata-value" title="CoinTelegraph">CoinTelegraph</span>
                  </div>
                  <div class="metadata metadata-date">
                    <span class="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div class="flex metadata-wrapper_nodivide">
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-comment-alt"></i></span>
                    <span class="">2</span>
                  </div>
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-arrow-up"></i></span>
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

              <div class="metadata-wrapper justify-between mt-1 md:mt-2">
                <div class="flex flex-shrink-0">
                  <div class="metadata metadata-source">
                    <span class="icon mr-1"><i class="fad fa-newspaper"></i></span>
                    <span class="metadata-value" title="CoinTelegraph">U.Today</span>
                  </div>
                  <div class="metadata metadata-date">
                    <span class="metadata-value" title="9:2 PM - Jul 15, 2021">13h</span>
                  </div>
                </div>
                <div class="flex metadata-wrapper_nodivide">
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-comment-alt"></i></span>
                    <span class="">15</span>
                  </div>
                  <div class="metadata">
                    <span class="icon mr-1"><i class="far fa-arrow-up"></i></span>
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
          <span className="btn__text">Show 4 more</span>
          <span className="btn__caret_down"></span>
        </a>
      </div>

    </div>

  );
};