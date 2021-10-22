const Footnote = ({}) => {
  return (
    <>
    <div className="post-footer post-footer--rada">

    <div className="flex flex-col items-start">
      <div className="flex flex-col lg:flex-row lg:items-start !mb-0">
        <img className="w-5 lg:w-7 inline-block !ml-0 !mr-3 mb-2" src="https://cdn.rada.network/images/rada.svg" alt="RADA NETWORK" />
        <div className="flex flex-row lg:flex-col items-center lg:items-start">
          <strong className="logo--text lg:text-lg font-bold">
            RADA
          </strong>
          <span className="mx-1.5 text-base block lg:hidden">&bull;</span>
          <div className="text-sm lg:text-base lg:ml-0 !mb-0">The DAO-based Angellist for Blockchain</div>
        </div>
      </div>
    </div>

    {/* <div className="flex items-center !mb-2">
      <span className="icon w-7 text-center">
        <i className="fa-solid fa-envelope text-lg text-yellow-500"></i>
      </span>
      <span className="ml-3">
        <a href="mailto:rada.workingdrive@gmail.com">rada.workingdrive@gmail.com</a>
      </span>
    </div> */}

    <div className="flex flex-wrap lg:ml-10 !mb-0">

      {/* <a 
        className="btn btn-default btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://rada.network/"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-regular fa-globe"></i>
        </span>
        <span className="btn--text">
          Website
        </span>
      </a> */}

      <a 
        className="btn btn-default brand--telegram btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://t.me/radanetwork"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-telegram"></i>
        </span>
        <span className="btn--text">
          Announcement
        </span>
      </a>

      <a 
        className="btn btn-default brand--telegram btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://t.me/radadao"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-telegram"></i>
        </span>
        <span className="btn--text">
          Global Community
        </span>
      </a>

      <a 
        className="btn btn-default brand--twitter btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://twitter.com/rada_network"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-twitter"></i>
        </span>
        <span className="btn--text">
          Twitter
        </span>
      </a>


      <a 
        className="btn btn-default brand--facebook btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://www.facebook.com/radanetwork.official"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-facebook"></i>
        </span>
        <span className="btn--text">
          Fanpage
        </span>
      </a>

      <a 
        className="btn btn-default brand--facebook btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://www.facebook.com/groups/rada.co"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-facebook"></i>
        </span>
        <span className="btn--text">
          Vietnam Community
        </span>
      </a>

      <a 
        className="btn btn-default brand--google btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://www.youtube.com/c/radatvofficial"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-youtube"></i>
        </span>
        <span className="btn--text">
          RADA TV
        </span>
      </a>

      <a 
        className="btn btn-default brand--instagram btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://www.instagram.com/rada.offficial/"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-instagram"></i>
        </span>
        <span className="btn--text">
          Instagram
        </span>
      </a>

      <a 
        className="btn btn-default brand--tiktok btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://vt.tiktok.com/ZSeY1p2yB/"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-tiktok"></i>
        </span>
        <span className="btn--text">
          Tiktok
        </span>
      </a>

    </div>

    </div>
    </>
  )
}

export default Footnote