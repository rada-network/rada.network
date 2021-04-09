export const Header = () => {
  return (
    <div className="home--header">
      <div className="container home--header--container">

        <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="mb-6 text-4xl font-400 text-white sm:text-6xl lg:text-7xl lg:leading-snug md:mx-auto">
              <span className="relative inline-block">
                The largest NFT marketplace
              </span>
            </h2>
            <p className="text-base text-indigo-100 md:text-lg">
              Buy, sell, and discover rare digital items
            </p>
          </div>
          <div>
            <a href="/" className="btn btn-secondary h-12 px-6 font-medium tracking-wide">
              Get started
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};