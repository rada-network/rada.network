export const Header = () => {
  return (
    <div className="header">
      <div className="container">

        <div className="flex flex-col mb-16 container-inner">
          <div className="mb-5">
            <h2 className="mb-2 text-3xl font-600 text-white">
              <span className="relative inline-block">
                Discover all the latest Crypto Projects 
              </span>
            </h2>
            <p className="text-base text-indigo-100 text-xl">
              and always be in the loop!
            </p>
          </div>
          <div>
            <a href="/" className="h-12 px-6 font-medium tracking-wide rounded btn btn-secondary">
              Get started
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};