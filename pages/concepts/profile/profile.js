import { Head } from "../../../components/Head";
import RadaSvg from "@components/svg/rada";
function Concept() {
  return (
    <>
      <Head />

      <div className="pane-content--sec--main grid scrollbar">
        {/* NNTH: Remove 'max-w-screen-md mx-auto' on production */}
        <div className="page max-w-screen-lg mx-auto">
          <div className="section">
            <div className="grid grid-cols-1">

              {/* Post Header */}
              

              {/* Post Content */}
              <div className="w-full mt-4">
                <div className="text-center mx-auto max-w-lg mb-4 md:mb-8">
                  <div className="w-20 h-20 mx-auto relative">
                    <img className="rounded-full" src="/placeholders/cryptopunk.jpg" />
                    {/* Display this checkmark if the user already KYCed */}
                    <span className="w-6 h-6 p-1 absolute right-0 top-0 rounded-full flex 
                    items-center bg-green-500">
                      <i class="text-sm font-bold fas fa-check text-white"></i>
                    </span>
                  </div> 
                  <h3 className="text-2xl font-semibold mt-4">Andrew Hicker</h3>
                  Only show this block if the user haven't KYCed. 
                  <div className="">
                    <span className="opacity-70">Haven't KYC yet!</span>  
                    <button className="btn btn-default ml-4">KYC</button>
                  </div>
                </div>
                <div className="md:grid grid-cols-2 gap-4">
                  <div className="card--wrapper mb-4 md:mb-0">
                    <div className="card--header pb-1">
                      Social
                    </div>
                    <div className="card--body">
                      <div className="list-group">
                        {/* Wallet connected --> Show DisConnect Buttons */}
                        
                        {/* Google disconnected --> Show Connect Buttons */}
                        <div className="list-group--item !pb-0 md:!pb-4">
                          <div className="list-group--item--title w-full md:w-1/3">
                            <div className="list-group--item--media brand--google">
                              <span className="icon"><i class="fa-brands fa-google"></i></span>
                            </div>
                            <label htmlFor="blockchain-wallet" className="text-color-desc">
                              Google
                            </label>
                          </div>
                          
                          <div className="text-right flex-1 relative -top-4 md:top-0">
                            <button className="btn btn-default">Connect</button>
                          </div>
                        </div>

                        {/* Facebook connected --> Show DisConnect Buttons */}
                        <div className="list-group--item !pb-0 md:!pb-4">
                          <div className="list-group--item--title w-full md:w-1/3">
                            <div className="list-group--item--media brand--facebook">
                              <span className="icon"><i class="fa-brands fa-facebook-f"></i></span>
                            </div>
                            <label htmlFor="blockchain-wallet" className="text-color-desc">
                              Facebook
                            </label>
                          </div>
                          <div className="flex-1 -mt-4 md:mt-0">
                            <div className="relative pl-8 md:pl-0 w-full">
                              <strong>Hieu Nguyen</strong>
                            </div>
                          </div>
                          <div className="text-right relative -top-4 md:top-0">
                            <button className="btn btn-default">Disconnect</button>
                          </div>
                        </div>

                        {/* Twitter connected --> Show DisConnect Buttons */}
                        <div className="list-group--item !pb-0 md:!pb-4">
                          <div className="list-group--item--title w-full md:w-1/3">
                            <div className="list-group--item--media brand--twitter">
                              <span className="icon"><i class="fa-brands fa-twitter"></i></span>
                            </div>
                            <label htmlFor="blockchain-wallet" className="text-color-desc">
                              Twitter
                            </label>
                          </div>
                          <div className="flex-1 -mt-4 md:mt-0">
                            <div className="relative pl-8 md:pl-0 w-full">
                              <strong>@nnth83</strong>
                            </div>
                          </div>
                          <div className="text-right relative -top-4 md:top-0">
                            <button className="btn btn-default">Disconnect</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  <div className="card--wrapper  mb-4 md:mb-0">
                    <div className="card--header pb-1">
                      Wallet
                    </div>
                    <div className="card--body">
                      <div className="list-group">
                        <div className="list-group--item !pb-0 md:!pb-4">
                          
                          <div className="list-group--item--title w-full md:w-1/3">
                            <div className="list-group--item--media dark:!bg-gray-700">
                              <span className="icon "><i class="fa-solid fa-wallet"></i></span>
                            </div>
                            <label htmlFor="blockchain-wallet" className="text-color-desc">
                              Wallet
                            </label>
                          </div>
                          <div className="flex-1 -mt-4 md:mt-0">
                            <div className="relative pl-8 md:pl-0 w-full flex items-center">
                              <strong>0xDB33...345f</strong>
                            </div>
                          </div>
                          <div className="text-right relative -top-4 md:top-0">
                            <button className="btn btn-default">Disconnect</button>
                          </div>
                        </div>

                        <div className="list-group--item !pb-0 md:!pb-4">
                          <div className="list-group--item--title w-1/3">
                            <div className="list-group--item--media dark:!bg-gray-700">
                               <RadaSvg />
                            </div>
                            <label htmlFor="blockchain-wallet" className="text-color-desc">
                              Balance
                            </label>
                          </div>
                          <div className="flex-1 -mt-4 md:mt-0">
                            <div className="relative pl-8 md:pl-0 w-full flex items-center">
                             4 RIR
                            </div>
                          </div>            
                        </div>
                      </div>
                      <div className="p-4 border-t flex items-centers dark:border-gray-500 dark:border-opacity-10">
                        Want to earn free RIR
                        <a href="" className="ml-auto flex items-center text-yellow-600">
                          Learn more
                          <i class="fas fa-angle-right ml-2"></i>
                        </a>
                        </div>
                    </div>
                  </div>
                  

                  


                </div>

                <div className="mt-4">
                  <div className="card--wrapper  mb-4 md:mb-0">
                    <div className="card--header pb-1">
                      Launchverse
                    </div>
                    <div className="card--body">
                      
                      <div className="list-group !items-start">
                        <div className="list-group--item !pb-0 md:!pb-4">
                          
                          <div className=" w-full !-mt-4 md:w-1/4">
                            
                            <label className="">
                              The Parallel
                            </label>
                          </div>
                          
                          <div className="list-group--item--title -mt-4 w-full md:w-1/4">
                            <label className="">
                              Public
                            </label>
                          </div>

                          <div className=" w-full md:w-1/4">
                            <label className="text-sm">
                              <div>October 28th 2021</div>
                              <span> 1:00 PM UTC </span>
                            </label>
                          </div>
                          <div className="flex -mt-4 w-full md:w-1/4">
                            <label className="ml-auto label label--success">
                              Success
                            </label>
                          </div>

                        </div>

                       
                      </div>
                     
                    </div>
                  </div>
                </div>
                
              </div>
              {/* End: Post Content */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Concept
