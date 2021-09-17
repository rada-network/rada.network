import React from "react";

export default function Intro({ dataStore }) {
  return (
    <div className="page-about">

      <div className={`page-about-deco`} />

      <div className="page-about-content">

        <div className="page-about-content--section">
          <span className="icon"><i class="fa-solid fa-info"></i></span>
          <div>
            <h3>What is RADA?</h3>
            <p>RADA is a news aggregator for Blockchain and Crypto investors.</p>
          </div>
        </div>

        <div className="page-about-content--section">
          <span className="icon"><i class="fa-regular fa-rocket"></i></span>
          <div>
            <h3>How will RADA work?</h3>
            <p>
              <u>Phase 1</u>: The system will "scan" and collect all Blockchain/Crypto news
              from major newspapers in the world and Vietnam.
            </p>
            <p>
              <u>Phase 2</u>: Big data technology and AI recommend the most important news
              and information to ensure you do not miss any important opportunities
              in the Crypto market.
            </p>
            <p>
              Rada supports multi-language: users from any country will be navigated
              to the local language, with news being gathered from sources from the
              local press.
            </p>
          </div>
        </div>

        {/* <h3>Current version</h3>
        <p>
          - The latest daily built version for Vietnam market at:{" "}
          <a className="link" target="_blank" href="https://rada.co/vi">
            https://rada.co/vi
          </a>
        </p>
        <p>
          - The English version will be completed at:{" "}
          <a className="link" target="_blank" href="https://rada.co/en">
            https://rada.co/en
          </a>
        </p> */}

        <div className="page-about-content--section">

          <ul className="about-links">
            <li><a href="#">Copyright</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms of Use</a></li>
          </ul>

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
