import ReactTooltip from 'react-tooltip'


export const Footer = () => {
  return (
    <>
    <div className="footer mt-4 lg:mt-8">

      <div className="container">
        <div className="flex flex-col justify-between pt-4 pb-4 sm:flex-row">
          <p className="text-sm text-gray-400">
            Copyright © 2021 RADA.co. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a href="/" className="text-gray-400 hover:text-gray-700">
              <span className="icon">
                <i className="fab fa-twitter"></i>
              </span>
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-700">
              <span className="icon">
                <i className="fab fa-medium-m"></i>
              </span>
            </a>
            <a href="/" className="text-gray-400 hover:text-gray-700">
              <span className="icon">
                <i className="fa fa-envelope"></i>
              </span>
            </a>
          </div>
        </div>
      </div>

    </div>

    <ReactTooltip event="click" globalEventOff="click" clickable={true} html={true} />
      
    </>
    
  );
};