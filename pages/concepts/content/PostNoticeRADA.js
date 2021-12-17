const PostNotice = ({}) => {
  return (
    <>
    <div className="post-notice">

      <div className="flex items-center">
        <p>
          Bài viết này được lược dẫn từ 
          <a href="" rel="nofollow" target="_blank" className="link ml-2">
            <strong>Tap Chi Bitcoin</strong> 
            <span className="icon ml-1"><i className="fa-duotone fa-external-link text-2xs relative -top-0.5"></i></span>
          </a>
          <span className="mx-2">viết về</span> 
          <a href="" rel="nofollow" target="_blank" className="link"><strong>FIWA</strong></a>,
          <a href="" rel="nofollow" target="_blank" className="link ml-1"><strong>BTC</strong></a>
          <span className="mx-2">&amp;</span> 
          <a href="" rel="nofollow" target="_blank" className="link ml-1"><strong>ADA</strong></a>.
        </p>
      </div>

    </div>

    </>
  )
}

export default PostNotice