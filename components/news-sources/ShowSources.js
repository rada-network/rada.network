import React from "react";

export default function showSources({source}) {
  const forumCardanoLogo = 'https://sjc3.discourse-cdn.com/business4/user_avatar/forum.cardano.org/cardano-foundation/45/22471_2.png'
  const iohkLogo = '/images/logo-sources/iohk.png'
  const coindeskLogo = "/images/logo-sources/coindesk.png"
  // const coindeskLogo = "https://seeklogo.com/images/C/coindesk-logo-C8CDEB939F-seeklogo.com.png"
  const cointeleLogo = "/images/logo-sources/cointelegraph.png"
  const adapulseLogo = '/images/logo-sources/adapulse.png'
  const coingapeLogo = '/images/logo-sources/coingape.png'

  const listLogos = [forumCardanoLogo, iohkLogo, coindeskLogo, cointeleLogo, adapulseLogo, coingapeLogo]
  const displaySources = ['Cardano Foundation', 'IOHK', 'CoinDesk', 'CoinTelegraph', 'AdaPulse', 'CoinGape', 'Bitcoinist']
  const listSources = ['forum.cardano', 'iohk', 'coindesk', 'cointele', 'adapulse', 'coingape', 'bitcoinist']
  for (const [i, value] of listSources.entries()) {
    if (source.toLowerCase().includes(value)) {
      return (
        <>
          {/*<div className={`${styles.project_icon} metadata metadata_date`}>*/}
          {/*  <span className='metadata-value'>*/}
          {/*    <img className={`card-img ${styles.project_icon__img}`} src={listLogos[i]} alt={""}/>*/}
          {/*  </span>*/}
          {/*</div>*/}
          <div className="metadata metadata-source">
            {source.includes(listSources[0]) ?
              <span className="icon mr-1">
                <i className={`cf cf-car text-base`}/>
              </span>
              :
              <span className={`metadata-value`}>
                <img className="metadata-value--img" src={listLogos[i]} alt={value} />
                  {/*<img className={`card-img ${styles.project_icon__img}`} src={'images/logo-sources/adapulse.png'} alt='logo'/>*/}
              </span> 
            }
            <span className="metadata-value" title={displaySources[i]}>{displaySources[i]}</span>
          </div>
        </>
      )
    }
  }
}