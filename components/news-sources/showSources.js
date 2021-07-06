import React from "react";
import styles from '../../styles/modules/Card.post.module.css'

export default function showSources(source) {
  const forumCardanoLogo = 'https://sjc3.discourse-cdn.com/business4/user_avatar/forum.cardano.org/cardano-foundation/45/22471_2.png'
  const iohkLogo = 'https://ucarecdn.com/a3d997dc-1781-445f-ad59-ad0e58c24cf3/-/resize/200/-/format/webp/-/quality/best/-/progressive/yes/'
  // const iohkLogo = 'https://www.kindpng.com/picc/m/467-4679491_cardano-logo-iohk-transparent-png-png-download.png'
  const coindeskLogo = "https://seeklogo.com/images/C/coindesk-logo-C8CDEB939F-seeklogo.com.png"
  const cointeleLogo = "https://getlogovector.com/wp-content/uploads/2019/10/cointelegraph-logo-vector.png"
  const adapulseLogo = 'https://adapulse.io/wp-content/uploads/2021/03/logonew@2x.png'

  const listLogos = [forumCardanoLogo, iohkLogo, coindeskLogo, cointeleLogo, adapulseLogo]
  const displaySources = ['Cardano Foundation', 'IOHK', 'CoinDesk', 'CoinTelegraph', 'AdaPulse']
  const listSources = ['cardano', 'iohk', 'coindesk', 'cointele', 'adapulse']
  for (const [i, value] of listSources.entries()) {
    if (source.toLowerCase().includes(value)) {
      return (
        <>
          {/*<div className={`${styles.project_icon} metadata metadata_date`}>*/}
          {/*  <span className='metadata-value'>*/}
          {/*    <img className={`card-img ${styles.project_icon__img}`} src={listLogos[i]} alt={""}/>*/}
          {/*  </span>*/}
          {/*</div>*/}
          <div className="metadata metadata_author">
            {source.includes('cardano') ?
              <span className="icon mr-1">
              <i className={`cf cf-car text-base`}/>
            </span>
              :
              <div className={`${styles.project_icon} metadata metadata_date`}>
              <span className="metadata-value">
              <img className={`card-img ${styles.project_icon__img}`} src={listLogos[i]} alt={""}/>
            </span>
              </div>
            }
            <span className="metadata-value" title={displaySources[i]}>{displaySources[i]}</span>
          </div>
        </>
      )
    }
  }
  }