// import {useAuthState} from "../context/auth";

import styles from '../../styles/modules/Header.module.css'

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
        
        <div className={`header ${styles.header}`} type={props.itemType}>
          <div className="container">

            <div className={`${styles.header_inner}`}>

              <div className={`${styles.header_body}`}>
                <h2 className={`${styles.header_title}`}>
                  <span className="relative inline-block">
                    {utils.topicTransform(props.title)}
                  </span>
                </h2>
                <p className={`${styles.header_text}`}>
                  {props.description}
                </p>
              </div>

            </div>

          </div>
        </div>
    }
    </>
  );
};