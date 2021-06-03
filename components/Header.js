// import {useAuthState} from "../context/auth";


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
    <div className={`header overflow-hidden`} type={props.itemType}>
      <div className="container">
        <div className="flex flex-wrap">
          <div className="py-12 lg:py-16 flex flex-col max-w-screen-sm lg:w-1/2">
            <h2 className="mb-2 text-2xl leading-8 lg:text-4xl lg:leading-snug font-medium text-white">
              <span className="relative inline-block">
                {props.title}
              </span>
            </h2>
            <p className="text-base lg:text-lg font-light text-white text-opacity-70">
              {props.description}
            </p>
          </div>
          <div className="hidden lg:flex lg:w-1/2 lg:-my-12">
            <img className="block w-auto h-auto" src="/images/hero.png" />
          </div>
        </div>

      </div>
    </div>
  );
};