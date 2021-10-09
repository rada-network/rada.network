const Footnote = ({}) => {
  return (
    <>
    <div className="post-footer post-footer--rada">

    <div className="flex flex-col">
      <div className="flex lg:items-center !mb-1">
        <img className="w-5 lg:w-7 inline-block !ml-0 !mr-3" src="https://cdn.rada.network/images/rada.svg" alt="RADA NETWORK" />
        <strong className="lg:text-lg font-bold">
          RADA
        </strong>
      </div>
      <div className="text-sm lg:text-base ml-8 lg:ml-10 !mb-0">DAO based blockchain investment community</div>
    </div>

    {/* <div className="flex items-center !mb-2">
      <span className="icon w-7 text-center">
        <i className="fa-solid fa-envelope text-lg text-yellow-500"></i>
      </span>
      <span className="ml-3">
        <a href="mailto:rada.workingdrive@gmail.com">rada.workingdrive@gmail.com</a>
      </span>
    </div> */}

    <div className="flex flex-wrap ml-8 lg:ml-10 !mb-0">

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
        className="btn btn-default btn-yellow btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="mailto:rada.workingdrive@gmail.com"
        target="_blank"
      >
        <span className="icon">
          <i className="fa-solid fa-envelope"></i>
        </span>
        <span className="btn--text">
          Mail for Work
        </span>
      </a>

      <a 
        className="btn btn-default btn-red btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://www.youtube.com/channel/UCZUun_BIo0GZgvBNsYSUjwQ"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-youtube"></i>
        </span>
        <span className="btn--text">
          Youtube
        </span>
      </a>

      <a 
        className="btn btn-default brand--twitter btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://twitter.com/radamedia"
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
        className="btn btn-default brand--telegram btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://t.me/joinchat/l39iN84IeUwxZjBl"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-telegram-plane"></i>
        </span>
        <span className="btn--text">
          Telegram
        </span>
      </a>

      <a 
        className="btn btn-default brand--facebook btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://www.facebook.com/rada.daocomm..."
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-solid fa-heart"></i>
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
          Commnunity
        </span>
      </a>

      <a 
        className="btn btn-default brand--discord btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://discord.link/rada"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-discord"></i>
        </span>
        <span className="btn--text">
          Discord
        </span>
      </a>

      <a 
        className="btn btn-default brand--linkedin btn-rounded mr-2 mt-2 lg:mr-3 lg:mt-3"
        href="https://www.linkedin.com/company/radadao/"
        target="_blank"
        rel="nofollow noopener"
      >
        <span className="icon">
          <i className="fa-brands fa-linkedin-in"></i>
        </span>
        <span className="btn--text">
          LinkedIn
        </span>
      </a>

    </div>

    </div>
    </>
  )
}

export default Footnote