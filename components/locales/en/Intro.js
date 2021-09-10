import React from "react";

export default function Intro({dataStore}){
  return (
    <div className="empty-state">
      <div className={`home-emptystate-deco`}/>

      <div className="empty-state-content">

        <h3>What is Rada.co?</h3>
        <p>Rada is a news aggregator for Blockchain and Crypto investors.</p>

        <h3>How will Rada.co work?</h3>
        <p>Phase 1: The system will "scan" and collect all Blockchain/Crypto news from major newspapers in the world and Vietnam.</p>

        <p>Phase 2: Big data technology and AI recommend the most important news and information to ensure you do not miss any important opportunities in the Crypto market.
        </p>

        <p>Rada supports multi-language: users from any country will be navigated to the local language, with news being gathered from sources from the local press.</p>

        <h3>Current version</h3>
        <p>- The latest daily built version for Vietnam market at: <a className="link" target="_blank"
                                                                      href="https://rada.co/vi">https://rada.co/vi</a>
        </p>
        <p>- The English version will be completed at: <a className="link" target="_blank" href="https://rada.co/en">https://rada.co/en</a>
        </p>

        <h3>Community</h3>
        <p>Join the Rada.co community to join discussions, request new features and get the latest updates about the project.</p>
        <div className="about-social">
          <a target="_blank" href="https://www.facebook.com/RADA-Media-100147568952754">
            <i className="fab fa-facebook"/>
          </a>

          <a target="_blank" href="https://twitter.com/radamedia">
            <i className="fab fa-twitter"/>
          </a>

          <a target="_blank" href="https://medium.com/@radamedia">
            <i className="fab fa-medium-m"/>
          </a>

          <a target="_blank" href="https://discord.gg/ENm9SpQs">
            <i className="fab fa-discord"/>
          </a>
        </div>

      </div>

    </div>
  )
}