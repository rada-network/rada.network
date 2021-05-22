// import {useAuthState} from "../context/auth";


export const Header = () => {
  // const {isAuthenticated} = useAuthState()
  // const str = JSON.stringify(useAuthState(), null, 4)
  // console.log(`Header: ${str}`)
  // console.log(`isAuthenticated: ${isAuthenticated}`)

  return (
    <div className="header">
      <div className="container py-12 lg:py-16">

        <div className="flex flex-col max-w-screen-sm">
          <div className="">
            <h2 className="mb-2 text-4xl leading-snug font-medium text-white">
              <span className="relative inline-block">
                Discover all the latest Cardano News, Feeds, Discussions, Projects and more... 
              </span>
            </h2>
            <p className="text-base text-lg font-light text-white text-opacity-70">
              and always be in the loop!
            </p>
          </div>
          {/* <div className="mt-4">
            <a href="/" className="h-12 px-6 font-medium tracking-wide rounded btn btn-secondary">
              Get started
            </a>
          </div> */}
        </div>

      </div>
    </div>
  );
};