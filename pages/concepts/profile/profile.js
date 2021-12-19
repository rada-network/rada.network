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
                      <i className="text-sm font-bold fas fa-check text-white"></i>
                    </span>
                  </div> 
                  <h3 className="text-2xl font-semibold mt-4">Andrew Hicker</h3>
                  {/* Only show this block if the user haven't KYCed.  */}
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
                              <span className="icon"><i className="fa-brands fa-google"></i></span>
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
                              <span className="icon"><i className="fa-brands fa-facebook-f"></i></span>
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
                              <span className="icon"><i className="fa-brands fa-twitter"></i></span>
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
                              <span className="icon "><i className="fa-solid fa-wallet"></i></span>
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

                        <div className="list-group--item  md:!pb-4">
                          <div className="list-group--item--title w-1/3">
                            <div className="list-group--item--media dark:!bg-gray-700">
                               <RadaSvg />
                            </div>
                            <label htmlFor="blockchain-wallet" className="text-color-desc">
                              Balance
                            </label>
                          </div>
                          <div className="flex-1 md:mt-0">
                            <div className="relative pl-8 md:pl-0 w-full flex items-center">
                             4 RIR
                            </div>
                          </div>            
                        </div>
                      </div>
                      <div className="p-4 border-t flex items-centers dark:border-gray-500 dark:border-opacity-10">
                        Want to earn free RIR
                        <a href="" className="ml-auto flex items-center text-yellow-500">
                          Learn more
                          <i className="fas fa-angle-right ml-2"></i>
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
                      <div className="invisible h-0 md:h-auto md:visible md:flex px-4 md:py-4 py-0 md:px-6 border-b border-gray-200 dark:border-gray-500 dark:border-opacity-10 text-xs uppercase font-semibold text-opacity-50 tracking-wider">                
                        <div className="flex md:w-1/2 md:mr-2 mb-2 md:mb-0">
                          <div className="mr-4">                           
                            <label className="font-semibold">
                              Project
                            </label>
                          </div>
                          
                          <div className="ml-auto">Type
                     
                          </div>
                        </div>

                        <div className="flex md:w-1/2 md:ml-2">
                          <div className="">
                            Date
                          </div>
                          <div className="ml-auto">
                            Status
                          </div> 
                        </div> 
                      </div>
                      <a href="link to claim tab" className="block md:flex px-4 py-4 md:px-6 border-b border-gray-200 dark:border-gray-500 dark:border-opacity-10 hover:bg-gray-200 dark:hover:bg-gray-700">                
                        <div className="flex md:w-1/2 md:mr-2 mb-2 md:mb-0">
                          <div className="mr-4 flex items-center">  
                            <img src="/placeholders/parallel-token.png" className="w-8 h-8 mr-2 rounded-full" />                         
                            <label className="font-semibold">
                              The Parallel
                            </label>
                          </div>
                          
                          <div className="ml-auto">
                            <label className="label label--neutral">
                              Public
                            </label>
                          </div>
                        </div>

                        <div className="flex md:w-1/2 md:ml-2">
                          <div className="">
                            <label className="text-sm">
                              <div>October 28th 2021</div>
                              <span className="opacity-60 text-xs block md:mt-0"> 1:00 PM UTC </span>
                            </label>
                          </div>
                          <div className="ml-auto">
                            <label className="lg:ml-auto label label--success">
                              Success
                            </label>
                          </div> 
                        </div> 
                      </a>

                      <a href="link to claim tab" className="block md:flex px-4 py-4 md:px-6 border-b border-gray-200 dark:border-gray-500 dark:border-opacity-10 hover:bg-gray-200 dark:hover:bg-gray-700">                
                        <div className="flex md:w-1/2 md:mr-2 mb-2 md:mb-0">
                          <div className="mr-4  flex items-center">
                            <img src="/token-logos/thetan.png" className="w-8 h-8 mr-2 rounded-full" />                           
                            <label className="font-semibold">
                              The Thetan Arena
                            </label>
                          </div>
                          
                          <div className="ml-auto">
                            <label className="label label--neutral">
                              Private
                            </label>
                          </div>
                        </div>

                        <div className="flex md:w-1/2 md:ml-2">
                          <div className="">
                            <label className="text-sm">
                              <div>October 28th 2021</div>
                              <span className="opacity-60 text-xs block md:mt-0"> 1:00 PM UTC </span>
                            </label>
                          </div>
                          <div className="ml-auto">
                            <label className="lg:ml-auto label label--success">
                              Success
                            </label>
                          </div> 
                        </div> 
                      </a>

                      <a href="link to claim tab" className="block md:flex px-4 py-4 md:px-6 hover:bg-gray-200 dark:hover:bg-gray-700">                
                        <div className="flex md:w-1/2 mb-2 md:mr-2 md:mb-0">
                          <div className="mr-4 flex items-center">         
                            <img src="/token-logos/elemon.png" className="w-8 h-8 mr-2 rounded-full" />                    
                            <label className="font-semibold">
                              Elemon
                            </label>
                          </div>
                          
                          <div className="ml-auto">
                            <label className="label label--neutral">
                              Public
                            </label>
                          </div>
                        </div>

                        <div className="flex md:w-1/2 md:ml-2">
                          <div className="">
                            <label className="text-sm">
                              <div>October 28th 2021</div>
                              <span className="opacity-60 text-xs block md:mt-0"> 1:00 PM UTC </span>
                            </label>
                          </div>
                          <div className="ml-auto">
                            <label className="lg:ml-auto label label--warning">
                              Failed
                            </label>
                          </div> 
                        </div> 
                      </a>     



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
