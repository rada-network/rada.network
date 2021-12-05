export default function Siteintro({ intro }) {
  return (
    <div className="page-about">
      <div className={`page-about-deco`} />

      <div className="page-about-content">
        <div className="page-about-content--section content-section--1">
          <span className="icon">
            <i class="fa-solid fa-info"></i>
          </span>
          <div dangerouslySetInnerHTML={{ __html: intro?.content }}></div>
        </div>

        <div className="page-about-content--section content-section--2">
          {/* <ul className="about-links">
            {/* <li><a href="#">Copyright</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="/p/How to invest with RADA?">Invest with RADA?</a></li>
          </ul> */}

          <div className="about-social">
            <a
              className="btn-facebook"
              target="_blank"
              href="https://www.facebook.com/RADA-Media-100147568952754"
            >
              <i className="fab fa-facebook" />
            </a>

            <a
              className="btn-discord"
              target="_blank"
              href="https://discord.gg/ENm9SpQs"
              rel="noreferrer"
            >
              <i className="fab fa-discord" />
            </a>

            <a
              className="btn-twitter"
              target="_blank"
              href="https://twitter.com/radamedia"
              rel="noreferrer"
            >
              <i className="fab fa-twitter" />
            </a>

            <a
              className="btn-medium"
              target="_blank"
              href="https://medium.com/@radamedia"
              rel="noreferrer"
            >
              <i className="fab fa-medium-m" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
