

export const Header = () => {
  return (
    <div className="header">
      <div className="container">

        <div className="flex flex-col px-16 py-12 container-inner">
          <div className="">
            <h2 className="mb-2 text-3xl font-semibold text-white">
              <span className="relative inline-block">
                Discover all the latest Crypto Projects 
              </span>
            </h2>
            <p className="text-base text-xl text-indigo-100">
              and always be in the loop!
            </p>
          </div>
          <div className="mt-4">
            <a href="/" className="h-12 px-6 font-medium tracking-wide rounded btn btn-secondary">
              Get started
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};