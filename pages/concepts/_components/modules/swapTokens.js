import { CheckSvg } from "../../../../components/svg/SvgIcons";
const SwapTokens = ({}) => {
  return (
    <>
      <div className="global-padding">

        <div className="mb-4">
          
          <div className="relative">
            
            {/* remove the above block if user doesn't have RIR */}
            <div className="">
              <label for="currency" className="uppercase text-xs mb-2 block tracking-wide font-medium opacity-70">Amount</label>
              <select id="amount" name="amount" className="select-custom ">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300" selected>100 BUSD</option>
                <option className="text-gray-300">200 BUSD</option>
                <option className="text-gray-300">300 BUSD</option>
                <option className="text-gray-300">400 BUSD</option>
                <option className="text-gray-300">500 BUSD</option>
                <option className="text-gray-300">600 BUSD</option>
                <option className="text-gray-300">700 BUSD</option>
                <option className="text-gray-300">800 BUSD</option>
                <option className="text-gray-300">900 BUSD</option>
                <option className="text-gray-300">1000 BUSD</option>
              </select>
            </div>
            <div className="mt-4">
              <label for="rir" className="uppercase text-xs mb-2 block tracking-wide font-medium opacity-70">RIR</label>
              <select id="rir" name="rir" className="select-custom ">
                {/* remove '!rounded-l-none' if user doesn't have RIR */}
                <option className="text-gray-300">0 RIR</option>
                <option className="text-gray-300">1 RIR</option>
                <option className="text-gray-300" selected>2 RIR</option>
                <option className="text-gray-300">3 RIR</option>
                <option className="text-gray-300">4 RIR</option>
                <option className="text-gray-300">5 RIR</option>
              </select>
            
            </div>
            <div className="flex mt-4 rounded-2xl overflow-hidden text-xs font-semibold">
              <div className="w-2/5 flex items-center transition-all">
                <div className="w-full flex items-center text-white h-6 pl-2  bg-green-600">
                200 busd
                </div>
                
              </div>
              <div className="w-2/5 flex flex items-center transition-all">
                <div className="w-full h-6 flex items-center  text-gray-700 pl-2 bg-yellow-300 ">500 busd</div>    
              </div>
              <div className="w-1/5 flex flex items-center transition-all">
                <div className="w-full h-6 flex items-center bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          
          </div>
          {/* <div className="dark:text-gray-400 mt-2 text-gray-500">You have to pay <strong>100 busd</strong></div> */}
        </div>
       
        {/* chưa nhập amount thì ẩn 2 nút enable cái này đi */}
        <div className="mt-4  grid grid-cols-2 gap-4"> 
          {/* bỏ grid grid-cols-2 nếu user không có RIR hoặc không dùng RIR */}
          <div className="flex-shrink-0 flex-grow">
            <button className="btn relative  w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            <span className="spinner" /> 
              Enable BUSD
            </button>     
          </div>
          <div  className="flex-shrink-0 flex-grow">
            <button className="btn relative w-full btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            {/* <span className="spinner" />  */}
              Enable RIR
            </button>         
          </div>
        </div>

        <div className="mt-4 flex">
          <button className="btn relative w-full disabled btn-default btn-default-lg btn-purple" disabled="" id="swap-button" width="100%" scale="md">
            {/* <span className="spinner" />  */}
              Prefund
          </button>
        </div>

        <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300 pt-4 border-t border-gray-300 dark:border-gray-800">
          <li className="flex mb-2 relative pl-6">
            <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
              <CheckSvg />  
            </span>
            <div className="">200 busd (2 RIR) is guaranteed.</div>
          </li>
          <li className="relative mb-2 pl-6">
            <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
              <CheckSvg />  
            </span>
            <div>The rest of your investment will be calculated based on the total pool.</div>
          </li>
          <li className="relative mb-2 pl-6">
            <span className="absolute top-0.5 left-0  text-whiteflex-shink-0 w-4 h-4 mr-1  p-1 flex items-center rounded-full bg-gray-300 dark:bg-gray-600">
              <CheckSvg />  
            </span>
            <div>Your total prefund: 400 busd</div>
          </li>
        </ul>

      </div>

    </>
  )
}

export default SwapTokens