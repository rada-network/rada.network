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
              <p className={`header-text`}>
                Congrats! You discovered <strong className="">RADA.co</strong>
              </p>
              <h2 className={`header-title`}>
                <strong className="">Trends Hunter</strong> for Cardano Community
              </h2>
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