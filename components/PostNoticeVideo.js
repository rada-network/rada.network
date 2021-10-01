const PostNoticeMedia = ({}) => {
  return (
    <>
    <div className="post-notice">

      <div className="flex items-center">
        <p>
          Video này từ
          <a href="" rel="nofollow" target="_blank" className="link ml-2">
            <strong>Youtube</strong> 
            <span class="icon ml-1"><i class="fa-duotone fa-external-link text-2xs relative -top-0.5"></i></span>
          </a>
          <span className="mx-2">nói về</span> 
          <a href="" rel="nofollow" target="_blank" className="link"><strong>FIWA</strong></a>,
          <a href="" rel="nofollow" target="_blank" className="link ml-1"><strong>BTC</strong></a>
          <span className="mx-2">&amp;</span> 
          <a href="" rel="nofollow" target="_blank" className="link"><strong>ADA</strong></a>.
        </p>
      </div>

    </div>

    </>
  )
}

export default PostNoticeMedia