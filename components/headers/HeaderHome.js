// import {useAuthState} from "../context/auth";

import styles from '../../styles/modules/Header.home.module.css'

import utils from "../../lib/util";

export const Header = ({props}) => {
  props = props || {
    title : "",
    description : "",
    itemType : ""
  }
  // const {isAuthenticated} = useAuthState()
  // const str = JSON.stringify(useAuthState(), null, 4)
  // console.log(`Header: ${str}`)
  // console.log(`isAuthenticated: ${isAuthenticated}`)
  return (
    <>
    { props.title === "" ?
        "" :
        
        <div className={`header header-home`} type={props.itemType}>
  
          <div className={`header-inner`} >

            <div className={`header-body`}>
              <h2 className={`header-title`}>
                <span className="relative inline-block">
                  <strong className="font-medium">Trends hunter</strong> for <strong className="font-medium">Cardano</strong> community
                </span>
              </h2>
              <p className={`header-text`}>
                Stay updated with the best quality news &amp; updates
              </p>
            </div>

            <div className={`header-media`}>
              <img className={`ani-floating`} src="/images/cardano.svg"/>
            </div>

          </div>

        </div>
    }
    </>
  );
};