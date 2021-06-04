// import {useAuthState} from "../context/auth";


import utils from "../lib/util";

export const Header = ({props}) => {
  props = props || {
    title : "",
    description : "",
    itemType : ""
  }
  console.log(props)
  // const {isAuthenticated} = useAuthState()
  // const str = JSON.stringify(useAuthState(), null, 4)
  // console.log(`Header: ${str}`)
  // console.log(`isAuthenticated: ${isAuthenticated}`)
  return (
    <>
    { props.title === "" ?
        "" :
        <div className={`header overflow-hidden`} type={props.itemType}>
          <div className="container">
            <div className="flex flex-wrap">
              <div className="py-12 lg:py-16 flex flex-col max-w-screen-sm lg:w-1/2">
                <h2 className="">
              <span className="relative inline-block">
                {utils.topicTransform(props.title)}
              </span>
                </h2>
                <p className="">
                  {props.description}
                </p>
              </div>
              {props.itemType === "home" ?
                <div className="hidden lg:flex lg:w-1/2 lg:-my-24">
                  <img className="block w-auto h-auto" src="/images/hero.png"/>
                </div>
                : ""
              }
            </div>

          </div>
        </div>
    }
    </>
  );
};