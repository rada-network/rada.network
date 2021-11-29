const Toc = ({}) => {
  return (
    <>
    <div className="article-toc" role="navigation">
      <h5 className="text-color-title">ON this page</h5>
      <ol>
        <li>
          <a href="#">Project Introduction</a>
        </li>
        <li>
          <a href="#" className="toc--active">Market Review</a>
          <ol>
            <li>
              <a href="#">Metaverse</a>
            </li>
            <li>
              <a href="#">Traditional gaming</a>
            </li>
            <li>
              <a href="#" className="toc--active">Gamefi &amp; Enjoy2Earn</a>
            </li>
          </ol>
        </li>
        <li>
          <a href="#">Product Review</a>
          <ol>
            <li>
              <a href="#">User-Generated Content (Creative)</a>
            </li>
            <li>
              <a href="#">Hydra System (Copyright Ownership)</a>
            </li>
            <li>
              <a href="#">Entertainment &amp; Connection</a>
            </li>
            <li>
              <a href="#">Enjoy To Earn</a>
            </li>
          </ol>
        </li>
        <li>
          <a href="#">Unique Selling Points</a>
          <ol>
            <li>
              <a href="#">A True Metaverse</a>
            </li>
            <li>
              <a href="#">Enjoy2Earn</a>
            </li>
            <li>
              <a href="#">Easy2Play</a>
            </li>
            <li>
              <a href="#">Enjoy To Earn</a>
            </li>
          </ol>
        </li>
        <li>
          <a href="#">Tokenomics</a>
          <ol>
            <li>
              <a href="#">Governance Token</a>
            </li>
            <li>
              <a href="#">Utility Token</a>
            </li>
            <li>
              <a href="#">Earn and Burn</a>
            </li>
            <li>
              <a href="#">DeFi and Game</a>
            </li>
            <li>
              <a href="#">Economic Loop</a>
            </li>
            <li>
              <a href="#">Token Distribution</a>
            </li>
          </ol>
        </li>
        <li>
          <a href="#">Team</a>
        </li>
      </ol>
    </div>
    </>
  )
}

export default Toc